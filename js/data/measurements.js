import { toNum } from "../utils.js";

export const sensacion = (t, h) => t + 0.33 * ((h / 100) * 6.105 * Math.exp(17.27 * t / (237.7 + t))) - 4.0;

export function enriquecer(d) {
  if (!d || typeof d !== "object") return {};
  const r = { ...d };

  const rawTs = toNum(r.ts);
  if (rawTs !== null) {
    r.ts = rawTs > 1e12 ? Math.floor(rawTs / 1000) : rawTs;
  }

  const t = toNum(r.temperatura);
  r.temperatura = (t !== null && t >= -10 && t <= 60) ? t : null;

  const h = toNum(r.humedad);
  r.humedad = (h !== null && h >= 0 && h <= 100) ? h : null;

  const rawLuz = toNum(r.luz !== undefined ? r.luz : r.iluminacion);
  r.luz = (rawLuz !== null && rawLuz >= 0 && rawLuz <= 200000) ? rawLuz : null;

  const rawSonido = toNum(r.sonido !== undefined ? r.sonido : r.ruido);
  r.sonido = (rawSonido !== null && rawSonido >= 0 && rawSonido <= 160) ? rawSonido : null;

  if (r.temperatura !== null && r.humedad !== null) {
    r.sensacion = Math.round(sensacion(r.temperatura, r.humedad) * 10) / 10;
  } else {
    r.sensacion = null;
  }

  return r;
}

