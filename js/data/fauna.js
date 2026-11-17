// Ilustraciones SVG y contenido de las escenas de fauna.
export const SCENE_META = {
  ok:      { caption: "Iguana verde · Todo en rango", badge: "Ambiente equilibrado" },
  noise:   { caption: "Canario costeño y periquito barbinaranja · Mucho ruido", badge: "Mejor usar audífonos" },
  heat:    { caption: "Guacamaya roja · Se siente calor", badge: "Se siente cálido" },
  cold:    { caption: "Zarigüeya común · Se siente frío", badge: "Se siente frío" },
  bright:  { caption: "Gecko de garganta blanca · Mucha luz", badge: "Mucha luz" },
  dim:     { caption: "Mariposa búho · Poca luz", badge: "Poca luz" },
  offline: { caption: "Currucutú · Sin señal del nodo", badge: "Sin señal" }
};

export const FOOT_SCENES = [
  {
    key: "offline",
    name: "Currucutú",
    rule: "1. Sin lectura hace más de 150 s",
    sci: "Megascops choliba",
    family: "Ave nocturna · Strigidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Desde Costa Rica hasta el norte de Argentina y Uruguay.",
    desc: "Pequeña lechuza de plumaje pardo y gris que se camufla entre los árboles durante el día y canta de noche. Controla insectos y pequeños vertebrados; ha sido reincorporada en el campus tras procesos de recuperación con el AMVA."
  },
  {
    key: "noise",
    name: "Canario costeño y periquito barbinaranja",
    rule: "2. Ruido sobre 70 dBA",
    sci: "Sicalis flaveola y Brotogeris jugularis",
    family: "Aves diurnas · Thraupidae y Psittacidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Neotrópico y norte de Suramérica (dos de las aves más abundantes del campus).",
    desc: "El canario costeño destaca por su plumaje amarillo brillante y canto melodioso. El periquito barbinaranja es un loro verde pequeño que forma bandadas ruidosas y es una de las aves más abundantes del campus. Ambas especies dispersan semillas."
  },
  {
    key: "heat",
    name: "Guacamaya roja",
    rule: "3. Sensación térmica sobre 26.5 °C",
    sci: "Ara macao",
    family: "Ave · Psittacidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Bosques húmedos tropicales desde México hasta Bolivia y la Amazonía.",
    desc: "Ave de gran tamaño con plumaje rojo intenso y tonos amarillos y azules. Dispersa semillas de árboles, favorece la regeneración natural y su presencia refleja zonas verdes conservadas con buena cobertura arbórea."
  },
  {
    key: "cold",
    name: "Zarigüeya común",
    rule: "4. Sensación térmica bajo 19.5 °C",
    sci: "Didelphis marsupialis",
    family: "Mamífero marsupial · Didelphidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Desde México hasta el norte de Argentina.",
    desc: "Marsupial nocturno y omnívoro (no es un roedor) que se alimenta de frutos, insectos y pequeños vertebrados. Dispersa semillas y conecta las zonas verdes del campus con el Cerro El Volador."
  },
  {
    key: "bright",
    name: "Gecko de garganta blanca",
    rule: "5. Más de 550 lx",
    sci: "Gonatodes albogularis",
    family: "Reptil diurno · Sphaerodactylidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Desde el sur de México hasta el norte de Brasil y las Antillas.",
    desc: "Pequeño lagarto diurno frecuente en troncos, muros y rocas soleadas del campus. Los machos tienen cabeza amarilla y garganta blanca; controla poblaciones de insectos y arácnidos."
  },
  {
    key: "dim",
    name: "Mariposa búho",
    rule: "6. Menos de 120 lx",
    sci: "Caligo atreus",
    family: "Mariposa · Nymphalidae",
    iucn: "IUCN: No evaluado",
    dist: "Regiones húmedas del Neotrópico, desde México hasta Suramérica.",
    desc: "Sus alas tienen grandes ocelos que parecen ojos de búho y pueden confundir a sus depredadores. Sus larvas se alimentan de heliconias y musáceas; los adultos consumen frutos en descomposición y aportan al ciclo de nutrientes del sotobosque."
  },
  {
    key: "ok",
    name: "Iguana verde",
    rule: "7. Ninguna de las anteriores (todo en rango)",
    sci: "Iguana iguana",
    family: "Reptil arborícola · Iguanidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Desde México hasta el sur de Brasil y Paraguay.",
    desc: "Gran reptil arborícola y diurno, principalmente herbívoro, que habita en zonas con buena cobertura arbórea y cercanía al agua. Ayuda a dispersar semillas y a regular la vegetación del campus."
  }
];

