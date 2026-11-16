// Ilustraciones SVG y contenido de las escenas de fauna.
export const SCENE_META = {
  ok:      { caption: "Iguana verde · Todo en rango", badge: "Ideal para estudiar" },
  noise:   { caption: "Periquito barbinaranja y canario costeño · Mucho ruido", badge: "Mejor para parchar" },
  heat:    { caption: "Guacamaya roja · Se siente calor", badge: "Se siente cálido" },
  cold:    { caption: "Zarigüeya común · Se siente frío", badge: "Se siente frío" },
  bright:  { caption: "Gecko de garganta blanca · Mucha luz", badge: "Mucha luz" },
  dim:     { caption: "Geen · Poca luz", badge: "Poca luz" },
  offline: { caption: "Currucutú · Sin señal del nodo", badge: "Sin señal" }
};

// Escenas SVG propias (540×200, vector plano, paleta institucional). Solo lo que expresa actividad se anima por CSS (clases fa-*).
export const MASCOT_ART = {
ok: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. AMBIENTE FRESCO DE BOSQUE HÚMEDO -->
    <rect width="540" height="200" fill="#E0F5EE"/>

    <!-- Nubes ligeras de día despejado y agradable -->
    <g fill="#F0FBF7" opacity="0.92">
      <path d="M62 46H142C150 46 156 40 156 33C156 26 150 21 143 21C139 11 129 6 118 6C106 6 96 13 93 24C90 23 86 22 82 22C71 22 62 30 62 40C62 42 62 44 62 46Z"/>
      <path d="M388 42H458C465 42 470 37 470 31C470 25 465 20 459 20C455 12 447 7 437 7C426 7 418 13 415 23C412 22 409 21 405 21C396 21 388 28 388 37C388 39 388 41 388 42Z" opacity="0.8"/>
    </g>

    <!-- Brisa suave de aire puro -->
    <g class="fa-wind" stroke="#99D5C3" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75">
      <path d="M188 48Q226 42 264 48"/>
      <path d="M206 56Q234 52 254 56"/>
    </g>

    <!-- Montañas lejanas en neblina verde-azulada -->
    <path d="M0 124Q135 86 270 118T540 102V200H0Z" fill="#C4EAE0"/>

    <!-- Copas de árboles y arbustos en tonos jade suave -->
    <g fill="#A6DBC9">
      <path d="M0 152Q160 132 320 150T540 140V200H0Z"/>
      <!-- Arboleda izquierda -->
      <circle cx="48" cy="126" r="32"/>
      <circle cx="92" cy="112" r="40"/>
      <circle cx="140" cy="124" r="30"/>
      <!-- Arboleda derecha -->
      <circle cx="418" cy="124" r="30"/>
      <circle cx="464" cy="110" r="42"/>
      <circle cx="512" cy="122" r="34"/>
    </g>

    <!-- Motas de aire puro / polen flotando en calma -->
    <g class="fa-firefly fa-ff1" fill="#FFFFFF">
      <circle cx="176" cy="76" r="2.2"/>
    </g>
    <g class="fa-firefly fa-ff2" fill="#FFFFFF">
      <circle cx="314" cy="54" r="1.9"/>
    </g>
    <g class="fa-firefly fa-ff3" fill="#FFFFFF">
      <circle cx="378" cy="72" r="2"/>
    </g>
    <g class="fa-firefly fa-ff4" fill="#FFFFFF">
      <circle cx="142" cy="96" r="1.6"/>
    </g>

    <!-- 2. TRONCO GRUESO LIMPIO Y BROTES FRESCOS -->
    <g id="tronco-ok">
      <path d="M-15 162C145 142 385 140 555 158" stroke="#684A38" stroke-width="21" stroke-linecap="round"/>
      <path d="M-15 155C145 135 385 133 555 151" stroke="#85604A" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M175 153Q235 148 295 148M365 149Q425 151 485 156" stroke="#4E3629" stroke-width="2.2" stroke-linecap="round" opacity="0.55"/>

      <!-- Ramita frondosa a la derecha -->
      <path d="M448 148Q476 122 506 110" stroke="#684A38" stroke-width="6.5" stroke-linecap="round"/>
      <g transform="translate(504 110) rotate(-25) scale(0.95)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3FA34D"/>
        <path d="M5 0H40" stroke="#74C67A" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(484 120) rotate(22) scale(0.82)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#2E8540"/>
        <path d="M5 0H40" stroke="#5EB36B" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Ramita frondosa a la izquierda -->
      <path d="M126 150Q102 126 76 116" stroke="#684A38" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(78 116) rotate(-155) scale(0.9)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3FA34D"/>
        <path d="M5 0H40" stroke="#74C67A" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 3. PERSONAJE: IGUANA VERDE ALARGADA, ROBUSTA Y CON CRESTA ORGÁNICA -->
    <g transform="translate(284 134) scale(1.12)">
      <!-- COLA LARGA CON ANILLOS -->
      <g transform="translate(50 -2)">
        <g class="fa-tail-sway">
          <path d="M-6 0C28 -2 56 12 64 34C70 50 58 64 42 60" stroke="#2EA043" stroke-width="12" stroke-linecap="round" fill="none"/>
          <path d="M42 60C30 57 24 46 32 40" stroke="#2EA043" stroke-width="6.5" stroke-linecap="round" fill="none"/>
          <path d="M-4 4C26 2 50 14 58 34" stroke="#7EE787" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.85"/>
          <path d="M18 -3L16 5M34 3L30 11M49 14L43 20M60 29L53 32M61 46L54 43" stroke="#14532D" stroke-width="3.2" stroke-linecap="round"/>
        </g>
      </g>

      <!-- Grupo con respiración serena -->
      <g class="fa-iguana-breathe">

        <!-- CRESTA DORSAL INCLINADA Y GRADUAL -->
        <path d="M-42 -12L-35 -29L-30 -19L-25 -32L-19 -21L-13 -34L-8 -22L-1 -33L4 -21L11 -31L16 -19L23 -28L28 -17L35 -24L40 -14L47 -18L53 -7L44 0L-38 0Z"
              fill="#7EE787" stroke="#1F7A32" stroke-width="1.6" stroke-linejoin="round"/>

        <!-- CUERPO LARGO Y ANCHO -->
        <path d="M-54 -4C-42 -32 16 -34 54 -8C58 -5 58 2 52 4C22 10 -28 11 -54 -4Z" fill="#2EA043"/>

        <!-- Vientre verde lima continuo desde el pecho hasta la base de la cola -->
        <path d="M-46 -1C-20 8 22 8 52 2C46 7 18 11 -16 10C-32 9 -42 5 -46 -1Z" fill="#7EE787"/>

        <!-- Bandas verticales sutiles repartidas a lo largo del costado -->
        <path d="M-22 -21L-19 -4M-4 -23L-1 -4M14 -21L17 -4M31 -17L33 -4" stroke="#1F7A32" stroke-width="3" stroke-linecap="round" opacity="0.5"/>

        <!-- PATA TRASERA POR DELANTE DEL CUERPO -->
        <path d="M30 -7C35 -7 38 -1 36 5L41 14L49 15M41 14L37 19M41 14L44 19" stroke="#238636" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="32" cy="-3" r="6" fill="#28943D"/>

        <!-- PATA DELANTERA POR DELANTE DEL CUERPO -->
        <path d="M-32 -6C-36 -6 -38 0 -36 5L-38 14L-46 15M-38 14L-33 19M-38 14L-41 19" stroke="#238636" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="-33" cy="-2" r="5.5" fill="#28943D"/>

        <!-- CABEZA GRANDE Y EXPRESIVA -->
        <g transform="translate(-56 -16)">
          <path d="M-4 -12L2 -22L6 -13L11 -21L15 -10L6 -6Z" fill="#7EE787" stroke="#1F7A32" stroke-width="1.5" stroke-linejoin="round"/>

          <!-- Papada / gula colgante prominente -->
          <path d="M-15 8C-12 26 4 31 15 18C19 13 17 5 11 2Z" fill="#3FB950"/>
          <path d="M-11 16L-8 21L-5 18L-2 23L2 19L5 22L8 17" stroke="#238636" stroke-width="1.6" stroke-linecap="round" fill="none"/>

          <!-- Cabeza verde vibrante -->
          <path d="M18 -13C1 -21 -23 -16 -31 -3C-34 4 -29 10 -18 10C-2 12 15 8 20 -3Z" fill="#3FB950"/>
          <path d="M-23 -8C-14 -14 -1 -14 9 -9" stroke="#7EE787" stroke-width="2.6" stroke-linecap="round"/>

          <!-- Escama subtimpánica redonda icónica en la mejilla -->
          <circle cx="0" cy="2.5" r="5.5" fill="#86EFAC" stroke="#238636" stroke-width="1.4"/>

          <!-- Ojo cerrado en arco sereno y feliz (^) -->
          <path d="M-19 -2.5Q-14 -8.5 -9 -2.5" stroke="#14532D" stroke-width="2.6" stroke-linecap="round" fill="none"/>
          <ellipse cx="-10" cy="3" rx="3.5" ry="2" fill="#FB7185" opacity="0.45"/>

          <!-- Fosa nasal y sonrisa tranquila -->
          <circle cx="-27" cy="-2.5" r="1.4" fill="#14532D"/>
          <path d="M-30 4Q-22 8 -14 4.5" stroke="#14532D" stroke-width="2" stroke-linecap="round" fill="none"/>
        </g>
      </g>
    </g>

    <!-- 4. HIERBA EN SILUETA EN EL BORDE INFERIOR -->
    <g fill="#8ECBB8">
      <path d="M210 200Q216 180 226 174Q221 187 219 200Z"/>
      <path d="M219 200Q229 185 239 181Q231 190 227 200Z"/>
      <path d="M392 200Q398 178 410 172Q404 186 402 200Z"/>
      <path d="M402 200Q414 184 426 182Q415 192 410 200Z"/>
    </g>
  </svg>`,
  noise: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. INTERIOR DE COPA DE ÁRBOL EN VERDE SUAVE Y DESATURADO -->
    <rect width="540" height="200" fill="#E6F4EC"/>

    <!-- Capas lejanas de follaje dentro del árbol -->
    <g fill="#CEE8D9">
      <circle cx="48" cy="36" r="56"/>
      <circle cx="132" cy="24" r="48"/>
      <circle cx="235" cy="18" r="52"/>
      <circle cx="348" cy="22" r="54"/>
      <circle cx="456" cy="32" r="62"/>
      <circle cx="518" cy="84" r="52"/>
      <circle cx="24" cy="108" r="48"/>
    </g>

    <!-- Ramas secundarias cruzando el fondo en tono verde oliva/salvia suave -->
    <g stroke="#A6CCB7" stroke-width="8" stroke-linecap="round">
      <path d="M-10 42Q115 62 215 22"/>
      <path d="M550 38Q430 68 330 18"/>
      <path d="M68 188Q112 118 164 82"/>
      <path d="M468 192Q428 124 382 88"/>
    </g>

    <!-- Capa intermedia de racimos de hojas suaves -->
    <g fill="#B7DBC7">
      <circle cx="76" cy="54" r="36"/>
      <circle cx="164" cy="38" r="32"/>
      <circle cx="388" cy="40" r="34"/>
      <circle cx="478" cy="56" r="38"/>
      <circle cx="496" cy="134" r="34"/>
    </g>

    <!-- 2. RAMA PRINCIPAL EN PRIMER PLANO DONDE BAILAN -->
    <g id="rama-ruido">
      <path d="M-15 154C135 138 385 138 555 156" stroke="#6E4B3A" stroke-width="18" stroke-linecap="round"/>
      <path d="M-15 148C135 132 385 132 555 150" stroke="#8C624D" stroke-width="5.5" stroke-linecap="round"/>
      <!-- Brotes de hojas verdes saliendo de la rama -->
      <path d="M138 144Q112 118 84 108" stroke="#6E4B3A" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(86 108) rotate(-155) scale(0.95)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#4C9A48"/>
        <path d="M5 0H40" stroke="#76C472" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(106 118) rotate(155) scale(0.82)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3B803A"/>
        <path d="M5 0H40" stroke="#65AD64" stroke-width="2" stroke-linecap="round"/>
      </g>

      <path d="M438 146Q466 120 494 110" stroke="#6E4B3A" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(492 110) rotate(-25) scale(0.95)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#4C9A48"/>
        <path d="M5 0H40" stroke="#76C472" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(472 120) rotate(22) scale(0.82)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3B803A"/>
        <path d="M5 0H40" stroke="#65AD64" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 3. PERSONAJE IZQUIERDA: CANARIO COSTEÑO -->
    <g transform="translate(212 135) scale(1.18)">
      <path d="M-6 -4V8M-10 8H-2M6 -4V8M2 8H10" stroke="#C27849" stroke-width="2.6" stroke-linecap="round"/>

      <g class="fa-dance-a">
        <path d="M-12 -6L-28 4L-22 10L-8 0Z" fill="#CA8A04"/>
        <ellipse cx="0" cy="-14" rx="15" ry="17" fill="#FACC15"/>
        <ellipse cx="4" cy="-13" rx="10" ry="13" fill="#FDE047"/>
        <path d="M-10 -20C-22 -24 -26 -14 -16 -8C-10 -5 -4 -12 -10 -20Z" fill="#EAB308"/>

        <g transform="translate(4 -32)">
          <circle cx="0" cy="0" r="12" fill="#FACC15"/>
          <path d="M-6 -9C-1 -13 8 -11 11 -4C6 -6 0 -6 -6 -9Z" fill="#EA580C"/>
          <path d="M1 -1Q4.5 -5.5 8 -1" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          <ellipse cx="1" cy="3.5" rx="2.8" ry="1.7" fill="#FB7185" opacity="0.6"/>
          <path d="M10 -3L20 -6L11 0Z" fill="#F59E0B"/>
          <path d="M11 0L18 2L10 4Z" fill="#D97706"/>
          <path d="M11 -1.5L17 -1L11 2Z" fill="#7F1D1D"/>
        </g>
      </g>
    </g>

    <!-- 4. PERSONAJE DERECHA: PERIQUITO BARBINARANJA -->
    <g transform="translate(338 135) scale(1.34)">
      <path d="M-7 -4V8M-11 8H-3M7 -4V8M3 8H11" stroke="#94A3B8" stroke-width="2.8" stroke-linecap="round"/>

      <g class="fa-dance-b">
        <path d="M10 -4L30 10L22 14L6 2Z" fill="#15803D"/>
        <path d="M-6 -24C-18 -42 -32 -40 -26 -24C-22 -14 -12 -14 -6 -24Z" fill="#16A34A"/>
        <path d="M-12 -28C-16 -12 -12 4 2 5C14 5 18 -10 13 -26C9 -36 -6 -38 -12 -28Z" fill="#22C55E"/>
        <path d="M-10 -22C-13 -10 -10 1 -1 2C5 2 7 -8 5 -20Z" fill="#4ADE80"/>
        <path d="M6 -24C22 -42 38 -36 30 -18C24 -8 12 -12 6 -24Z" fill="#16A34A"/>
        <path d="M10 -22C21 -34 31 -30 26 -19" stroke="#86EFAC" stroke-width="2" stroke-linecap="round" fill="none"/>

        <g transform="translate(-3 -35)">
          <circle cx="0" cy="0" r="12.5" fill="#22C55E"/>
          <path d="M-10 3C-8 8 -2 9 1 5C-3 4 -7 3 -10 3Z" fill="#F97316"/>
          <path d="M-7 -1Q-3.5 -5.5 0 -1" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          <ellipse cx="1" cy="3" rx="2.6" ry="1.6" fill="#FB7185" opacity="0.55"/>
          <path d="M-10 -5C-19 -6 -22 0 -19 5C-16 2 -13 0 -10 0Z" fill="#FDE68A"/>
          <path d="M-10 0L-17 2.5L-10 5Z" fill="#7F1D1D"/>
          <path d="M-10 3C-14 3.5 -16 5.5 -14 7.5C-11 7.5 -10 6 -10 3Z" fill="#D97706"/>
        </g>
      </g>
    </g>

    <!-- 5. ONDAS SONORAS ANIMADAS ALINEADAS CON LOS PICOS -->
    <g transform="translate(274 84)">
      <g class="fa-soundwave" stroke="#EA580C" stroke-width="2.4" stroke-linecap="round" fill="none">
        <path d="M-24 -6Q-18 0 -24 6"/>
        <path d="M-16 -11Q-8 0 -16 11"/>
        <path d="M24 -6Q18 0 24 6"/>
        <path d="M16 -11Q8 0 16 11"/>
      </g>
    </g>

    <!-- 6. HOJAS EN PRIMER PLANO ENMARCANDO LAS ESQUINAS SUPERIORES -->
    <g fill="#4C9A48">
      <g transform="translate(-6 14) rotate(24) scale(1.05)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z"/>
      </g>
      <g transform="translate(18 4) rotate(52) scale(0.9)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3B803A"/>
      </g>
      <g transform="translate(546 16) rotate(154) scale(1.05)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z"/>
      </g>
      <g transform="translate(520 4) rotate(126) scale(0.9)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3B803A"/>
      </g>
    </g>
  </svg>`,
  heat: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. CIELO DE BOCHORNO Y BOSQUE EN CAPAS -->
    <rect width="540" height="200" fill="#FCE2CC"/>

    <!-- Sol intenso completamente despejado arriba a la izquierda -->
    <g id="sol-bochorno">
      <circle class="fa-sunpulse" cx="98" cy="52" r="54" fill="#F99B63"/>
      <circle class="fa-sunpulse" cx="98" cy="52" r="38" fill="#F9844A" style="animation-delay: -1.2s;"/>
      <circle cx="98" cy="52" r="23" fill="#F36838"/>
    </g>

    <!-- Capa lejana: Colinas y copas de bosque -->
    <g fill="#F4C7A6">
      <path d="M0 148Q135 122 270 142T540 126V200H0Z"/>
      <circle cx="44" cy="146" r="18"/>
      <circle cx="78" cy="140" r="22"/>
      <circle cx="114" cy="148" r="17"/>
      <circle cx="410" cy="116" r="30"/>
      <circle cx="452" cy="106" r="36"/>
      <circle cx="498" cy="114" r="32"/>
    </g>

    <!-- Capa media: Silueta de suelo y palmera despejada a la derecha -->
    <g fill="#E9AE84">
      <path d="M0 166Q180 150 360 164T540 156V200H0Z"/>
      <path d="M446 164Q450 116 456 76" stroke="#E9AE84" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M456 76Q430 68 414 84Q434 78 456 76Z"/>
      <path d="M456 76Q436 54 418 58Q438 62 456 76Z"/>
      <path d="M456 76Q478 54 496 60Q476 64 456 76Z"/>
      <path d="M456 76Q484 70 498 88Q478 80 456 76Z"/>
      <path d="M456 76Q458 50 450 44Q460 56 456 76Z"/>
    </g>

    <!-- 2. ONDAS DE CALOR EN MOVIMIENTO -->
    <g class="fa-heatwave" stroke="#E87A48" stroke-width="2.2" stroke-linecap="round" fill="none">
      <path d="M168 118Q162 104 168 90T168 62"/>
      <path d="M188 126Q182 112 188 98T188 70"/>
      <path d="M208 114Q202 100 208 86T208 58"/>
      <path d="M384 116Q378 102 384 88T384 60"/>
      <path d="M404 124Q398 110 404 96T404 68"/>
    </g>

    <!-- COLA DE LA GUACAMAYA COLGANDO POR DETRÁS DE LA RAMA -->
    <g transform="translate(298 117)">
      <path d="M8 10C15 44 24 72 32 90" stroke="#C81E2B" stroke-width="7" stroke-linecap="round"/>
      <path d="M15 8C24 42 35 68 44 84" stroke="#E02836" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M27 78L32 90M38 73L44 84" stroke="#1D56B8" stroke-width="5.5" stroke-linecap="round"/>
    </g>

    <!-- 3. RAMA GRUESA -->
    <g id="rama-calor">
      <path d="M552 156C435 140 305 136 175 154" stroke="#6E4B3A" stroke-width="17" stroke-linecap="round"/>
      <path d="M552 150C435 134 305 130 175 148" stroke="#8C624D" stroke-width="5" stroke-linecap="round"/>
      <path d="M462 140Q488 118 514 108" stroke="#6E4B3A" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(512 108) rotate(-25) scale(0.9)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#529E48"/>
        <path d="M5 0H40" stroke="#7EC472" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(492 117) rotate(22) scale(0.78)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3D823A"/>
        <path d="M5 0H40" stroke="#68AD64" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 4. PERSONAJE: GUACAMAYA ROJA POSADA ENCIMA DE LA RAMA -->
    <g transform="translate(298 117)">
      <path d="M8 10C15 44 24 72 32 90" stroke="#C81E2B" stroke-width="7" stroke-linecap="round"/>
      <path d="M15 8C24 42 35 68 44 84" stroke="#E02836" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M27 78L32 90M38 73L44 84" stroke="#1D56B8" stroke-width="5.5" stroke-linecap="round"/>

      <path d="M-16 -54C-24 -26 -20 10 -2 12C15 14 23 -6 18 -38C15 -54 0 -62 -16 -54Z" fill="#E02836"/>
      <path d="M-14 -46C-20 -24 -17 4 -4 8C4 9 8 -6 6 -30Z" fill="#F03A47"/>

      <path d="M-9 11V18M-13 18C-11 16 -7 16 -5 18M5 11V18M1 18C3 16 7 16 9 18" stroke="#475569" stroke-width="3.2" stroke-linecap="round"/>

      <g transform="translate(2 -44)">
        <g class="fa-fan-wing">
          <path d="M0 0C12 -4 21 8 24 26L4 29C-1 18 -2 8 0 0Z" fill="#C81E2B" stroke="#991B1B" stroke-width="1.2"/>
          <path d="M3 20L23 17L26 29L5 32Z" fill="#FACC15"/>
          <path d="M5 30L25 27L29 48C19 49 11 43 5 30Z" fill="#1D56B8"/>
        </g>
      </g>

      <g transform="translate(-5 -62)">
        <path d="M-2 -14Q1 -21 5 -18M3 -14Q7 -20 10 -16" stroke="#E02836" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="1" cy="-1" rx="14" ry="15" fill="#E02836"/>
        <path d="M-11 -6C-11 -13 0 -13 4 -5C6 1 1 7 -5 7C-10 7 -12 1 -11 -6Z" fill="#FFFFFF"/>
        <circle cx="-4.5" cy="-4" r="2.8" fill="#1E293B"/>
        <circle cx="-5.4" cy="-5" r="1" fill="#FFFFFF"/>
        <path d="M-8.5 -8Q-4.5 -6.5 -1.5 -8.5" stroke="#991B1B" stroke-width="1.6" stroke-linecap="round"/>
        <ellipse cx="-1" cy="2.5" rx="2.8" ry="1.7" fill="#FB7185" opacity="0.55"/>

        <path d="M-9 -9C-22 -12 -28 -2 -25 10C-23 5 -20 1 -10 0Z" fill="#F5E6C8"/>
        <path d="M-10 -9C-21 -11 -26 -2 -25 9" stroke="#DEC9A4" stroke-width="1.2" fill="none"/>
        <path d="M-10 0L-21 4L-10 7.5Z" fill="#4A151B"/>
        <path d="M-10 4C-16 4.5 -19 7 -17 10.5C-12 11 -10 8 -10 4Z" fill="#1E293B"/>

        <path class="fa-sweat" d="M10 -8C10 -8 13.5 -3 13.5 -1C13.5 1 11.9 2.5 10 2.5C8.1 2.5 6.5 1 6.5 -1C6.5 -3 10 -8 10 -8Z" fill="#38BDF8"/>
      </g>
    </g>

    <!-- 5. HIERBA EN SILUETA EN EL BORDE INFERIOR -->
    <g fill="#DC9B6E">
      <path d="M210 200Q216 180 226 174Q221 187 219 200Z"/>
      <path d="M219 200Q229 185 239 181Q231 190 227 200Z"/>
      <path d="M386 200Q392 178 404 172Q398 186 396 200Z"/>
      <path d="M396 200Q408 184 420 182Q409 192 404 200Z"/>
    </g>
  </svg>`,
cold: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. CIELO FRÍO NUBLADO Y MONTAÑAS EN BRUMA -->
    <rect width="540" height="200" fill="#D8E8F4"/>

    <!-- Nubes suaves de mañana fría distribuidas en el cielo -->
    <g fill="#EBF4FA" opacity="0.9">
      <path d="M38 52H122C131 52 138 45 138 37C138 29 132 23 124 23C120 12 109 6 97 6C84 6 73 14 70 26C67 25 63 24 59 24C47 24 38 33 38 44C38 47 38 50 38 52Z"/>
      <path d="M224 38H286C292 38 297 33 297 27C297 21 292 17 286 17C283 9 275 5 266 5C256 5 248 11 246 20C243 19 240 18 237 18C229 18 224 24 224 32C224 34 224 36 224 38Z" opacity="0.75"/>
      <path d="M382 54H458C466 54 472 48 472 41C472 34 466 29 459 29C455 19 446 13 435 13C423 13 414 20 411 31C408 30 404 29 400 29C389 29 382 37 382 47C382 50 382 52 382 54Z"/>
    </g>

    <!-- Montañas lejanas en bruma -->
    <path d="M0 122Q125 84 260 116T540 98V200H0Z" fill="#C6DAEB"/>

    <!-- Banco de neblina / nube baja rozando las montañas -->
    <path d="M110 112H215C222 112 227 107 227 101C227 95 222 91 216 91C212 83 203 78 193 78C182 78 173 84 171 93C167 91 162 90 157 90C147 90 139 96 137 104C134 103 130 102 126 102C117 102 110 106 110 112Z" fill="#E6F1F8" opacity="0.7"/>

    <!-- Arbustos bajos y proporcionados en el fondo -->
    <g fill="#B3CCE0">
      <path d="M0 152Q155 134 315 150T540 140V200H0Z"/>
      <circle cx="42" cy="146" r="18"/>
      <circle cx="72" cy="140" r="22"/>
      <circle cx="104" cy="148" r="16"/>
      <circle cx="436" cy="144" r="18"/>
      <circle cx="468" cy="136" r="24"/>
      <circle cx="504" cy="144" r="20"/>
    </g>

    <!-- 2. RÁFAGAS DE VIENTO Y DESTELLOS DE FRÍO -->
    <g class="fa-wind" stroke="#8FB2CC" stroke-width="2.2" stroke-linecap="round" fill="none">
      <path d="M142 66H224C234 66 238 56 230 52C223 49 218 56 222 61"/>
      <path d="M162 76H208"/>
      <path d="M312 72H382C391 72 394 63 387 59C381 56 376 62 380 67"/>
    </g>
    <g class="fa-firefly fa-ff1" fill="#FFFFFF">
      <circle cx="136" cy="92" r="2.2"/>
    </g>
    <g class="fa-firefly fa-ff2" fill="#FFFFFF">
      <circle cx="196" cy="98" r="1.8"/>
    </g>
    <g class="fa-firefly fa-ff3" fill="#FFFFFF">
      <circle cx="398" cy="88" r="2"/>
    </g>

    <!-- 3. TRONCO LARGO Y GRUESO CRUZANDO TODA LA ESCENA -->
    <g id="tronco-frio">
      <path d="M555 162C420 146 270 144 -15 178" stroke="#5A463B" stroke-width="24" stroke-linecap="round"/>
      <path d="M555 154C420 138 270 136 -15 170" stroke="#755C4E" stroke-width="7" stroke-linecap="round"/>
      <path d="M175 158Q240 152 305 151M365 152Q425 155 485 160" stroke="#45352C" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>

      <path d="M454 148Q482 122 512 110" stroke="#5A463B" stroke-width="7" stroke-linecap="round"/>
      <g transform="translate(510 110) rotate(-24) scale(0.92)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#4C8577"/>
        <path d="M5 0H40" stroke="#74AD9E" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(488 120) rotate(22) scale(0.8)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3B6E6C"/>
        <path d="M5 0H40" stroke="#629996" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(86 158) rotate(-145) scale(0.82)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#4C8577"/>
        <path d="M5 0H40" stroke="#74AD9E" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 4. PERSONAJE: ZARIGÜEYA COMÚN -->
    <g transform="translate(308 138) scale(1.32)">
      <path d="M46 -4C66 -4 72 17 58 22C48 25 44 13 52 7" stroke="#E598A6" stroke-width="6.5" stroke-linecap="round" fill="none"/>
      <path d="M58 22C49 25 45 15 51 9" stroke="#C97B89" stroke-width="6.5" stroke-linecap="round" fill="none"/>

      <g class="fa-shiver">
        <path d="M-32 2C-36 -28 -8 -44 24 -40C52 -36 62 -14 50 4C34 10 -16 10 -32 2Z" fill="#4D5259"/>
        <path d="M-24 -12C-20 -34 6 -42 28 -38C46 -34 54 -18 48 -6C28 -14 0 -15 -24 -12Z" fill="#787F8A"/>

        <path d="M6 -40Q8 -46 11 -45M17 -40Q20 -46 23 -44M28 -38Q32 -43 34 -41" stroke="#787F8A" stroke-width="2.4" stroke-linecap="round" fill="none"/>

        <path d="M-28 0C-18 -14 8 -16 26 -4L18 6H-22Z" fill="#DCE3E9"/>

        <path d="M-18 2L-22 10H-11" stroke="#22252A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32 2L30 10H42" stroke="#22252A" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>

        <g transform="translate(-28 -16)">
          <ellipse cx="10" cy="-16" rx="7" ry="10" transform="rotate(-14 10 -16)" fill="#26292E"/>
          <path d="M18 -12C4 -20 -16 -12 -32 -1C-35 2 -32 7 -24 8C-8 10 12 7 20 -2Z" fill="#F4F7FA"/>
          <path d="M6 -15Q-3 -11 -10 -7" stroke="#5A6069" stroke-width="2.4" stroke-linecap="round"/>

          <ellipse cx="18" cy="-11" rx="7.5" ry="10.5" transform="rotate(10 18 -11)" fill="#1C1E22"/>
          <ellipse cx="17.5" cy="-11" rx="3.8" ry="6" transform="rotate(10 17.5 -11)" fill="#363940"/>

          <ellipse cx="-8" cy="-3.5" rx="7.5" ry="5.5" transform="rotate(-12 -8 -3.5)" fill="#3F444C"/>

          <circle cx="-8.5" cy="-3.5" r="3.8" fill="#141619"/>
          <circle cx="-9.8" cy="-4.8" r="1.4" fill="#FFFFFF"/>
          <circle cx="-7.2" cy="-2.4" r="0.7" fill="#FFFFFF"/>
          <path d="M-13 -9Q-8 -10.5 -3 -8" stroke="#4D5259" stroke-width="1.6" stroke-linecap="round"/>

          <ellipse cx="-4" cy="3.5" rx="3.8" ry="2.2" fill="#F48FB1" opacity="0.55"/>
          <ellipse cx="-32" cy="1.5" rx="3.6" ry="2.8" fill="#F08296"/>
          <path d="M-27 5.5Q-24 4 -21 5.5Q-18 7 -15 5.5" stroke="#5A464C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
          <path d="M-26 2L-37 0M-26 4.5L-36 5.5" stroke="#94A3B8" stroke-width="1.1" stroke-linecap="round"/>
        </g>
      </g>

      <!-- 5. VAPOR DE ALIENTO FRÍO SALIENDO DEL HOCICO -->
      <g transform="translate(-64 -14)">
        <g class="fa-breath">
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" opacity="0.95"/>
          <circle cx="-5.5" cy="-2" r="4.2" fill="#FFFFFF" opacity="0.85"/>
          <circle cx="-12" cy="-3.5" r="5" fill="#F0F7FF" opacity="0.7"/>
        </g>
      </g>
    </g>

    <!-- 6. HIERBA EN SILUETA EN EL BORDE INFERIOR -->
    <g fill="#9BB7CE">
      <path d="M242 200Q248 180 258 174Q253 187 251 200Z"/>
      <path d="M251 200Q261 185 271 181Q263 190 259 200Z"/>
      <path d="M398 200Q404 178 416 172Q410 186 408 200Z"/>
      <path d="M408 200Q420 184 432 182Q421 192 416 200Z"/>
    </g>
  </svg>`,
  bright: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. CIELO SOLEADO Y SILUETA DE ÁRBOLES/PALMAS DEL CAMPUS EN TONOS CÁLIDOS -->
    <rect width="540" height="200" fill="#FFF2C2"/>

    <g fill="#F6E299">
      <path d="M0 156Q130 124 270 148T540 136V200H0Z"/>
      <circle cx="385" cy="118" r="34"/>
      <circle cx="422" cy="108" r="42"/>
      <circle cx="468" cy="116" r="38"/>
      <circle cx="515" cy="102" r="46"/>
    </g>

    <g fill="#EDD37C">
      <path d="M0 174Q180 154 360 172T540 164V200H0Z"/>
      <circle cx="352" cy="152" r="24"/>
      <circle cx="448" cy="146" r="30"/>
      <circle cx="495" cy="142" r="34"/>
      <path d="M412 175Q416 125 422 86" stroke="#EDD37C" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M422 86Q396 78 380 94Q400 88 422 86Z"/>
      <path d="M422 86Q402 64 384 68Q404 72 422 86Z"/>
      <path d="M422 86Q444 64 462 70Q442 74 422 86Z"/>
      <path d="M422 86Q450 80 464 98Q444 90 422 86Z"/>
      <path d="M422 86Q424 60 416 54Q426 66 422 86Z"/>
    </g>

    <!-- 2. SOL RADIANTE Y HACES DE LUZ DIAGONALES -->
    <defs>
      <linearGradient id="sunbeamGradHero" x1="0%" y1="0%" x2="85%" y2="85%">
        <stop offset="0%" stop-color="#FFFDF0" stop-opacity="0.95"/>
        <stop offset="70%" stop-color="#FFFDF0" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#FFFDF0" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <g id="sol-y-rayos">
      <circle cx="96" cy="46" r="44" fill="#FFE066" opacity="0.35"/>
      <g stroke="#F59E0B" stroke-width="3.2" stroke-linecap="round">
        <line x1="96" y1="8" x2="96" y2="17"/>
        <line x1="96" y1="75" x2="96" y2="84"/>
        <line x1="58" y1="46" x2="67" y2="46"/>
        <line x1="125" y1="46" x2="134" y2="46"/>
        <line x1="69" y1="19" x2="75" y2="25"/>
        <line x1="117" y1="67" x2="123" y2="73"/>
        <line x1="123" y1="19" x2="117" y2="25"/>
        <line x1="75" y1="67" x2="69" y2="73"/>
      </g>
      <circle cx="96" cy="46" r="23" fill="#FFBE2E"/>
      <circle cx="96" cy="46" r="18" fill="#FFD447"/>

      <g class="fa-sunbeam">
        <polygon points="118,58 142,42 560,185 385,215" fill="url(#sunbeamGradHero)"/>
        <polygon points="104,72 116,64 315,215 215,215" fill="url(#sunbeamGradHero)" opacity="0.8"/>
      </g>

      <g class="fa-firefly fa-ff1">
        <circle cx="168" cy="78" r="2.2" fill="#FFFFFF"/>
      </g>
      <g class="fa-firefly fa-ff2">
        <circle cx="215" cy="94" r="1.8" fill="#FFFFFF"/>
      </g>
      <g class="fa-firefly fa-ff3">
        <circle cx="145" cy="112" r="2" fill="#FFFFFF"/>
      </g>
      <g class="fa-firefly fa-ff4">
        <circle cx="268" cy="128" r="1.8" fill="#FFFFFF"/>
      </g>
    </g>

    <!-- 3. VEGETACIÓN DE PRIMER PLANO (Derecha) -->
    <g opacity="0.9">
      <path d="M472 200Q478 162 502 142" stroke="#4D8B31" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(500 144) rotate(-35)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#5CAE4B"/>
        <path d="M5 0H40" stroke="#80C96B" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(486 162) rotate(18) scale(0.85)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3E9047"/>
        <path d="M5 0H40" stroke="#5CAE4B" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 4. TRONCO EN DIAGONAL EN PRIMER PLANO -->
    <g id="tronco-diagonal">
      <path d="M-15 215L295 82C306 77 316 86 312 97L155 215Z" fill="#7A5236"/>
      <path d="M-15 215L295 82C301 79 307 82 309 87L42 215Z" fill="#966846"/>
      <path d="M68 184L172 139M134 176L242 129M196 130L278 95" stroke="#5E3D26" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>
      <path d="M276 92Q284 76 296 72" stroke="#3E9047" stroke-width="2.5" stroke-linecap="round"/>
      <g transform="translate(294 72) rotate(-25) scale(0.55)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#5CAE4B"/>
      </g>
      <g transform="translate(285 80) rotate(-68) scale(0.45)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#3E9047"/>
      </g>
    </g>

    <!-- 5. PERSONAJE: GECKO DE GARGANTA BLANCA -->
    <g transform="translate(216 112) rotate(-23)">
      <path d="M-36 8C-64 10-86 24-102 18C-112 14-110 4-102 6" stroke="#3D312A" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M-36 8C-64 10-86 24-102 18" stroke="#54443B" stroke-width="3" stroke-linecap="round"/>
      <path d="M-24 8L-30 20L-22 23M-30 20L-35 23M-30 20L-27 25" stroke="#3D312A" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-40 6C-26 -6 2 -8 18 -2L14 13C-4 15-24 14-40 6Z" fill="#463830"/>
      <path d="M-34 3C-20 -5 0 -6 15 -1" stroke="#6E5A4F" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M8 8L12 20L19 21M12 20L7 23M12 20L14 24" stroke="#463830" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 -3Q21 5 14 13" stroke="#D8E2E8" stroke-width="2.6" stroke-linecap="round"/>

      <g class="fa-bob-a">
        <path d="M15 12C24 14 36 11 43 4L22 2Z" fill="#FFFFFF"/>
        <path d="M16 -3C24 -11 42 -9 48 1C49 4 44 6 38 6L15 8Z" fill="#D97724"/>
        <path d="M21 -5C29 -8 39 -6 44 -1" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
        <path d="M31 1.5L41 2.2" stroke="#00B2C1" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="27" cy="2" r="1.3" fill="#00B2C1"/>
        <path d="M25 -3Q28.5 -6.5 32 -3" stroke="#1E1815" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M35 5.5Q39 7 43 4.5" stroke="#7A3E0C" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 6. HIERBA EN SILUETA DORADA EN EL BORDE INFERIOR -->
    <g fill="#DFC263">
      <path d="M268 200Q274 182 284 176Q279 188 277 200Z"/>
      <path d="M277 200Q287 186 297 182Q289 191 285 200Z"/>
      <path d="M364 200Q370 180 382 174Q376 187 374 200Z"/>
      <path d="M374 200Q386 184 398 182Q387 192 382 200Z"/>
      <path d="M438 200Q444 184 454 178Q448 189 446 200Z"/>
    </g>
  </svg>`,
  dim: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. CIELO NOCTURNO Y SILUETA DE FONDO -->
    <rect width="540" height="200" fill="#243D51"/>
    <path d="M0 164Q95 132 195 156T410 144T540 158V200H0Z" fill="#1C3142"/>
    <path d="M0 178Q140 162 280 176T540 170V200H0Z" fill="#162736"/>

    <!-- Luna con halo luminoso -->
    <g id="luna-geen">
      <circle cx="48" cy="48" r="36" fill="#00B2C1" opacity="0.12"/>
      <circle cx="48" cy="48" r="24" fill="#00B2C1" opacity="0.2"/>
      <path d="M56 26A22 22 0 0 0 56 70A34 34 0 0 1 56 26Z" fill="#00B2C1"/>
    </g>
    
    <g fill="#FFFFFF" opacity="0.45">
      <circle cx="136" cy="28" r="1.4"/>
      <circle cx="216" cy="20" r="1.2"/>
      <circle cx="328" cy="30" r="1.4"/>
      <circle cx="438" cy="24" r="1.5"/>
      <circle cx="498" cy="38" r="1.2"/>
      <circle cx="104" cy="78" r="1.1"/>
      <path d="M174 36L175.2 39.8L179 41L175.2 42.2L174 46L172.8 42.2L169 41L172.8 39.8Z" opacity="0.75"/>
      <path d="M392 42L393 45L396 46L393 47L392 50L391 47L388 46L391 45Z" opacity="0.7"/>
    </g>

    <!-- 2. LUCIÉRNAGAS LUMINOSAS -->
    <g class="fa-firefly fa-ff1">
      <circle cx="114" cy="116" r="10" fill="#C0CD29" opacity="0.18"/>
      <circle cx="114" cy="116" r="5" fill="#FFDC2F" opacity="0.38"/>
      <circle cx="114" cy="116" r="2.2" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff2">
      <circle cx="164" cy="58" r="8.5" fill="#C0CD29" opacity="0.18"/>
      <circle cx="164" cy="58" r="4.2" fill="#FFDC2F" opacity="0.35"/>
      <circle cx="164" cy="58" r="2" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff3">
      <circle cx="322" cy="70" r="10.5" fill="#FFDC2F" opacity="0.2"/>
      <circle cx="322" cy="70" r="5.2" fill="#FFDC2F" opacity="0.42"/>
      <circle cx="322" cy="70" r="2.3" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff4">
      <circle cx="194" cy="144" r="9" fill="#C0CD29" opacity="0.18"/>
      <circle cx="194" cy="144" r="4.5" fill="#FFDC2F" opacity="0.35"/>
      <circle cx="194" cy="144" r="2.1" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff5">
      <circle cx="348" cy="144" r="9" fill="#C0CD29" opacity="0.18"/>
      <circle cx="348" cy="144" r="4.5" fill="#FFDC2F" opacity="0.36"/>
      <circle cx="348" cy="144" r="2" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff6">
      <circle cx="482" cy="72" r="8.5" fill="#FFDC2F" opacity="0.18"/>
      <circle cx="482" cy="72" r="4.2" fill="#FFDC2F" opacity="0.35"/>
      <circle cx="482" cy="72" r="2" fill="#FFFBE0"/>
    </g>

    <!-- 3. FOLLAJE SUTIL IZQUIERDO -->
    <g opacity="0.55">
      <path d="M-4 156C16 144 34 148 48 158" stroke="#132330" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(26 149) rotate(-32) scale(0.75)">
        <path d="M0 0C5-11 27-12 44 0C27 12 5 11 0 0Z" fill="#007A85"/>
        <path d="M4 0H37" stroke="#00B2C1" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(12 153) rotate(-65) scale(0.65)">
        <path d="M0 0C5-11 27-12 44 0C27 12 5 11 0 0Z" fill="#2E6F40"/>
        <path d="M4 0H37" stroke="#5CAE4B" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 4. RAMA Y FLORES NOCTURNAS EN PERSPECTIVA (Derecha) -->
    <g id="entorno-nocturno">
      <path d="M546 144C484 146 432 132 388 114" stroke="#132330" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M436 130Q426 108 432 90" stroke="#2D6A4F" stroke-width="3" stroke-linecap="round"/>
      <path d="M394 116Q378 108 368 104" stroke="#2D6A4F" stroke-width="3" stroke-linecap="round"/>

      <g transform="translate(508 142) rotate(-42) scale(0.92)">
        <path d="M0 0C5-11 27-12 44 0C27 12 5 11 0 0Z" fill="#2E6F40"/>
        <path d="M4 0H37" stroke="#5CAE4B" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(460 137) rotate(32) scale(0.95)">
        <path d="M0 0C6-11 28-12 46 0C28 12 6 11 0 0Z" fill="#007A85"/>
        <path d="M5 0H38" stroke="#00B2C1" stroke-width="2" stroke-linecap="round"/>
      </g>

      <g transform="translate(364 102) rotate(-28)">
        <ellipse cx="-6" cy="-10" rx="6" ry="13" fill="#DDD7C5" transform="rotate(-32 -6 -10)"/>
        <ellipse cx="6" cy="-10" rx="6" ry="13" fill="#DDD7C5" transform="rotate(32 6 -10)"/>
        <ellipse cx="-8" cy="-8" rx="6.5" ry="14" fill="#F7F3E6" transform="rotate(-55 -8 -8)"/>
        <ellipse cx="0" cy="-12" rx="6.5" ry="15" fill="#FFFDF7"/>
        <ellipse cx="8" cy="-8" rx="6.5" ry="14" fill="#F7F3E6" transform="rotate(55 8 -8)"/>
        <path d="M0 0L-3 -11M0 0L0 -13M0 0L3 -11" stroke="#EAB308" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="-3" cy="-11" r="1.4" fill="#FFDC2F"/>
        <circle cx="0" cy="-13" r="1.4" fill="#FFDC2F"/>
        <circle cx="3" cy="-11" r="1.4" fill="#FFDC2F"/>
        <path d="M-7 2Q0 -5 7 2L3 7H-3Z" fill="#3E9047"/>
      </g>

      <g transform="translate(433 86) rotate(14) scale(0.84)">
        <ellipse cx="-6" cy="-10" rx="6" ry="13" fill="#DDD7C5" transform="rotate(-32 -6 -10)"/>
        <ellipse cx="6" cy="-10" rx="6" ry="13" fill="#DDD7C5" transform="rotate(32 6 -10)"/>
        <ellipse cx="-8" cy="-8" rx="6.5" ry="14" fill="#F7F3E6" transform="rotate(-55 -8 -8)"/>
        <ellipse cx="0" cy="-12" rx="6.5" ry="15" fill="#FFFDF7"/>
        <ellipse cx="8" cy="-8" rx="6.5" ry="14" fill="#F7F3E6" transform="rotate(55 8 -8)"/>
        <circle cx="0" cy="-7" r="3.2" fill="#FFDC2F"/>
        <path d="M-7 2Q0 -5 7 2L3 7H-3Z" fill="#3E9047"/>
      </g>
    </g>

    <!-- 5. ESTELA DE VUELO Y PERSONAJE: GEEN -->
    <path d="M188 112Q208 114 222 104" stroke="#FFE9A8" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2 6" opacity="0.45"/>
    <g class="fa-glide">
      <g transform="translate(248 92) rotate(16)">
        <path d="M-4 4C-24 2-42 14-36 30C-30 42-10 38-2 18Z" fill="#E8C568" stroke="#B89038" stroke-width="2"/>
        <path d="M4 4C24 2 42 14 36 30C30 42 10 38 2 18Z" fill="#E8C568" stroke="#B89038" stroke-width="2"/>
        <circle cx="-22" cy="24" r="3" fill="#002A3F"/>
        <circle cx="22" cy="24" r="3" fill="#002A3F"/>

        <path d="M-4 -4C-24 -34-64 -38-70 -14C-74 4-44 16-4 6Z" fill="#FFF0B8" stroke="#C9A24A" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M4 -4C24 -34 64 -38 70 -14C74 4 44 16 4 6Z" fill="#FFF0B8" stroke="#C9A24A" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="-48" cy="-14" r="6.5" fill="#00B2C1"/>
        <circle cx="-48" cy="-14" r="3" fill="#002A3F"/>
        <circle cx="48" cy="-14" r="6.5" fill="#00B2C1"/>
        <circle cx="48" cy="-14" r="3" fill="#002A3F"/>
        <circle cx="-30" cy="-4" r="2.8" fill="#C9A24A"/>
        <circle cx="30" cy="-4" r="2.8" fill="#C9A24A"/>

        <ellipse cx="0" cy="8" rx="6.5" ry="17" fill="#D9B45B"/>
        <path d="M-5 4H5M-5 10H5M-4 16H4" stroke="#B89038" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="0" cy="-11" r="7.5" fill="#E8C568"/>

        <circle cx="-3.2" cy="-12" r="2.4" fill="#002A3F"/>
        <circle cx="-3.8" cy="-12.8" r="0.8" fill="#FFFFFF"/>
        <circle cx="3.2" cy="-12" r="2.4" fill="#002A3F"/>
        <circle cx="2.6" cy="-12.8" r="0.8" fill="#FFFFFF"/>

        <path d="M-3 -17Q-10 -30 -20 -31M3 -17Q10 -30 20 -31" stroke="#FFE9A8" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="-20" cy="-31" r="2" fill="#FFE9A8"/>
        <circle cx="20" cy="-31" r="2" fill="#FFE9A8"/>
      </g>
    </g>

    <!-- 6. VEGETACIÓN EN SILUETA EN EL BORDE INFERIOR -->
    <g fill="#12212E">
      <path d="M148 200Q154 180 164 174Q160 186 158 200Z"/>
      <path d="M158 200Q168 184 178 180Q170 190 166 200Z"/>
      <path d="M276 200Q282 182 290 176Q286 188 285 200Z"/>
      <path d="M284 200Q294 186 304 184Q295 192 291 200Z"/>
      <path d="M396 200Q402 178 414 172Q408 186 406 200Z"/>
      <path d="M406 200Q418 184 430 182Q418 191 413 200Z"/>
      <path d="M486 200Q492 182 504 178Q497 189 495 200Z"/>
    </g>
  </svg>`,
  offline: `<svg viewBox="0 0 540 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <!-- 1. CIELO NOCTURNO Y SILUETA DE FONDO -->
    <rect width="540" height="200" fill="#243D51"/>
    <path d="M0 156Q115 124 235 148T440 136T540 150V200H0Z" fill="#1C3142"/>
    <path d="M0 174Q150 158 300 172T540 166V200H0Z" fill="#162736"/>

    <!-- Luna creciente turquesa con halo luminoso -->
    <g id="luna-reposo">
      <circle cx="468" cy="48" r="36" fill="#00B2C1" opacity="0.12"/>
      <circle cx="468" cy="48" r="24" fill="#00B2C1" opacity="0.2"/>
      <path d="M474 26A22 22 0 0 0 474 70A34 34 0 0 1 474 26Z" fill="#00B2C1"/>
    </g>

    <!-- Estrellas blancas sutiles y destellos de 4 puntas -->
    <g fill="#FFFFFF" opacity="0.5">
      <circle cx="84" cy="34" r="1.4"/>
      <circle cx="152" cy="24" r="1.2"/>
      <circle cx="224" cy="48" r="1.3"/>
      <circle cx="344" cy="22" r="1.4"/>
      <circle cx="412" cy="72" r="1.2"/>
      <circle cx="512" cy="36" r="1.3"/>
      <path d="M118 42L119.2 45.8L123 47L119.2 48.2L118 52L116.8 48.2L113 47L116.8 45.8Z" opacity="0.75"/>
      <path d="M398 32L399 35L402 36L399 37L398 40L397 37L394 36L397 35Z" opacity="0.7"/>
    </g>

    <!-- 2. LUCIÉRNAGAS LUMINOSAS DORADAS -->
    <g class="fa-firefly fa-ff1">
      <circle cx="128" cy="96" r="10" fill="#C0CD29" opacity="0.18"/>
      <circle cx="128" cy="96" r="5" fill="#FFDC2F" opacity="0.38"/>
      <circle cx="128" cy="96" r="2.2" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff2">
      <circle cx="184" cy="64" r="8.5" fill="#C0CD29" opacity="0.18"/>
      <circle cx="184" cy="64" r="4.2" fill="#FFDC2F" opacity="0.35"/>
      <circle cx="184" cy="64" r="2" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff3">
      <circle cx="392" cy="94" r="9.5" fill="#FFDC2F" opacity="0.2"/>
      <circle cx="392" cy="94" r="4.8" fill="#FFDC2F" opacity="0.4"/>
      <circle cx="392" cy="94" r="2.1" fill="#FFFBE0"/>
    </g>
    <g class="fa-firefly fa-ff4">
      <circle cx="164" cy="142" r="8.5" fill="#C0CD29" opacity="0.18"/>
      <circle cx="164" cy="142" r="4.2" fill="#FFDC2F" opacity="0.35"/>
      <circle cx="164" cy="142" r="2" fill="#FFFBE0"/>
    </g>

    <!-- 3. TRONCO NOCTURNO Y FOLLAJE EN VERDE BOSQUE Y TURQUESA -->
    <g id="tronco-offline">
      <path d="M-15 152C145 138 385 138 555 154" stroke="#132330" stroke-width="19" stroke-linecap="round"/>
      <path d="M-15 145C145 131 385 131 555 147" stroke="#1F3547" stroke-width="5" stroke-linecap="round"/>

      <path d="M446 142Q474 118 504 106" stroke="#132330" stroke-width="6" stroke-linecap="round"/>
      <g transform="translate(502 106) rotate(-25) scale(0.92)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#007A85"/>
        <path d="M5 0H40" stroke="#00B2C1" stroke-width="2" stroke-linecap="round"/>
      </g>
      <g transform="translate(482 116) rotate(22) scale(0.8)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#2E6F40"/>
        <path d="M5 0H40" stroke="#5CAE4B" stroke-width="2" stroke-linecap="round"/>
      </g>

      <path d="M124 144Q100 122 74 112" stroke="#132330" stroke-width="5.5" stroke-linecap="round"/>
      <g transform="translate(76 112) rotate(-155) scale(0.88)">
        <path d="M0 0C6-12 30-13 48 0C30 13 6 12 0 0Z" fill="#2E6F40"/>
        <path d="M5 0H40" stroke="#5CAE4B" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 4. PERSONAJE: CURRUCUTÚ DURMIENDO BAJO LA LUNA -->
    <g transform="translate(0 11)">
      <path d="M258 122V129M266 122V129M274 122V129M282 122V129" stroke="#0B1620" stroke-width="3.2" stroke-linecap="round"/>

      <g class="fa-iguana-breathe">
        <path d="M244 48L240 28Q248 28 258 40Z" fill="#5D6F82" stroke="#5D6F82" stroke-width="4" stroke-linejoin="round"/>
        <path d="M296 48L300 28Q292 28 282 40Z" fill="#5D6F82" stroke="#5D6F82" stroke-width="4" stroke-linejoin="round"/>

        <path d="M270 40C296 40 304 56 303 72C312 82 310 108 296 122C288 128 252 128 244 122C230 108 228 82 237 72C236 56 244 40 270 40Z" fill="#778A9E"/>

        <ellipse cx="270" cy="104" rx="21" ry="21" fill="#F5ECD4"/>
        <path d="M262 98l4 4l4-4M274 98l4 4l4-4M266 110l4 4l4-4" stroke="#C9BC9B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

        <path d="M240 80C230 98 234 118 252 124C254 106 252 92 247 82Z" fill="#5D6F82"/>
        <path d="M300 80C310 98 306 118 288 124C286 106 288 92 293 82Z" fill="#5D6F82"/>

        <circle cx="256" cy="68" r="14.5" fill="#F5ECD4"/>
        <circle cx="284" cy="68" r="14.5" fill="#F5ECD4"/>

        <path d="M249 68Q256 74 263 68M277 68Q284 74 291 68" stroke="#0B1620" stroke-width="3" stroke-linecap="round"/>

        <path d="M266.5 75h7L270 82Z" fill="#0B1620" stroke="#0B1620" stroke-width="2" stroke-linejoin="round"/>
      </g>

      <path class="fa-z fa-z1" d="M314 44h8l-8 9h8" stroke="#CBD5E1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="fa-z fa-z2" d="M336 30h11l-11 12.5h11" stroke="#CBD5E1" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="fa-z fa-z3" d="M362 10h15l-15 17h15" stroke="#CBD5E1" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- 5. VEGETACIÓN EN SILUETA EN EL BORDE INFERIOR -->
    <g fill="#12212E">
      <path d="M206 200Q212 180 222 174Q217 187 215 200Z"/>
      <path d="M215 200Q225 185 235 181Q227 190 223 200Z"/>
      <path d="M394 200Q400 178 412 172Q406 186 404 200Z"/>
      <path d="M404 200Q416 184 428 182Q417 192 412 200Z"/>
    </g>
  </svg>`,
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
    name: "Periquito barbinaranja y canario costeño",
    rule: "2. Ruido sobre 60 dB",
    sci: "Brotogeris jugularis y Sicalis flaveola",
    family: "Aves diurnas · Psittacidae y Thraupidae",
    iucn: "IUCN: Preocupación menor (LC)",
    dist: "Neotrópico y norte de Suramérica (dos de las aves más abundantes del campus).",
    desc: "El periquito barbinaranja es un loro verde pequeño que forma bandadas ruidosas y es la segunda ave más abundante del campus. El canario costeño destaca por su plumaje amarillo brillante y canto melodioso; ambos dispersan semillas."
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
    name: "Geen",
    rule: "6. Menos de 120 lx",
    sci: "Macaria triplicaria",
    family: "Insecto nocturno · Geometridae",
    iucn: "IUCN: No evaluado",
    dist: "Neotrópico, en áreas boscosas y suburbanas de Centro y Suramérica.",
    desc: "Polilla nocturna registrada en la guía institucional como «geen» al no contar con un nombre común estandarizado. Sus larvas se alimentan de hojas de plantas nativas y los adultos sirven de alimento a aves y murciélagos."
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

