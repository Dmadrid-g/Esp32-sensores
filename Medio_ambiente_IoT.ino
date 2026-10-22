
// ESP32-S3 + INMP441 (I2S) + DHT22 + VEML7700 (I2C) -> ThingSpeak + Firebase
// Placa: ESP32S3 Dev Module
// USB nativo: Tools > USB CDC On Boot > Enabled
// Librerias: Adafruit VEML7700, DHT sensor library, Adafruit Unified Sensor,
//            ThingSpeak (MathWorks), FirebaseClient (Mobizt)
//
// ThingSpeak:
//   Field 1 = luz (lux) | Field 2 = sonido (dB aprox.) | Field 3 = temperatura (C) | Field 4 = humedad (%)
// Firebase (Realtime Database):
//   /luz/actual          = ultimo valor de luz
//   /sonido/actual       = ultimo valor de sonido
//   /temperatura/actual  = ultimo valor de temperatura
//   /humedad/actual      = ultimo valor de humedad
//   /luz/historial       = una entrada por envio: { lux, db, temp, hum, t (hora del servidor, ms) }

#define ENABLE_DATABASE   // debe ir ANTES de incluir FirebaseClient.h

#include <Wire.h>
#include <WiFi.h>d
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>
#include <ThingSpeak.h>
#include <Adafruit_VEML7700.h>
#include <DHT.h>
#include "driver/i2s.h"
#include <math.h>
#include <string.h>

// ---------- CONFIGURA ESTO (no compartas estos datos) ----------
const char* WIFI_SSID = "Mi red wifi";                 // 2.4 GHz (o hotspot con Maximizar compatibilidad)
const char* WIFI_PASS = "Contraseña";
const unsigned long CHANNEL_ID = 0;                // Channel ID de ThingSpeak
const char* WRITE_API_KEY = "";
#define DATABASE_URL ""
const unsigned long INTERVALO_ENVIO = 20000;       // ThingSpeak gratuito: minimo 15000 ms
// ---------------------------------------------------------------

// Pines
#define I2C_SDA 4
#define I2C_SCL 5
#define I2S_SCK 9
#define I2S_WS  10
#define I2S_SD  11
#define DHT_PIN 7
#define DHT_TYPE DHT22

// Umbrales de clasificacion (ajustables)
const float RUIDO_BAJO = 45.0;
const float RUIDO_ALTO = 65.0;
const float LUZ_POCA   = 100.0;
const float LUZ_MUCHA  = 1000.0;

// Calibracion del microfono (primera calibracion: +21 sobre el valor base 120)
float DB_OFFSET = 141.0;

// Audio I2S: se leen ambos canales porque el pin L/R del INMP441 selecciona uno.
#define I2S_PORT I2S_NUM_0
#define SAMPLE_RATE 16000
#define FRAMES 256
int32_t audioBuffer[FRAMES * 2];   // intercalado: izq, der, izq, der...
double accVarLeft = 0.0;
double accVarRight = 0.0;
unsigned int accBlocks = 0;
bool micOk = false;

// Clientes
WiFiClient client;                 // ThingSpeak
WiFiClientSecure ssl_client;       // Firebase (https)
using AsyncClient = AsyncClientClass;
AsyncClient aClient(ssl_client);
NoAuth no_auth;                    // sin autenticacion (base en modo de prueba)
FirebaseApp app;
RealtimeDatabase Database;

Adafruit_VEML7700 veml;
DHT dht(DHT_PIN, DHT_TYPE);
bool vemlOk = false;

float temp = NAN;
float hum = NAN;
float lastLux = NAN;
double dbSum = 0.0;
unsigned int dbCount = 0;

unsigned long tAudio = 0;
unsigned long tDht = 0;
unsigned long tSend = 0;
unsigned long tWifi = 0;

bool i2sInit() {
  i2s_config_t cfg = {};
  cfg.mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX);
  cfg.sample_rate = SAMPLE_RATE;
  cfg.bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT;
  cfg.channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT;
  cfg.communication_format = I2S_COMM_FORMAT_STAND_I2S;
  cfg.intr_alloc_flags = ESP_INTR_FLAG_LEVEL1;
  cfg.dma_buf_count = 8;
  cfg.dma_buf_len = FRAMES;
  cfg.use_apll = false;

  i2s_pin_config_t pins = {};
  pins.mck_io_num = I2S_PIN_NO_CHANGE;
  pins.bck_io_num = I2S_SCK;
  pins.ws_io_num = I2S_WS;
  pins.data_out_num = I2S_PIN_NO_CHANGE;
  pins.data_in_num = I2S_SD;

  esp_err_t err = i2s_driver_install(I2S_PORT, &cfg, 0, NULL);
  if (err != ESP_OK) {
    Serial.printf("[MIC] Error instalando I2S: %d\n", (int)err);
    return false;
  }

  err = i2s_set_pin(I2S_PORT, &pins);
  if (err != ESP_OK) {
    Serial.printf("[MIC] Error configurando pines I2S: %d\n", (int)err);
    i2s_driver_uninstall(I2S_PORT);
    return false;
  }

  i2s_zero_dma_buffer(I2S_PORT);
  Serial.println("[MIC] I2S listo; lectura de canales izquierdo y derecho");
  return true;
}

// Lee un bloque estereo y acumula la varianza de cada canal (quita offset DC).
void leerBloqueAudio() {
  if (!micOk) return;

  size_t bytesRead = 0;
  esp_err_t err = i2s_read(I2S_PORT, audioBuffer, sizeof(audioBuffer), &bytesRead, pdMS_TO_TICKS(1000));
  if (err != ESP_OK) return;

  const int framesRead = bytesRead / (2 * sizeof(int32_t));
  if (framesRead <= 0) return;

  double sumLeft = 0.0, sumSqLeft = 0.0;
  double sumRight = 0.0, sumSqRight = 0.0;

  for (int i = 0; i < framesRead; i++) {
    const double left = (double)(audioBuffer[2 * i] >> 8);
    const double right = (double)(audioBuffer[2 * i + 1] >> 8);
    sumLeft += left;
    sumSqLeft += left * left;
    sumRight += right;
    sumSqRight += right * right;
  }

  const double meanLeft = sumLeft / framesRead;
  const double meanRight = sumRight / framesRead;
  const double varLeft = (sumSqLeft / framesRead) - (meanLeft * meanLeft);
  const double varRight = (sumSqRight / framesRead) - (meanRight * meanRight);

  accVarLeft += (varLeft > 0.0) ? varLeft : 0.0;
  accVarRight += (varRight > 0.0) ? varRight : 0.0;
  accBlocks++;
}

float calcularDB() {
  if (accBlocks == 0) return NAN;

  const double rmsLeft = sqrt(accVarLeft / accBlocks);
  const double rmsRight = sqrt(accVarRight / accBlocks);
  const double rms = fmax(rmsLeft, rmsRight);

  accVarLeft = 0.0;
  accVarRight = 0.0;
  accBlocks = 0;

  if (rms < 5.0) return NAN;   // sin senal util o lectura invalida

  const float dbfs = 20.0f * log10((float)(rms / 8388608.0));
  return dbfs + DB_OFFSET;
}

const char* nivelRuido(float db) {
  if (isnan(db)) return "sin datos";
  if (db < RUIDO_BAJO) return "tranquilo";
  if (db < RUIDO_ALTO) return "normal";
  return "RUIDOSO";
}

const char* nivelLuz(float lux) {
  if (lux < LUZ_POCA) return "poca luz";
  if (lux < LUZ_MUCHA) return "buena luz";
  return "mucha luz";
}

void conectarWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Conectando a WiFi");
  const unsigned long start = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) Serial.println("\nWiFi conectado");
  else Serial.println("\nNo conecto; seguire midiendo y reintentare");
}

void enviarThingSpeak(float lux, float db, float t, float h) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[ThingSpeak] Sin WiFi; no se envio");
    return;
  }

  if (!isnan(lux)) ThingSpeak.setField(1, lux);
  if (!isnan(db))  ThingSpeak.setField(2, db);
  if (!isnan(t))   ThingSpeak.setField(3, t);
  if (!isnan(h))   ThingSpeak.setField(4, h);

  const int code = ThingSpeak.writeFields(CHANNEL_ID, WRITE_API_KEY);
  if (code == 200) Serial.println("[ThingSpeak] Envio correcto");
  else Serial.printf("[ThingSpeak] Error HTTP: %d\n", code);
}

// Guarda el ultimo valor de una variable en su ruta (sobreescribe el anterior).
// Si el valor es invalido (NaN) no hace nada. Un fallo aqui no detiene el resto.
void guardarActual(const char* ruta, float valor, int decimales) {
  if (isnan(valor)) return;

  bool ok = Database.set<number_t>(aClient, ruta, number_t(valor, decimales));
  if (!ok) {
    Serial.printf("[Firebase] Error (%s): %s, codigo %d\n", ruta,
                  aClient.lastError().message().c_str(), aClient.lastError().code());
  }
}

void enviarFirebase(float lux, float db, float t, float h) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Firebase] Sin WiFi; no se envio");
    return;
  }
  if (!app.ready()) {
    Serial.println("[Firebase] Todavia no esta listo");
    return;
  }
  if (isnan(lux) && isnan(db) && isnan(t) && isnan(h)) return;

  // 1) Ultimos valores de cada variable
  guardarActual("/luz/actual",         lux, 2);
  guardarActual("/sonido/actual",      db,  1);
  guardarActual("/temperatura/actual", t,   1);
  guardarActual("/humedad/actual",     h,   1);

  // 2) Historial: { "lux":.., "db":.., "temp":.., "hum":.., "t":{".sv":"timestamp"} }
  //    Solo se incluyen los campos que tienen lectura valida.
  JsonWriter writer;
  object_t json, tsJson;
  writer.create(tsJson, ".sv", "timestamp");   // el servidor de Firebase pone la hora
  writer.create(json, "t", tsJson);

  auto agregar = [&](const char* clave, float valor, int decimales) {
    object_t campo;
    object_t previo = json;
    writer.create(campo, clave, number_t(valor, decimales));
    writer.join(json, 2, previo, campo);
  };

  if (!isnan(lux)) agregar("lux", lux, 2);
  if (!isnan(db))  agregar("db", db, 1);
  if (!isnan(t))   agregar("temp", t, 1);
  if (!isnan(h))   agregar("hum", h, 1);

  String nombre = Database.push<object_t>(aClient, "/luz/historial", json);
  if (aClient.lastError().code() == 0) {
    Serial.println("[Firebase] Envio correcto");
  } else {
    Serial.printf("[Firebase] Error (historial): %s, codigo %d\n",
                  aClient.lastError().message().c_str(), aClient.lastError().code());
  }
}

void enviarDatos() {
  const float dbProm = (dbCount > 0) ? (float)(dbSum / dbCount) : NAN;

  enviarThingSpeak(lastLux, dbProm, temp, hum);
  enviarFirebase(lastLux, dbProm, temp, hum);

  dbSum = 0.0;
  dbCount = 0;
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  Wire.begin(I2C_SDA, I2C_SCL);
  vemlOk = veml.begin();
  Serial.println(vemlOk ? "[VEML7700] Detectado" : "[VEML7700] No detectado; revisa SDA/SCL");

  dht.begin();
  micOk = i2sInit();

  conectarWiFi();
  ThingSpeak.begin(client);

  Firebase.printf("FirebaseClient v%s\n", FIREBASE_CLIENT_VERSION);
  ssl_client.setInsecure();                      // no valida el certificado (suficiente para pruebas)
  initializeApp(aClient, app, getAuth(no_auth));
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);

  tSend = millis();
  Serial.println("Listo, midiendo...");
}

void loop() {
  app.loop();            // mantiene vivo el cliente de Firebase
  leerBloqueAudio();

  const unsigned long now = millis();

  if (WiFi.status() != WL_CONNECTED && now - tWifi >= 10000) {
    tWifi = now;
    Serial.println("WiFi desconectado; reconectando...");
    WiFi.reconnect();
  }

  // DHT22: no leer mas rapido que cada 2 segundos.
  if (now - tDht >= 2000) {
    tDht = now;
    const float newTemp = dht.readTemperature();
    const float newHum = dht.readHumidity();
    if (!isnan(newTemp)) temp = newTemp;
    if (!isnan(newHum)) hum = newHum;
  }

  if (now - tAudio >= 1000) {
    tAudio = now;

    const float db = calcularDB();
    const float lux = vemlOk ? veml.readLux(VEML_LUX_AUTO) : NAN;
    if (!isnan(lux)) lastLux = lux;

    if (!isnan(db)) {
      dbSum += db;
      dbCount++;
    }

    Serial.println("------------------------");
    if (isnan(db)) Serial.println("sonido: sin datos del microfono");
    else Serial.printf("sonido: %.1f dB aprox. -> %s\n", db, nivelRuido(db));

    if (!isnan(lux)) Serial.printf("luz:    %.1f lux -> %s\n", lux, nivelLuz(lux));
    else Serial.println("luz:    VEML7700 sin lectura");

    if (isnan(temp) || isnan(hum)) Serial.println("DHT22: sin lectura (revisa DATA y alimentacion)");
    else Serial.printf("temp:   %.1f C | humedad: %.1f %%\n", temp, hum);
  }

  if (now - tSend >= INTERVALO_ENVIO) {
    tSend = now;
    enviarDatos();
  }
}