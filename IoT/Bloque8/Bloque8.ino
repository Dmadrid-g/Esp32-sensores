/*
  Medio Ambiente - ESP32-S3 -> Firebase Realtime Database
  Nodo: Bloque 8

  Sensores:
    VEML7700 (luz)        I2C  SDA=4, SCL=5
    INMP441 (sonido)      I2S  SCK=9, WS=10, SD=11 (L/R -> GND)
    DHT22 (temp/humedad)  GPIO 7

  Placa: ESP32S3 Dev Module (Tools -> USB CDC On Boot -> Enabled)
*/

#include "secrets.h"  // WIFI_SSID, WIFI_PASSWORD, DATABASE_URL, API_KEY, USER_EMAIL, USER_PASSWORD, GTS_ROOT_R1
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <time.h>
#include <sys/time.h>
#include <math.h>
#include <driver/i2s.h>
#include <Adafruit_VEML7700.h>
#include <DHT.h>
#define ENABLE_USER_AUTH
#define ENABLE_DATABASE
#include <FirebaseClient.h>

// ---------- CONFIGURA ESTO ----------
const char* NODO_ID     = "bloque8";
const char* NODO_NOMBRE = "Bloque 8";

const unsigned long INTERVALO_MS = 10000;  // envio de "actual"
const int HISTORIAL_CADA = 6;              // guarda en historial cada 60 s

// Calibracion lineal (Microfono Estano: y = DB_SLOPE * dBA + DB_OFFSET)
const float DB_SLOPE  = 0.965f;
const float DB_OFFSET = 17.4f;

// ---------- CALIBRACION OTROS SENSORES ----------
const bool  DEBUG_SONIDO = true;
const float TEMP_OFFSET  = 0.0f;
const float HUM_OFFSET   = 0.0f;
const float LUZ_FACTOR   = 1.0f;
// ------------------------------------------------

// ---------- PINES ----------
#define SDA_PIN 4
#define SCL_PIN 5
#define I2S_SCK 9
#define I2S_WS  10
#define I2S_SD  11
#define DHT_PIN 7
#define DHT_TYPE DHT22

Adafruit_VEML7700 veml;
DHT dht(DHT_PIN, DHT_TYPE);
bool vemlOk = false;

// Clientes TLS separados: uno validado para la BD y otro dedicado para Auth
WiFiClientSecure ssl_client;
WiFiClientSecure auth_ssl_client;
AsyncClientClass aClient(ssl_client);
AsyncClientClass authClient(auth_ssl_client);

UserAuth user_auth(API_KEY, USER_EMAIL, USER_PASSWORD);
FirebaseApp app;
RealtimeDatabase Database;

unsigned long ultimoEnvio = 0;
int contador = 0;
float ultimaTemp = NAN, ultimaHum = NAN;

// ---------- Filtro Ponderacion A (IEC 61672 @ 48 kHz) ----------
struct Biquad {
  float b1, b2, neg_a1, neg_a2;
  float w1 = 0.0f, w2 = 0.0f;
};

const float A_WEIGHT_GAIN = 0.169994948147430f;
Biquad filtroA[3] = {
  {-2.00026996133106f, +1.00027056142719f, -1.060868438509278f, -0.163987445885926f},
  {+4.35912384203144f, +3.09120265783884f, +1.208419926363593f, -0.273166998428332f},
  {-0.70930303489759f, -0.29071868393580f, +1.982242159753048f, -0.982298594928989f}
};
float dc_x1 = 0.0f, dc_y1 = 0.0f;

inline float procesarPonderacionA(float x) {
  for (int s = 0; s < 3; s++) {
    float y = x + filtroA[s].w1;
    filtroA[s].w1 = filtroA[s].b1 * x + filtroA[s].neg_a1 * y + filtroA[s].w2;
    filtroA[s].w2 = filtroA[s].b2 * x + filtroA[s].neg_a2 * y;
    x = y;
  }
  return x * A_WEIGHT_GAIN;
}

void iniciarI2S() {
  i2s_config_t cfg = {};
  cfg.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX);
  cfg.sample_rate = 48000;
  cfg.bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT;
  cfg.channel_format = I2S_CHANNEL_FMT_ONLY_LEFT;
  cfg.communication_format = I2S_COMM_FORMAT_STAND_I2S;
  cfg.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;
  cfg.dma_buf_count = 8;
  cfg.dma_buf_len = 512;

  i2s_pin_config_t pins = {};
  pins.mck_io_num = I2S_PIN_NO_CHANGE;
  pins.bck_io_num = I2S_SCK;
  pins.ws_io_num = I2S_WS;
  pins.data_out_num = I2S_PIN_NO_CHANGE;
  pins.data_in_num = I2S_SD;

  i2s_driver_install(I2S_NUM_0, &cfg, 0, NULL);
  i2s_set_pin(I2S_NUM_0, &pins);
  i2s_zero_dma_buffer(I2S_NUM_0);
}

float leerSonido() {
  static int32_t buf[1000];
  size_t bytes = 0;
  const int MUESTRAS_FAST = 6000;
  const int VENTANAS = 8;
  const float FULL_SCALE = 8388608.0f;

  i2s_zero_dma_buffer(I2S_NUM_0);
  for (int d = 0; d < 12; d++) {
    i2s_read(I2S_NUM_0, buf, 512 * sizeof(int32_t), &bytes, 100);
  }

  double energiaTotalA = 0.0;
  for (int w = 0; w < VENTANAS; w++) {
    double sumaSqA = 0.0;
    int leidas = 0;
    while (leidas < MUESTRAS_FAST) {
      int porLeer = min(1000, MUESTRAS_FAST - leidas);
      i2s_read(I2S_NUM_0, buf, porLeer * sizeof(int32_t), &bytes, 100);
      int n = bytes / sizeof(int32_t);
      if (n <= 0) break;

      for (int i = 0; i < n; i++) {
        int32_t raw = buf[i] >> 8;
        float x = (float)raw / FULL_SCALE;
        float x_hp = x - dc_x1 + 0.9974f * dc_y1;
        dc_x1 = x;
        dc_y1 = x_hp;
        float x_a = procesarPonderacionA(x_hp);
        sumaSqA += (double)x_a * x_a;
        leidas++;
      }
    }
    if (leidas == 0) return NAN;
    double meanSqA = sumaSqA / leidas;
    if (meanSqA < 1e-12) meanSqA = 1e-12;
    energiaTotalA += meanSqA;
  }

  float dbaCrudo = 10.0f * log10f((float)(energiaTotalA / VENTANAS)) + 120.0f;
  float dbaCalibrado = DB_SLOPE * dbaCrudo + DB_OFFSET;

  if (DEBUG_SONIDO) {
    Serial.printf("  [mic] dBA_crudo=%.1f -> dBA_calibrado=%.1f\n", dbaCrudo, dbaCalibrado);
  }
  return dbaCalibrado;
}

// ---------- WiFi, Hora (NTP + Respaldo HTTPS) y Verificacion TLS ----------
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

bool sincronizarHoraHTTPS() {
  WiFiClientSecure client;
  client.setInsecure();
  if (!client.connect("www.google.com", 443)) return false;

  client.println("HEAD / HTTP/1.1");
  client.println("Host: www.google.com");
  client.println("Connection: close");
  client.println();

  unsigned long t0 = millis();
  while (client.connected() && millis() - t0 < 5000) {
    String line = client.readStringUntil('\n');
    if (line.startsWith("Date: ")) {
      String dateStr = line.substring(6);
      dateStr.trim();
      struct tm tm = {};
      if (strptime(dateStr.c_str(), "%a, %d %b %Y %H:%M:%S GMT", &tm) != NULL) {
        time_t epoch = mktime(&tm) - _timezone;
        if (epoch >= 1700000000) {
          struct timeval tv = { .tv_sec = epoch, .tv_usec = 0 };
          settimeofday(&tv, NULL);
          client.stop();
          return true;
        }
      }
    }
    if (line == "\r") break;
  }
  client.stop();
  return false;
}

bool sincronizarHora() {
  configTime(0, 0, "pool.ntp.org", "time.google.com");
  Serial.print("Sincronizando hora NTP");
  time_t now = time(nullptr);
  int intentos = 0;
  while (now < 1700000000 && intentos < 12) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
    intentos++;
  }
  if (now >= 1700000000) {
    Serial.println(" OK (NTP)");
    return true;
  }

  Serial.print(" bloqueado, probando HTTPS... ");
  if (sincronizarHoraHTTPS()) {
    Serial.println("OK (HTTPS)");
    return true;
  }

  Serial.println("fallo");
  return false;
}

void verificarEnlaceFirebase() {
  WiFiClientSecure testClient;
  testClient.setCACert(GTS_ROOT_R1);
  String host = String(DATABASE_URL);
  host.replace("https://", "");
  int slash = host.indexOf('/');
  if (slash > 0) host = host.substring(0, slash);

  Serial.printf("Verificando certificado TLS contra %s ... ", host.c_str());
  if (testClient.connect(host.c_str(), 443)) {
    Serial.println("TLS VERIFICADO (Certificado autentico)");
    testClient.stop();
  } else {
    char errBuf[128];
    testClient.lastError(errBuf, sizeof(errBuf));
    Serial.printf("FALLO TLS: %s\n", errBuf);
  }
}

// ---------- Envio a Firebase ----------
void enviar() {
  float luz = vemlOk ? veml.readLux(VEML_LUX_AUTO) * LUZ_FACTOR : NAN;
  float sonido = leerSonido();
  float t = dht.readTemperature();
  float h = dht.readHumidity();

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

  Serial.printf("Luz: %.1f lx | Sonido: %.1f dBA | Temp: %.1f C | Hum: %.1f %% | bloque8\n",
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

void authHandler(AsyncResult &aResult) {
  if (aResult.isEvent()) {
    Serial.printf("[Firebase Auth] Evento: %s (%d)\n", aResult.eventLog().message().c_str(), aResult.eventLog().code());
  }
  if (aResult.isError()) {
    Serial.printf("[Firebase Auth] ERROR: %s (%d)\n", aResult.error().message().c_str(), aResult.error().code());
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
  bool horaOk = sincronizarHora();

  if (horaOk) {
    ssl_client.setCACert(GTS_ROOT_R1);
    verificarEnlaceFirebase();
  } else {
    Serial.println("Advertencia: Sin hora valida, usando modo TLS sin validacion de fecha.");
    ssl_client.setInsecure();
  }
  auth_ssl_client.setInsecure();

  initializeApp(authClient, app, getAuth(user_auth), authHandler, "authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);
}

void loop() {
  app.loop();
  conectarWiFi();

  if (app.ready() && (ultimoEnvio == 0 || millis() - ultimoEnvio >= INTERVALO_MS)) {
    ultimoEnvio = millis();
    enviar();
  } else if (!app.ready() && millis() - ultimoEnvio >= 15000) {
    ultimoEnvio = millis();
    Serial.println("Esperando autenticacion en Firebase (app.ready() == false)...");
  }
}