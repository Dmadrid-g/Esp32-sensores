# ESP32 con sensores ambientales
![Montaje del proyecto](montaje.jpg)
Estación de monitoreo con ESP32-S3 en Arduino IDE. Mide luz, sonido, temperatura y humedad, y envía los datos a ThingSpeak y a Firebase Realtime Database.

## Qué mide
| Variable | Sensor | Comunicación |
|---|---|---|
| Luz (lux) | VEML7700 | I2C |
| Sonido (dB aprox.) | INMP441 | I2S |
| Temperatura y humedad | DHT22 | Digital |

El programa también clasifica lo medido: el ruido como *tranquilo*, *normal* o *RUIDOSO*, y la luz como *poca*, *buena* o *mucha*.

## Hardware
- Placa ESP32-S3 (ESP32S3 Dev Module)
- Micrófono INMP441
- Sensor DHT22
- Sensor de luz VEML7700

## Conexiones
| Componente | Pin del ESP32 |
|---|---|
| VEML7700 (SDA / SCL) | GPIO 4 / GPIO 5 |
| INMP441 (SCK / WS / SD) | GPIO 9 / GPIO 10 / GPIO 11 |
| DHT22 (DATA) | GPIO 7 |

## Librerías necesarias
- Adafruit VEML7700
- DHT sensor library y Adafruit Unified Sensor
- ThingSpeak (MathWorks)
- FirebaseClient (Mobizt)

## Cómo usarlo
1. Abre el `.ino` en Arduino IDE e instala las librerías.
2. Selecciona la placa **ESP32S3 Dev Module** y activa **Tools > USB CDC On Boot > Enabled**.
3. Completa los datos en la sección de configuración del código: red WiFi, Channel ID y API key de ThingSpeak, y URL de Firebase.
4. Sube el código y abre el monitor serial a **115200**.

## Qué hace con los datos
- Envía una medición cada 20 segundos.
- **ThingSpeak:** campo 1 luz, campo 2 sonido, campo 3 temperatura, campo 4 humedad.
- **Firebase:** guarda el último valor de cada variable y un historial con hora del servidor.

## Notas
- Los dB son aproximados: se ajustan con un valor de calibración (`DB_OFFSET`).
- Las credenciales del código están vacías a propósito. No subas las tuyas.

## En desarrollo
- Dashboard para visualizar los datos
