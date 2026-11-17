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
    unit: "dBA", color: "#007A85", dec: 1, computed: false,
    icon: `<path d="M4 10v4"/><path d="M8 7v10"/><path d="M12 4v16"/><path d="M16 8v8"/><path d="M20 11v2"/>`,
    levels: [
      [50, "Silencioso", "ok", "Ambiente muy silencioso"],
      [70, "Normal", "ok", "Nivel de sonido habitual"],
      [75, "Movido", "warn", "Ambiente con ruido elevado"],
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


export const TONE_ICONS = {
  ok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
};

export const VIZ_ICONS = {
  noise: `<div class="eq"><span></span><span></span><span></span><span></span><span></span></div>`,
  heat: `<svg class="viz-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  cold: `<svg class="viz-svg" viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  offline: `<svg class="viz-svg" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  ok: `<svg class="viz-svg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
};

