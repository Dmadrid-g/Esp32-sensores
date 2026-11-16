// Catálogo de mediciones, etiquetas y recursos visuales.
export const METRICS = [
  {
    key: "temperatura", label: "Temperatura", tab: "Temperatura", articleName: "una temperatura",
    unit: "°C", color: "#E85D3F", dec: 1, computed: false,
    icon: `<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z"/><circle cx="11.5" cy="17.5" r="1.5" fill="currentColor"/>`,
    levels: [
      [20.0, "Frío", "info", "Temperatura fresca (frío)"],
      [25.5, "Cómodo", "ok", "Temperatura cómoda"],
      [28.5, "Caluroso", "warn", "Temperatura elevada (caluroso)"],
      [Infinity, "Muy caluroso", "bad", "Temperatura excesiva (muy caluroso)"]
    ]
  },
  {
    key: "sensacion", label: "Sensación térmica", tab: "Sensación", articleName: "una sensación térmica",
    unit: "°C", color: "#D97706", dec: 1, computed: true,
    icon: `<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/><circle cx="12" cy="12" r="4"/>`,
    levels: [
      [19.5, "Se siente frío", "info", "Sensación térmica fría"],
      [26.5, "Se siente bien", "ok", "Sensación térmica cómoda"],
      [29.5, "Se siente cálido", "warn", "Sensación térmica cálida"],
      [Infinity, "Bochorno", "bad", "Sensación térmica de bochorno"]
    ]
  },
  {
    key: "humedad", label: "Humedad", tab: "Humedad", articleName: "una humedad",
    unit: "%", color: "#00B2C1", dec: 0, computed: false,
    icon: `<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M9.5 14.5a3.5 3.5 0 0 0 4.5 1.5" opacity=".7"/>`,
    levels: [
      [45, "Seco", "info", "Ambiente seco"],
      [70, "Confortable", "ok", "Humedad confortable"],
      [82, "Húmedo", "warn", "Humedad elevada"],
      [Infinity, "Muy húmedo", "bad", "Humedad muy alta"]
    ]
  },
  {
    key: "luz", label: "Iluminación", tab: "Iluminación", articleName: "una iluminación",
    unit: "lux", color: "#C68A00", dec: 0, computed: false,
    icon: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>`,
    levels: [
      [120, "Tenue / Nublado", "info", "Iluminación tenue o tarde nublada"],
      [550, "Agradable", "ok", "Iluminación agradable para estudiar"],
      [1200, "Muy luminoso", "warn", "Espacio muy luminoso"],
      [Infinity, "Deslumbrante", "warn", "Luz solar intensa / deslumbrante"]
    ]
  },
  {
    key: "sonido", label: "Ruido", tab: "Ruido", articleName: "un ruido",
    unit: "dB", color: "#007A85", dec: 1, computed: false,
    icon: `<path d="M4 10v4"/><path d="M8 7v10"/><path d="M12 4v16"/><path d="M16 8v8"/><path d="M20 11v2"/>`,
    levels: [
      [48, "Silencioso", "ok", "Ambiente muy silencioso"],
      [60, "Normal", "ok", "Nivel de sonido normal"],
      [72, "Movido", "warn", "Ambiente movido / charla activa"],
      [Infinity, "Ruidoso", "bad", "Nivel de ruido alto"]
    ]
  }
];

export const MENSAJES_OPTIMOS_ESTUDIO = [
  {
    titulo: "Ideal para estudiar · Tranquilo y cómodo",
    subtitulo: "Temperatura agradable, luz equilibrada y bajo nivel de ruido en este espacio."
  },
  {
    titulo: "Condiciones óptimas de confort en el campus",
    subtitulo: "Todos los sensores reportan parámetros ideales para concentrarse o trabajar."
  }
];

export const MENSAJES_OPTIMOS_CAFETERIA = [
  {
    titulo: "Ambiente agradable para estudiar o descansar",
    subtitulo: "Clima fresco, buena luz y sonido moderado en la cafetería en este momento."
  },
  {
    titulo: "Condiciones óptimas en la zona social",
    subtitulo: "Temperatura, humedad y acústica en equilibrio para permanecer cómodo."
  }
];

export const MBY = Object.fromEntries(METRICS.map(m => [m.key, m]));
export const BENTO_KEYS = ["temperatura", "sensacion", "humedad", "luz", "sonido"];
export const HISTORY_ORDER = ["temperatura", "sensacion", "humedad", "luz", "sonido"];
export const SEVERITY_RANK = { bad: 3, warn: 2, info: 1, ok: 0 };

