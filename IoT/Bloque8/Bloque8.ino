/*
  Medio Ambiente - ESP32-S3 -> Firebase Realtime Database (sin ThingSpeak)


  Sensores:
    VEML7700 (luz)        I2C  SDA=4, SCL=5
    INMP441 (sonido)      I2S  SCK=9, WS=10, SD=11
    DHT22 (temp/humedad)  GPIO 7


  Librerias (Gestor de librerias):
    - FirebaseClient (Mobizt)
    - Adafruit VEML7700 Library (+ Adafruit BusIO)
    - DHT sensor library (Adafruit) (+ Adafruit Unified Sensor)


  Placa: ESP32S3 Dev Module
*/


#include "secrets.h"  // crea este archivo a partir de secrets.example.h; no se sube a GitHub
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
const char* NODO_ID     = "bloque8";    // sin espacios ni tildes, es la llave en firebase
const char* NODO_NOMBRE = "Bloque 8";   // lo que se ve en el selector

const unsigned long INTERVALO_MS = 10000;  // envio de "actual"
const int HISTORIAL_CADA = 3;              // guarda en historial 1 de cada 3 envios (cada 30 s)
const float DB_OFFSET = -18.5;             // ajuste de sonido: pon aqui tu valor calibrado
// ------------------------------------


// Pines
#define SDA_PIN 4
#define SCL_PIN 5
#define I2S_SCK 9
#define I2S_WS  10
#define I2S_SD  11
#define DHT_PIN 7
#define DHT_TYPE DHT22


Adafruit_VEML7700 veml;
DHT dht(DHT_PIN, DHT_TYPE);


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


// Si tu funcion de sonido ya calibrada es distinta, reemplaza solo este cuerpo.
float leerSonido() {
  static int32_t buf[512];
  size_t bytes = 0;
  double suma = 0;
  long n = 0;


  for (int k = 0; k < 4; k++) {
    i2s_read(I2S_NUM_0, buf, sizeof(buf), &bytes, 100);
    int pares = bytes / 8;  // 2 muestras de 4 bytes por par
    for (int i = 0; i < pares; i++) {
      int32_t l = buf[2 * i] >> 8;      // 24 bits utiles
      int32_t r = buf[2 * i + 1] >> 8;
      int32_t s = (abs(l) > abs(r)) ? l : r;  // el canal que tenga señal
      suma += (double)s * s;
      n++;
    }
  }
  if (n == 0) return NAN;
  double rms = sqrt(suma / n);
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
  float luz = veml.readLux();
  float sonido = leerSonido();
  float t = dht.readTemperature();
  float h = dht.readHumidity();


  // Si el DHT22 falla una lectura, conserva la ultima buena
  if (!isnan(t)) ultimaTemp = t;
  if (!isnan(h)) ultimaHum = h;
  if (isnan(sonido)) sonido = 0;


  time_t ts = time(nullptr);


  char json[256];  // subi de 200 porque ahora lleva nombre
  snprintf(json, sizeof(json),
           "{\"nombre\":\"%s\",\"luz\":%.1f,\"sonido\":%.1f,\"temperatura\":%.1f,\"humedad\":%.1f,\"ts\":%lu}",
           NODO_NOMBRE, luz, sonido, isnan(ultimaTemp) ? 0.0 : ultimaTemp,
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
  if (!veml.begin()) Serial.println("VEML7700 no encontrado: revisa SDA=4, SCL=5");
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
