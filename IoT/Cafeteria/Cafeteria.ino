/*
  Medio Ambiente - ESP32 (DevKit 38 pines) + DHT11 -> Firebase Realtime Database
  DHT11 en GPIO 4
  Placa: ESP32 Dev Module
  Librerias: FirebaseClient (Mobizt), DHT sensor library (Adafruit) + Adafruit Unified Sensor
*/

#include "secrets.h"  // crea este archivo a partir de secrets.example.h; no se sube a GitHub
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include <DHT.h>
#define ENABLE_DATABASE
#include <FirebaseClient.h>

// ---------- CONFIGURA ESTO ----------
const char* NODO_ID     = "cafeteria";
const char* NODO_NOMBRE = "Cafeteria";

const unsigned long INTERVALO_MS = 10000;
const int HISTORIAL_CADA = 3;
// ------------------------------------

#define DHT_PIN 4
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

WiFiClientSecure ssl_client;
AsyncClientClass aClient(ssl_client);
NoAuth noAuth;
FirebaseApp app;
RealtimeDatabase Database;

unsigned long ultimoEnvio = 0;
int contador = 0;
float ultimaTemp = NAN, ultimaHum = NAN;

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

void enviar() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (!isnan(t)) ultimaTemp = t;
  if (!isnan(h)) ultimaHum = h;

  time_t ts = time(nullptr);

  char json[200];
  snprintf(json, sizeof(json),
           "{\"nombre\":\"%s\",\"temperatura\":%.1f,\"humedad\":%.1f,\"ts\":%lu}",
           NODO_NOMBRE,
           isnan(ultimaTemp) ? 0.0 : ultimaTemp,
           isnan(ultimaHum) ? 0.0 : ultimaHum,
           (unsigned long)ts);

  Serial.printf("Temp: %.1f C | Hum: %.1f %%\n", ultimaTemp, ultimaHum);

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

  dht.begin();
  conectarWiFi();
  sincronizarHora();

  ssl_client.setInsecure();
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
