// Configuración de Firebase y límites de lectura.
export const DATABASE_URL = "https://monitor-ambiental-pascual6429-default-rtdb.firebaseio.com/";
export const REST = DATABASE_URL.replace(/\/$/, "");
export const OFFLINE_AFTER_S = 150;
export const REFRESCAR_NODOS_MS = 30000;
export const HISTORIAL_FETCH_LIMIT = 3000;

export const TEMP_SCALE = {
  minDisplay: 10,
  coldMax: 19.5,
  okMax: 26.5,
  warnMax: 29.5,
  maxDisplay: 45
};

