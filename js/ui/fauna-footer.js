import { FOOT_SCENES } from "../data/fauna.js";
import { MASCOT_ART } from "../data/mascot-art.js";

const footSpotlightEl = document.getElementById("footSpotlight");
const footScenesEl = document.getElementById("footScenes");
const footCardsByKey = {};
let lastAutoSyncedScene = null;

FOOT_SCENES.forEach((item, idx) => {
  const el = document.createElement("li");
  el.className = "foot-item";
  el.dataset.scene = item.key;
  el.dataset.order = String(idx);
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-pressed", "false");
  el.innerHTML = `
    <div class="foot-art" aria-hidden="true">${MASCOT_ART[item.key].replaceAll("sunbeamGradHero", "sunbeamGradFoot")}</div>
    <div class="foot-body">
      <div class="foot-head">
        <div class="foot-head-text">
          <h3>${item.name}</h3>
          <p class="foot-rule">${item.rule}</p>
        </div>
        <span class="foot-state-badge"></span>
        <span class="foot-chev" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      <div class="foot-bio">
        <div class="foot-pills">
          <span class="foot-pill"><em>${item.sci}</em></span>
          <span class="foot-pill">${item.family}</span>
          <span class="foot-pill">${item.iucn}</span>
        </div>
        <p class="foot-desc">${item.desc}</p>
        <p class="foot-dist"><strong>Distribución:</strong> ${item.dist}</p>
      </div>
    </div>`;

  const activate = () => {
    if (el.parentElement === footSpotlightEl) return;
    setFootSpotlight(item.key, false);
    if (window.matchMedia("(max-width: 760px)").matches) {
      requestAnimationFrame(() => footSpotlightEl.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };
  el.addEventListener("click", activate);
  el.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });

  footCardsByKey[item.key] = el;
  footScenesEl.appendChild(el);
});

export function setFootSpotlight(sceneKey, fromLiveSensor = false) {
  const target = footCardsByKey[sceneKey];
  if (!target || !footSpotlightEl || !footScenesEl) return;

  if (fromLiveSensor) lastAutoSyncedScene = sceneKey;
  const current = footSpotlightEl.querySelector(".foot-item");
  Object.values(footCardsByKey).forEach(card => {
    const isActive = card === target;
    card.setAttribute("aria-pressed", String(isActive));
    if (isActive) {
      card.removeAttribute("role");
      card.removeAttribute("tabindex");
    } else {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
    }
  });
  if (current && current !== target) {
    footScenesEl.appendChild(current);

    Array.from(footScenesEl.children)
      .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order))
      .forEach(node => footScenesEl.appendChild(node));
  }

  const badge = target.querySelector(".foot-state-badge");
  if (badge) {
    const isCurrentSensor = fromLiveSensor || sceneKey === lastAutoSyncedScene;
    badge.className = "foot-state-badge " + (isCurrentSensor ? "is-live" : "is-manual");
    badge.textContent = isCurrentSensor ? "Condición actual" : "Ficha explorada";
  }

  if (current !== target) {
    footSpotlightEl.appendChild(target);
  }
}

// Activar Iguana verde por defecto al cargar
lastAutoSyncedScene = "ok";
setFootSpotlight("ok", true);

