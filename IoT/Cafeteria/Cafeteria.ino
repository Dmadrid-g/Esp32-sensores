/*
  Medio Ambiente - ESP32 (DevKit 38 pines) -> Firebase Realtime Database
  Nodo: Cafeteria

  Sensores:
    VEML7700 (luz)        I2C  SDA=21, SCL=22
    INMP441 (sonido)      I2S  SCK=18, WS=19, SD=23
    DHT11 (temp/humedad)  GPIO 4

  Placa: ESP32 Dev Module

  Librerias (Gestor de librerias):
    - FirebaseClient (Mobizt)
    - Adafruit VEML7700 Library (+ Adafruit BusIO)
    - DHT sensor library (Adafruit) (+ Adafruit Unified Sensor)
*/

#include "secrets.h"  // WIFI_SSID, WIFI_PASSWORD, DATABASE_URL (no se sube a GitHub)
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <time.h>
#include <math.h>
#include <driver/i2s.h>
#include <Adafruit_VEML7700.h>
#include <DHT.h>
#define ENABLE_DATABASE   // obligatorio en FirebaseClient 2.x: activa Realtime Database
#include <FirebaseClient.h>

// ---------- CONFIGURA ESTO ----------
const char* NODO_ID     = "cafeteria";   // sin espacios ni tildes, es la llave en firebase
const char* NODO_NOMBRE = "Cafetería";   // lo que se ve en el selector

const unsigned long INTERVALO_MS = 10000;  // envio de "actual"
const int HISTORIAL_CADA = 6;              // guarda en historial 1 de cada 6 envios (cada 60 s)
const float DB_OFFSET = -19.5;             // ajuste de sonido: calibralo para este micro

// ---------- DEPURACION / CALIBRACION ----------
// Con estos valores todo queda neutro. Cambia UNA cosa a la vez y compara.
const int   LECTURAS_SONIDO    = 60;     // ~1 s de audio por medicion (cada lectura son ~16 ms)
const int   DESCARTAR_LECTURAS = 4;      // tira el audio viejo que quedo en el buffer
const bool  QUITAR_DC          = false;  // true: resta el nivel de continua (DC) del micro
const int   CANAL              = 0;      // 0 = como antes (el mas fuerte), 1 = izquierdo, 2 = derecho
const bool  DEBUG_SONIDO       = true;   // imprime el detalle del micro en el serial
const float TEMP_OFFSET        = -1.7;    // se suma a la temperatura (°C)
const float HUM_OFFSET         = 15.5;    // se suma a la humedad (puntos %)
const float LUZ_FACTOR         = 0.88;    // multiplica la luz
// ------------------------------------

// ---------- PINES ----------
#define I2S_SCK 18
#define I2S_WS  19
#define I2S_SD  23
#define SDA_PIN 21
#define SCL_PIN 22
#define DHT_PIN 4
#define DHT_TYPE DHT11

Adafruit_VEML7700 veml;
DHT dht(DHT_PIN, DHT_TYPE);
bool vemlOk = false;

// Firebase (sin autenticacion, base en modo de prueba)
WiFiClientSecure ssl_client;
AsyncClientClass aClient(ssl_client);
NoAuth noAuth;
FirebaseApp app;
RealtimeDatabase Database;

unsigned long ultimoEnvio = 0;
int contador = 0;
float ultimaTemp = NAN, ultimaHum = NAN;

// ---------- Sonido (INMP441 por I2S) ----------
void iniciarI2S() {
  i2s_config_t cfg = {};
  cfg.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX);
  cfg.sample_rate = 16000;
  cfg.bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT;
  cfg.channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT;  // lee ambos canales
  cfg.communication_format = I2S_COMM_FORMAT_STAND_I2S;
  cfg.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;
  cfg.dma_buf_count = 4;
  cfg.dma_buf_len = 256;

  i2s_pin_config_t pins = {};
  pins.mck_io_num = I2S_PIN_NO_CHANGE;
  pins.bck_io_num = I2S_SCK;
  pins.ws_io_num = I2S_WS;
  pins.data_out_num = I2S_PIN_NO_CHANGE;
  pins.data_in_num = I2S_SD;

  i2s_driver_install(I2S_NUM_0, &cfg, 0, NULL);
  i2s_set_pin(I2S_NUM_0, &pins);
}

float leerSonido() {
  static int32_t buf[512];
  size_t bytes = 0;
  // s = suma, s2 = suma de cuadrados. A = el canal mas fuerte por muestra (como antes), L, R
  double sA = 0, sA2 = 0, sL = 0, sL2 = 0, sR = 0, sR2 = 0;
  long n = 0;

  for (int k = 0; k < DESCARTAR_LECTURAS + LECTURAS_SONIDO; k++) {
    i2s_read(I2S_NUM_0, buf, sizeof(buf), &bytes, 100);
    if (k < DESCARTAR_LECTURAS) continue;
    int pares = bytes / 8;  // 2 muestras de 4 bytes por par
    for (int i = 0; i < pares; i++) {
      int32_t l = buf[2 * i] >> 8;      // 24 bits utiles
      int32_t r = buf[2 * i + 1] >> 8;
      int32_t s = (abs(l) > abs(r)) ? l : r;
      sA += s;  sA2 += (double)s * s;
      sL += l;  sL2 += (double)l * l;
      sR += r;  sR2 += (double)r * r;
      n++;
    }
  }
  if (n == 0) return NAN;

  // rms de un canal; con sinDC resta su nivel de continua
  auto rmsDe = [&](double s, double s2, bool sinDC) {
    double m = s / n;
    double v = s2 / n - (sinDC ? m * m : 0.0);
    return sqrt(v > 0 ? v : 0.0);
  };

  double rms;
  if (CANAL == 1)      rms = rmsDe(sL, sL2, QUITAR_DC);
  else if (CANAL == 2) rms = rmsDe(sR, sR2, QUITAR_DC);
  else                 rms = rmsDe(sA, sA2, QUITAR_DC);

  if (DEBUG_SONIDO) {
    Serial.printf("  [mic] n=%ld | L: dc=%.0f rms=%.0f ac=%.0f | R: dc=%.0f rms=%.0f ac=%.0f | usado=%.0f\n",
                  n, sL / n, rmsDe(sL, sL2, false), rmsDe(sL, sL2, true),
                  sR / n, rmsDe(sR, sR2, false), rmsDe(sR, sR2, true), rms);
  }

  if (rms < 1) rms = 1;
  return 20.0 * log10(rms) + DB_OFFSET;
}

// ---------- WiFi y hora ----------
void conectarWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("Conectando a WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 20000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.status() == WL_CONNECTED ? " OK" : " fallo");
}

void sincronizarHora() {
  configTime(0, 0, "pool.ntp.org", "time.google.com");
  Serial.print("Sincronizando hora");
  time_t now = time(nullptr);
  int intentos = 0;
  while (now < 1700000000 && intentos < 30) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
    intentos++;
  }
  Serial.println(now >= 1700000000 ? " OK" : " fallo");
}

// ---------- Envio a Firebase ----------
void enviar() {
  // Si el VEML7700 no se encontro, no mandamos "luz" (la pagina oculta esa tarjeta)
  float luz = vemlOk ? veml.readLux(VEML_LUX_AUTO) * LUZ_FACTOR : NAN;
  float sonido = leerSonido();
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  // Si el DHT falla una lectura, conserva la ultima buena
  if (!isnan(t)) ultimaTemp = t + TEMP_OFFSET;
  if (!isnan(h)) ultimaHum = fminf(100.0f, fmaxf(0.0f, h + HUM_OFFSET));
  if (isnan(sonido)) sonido = 0;

  time_t ts = time(nullptr);

  char campoLuz[24] = "";
  if (!isnan(luz)) snprintf(campoLuz, sizeof(campoLuz), "\"luz\":%.1f,", luz);

  char json[256];
  snprintf(json, sizeof(json),
           "{\"nombre\":\"%s\",%s\"sonido\":%.1f,\"temperatura\":%.1f,\"humedad\":%.1f,\"ts\":%lu}",
           NODO_NOMBRE, campoLuz, sonido, isnan(ultimaTemp) ? 0.0 : ultimaTemp,
           isnan(ultimaHum) ? 0.0 : ultimaHum, (unsigned long)ts);

  Serial.printf("Luz: %.1f lx | Sonido: %.1f dB | Temp: %.1f C | Hum: %.1f %%\n",
                luz, sonido, ultimaTemp, ultimaHum);

  String base = String("/medio_ambiente/nodos/") + NODO_ID;

  bool ok = Database.set<object_t>(aClient, base + "/actual", object_t(json));
  Serial.println(ok ? "Firebase actual: OK" : "Firebase actual: ERROR");
  if (!ok) Serial.printf("  %s (%d)\n", aClient.lastError().message().c_str(), aClient.lastError().code());

  contador++;
  if (contador >= HISTORIAL_CADA) {
    contador = 0;
    String id = Database.push<object_t>(aClient, base + "/historial", object_t(json));
    Serial.println(id.length() ? "Firebase historial: OK" : "Firebase historial: ERROR");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  Wire.begin(SDA_PIN, SCL_PIN);
  vemlOk = veml.begin();
  if (!vemlOk) Serial.printf("VEML7700 no encontrado: revisa SDA=%d, SCL=%d\n", SDA_PIN, SCL_PIN);
  dht.begin();
  iniciarI2S();

  conectarWiFi();
  sincronizarHora();

  ssl_client.setInsecure();  // suficiente para este proyecto escolar
  initializeApp(aClient, app, getAuth(noAuth));
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);
}

void loop() {
  app.loop();
  conectarWiFi();

  if (app.ready() && (ultimoEnvio == 0 || millis() - ultimoEnvio >= INTERVALO_MS)) {
    ultimoEnvio = millis();
    enviar();
  }
}
