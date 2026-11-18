import { OFFLINE_AFTER_S, REFRESCAR_NODOS_MS, TEMP_SCALE } from "./config.js";
import { SCENE_META } from "./data/fauna.js";
import { MASCOT_ART } from "./data/mascot-art.js";
import { METRICS, MENSAJES_OPTIMOS_ESTUDIO, MENSAJES_OPTIMOS_CAFETERIA, MBY, BENTO_KEYS, HISTORY_ORDER, SEVERITY_RANK, TONE_ICONS, VIZ_ICONS } from "./data/metrics.js";
import { enriquecer } from "./data/measurements.js";
import { setFootSpotlight } from "./ui/fauna-footer.js";
import { toNum } from "./utils.js";
import { subscribeValue, readREST } from "./services/firebase.js";
window.__appOK = true;

// =========================================================================
// CONFIGURACIÓN CENTRALIZADA (Firebase + Umbrales Calibrados + Histéresis)
// =========================================================================
const $ = id => document.getElementById(id);

const num = v => toNum(v) !== null;
const fmt = (v, d) => Number(toNum(v)).toLocaleString("es-CO", { minimumFractionDigits: d, maximumFractionDigits: d });
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const nivel = (m, v) => m.levels.find(l => toNum(v) <= l[0]);
const prefersReducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollHorizontalToChild(container, child) {
  if (!container || !child) return;
  if (container.scrollWidth <= container.clientWidth) return;
  const targetLeft = child.offsetLeft - (container.clientWidth / 2) + (child.offsetWidth / 2);
  container.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}

function scrollSmoothToSection(el) {
  if (!el) return;
  const header = $("topHeader");
  const offset = (header ? header.offsetHeight : 56) + 12;
  const destY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  window.scrollTo({
    top: destY,
    behavior: prefersReducedMotion() ? "auto" : "smooth"
  });
}

// ---------- Ilustraciones isométricas de ubicaciones ----------
let _artUid = 0;
function edificio() {
  const u = ++_artUid;
  const P = (face, uu, vv) => face ? [28 + 32 * uu, 38 + 16 * uu + 46 * vv] : [60 + 32 * uu, 54 - 16 * uu + 46 * vv];
  let w = "";
  for (const face of [1, 0]) for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const u0 = 0.1 + 0.28 * c, u1 = u0 + 0.2, v0 = 0.1 + 0.22 * r, v1 = v0 + 0.14;
    const pts = [P(face, u0, v0), P(face, u1, v0), P(face, u1, v1), P(face, u0, v1)].map(p => p.join(",")).join(" ");
    w += `<polygon points="${pts}" fill="#fff" opacity="${(r + c + face) % 3 ? 0.6 : 0.92}"/>`;
  }
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><defs>
    <linearGradient id="bL-${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00B2C1"/><stop offset="1" stop-color="#002A3F"/></linearGradient>
    <linearGradient id="bR-${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C0CD29"/><stop offset="1" stop-color="#00B2C1"/></linearGradient>
    <linearGradient id="bT-${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E0F7FA"/></linearGradient>
    <filter id="bB-${u}"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <ellipse cx="60" cy="104" rx="42" ry="9" fill="rgba(0,42,63,.18)" filter="url(#bB-${u})"/>
    <polygon points="28,38 60,54 60,100 28,84" fill="url(#bL-${u})"/><polygon points="60,54 92,38 92,84 60,100" fill="url(#bR-${u})"/>
    <polygon points="60,22 92,38 60,54 28,38" fill="url(#bT-${u})"/>${w}
    <polygon points="48,26 60,32 60,42 48,36" fill="url(#bL-${u})"/><polygon points="60,32 72,26 72,36 60,42" fill="url(#bR-${u})"/><polygon points="60,20 72,26 60,32 48,26" fill="url(#bT-${u})"/>
    <polyline points="28,38 60,54 92,38" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
}

function taza() {
  const u = ++_artUid;
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><defs>
    <linearGradient id="cB-${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E2EEF4"/><stop offset=".45" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C7DCE6"/></linearGradient>
    <linearGradient id="cS-${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#B8D4E0"/></linearGradient>
    <radialGradient id="cC-${u}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#9A6A45"/><stop offset="1" stop-color="#4E3220"/></radialGradient>
    <filter id="cF-${u}"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <ellipse cx="60" cy="100" rx="42" ry="9" fill="rgba(0,42,63,.18)" filter="url(#cF-${u})"/>
    <ellipse cx="60" cy="92" rx="40" ry="12" fill="url(#cS-${u})"/><ellipse cx="60" cy="90" rx="30" ry="8" fill="#fff" opacity=".75"/>
    <path d="M82 58c14-3 14 18-2 20" fill="none" stroke="url(#cB-${u})" stroke-width="6" stroke-linecap="round"/>
    <path d="M34 52h52c0 20-8 38-26 38S34 72 34 52Z" fill="url(#cB-${u})"/>
    <ellipse cx="60" cy="52" rx="26" ry="8" fill="#fff"/><ellipse cx="60" cy="53" rx="21" ry="6" fill="url(#cC-${u})"/>
    <ellipse cx="54" cy="51" rx="9" ry="1.8" fill="#fff" opacity=".35"/><path d="M40 60c1 12 6 22 14 26" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <g fill="none" stroke="#00B2C1" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"><path class="steam" d="M50 40c-5-6 5-9 0-16"/><path class="steam" d="M60 38c-5-6 5-9 0-16"/><path class="steam" d="M70 40c-5-6 5-9 0-16"/></g></svg>`;
}

const arte = id => /cafe/i.test(id) ? taza() : edificio();
const subUbicacion = id => /cafe/i.test(id) ? "Zona social y descanso" : /bloque|block/i.test(id) ? "Aulas y estudio" : "Espacio del campus";

// ---------- Estado global ----------
let nodo = null;
let rango = 60;
let metric = "temperatura";
let cur = null;
let allFetchedRows = [];
let rows = [];
let lastTs = null;
let histError = false;
let unsubActual = null;
let unsubHist = null;
let isLoadingNodes = false;
const live = {};
const watchers = {};
const cards = {};
const lastSceneByNode = {};
let lastAppliedScene = null;
const pendingSceneByNode = {};
// El firmware guarda una muestra de historial aproximadamente cada 60 s.
const HISTORY_GAP_THRESHOLD_SECONDS = 90;

function formatChartTime(timestamp) {
  const date = new Date(Number(timestamp) * 1000);
  const time = date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    ...(rango <= 60 ? { second: "2-digit" } : {})
  });
  const newestTimestamp = allFetchedRows.at(-1)?.ts;
  if (!newestTimestamp) return time;
  const newestDate = new Date(newestTimestamp * 1000);
  if (date.toDateString() === newestDate.toDateString()) return time;
  const day = date.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit" });
  return `${day} ${time}`;
}

function getHistoryGaps(points, windowStart, windowEnd) {
  const gaps = [];
  if (!points.length) return gaps;
  if (points[0].x - windowStart > HISTORY_GAP_THRESHOLD_SECONDS) {
    gaps.push({ start: windowStart, end: points[0].x });
  }
  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];
    if (current.x - previous.x > HISTORY_GAP_THRESHOLD_SECONDS) {
      gaps.push({ start: previous.x, end: current.x });
    }
  }
  if (windowEnd - points.at(-1).x > HISTORY_GAP_THRESHOLD_SECONDS) {
    gaps.push({ start: points.at(-1).x, end: windowEnd });
  }
  return gaps;
}

// Respaldo de datos reales de Firebase mientras se usa el modo depuración
let realCur = null;
let realLastTs = null;
let realFetchedRows = [];
let activeDebugPreset = null;

(function initGaugeProportions() {
  const { minDisplay, coldMax, okMax, warnMax, maxDisplay } = TEMP_SCALE;
  const wCold = coldMax - minDisplay;
  const wOk = okMax - coldMax;
  const wWarn = warnMax - okMax;
  const wBad = maxDisplay - warnMax;
  const gs = $("gaugeSegments");
  if (gs) gs.style.gridTemplateColumns = `${wCold}fr ${wOk}fr ${wWarn}fr ${wBad}fr`;
})();

// ---------- Lógica de Decisión de Escena con Prioridad e Histéresis ----------
function resolverEscenaConHisteresis(d, isOffline, nodeId) {
  if (isOffline || !d) return "offline";
  const previous = lastSceneByNode[nodeId];
  const ruido = toNum(d.sonido);
  const luz = toNum(d.luz);
  const sens = num(d.sensacion) ? toNum(d.sensacion) : toNum(d.temperatura);
  const sobre = (v, entra, sale, estaba) => v !== null && v > (estaba ? sale : entra);
  const bajo = (v, entra, sale, estaba) => v !== null && v < (estaba ? sale : entra);

  const candidateScene = sobre(ruido, 70.0, 68.5, previous === "noise") ? "noise"
    : sobre(sens, 26.5, 26.1, previous === "heat") ? "heat"
    : bajo(sens, 19.5, 19.9, previous === "cold") ? "cold"
    : sobre(luz, 550, 510, previous === "bright") ? "bright"
    : bajo(luz, 120, 135, previous === "dim") ? "dim"
    : "ok";

  // Primera lectura y recuperación de desconexión son inmediatas; los cambios
  // entre escenas requieren tres muestras distintas durante al menos 20 s.
  if (!previous || previous === "offline") {
    delete pendingSceneByNode[nodeId];
    lastSceneByNode[nodeId] = candidateScene;
    return candidateScene;
  }
  if (candidateScene === previous) {
    delete pendingSceneByNode[nodeId];
    return previous;
  }

  const sampleTs = toNum(d.ts) ?? 0;
  let pending = pendingSceneByNode[nodeId];
  if (!pending || pending.scene !== candidateScene) {
    pending = pendingSceneByNode[nodeId] = {
      scene: candidateScene,
      startedAt: Date.now(),
      sampleTs,
      sampleCount: 1
    };
  } else if (sampleTs > pending.sampleTs) {
    pending.sampleTs = sampleTs;
    pending.sampleCount += 1;
  }

  if (pending.sampleCount >= 3 && Date.now() - pending.startedAt >= 20000) {
    lastSceneByNode[nodeId] = candidateScene;
    delete pendingSceneByNode[nodeId];
    return candidateScene;
  }
  return previous;
}
function aplicarEscena(scene) {
  const hero = $("hero");
  const panel = $("thermalPanel");
  if (hero) hero.dataset.scene = scene;
  if (panel) panel.dataset.scene = scene;
  const meta = SCENE_META[scene] || SCENE_META.ok;
  document.body.dataset.scene = scene;
  const artEl = $("mascotArt");
  if (artEl.dataset.scene !== scene) {
    artEl.innerHTML = MASCOT_ART[scene] || MASCOT_ART.ok;
    artEl.dataset.scene = scene;
    artEl.classList.remove("scene-enter");
    void artEl.offsetWidth;
    artEl.classList.add("scene-enter");
  }
  $("mascotCaption").textContent = meta.caption;
  if (scene !== lastAppliedScene) {
    lastAppliedScene = scene;
    setFootSpotlight(scene, true);
  }
}

// ---------- Inicializar Tarjetas de Mediciones ----------
const bento = $("bento");
BENTO_KEYS.forEach(key => {
  const m = MBY[key];
  const shell = document.createElement("div");
  shell.className = "tile-shell";
  shell.hidden = true;
  shell.style.setProperty("--c", m.color);
  const card = document.createElement("button");
  card.type = "button";
  card.className = "tile";
  card.id = "t-" + m.key;
  card.hidden = true;
  card.setAttribute("aria-pressed", "false");
  card.innerHTML = `
    <div class="tile-head">
      <div class="tile-top-row">
        <span class="ic"><svg viewBox="0 0 24 24">${m.icon}</svg></span>
        <div class="tile-actions">
          <span class="tile-active-dot" id="hintTxt-${m.key}">En gráfica</span>
        </div>
      </div>
      <div class="th-labels">
        <span class="th-name">${m.label}</span>
        ${m.computed ? `<span class="th-tag">Calculada</span>` : ""}
      </div>
    </div>
    <div class="tile-current">
      <div class="val" id="v-${m.key}">--<small>${m.unit}</small></div>
      <span class="badge" id="b-${m.key}"></span>
    </div>
    <div class="tile-mm" id="mm-${m.key}">
      <span id="lo-${m.key}"></span>
      <span id="hi-${m.key}"></span>
    </div>`;

  card.addEventListener("click", () => elegirMetrica(m.key, false));

  const jump = document.createElement("button");
  jump.type = "button";
  jump.className = "tile-jump-btn";
  jump.title = `Ir al historial de ${m.label}`;
  jump.setAttribute("aria-label", `Ir al historial de ${m.label}`);
  jump.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
  jump.addEventListener("click", () => elegirMetrica(m.key, true));
  shell.append(card, jump);
  bento.appendChild(shell);
});

// ---------- Inicializar Pestañas del Historial ----------
const tabs = $("tabs");
HISTORY_ORDER.map(key => MBY[key]).filter(Boolean).forEach(m => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tab";
  b.id = "tab-" + m.key;
  b.textContent = m.tab;
  b.hidden = true;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => elegirMetrica(m.key, false));
  tabs.appendChild(b);
});

// ---------- Inicializar Chart.js ----------
const getMaxXTicks = () => (window.innerWidth <= 420 ? 4 : window.innerWidth <= 840 ? 6 : 8);
let chartGapRanges = [];

const chartGapBands = {
  id: "chartGapBands",
  beforeDraw(chartInstance) {
    if (!chartGapRanges.length) return;
    const { ctx, chartArea, scales } = chartInstance;
    if (!chartArea || !scales.x) return;
    const { left, top, right, bottom } = chartArea;

    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();

    chartGapRanges.forEach(gap => {
      const x1 = scales.x.getPixelForValue(gap.start);
      const x2 = scales.x.getPixelForValue(gap.end);
      const bandLeft = Math.max(left, Math.min(x1, x2));
      const bandRight = Math.min(right, Math.max(x1, x2));
      const bandWidth = bandRight - bandLeft;
      if (bandWidth <= 0) return;

      ctx.fillStyle = "rgba(102, 117, 121, 0.13)";
      ctx.fillRect(bandLeft, top, bandWidth, bottom - top);
      ctx.strokeStyle = "rgba(82, 97, 101, 0.8)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(bandLeft, top);
      ctx.lineTo(bandLeft, bottom);
      ctx.moveTo(bandRight, top);
      ctx.lineTo(bandRight, bottom);
      ctx.stroke();

      if (bandWidth >= 150) {
        ctx.setLineDash([]);
        ctx.fillStyle = "#455255";
        ctx.font = "600 10px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Sin datos registrados", (bandLeft + bandRight) / 2, top + 8);
      }
    });

    ctx.restore();
  }
};

const chart = window.Chart ? new Chart($("chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderWidth: 2.3,
      tension: 0.28,
      pointRadius: ctx => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 5.5 : 0),
      pointBackgroundColor: ctx => (ctx.dataIndex === ctx.dataset.data.length - 1 ? "#FFFFFF" : MBY[metric].color),
      pointBorderColor: () => MBY[metric].color,
      pointBorderWidth: ctx => (ctx.dataIndex === ctx.dataset.data.length - 1 ? 2.6 : 0),
      pointHoverRadius: 6.5,
      pointHoverBorderWidth: 2.4,
      pointHoverBorderColor: "#FFFFFF",
      fill: true,
      backgroundColor: ctx => {
        const a = ctx.chart.chartArea;
        if (!a) return "transparent";
        const g = ctx.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
        g.addColorStop(0, MBY[metric].color + "45");
        g.addColorStop(1, MBY[metric].color + "00");
        return g;
      }
    }]
  },
  plugins: [chartGapBands],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 380, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 42, 63, 0.95)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        cornerRadius: 9,
        padding: 10,
        caretPadding: 8,
        displayColors: false,
        titleFont: { family: "JetBrains Mono", weight: "500", size: 11 },
        bodyFont: { family: "JetBrains Mono", weight: "700", size: 13 },
        callbacks: {
          title: items => {
            if (!items.length) return "";
            const idx = items[0].dataIndex;
            const total = items[0].dataset.data.length;
            return formatChartTime(items[0].parsed.x) + (idx === total - 1 ? " · Más reciente" : "");
          },
          label: c => {
            const m = MBY[metric];
            const [, txt] = nivel(m, c.parsed.y);
            const origen = m.computed ? " · estimada" : "";
            return `${fmt(c.parsed.y, m.dec)} ${m.unit} (${txt}${origen})`;
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        grid: { display: false },
        border: { display: false },
        ticks: {
          maxTicksLimit: getMaxXTicks(),
          maxRotation: 0,
          font: { family: "JetBrains Mono", size: 11 },
          callback: value => formatChartTime(value)
        }
      },
      y: {
        grace: "12%",
        border: { display: false },
        ticks: { maxTicksLimit: 5, font: { family: "JetBrains Mono", size: 11 } }
      }
    }
  }
}) : null;

function themeChart() {
  if (!chart) return;
  const muted = css("--muted");
  chart.options.scales.x.ticks.color = muted;
  chart.options.scales.x.ticks.maxTicksLimit = getMaxXTicks();
  chart.options.scales.y.ticks.color = muted;
  chart.options.scales.y.grid.color = css("--fill");
  chart.update("none");
}
themeChart();
window.addEventListener("resize", () => {
  if (!chart) return;
  const nextTicks = getMaxXTicks();
  if (chart.options.scales.x.ticks.maxTicksLimit !== nextTicks) {
    chart.options.scales.x.ticks.maxTicksLimit = nextTicks;
    chart.update("none");
  }
});

// ---------- Inicializar Firebase ----------
// ---------- Utilidades de tiempo ----------
const ago = s => s < 60 ? `${Math.max(0, Math.round(s))} s` : s < 3600 ? `${Math.round(s / 60)} min` : `${Math.round(s / 3600)} h`;
const formatClock = ts => new Date(ts * 1000).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
const formatShortTime = ts => new Date(ts * 1000).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

function renderStatus() {
  const pill = $("status");
  if (lastTs !== null) {
    const s = activeDebugPreset
      ? (activeDebugPreset === "offline" ? 380 : 4)
      : (Date.now() / 1000 - lastTs);
    const on = s <= OFFLINE_AFTER_S;
    pill.className = "pill " + (on ? "on" : "off");
    $("statusText").textContent = activeDebugPreset
      ? `Modo Demo · ${on ? "simulado" : "sin señal"}`
      : (on ? `En línea · hace ${ago(s)}` : `Sin señal · hace ${ago(s)}`);
    $("hero").classList.toggle("stale", !on);
    $("hTime").classList.toggle("is-offline", !on);
    $("hTimeText").textContent = on
      ? `Recibido ${formatClock(lastTs)} · hace ${ago(s)}`
      : `Último dato ${formatClock(lastTs)} · hace ${ago(s)}`;

    if (nodo && cur) {
      const scene = resolverEscenaConHisteresis(cur, !on, nodo);
      if (lastSceneByNode[nodo] !== scene) {
        renderHero();
      }
    }
  }
  Object.keys(cards).forEach(updateCard);
}
setInterval(renderStatus, 5000);
// Mantiene el extremo derecho del historial en el presente, incluso si un nodo deja de enviar.
setInterval(() => {
  if (activeDebugPreset) return;
  filtrarRowsPorTiempo();
  renderChart();
}, 30000);

// ---------- Tarjetas de ubicación ----------
function ensureCard(id) {
  if (cards[id]) return cards[id];
  const b = document.createElement("button");
  b.type = "button";
  b.className = "loc";
  b.setAttribute("aria-pressed", "false");
  b.innerHTML = `
    <div class="art">${arte(id)}</div>
    <div class="loc-body">
      <div class="loc-top">
        <strong></strong>
        <span class="active-tag">${TONE_ICONS.ok} Viendo</span>
      </div>
      <span class="ls"></span>
      <em class="live">
        <span class="status-dot"></span>
        <b></b>
      </em>
    </div>`;
  b.addEventListener("click", () => seleccionar(id, true));
  $("locs").appendChild(b);
  return (cards[id] = b);
}

function updateCard(id) {
  const b = cards[id];
  if (!b) return;
  const d = (id === nodo && activeDebugPreset && cur) ? cur : live[id];
  const hasData = Boolean(d && num(d.ts));
  const s = (id === nodo && activeDebugPreset)
    ? (activeDebugPreset === "offline" ? 380 : 4)
    : (hasData ? (Date.now() / 1000 - toNum(d.ts)) : null);
  const on = hasData && s <= OFFLINE_AFTER_S;
  const name = d?.nombre || live[id]?.nombre || id;

  b.querySelector("strong").textContent = name;
  b.querySelector(".ls").textContent = subUbicacion(id);

  const liveEl = b.querySelector(".live");
  const liveTxt = b.querySelector("b");

  if (!d) {
    liveEl.className = "live";
    liveTxt.textContent = "Conectando…";
  } else if (on) {
    const scene = resolverEscenaConHisteresis(d, false, id);
    const refTemp = num(d.sensacion) ? d.sensacion : d.temperatura;
    const tStr = num(refTemp) ? ` · ${fmt(refTemp, 1)} °C` : "";
    if (scene === "ok") {
      liveEl.className = "live on";
      liveTxt.textContent = `Óptimo${tStr}`;
    } else if (scene === "noise") {
      liveEl.className = "live warn";
      liveTxt.textContent = `Ruido elevado (${fmt(d.sonido, 0)} dBA)`;
    } else if (scene === "heat") {
      liveEl.className = "live warn";
      liveTxt.textContent = `Cálido${tStr}`;
    } else if (scene === "bright") {
      liveEl.className = "live warn";
      liveTxt.textContent = `Mucha luz (${fmt(d.luz, 0)} lx)`;
    } else if (scene === "dim") {
      liveEl.className = "live info";
      liveTxt.textContent = `Poca luz (${fmt(d.luz, 0)} lx)`;
    } else {
      liveEl.className = "live info";
      liveTxt.textContent = `Fresco${tStr}`;
    }
  } else if (hasData) {
    liveEl.className = "live off";
    liveTxt.textContent = `Sin señal · hace ${ago(s)}`;
  } else {
    liveEl.className = "live off";
    liveTxt.textContent = "Sin señal";
  }

  const isSelected = b.getAttribute("aria-pressed") === "true";
  b.setAttribute("aria-label", `${name}${isSelected ? " (ubicación seleccionada)" : ""}, ${liveTxt.textContent}`);
}

function vigilar(id) {
  ensureCard(id);
  updateCard(id);
  if (watchers[id]) return;
  watchers[id] = subscribeValue(`medio_ambiente/nodos/${id}/actual`, snap => {
    const val = snap.val();
    live[id] = val ? enriquecer(val) : null;
    updateCard(id);
    if (id === nodo) {
      $("hLoc").textContent = live[id]?.nombre || id;
    }
  });
}

// ---------- Escala Térmica Proporcional (10 °C – 45 °C) ----------
function computeTempGaugePos(t) {
  const { minDisplay, maxDisplay } = TEMP_SCALE;
  const clamped = Math.max(minDisplay, Math.min(maxDisplay, t));
  return ((clamped - minDisplay) / (maxDisplay - minDisplay)) * 100;
}

function renderTempGauge(t, gaugeMetric = MBY.sensacion) {
  const marker = $("gaugeMarker");
  const statePill = $("hTempState");
  const stateIcon = $("hTempStateIcon");
  const stateText = $("hTempStateText");

  ["seg-cold", "seg-ok", "seg-warn", "seg-bad"].forEach(id => $(id).classList.remove("is-current"));

  if (!num(t)) {
    marker.style.opacity = "0";
    statePill.dataset.tone = "info";
    stateIcon.innerHTML = TONE_ICONS.info;
    stateText.textContent = "Sin lectura";
    return;
  }

  const val = toNum(t);
  const [, badgeTxt, tone] = nivel(gaugeMetric, val);
  const pos = Math.min(97.5, Math.max(2.5, computeTempGaugePos(val)));
  marker.style.opacity = "1";
  marker.style.setProperty("--pos", pos.toFixed(2) + "%");

  const activeSegId = val < TEMP_SCALE.coldMax ? "seg-cold"
    : val <= TEMP_SCALE.okMax ? "seg-ok"
    : val <= TEMP_SCALE.warnMax ? "seg-warn"
    : "seg-bad";
  $(activeSegId).classList.add("is-current");

  statePill.dataset.tone = tone;
  stateIcon.innerHTML = TONE_ICONS[tone];
  stateText.textContent = badgeTxt;
  $("tempGauge").setAttribute("aria-label", `Indicador de ${gaugeMetric.label.toLowerCase()}: ${fmt(val, 1)} °C (${badgeTxt.toLowerCase()})`);
}

// ---------- Evaluación Ejecutiva y Chips de Variables ----------
function evaluarCondiciones(d) {
  const hallazgos = [];
  const evalKeys = ["sonido", "temperatura", "luz", "humedad", "sensacion"];
  const scenePriority = { sonido: 5, sensacion: 4, temperatura: 3, luz: 2, humedad: 1 };

  evalKeys.forEach(key => {
    if (!num(d[key])) return;
    const val = toNum(d[key]);
    const m = MBY[key];
    const [, badgeTxt, tone, fullDesc] = nivel(m, val);
    if (tone !== "ok") {
      hallazgos.push({
        key,
        label: m.label,
        badgeTxt,
        tone,
        fullDesc,
        severity: SEVERITY_RANK[tone] || 1,
        priority: scenePriority[key] || 0,
        valueStr: `${fmt(val, m.dec)} ${m.unit}`
      });
    }
  });

  hallazgos.sort((a, b) => (b.priority - a.priority) || (b.severity - a.severity));
  return hallazgos;
}

function renderHero() {
  const d = cur;
  if (!d) return;

  $("hRetry").hidden = true;
  const isOffline = activeDebugPreset === "offline"
    || (!activeDebugPreset && (lastTs === null || (Date.now() / 1000 - lastTs) > OFFLINE_AFTER_S));
  const scene = resolverEscenaConHisteresis(d, isOffline, nodo);
  lastSceneByNode[nodo] = scene;
  aplicarEscena(scene);

  const hallazgos = evaluarCondiciones(d);
  $("hSub").hidden = false;
  ["hViz", "hTitle"].forEach(id => {
    $(id).disabled = true;
    delete $(id).dataset.metric;
  });

  const toneByScene = isOffline ? "info"
    : scene === "noise" ? "warn"
    : scene === "heat" ? "warn"
    : scene === "cold" ? "info"
    : scene === "bright" ? "warn"
    : scene === "dim" ? "info"
    : "ok";

  document.body.dataset.tone = toneByScene;
  $("hViz").innerHTML = VIZ_ICONS[scene] || VIZ_ICONS[{ bright: "heat", dim: "cold" }[scene]] || VIZ_ICONS.ok;

  const genPill = $("hGeneralPill");
  genPill.dataset.level = toneByScene;
  $("hGeneralIcon").innerHTML = TONE_ICONS[toneByScene];
  $("hGeneralLabel").textContent = (SCENE_META[scene] || SCENE_META.ok).badge;

  const oorWrap = $("hOorWrap");
  const alertsList = $("hAlertsList");

  if (isOffline) {
    $("hTitle").textContent = "Nodo sin señal reciente";
    $("hSub").textContent = "Se muestran los últimos valores recibidos antes de perder conexión con el sensor.";
    oorWrap.hidden = true;
    alertsList.innerHTML = "";
  } else if (scene === "ok" && !hallazgos.length) {
    const pool = /cafe/i.test(nodo || "") ? MENSAJES_OPTIMOS_CAFETERIA : MENSAJES_OPTIMOS_ESTUDIO;
    const idx = Math.floor(Date.now() / 60000) % pool.length;
    $("hTitle").textContent = pool[idx].titulo;
    $("hSub").textContent = pool[idx].subtitulo;
    oorWrap.hidden = true;
    alertsList.innerHTML = "";
  } else {
    if (scene === "noise") {
      $("hTitle").textContent = "Ambiente movido";
      $("hSub").textContent = "El nivel de sonido está activo; si buscas silencio total para estudiar, revisa la otra ubicación.";
    } else if (scene === "heat") {
      $("hTitle").textContent = "Se siente calor";
      $("hSub").textContent = "La sensación térmica pasa de 26.5 °C; conviene ubicarse cerca de ventilación o sombra.";
    } else if (scene === "cold") {
      $("hTitle").textContent = "Se siente fresco";
      $("hSub").textContent = "La sensación térmica está bajo 19.5 °C; buen punto para estudiar abrigado y tranquilo.";
    } else if (scene === "bright") {
      $("hTitle").textContent = "Mucha luz natural";
      $("hSub").textContent = "La iluminación supera 550 lx; si hay reflejos en la pantalla, busca un lugar con sombra.";
    } else if (scene === "dim") {
      $("hTitle").textContent = "Poca luz";
      $("hSub").textContent = "La iluminación está bajo 120 lx; conviene una lámpara o un lugar más claro para leer.";
    } else {
      $("hTitle").textContent = "Condiciones mayormente óptimas";
      $("hSub").textContent = "Hay un detalle menor en los sensores; toca una etiqueta para ver su historial.";
    }

    if (hallazgos.length) {
      const top = hallazgos[0];
      ["hViz", "hTitle"].forEach(id => {
        $(id).dataset.metric = top.key;
        $(id).disabled = false;
        $(id).setAttribute("aria-label", `Ver historial de ${top.label}: ${top.badgeTxt}`);
      });

      oorWrap.hidden = false;
      alertsList.innerHTML = "";
      hallazgos.forEach(item => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "oor-chip";
        chip.dataset.tone = item.tone;
        chip.title = `Ver historial de ${item.label}`;
        chip.setAttribute("aria-label", `${item.label}: ${item.badgeTxt}, valor actual ${item.valueStr}. Ver historial`);
        chip.innerHTML = `
          <span class="oor-main">
            ${TONE_ICONS[item.tone]}
            <span class="oor-name">${item.label}</span>
            <span class="oor-state">· ${item.badgeTxt}</span>
          </span>
          <span class="oor-val">${item.valueStr}</span>`;
        chip.addEventListener("click", () => elegirMetrica(item.key, true));
        alertsList.appendChild(chip);
      });
    } else {
      oorWrap.hidden = true;
      alertsList.innerHTML = "";
    }
  }

  const usaSens = num(d.sensacion) && num(d.temperatura);
  const principal = usaSens ? d.sensacion : d.temperatura;
  $("hTempLabel").textContent = usaSens ? "Sensación térmica" : "Temperatura del aire";
  $("hTemp").innerHTML = num(principal) ? `${fmt(principal, 1)}<small>°C</small>` : `--<small>°C</small>`;
  const feelEl = $("hFeel");
  if (usaSens) {
    const dif = toNum(d.sensacion) - toNum(d.temperatura);
    feelEl.hidden = false;
    feelEl.textContent = `Aire ${fmt(d.temperatura, 1)} °C · Humedad ${fmt(d.humedad, 0)} % (${dif < 0 ? "−" : "+"}${fmt(Math.abs(dif), 1)} °C)`;
  } else if (num(d.temperatura)) {
    feelEl.hidden = false;
    feelEl.textContent = "Sin humedad: se muestra la temperatura del aire";
  } else {
    feelEl.hidden = true;
  }
  renderTempGauge(principal, usaSens ? MBY.sensacion : MBY.temperatura);
}

// ---------- Renderizado de Tarjetas de Mediciones ----------
function renderTiles() {
  BENTO_KEYS.forEach(key => {
    const m = MBY[key];
    const t = $("t-" + m.key);
    const v = cur?.[m.key];
    t.hidden = !num(v);
    t.parentElement.hidden = t.hidden;
    if (!num(v)) return;

    const [, txt, tono] = nivel(m, v);
    $("v-" + m.key).innerHTML = `${fmt(v, m.dec)}<small>${m.unit}</small>`;

    const bd = $("b-" + m.key);
    bd.className = "badge t-" + tono;
    bd.innerHTML = `${TONE_ICONS[tono]}<span>${txt}</span>`;

    const histVals = rows.map(r => toNum(r[m.key])).filter(x => x !== null);
    const mmEl = $("mm-" + m.key);
    if (histVals.length >= 2) {
      const lo = Math.min(...histVals);
      const hi = Math.max(...histVals);
      mmEl.hidden = false;
      $("lo-" + m.key).textContent = `Mín ${fmt(lo, m.dec)}${m.unit === "°C" ? "°" : " " + m.unit}`;
      $("hi-" + m.key).textContent = `Máx ${fmt(hi, m.dec)}${m.unit === "°C" ? "°" : " " + m.unit}`;
    } else {
      mmEl.hidden = true;
    }
  });
}

function renderTabs() {
  METRICS.forEach(m => {
    $("tab-" + m.key).hidden = !num(cur?.[m.key]);
  });
  if (cur && !num(cur[metric])) {
    const fallback = METRICS.find(m => num(cur[m.key]));
    if (fallback) metric = fallback.key;
  }
  METRICS.forEach(m => {
    const active = m.key === metric;
    const tabEl = $("tab-" + m.key);
    tabEl.setAttribute("aria-pressed", String(active));
    if (active && !tabEl.hidden) {
      scrollHorizontalToChild(tabs, tabEl);
    }
    const t = $("t-" + m.key);
    if (t) {
      t.setAttribute("aria-pressed", String(active));
      const hintTxt = $("hintTxt-" + m.key);
      if (hintTxt) hintTxt.textContent = active ? "En gráfica" : "";
    }
  });
}

// ---------- Filtrado Temporal y Gráfica ----------
function filtrarRowsPorTiempo() {
  if (!allFetchedRows.length) {
    rows = [];
    return;
  }
  const windowEnd = Math.floor(Date.now() / 1000);
  const cutoffSec = windowEnd - (rango * 60);
  rows = allFetchedRows.filter(r => r.ts >= cutoffSec && r.ts <= windowEnd);
}

function renderChart() {
  const m = MBY[metric];
  $("dTitle").textContent = `${m.label} (${m.unit})${m.computed ? " · estimada" : ""}`;
  const rangoNombre = { 60: "Última hora", 360: "Últimas 6 horas", 1440: "Últimas 24 horas" }[rango] || `${rango} min`;

  const pts = rows
    .filter(r => num(r[metric]) && num(r.ts))
    .map(r => ({ x: toNum(r.ts), y: toNum(r[metric]) }));
  const windowEnd = Math.floor(Date.now() / 1000);
  const windowStart = windowEnd - rango * 60;
  const gaps = getHistoryGaps(pts, windowStart, windowEnd);
  const gapNote = $("chartGapNote");
  chartGapRanges = gaps;
  $("chartSeriesSwatch").style.setProperty("--series-color", m.color);
  $("chartSeriesLabel").textContent = m.computed
    ? `Serie estimada: ${m.label.toLowerCase()}`
    : `Lecturas: ${m.label.toLowerCase()}`;

  $("dMeta").textContent = pts.length ? `${rangoNombre} · ${pts.length} registros` : rangoNombre;
  if (!gaps.length) {
    gapNote.hidden = true;
    gapNote.textContent = "";
  } else {
    const longestGap = gaps.reduce((longest, gap) => gap.end - gap.start > longest.end - longest.start ? gap : longest);
    gapNote.textContent = gaps.length === 1
      ? `Sin lecturas entre ${formatChartTime(longestGap.start)} y ${formatChartTime(longestGap.end)}`
      : `${gaps.length} intervalos sin lecturas · El mayor: ${formatChartTime(longestGap.start)}–${formatChartTime(longestGap.end)}`;
    gapNote.hidden = false;
  }

  const empty = !pts.length;
  $("none").hidden = !empty;

  if (empty) {
    $("noneText").textContent = histError
      ? "No se pudo descargar el historial."
      : "No hay mediciones registradas en este intervalo.";
    $("stAvg").textContent = "—";
    $("stAvgSub").textContent = "Sin datos";
    $("stMin").textContent = "—";
    $("stMinSub").textContent = "—";
    $("stMax").textContent = "—";
    $("stMaxSub").textContent = "—";
    if (chart) {
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chartGapRanges = [];
      chart.options.scales.x.min = undefined;
      chart.options.scales.x.max = undefined;
      chart.update("none");
    }
    return;
  }

  let sum = 0;
  let minPt = pts[0];
  let maxPt = pts[0];
  for (const p of pts) {
    sum += p.y;
    if (p.y < minPt.y) minPt = p;
    if (p.y > maxPt.y) maxPt = p;
  }
  const avg = sum / pts.length;

  $("stAvg").textContent = `${fmt(avg, m.dec)} ${m.unit}`;
  $("stAvgSub").textContent = `${pts.length} lecturas`;
  $("stMin").textContent = `${fmt(minPt.y, m.dec)} ${m.unit}`;
  $("stMinSub").textContent = `A las ${formatShortTime(minPt.x)}`;
  $("stMax").textContent = `${fmt(maxPt.y, m.dec)} ${m.unit}`;
  $("stMaxSub").textContent = `A las ${formatShortTime(maxPt.x)}`;

  if (!chart) return;

  const chartPoints = [];
  pts.forEach((point, index) => {
    if (index > 0 && point.x - pts[index - 1].x > HISTORY_GAP_THRESHOLD_SECONDS) {
      chartPoints.push({ x: (point.x + pts[index - 1].x) / 2, y: null });
    }
    chartPoints.push(point);
  });
  chart.data.labels = [];
  chart.data.datasets[0].data = chartPoints;
  chart.data.datasets[0].borderColor = m.color;
  chart.options.scales.x.min = windowStart;
  chart.options.scales.x.max = windowEnd;
  chart.options.scales.x.ticks.maxTicksLimit = getMaxXTicks();
  chart.update();
}

function renderAll() {
  renderStatus();
  renderHero();
  renderTabs();
  renderTiles();
  renderChart();
}

// ---------- Selección de Métrica y Navegación Suave ----------
function elegirMetrica(k, shouldScroll = false) {
  metric = k;
  renderTabs();
  renderChart();
  if (shouldScroll) {
    scrollSmoothToSection($("historialSection"));
  }
}

["hViz", "hTitle"].forEach(id => {
  $(id).addEventListener("click", () => {
    const k = $(id).dataset.metric;
    if (k) elegirMetrica(k, true);
  });
});

$("seg").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  rango = Number(b.dataset.n);
  const btns = [...$("seg").querySelectorAll("button")];
  btns.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  $("seg").style.setProperty("--i", btns.indexOf(b));
  filtrarRowsPorTiempo();
  renderTiles();
  renderChart();
});

// ---------- Selección de Ubicación ----------
function seleccionar(id, userInitiated = false) {
  nodo = id;
  lastAppliedScene = null;
  Object.entries(cards).forEach(([k, b]) => {
    const active = k === id;
    b.setAttribute("aria-pressed", String(active));
    if (active) {
      scrollHorizontalToChild($("locs"), b);
    }
    updateCard(k);
  });

  if (userInitiated) {
    const heroEl = $("hero");
    if (heroEl && heroEl.getBoundingClientRect().top < 40) {
      scrollSmoothToSection(heroEl);
    }
  }

  $("hLoc").textContent = live[id]?.nombre || id;
  $("hLocSub").textContent = `· ${subUbicacion(id)}`;
  $("hTimeText").textContent = "Conectando…";
  $("hTime").classList.remove("is-offline");

  if (!activeDebugPreset) {
    cur = null;
    allFetchedRows = [];
    rows = [];
    lastTs = null;
    histError = false;
  }

  if (unsubActual) { unsubActual(); unsubActual = null; }
  if (unsubHist) { unsubHist(); unsubHist = null; }

  const p = `medio_ambiente/nodos/${id}`;

  unsubActual = subscribeValue(`${p}/actual`, snap => {
    const val = snap.val();
    if (!val) {
      realCur = null;
      realLastTs = null;
      if (!activeDebugPreset) {
        $("hTitle").textContent = "Sin lecturas aún";
        $("hSub").textContent = "Este punto todavía no ha publicado datos en el servidor.";
        $("hGeneralLabel").textContent = "Sin datos";
        $("hOorWrap").hidden = true;
        renderTempGauge(null);
      }
      return;
    }
    realCur = enriquecer(val);
    realLastTs = num(realCur.ts) ? toNum(realCur.ts) : Math.floor(Date.now() / 1000);
    live[id] = realCur;
    updateCard(id);

    if (!activeDebugPreset) {
      cur = realCur;
      lastTs = realLastTs;
      $("hLoc").textContent = cur.nombre || id;
      renderAll();
    }
  });

  unsubHist = subscribeValue(`${p}/historial`, snap => {
    histError = false;
    const rawVal = snap.val();
    const list = Object.values(rawVal || {})
      .map(enriquecer)
      .filter(r => num(r.ts))
      .sort((a, b) => a.ts - b.ts);

    realFetchedRows = list;
    if (!activeDebugPreset) {
      allFetchedRows = realFetchedRows;
      filtrarRowsPorTiempo();
      renderTiles();
      renderChart();
    }
  }, err => {
    console.warn("Error leyendo historial:", err);
    histError = true;
    if (!activeDebugPreset) {
      allFetchedRows = [];
      rows = [];
      renderChart();
    }
  });
}

// ---------- Descubrimiento de Nodos con Respaldo REST ----------
async function cargarNodos() {
  if (isLoadingNodes) return;
  isLoadingNodes = true;
  try {
    const shallow = await readREST("medio_ambiente/nodos?shallow=true");
    const ids = Object.keys(shallow || {});
    if (!ids.length) {
      $("status").className = "pill off";
      $("statusText").textContent = "Sin nodos registrados";
      $("hTitle").textContent = "Aún no hay ubicaciones activas";
      $("hSub").textContent = "Esperando el primer envío desde las estaciones del campus.";
      aplicarEscena("offline");
      return;
    }
    ids.forEach(vigilar);
    if (!nodo || !ids.includes(nodo)) {
      const preferido = ids.find(x => /bloque|block/i.test(x)) || ids[0];
      seleccionar(preferido, false);
    }
  } catch (err) {
    console.warn("Error descubriendo nodos:", err);
    if (!nodo) {
      $("status").className = "pill off";
      $("statusText").textContent = "Sin conexión";
      $("hTitle").textContent = "No se pudo conectar al servidor";
      $("hSub").textContent = "Verifica tu acceso a internet para consultar las mediciones del campus.";
      $("hRetry").hidden = false;
      aplicarEscena("offline");
    }
  } finally {
    isLoadingNodes = false;
  }
}

$("hRetry").addEventListener("click", () => {
  $("hRetry").hidden = true;
  $("hTitle").textContent = "Reintentando conexión…";
  cargarNodos();
});

cargarNodos();
setInterval(cargarNodos, REFRESCAR_NODOS_MS);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !activeDebugPreset) {
    renderStatus();
    filtrarRowsPorTiempo();
    renderTiles();
    renderChart();
  }
});

// === INICIO MODO DEPURACIÓN (JS) ===
const DEMO_PRESETS = {
  ok: {
    temperatura: 22.8,
    humedad: 56,
    luz: 360,
    sonido: 43.2
  },
  noise: {
    temperatura: 23.4,
    humedad: 58,
    luz: 390,
    sonido: 75.5
  },
  heat: {
    temperatura: 29.8,
    humedad: 66,
    luz: 640,
    sonido: 51.0
  },
  cold: {
    temperatura: 16.5,
    humedad: 74,
    luz: 190,
    sonido: 41.8
  },
  bright: {
    temperatura: 24.4,
    humedad: 50,
    luz: 820,
    sonido: 46.5
  },
  dim: {
    temperatura: 21.8,
    humedad: 62,
    luz: 72,
    sonido: 39.5
  },
  offline: {
    temperatura: 22.1,
    humedad: 60,
    luz: 310,
    sonido: 44.0
  }
};

function generarHistorialDemo(presetKey, baseData) {
  const now = Math.floor(Date.now() / 1000);
  const pts = [];
  const total = 48;
  for (let i = total; i >= 0; i--) {
    const ts = now - i * 75;
    const wave = Math.sin(i * 0.35);
    const wave2 = Math.cos(i * 0.22);
    const t = Math.round((baseData.temperatura + wave * 0.55 + wave2 * 0.25) * 10) / 10;
    const h = Math.round(Math.max(25, Math.min(95, baseData.humedad + wave2 * 2.5)));
    const l = Math.max(0, Math.round(baseData.luz + wave * (presetKey === "bright" ? 45 : 18)));
    const s = Math.round(Math.max(30, baseData.sonido + (presetKey === "noise" ? wave * 3.8 : wave * 1.4)) * 10) / 10;
    pts.push(enriquecer({ ts, temperatura: t, humedad: h, luz: l, sonido: s }));
  }
  return pts;
}

function activarDemoPreset(presetKey) {
  document.querySelectorAll(".dbg-btn").forEach(btn => {
    btn.setAttribute("aria-pressed", String(btn.dataset.preset === presetKey));
  });
  lastAppliedScene = null;
  if (presetKey === "live") {
    activeDebugPreset = null;
    cur = realCur;
    lastTs = realLastTs;
    allFetchedRows = realFetchedRows;
    if (nodo) delete lastSceneByNode[nodo];
    if (cur) {
      filtrarRowsPorTiempo();
      renderAll();
    } else {
      renderStatus();
    }
    return;
  }

  const base = DEMO_PRESETS[presetKey];
  if (!base) return;
  activeDebugPreset = presetKey;
  const now = Math.floor(Date.now() / 1000);
  const simTs = presetKey === "offline" ? now - 380 : now - 4;
  const nombreActual = cur?.nombre || live[nodo]?.nombre || nodo || "Bloque 8 · Piso 2";

  if (nodo) delete lastSceneByNode[nodo];
  cur = enriquecer({
    nombre: nombreActual,
    ts: simTs,
    ...base
  });
  lastTs = simTs;
  allFetchedRows = generarHistorialDemo(presetKey, base);
  filtrarRowsPorTiempo();
  renderAll();
}

const debugDock = $("debugDock");
const debugToggle = $("debugToggle");
const debugBtns = $("debugBtns");

if (debugDock && debugBtns && debugToggle) {
  const showDemo = new URLSearchParams(location.search).get("demo") === "1";
  document.body.classList.toggle("demo-active", showDemo);
  debugDock.hidden = !showDemo;
  debugBtns.addEventListener("click", e => {
    const btn = e.target.closest(".dbg-btn");
    if (!btn) return;
    activarDemoPreset(btn.dataset.preset);
  });

  debugToggle.addEventListener("click", () => {
    const collapsed = debugDock.classList.toggle("is-collapsed");
    debugToggle.textContent = collapsed ? "+" : "—";
    debugToggle.title = collapsed ? "Expandir panel de demostración" : "Minimizar panel de demostración";
  });

  if (showDemo) {
    const keyMap = ["live", "ok", "noise", "heat", "cold", "bright", "dim", "offline"];
    window.addEventListener("keydown", e => {
      if (e.target.matches("input, textarea, select")) return;
      const idx = Number(e.key);
      if (Number.isInteger(idx) && idx >= 0 && idx < keyMap.length) {
        activarDemoPreset(keyMap[idx]);
      }
    });
  }
}
// === FIN MODO DEPURACIÓN (JS) ===
