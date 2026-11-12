/* NEON COAST — animated scene builder + widgets (no dependencies) */
(function () {
  const C = window.NC || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const el = (tag, cls, parent) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (parent) parent.appendChild(e);
    return e;
  };

  /* ---------- stage: keep a fixed 1920x1080 canvas, scale to fit ---------- */
  function fitStage() {
    const stage = $(".stage");
    if (!stage) return;
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `scale(${s})`;
    stage.style.left = `${(innerWidth - 1920 * s) / 2}px`;
    stage.style.top = `${(innerHeight - 1080 * s) / 2}px`;
  }

  /* ---------- palm tree SVG ---------- */
  function palmSVG(flip) {
    const fronds = [-150, -120, -95, -70, -40, -15, 10, 35, 205, 180]
      .map(
        (a, i) => `<g transform="rotate(${a})"><path class="frond" style="animation-delay:${(i * 0.37).toFixed(2)}s"
          d="M0 0 C 45 -38, 120 -34, 175 22 C 150 8, 130 4, 112 6 L 126 26 C 104 10, 88 8, 74 8 L 84 30 C 64 12, 46 8, 32 8 L 36 26 C 22 12, 12 6, 0 0 Z"/></g>`
      )
      .join("");
    return `<svg viewBox="0 0 400 760" class="palm-svg" style="${flip ? "transform:scaleX(-1)" : ""}">
      <path class="trunk" d="M190 760 C 205 600, 175 420, 230 210 L 246 214 C 196 420, 226 600, 214 760 Z"/>
      ${Array.from({ length: 14 }, (_, i) => {
        const t = i / 14, y = 740 - t * 520, x = 202 + Math.sin(t * 2.6) * 14 + t * 30;
        return `<path class="ring" d="M${x - 12} ${y} q12 6 24 0" />`;
      }).join("")}
      <g class="crown" transform="translate(238 208)">${fronds}
        <circle r="9" cx="-6" cy="10" class="coco"/><circle r="8" cx="8" cy="14" class="coco"/>
      </g>
    </svg>`;
  }

  /* ---------- sports car SVG (generic silhouette) ---------- */
  function carSVG() {
    return `<svg viewBox="0 0 420 120" class="car-svg">
      <defs><linearGradient id="carBody" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#ff3fa4"/><stop offset="1" stop-color="#7a0b52"/></linearGradient></defs>
      <path d="M20 86 C 22 70, 40 62, 80 58 L 150 30 C 175 20, 250 18, 290 34 L 340 56 C 380 60, 404 70, 408 86 L 404 96 L 24 96 Z" fill="url(#carBody)"/>
      <path d="M160 36 C 185 27, 245 26, 280 38 L 300 56 L 140 58 Z" fill="#160a2e" opacity=".9"/>
      <path d="M150 58 L 300 56" stroke="#ffd1ec" stroke-width="2" opacity=".6"/>
      <rect x="392" y="70" width="16" height="7" rx="3" fill="#fff6c8" class="headlight"/>
      <rect x="18" y="72" width="12" height="7" rx="3" fill="#ff2a2a" class="taillight"/>
      <g class="wheel"><circle cx="100" cy="96" r="22" fill="#0b0618"/><circle cx="100" cy="96" r="10" fill="#57e7ff"/></g>
      <g class="wheel"><circle cx="330" cy="96" r="22" fill="#0b0618"/><circle cx="330" cy="96" r="10" fill="#57e7ff"/></g>
    </svg>`;
  }

  /* ---------- build the background scene ---------- */
  function buildScene(root) {
    const opt = root.dataset;
    el("div", "sky", root);

    const stars = el("div", "stars", root);
    for (let i = 0; i < 120; i++) {
      const s = el("i", "", stars);
      s.style.left = rand(0, 100) + "%";
      s.style.top = rand(0, 55) + "%";
      const z = rand(1, 3);
      s.style.width = s.style.height = z + "px";
      s.style.animationDelay = rand(0, 4) + "s";
      s.style.animationDuration = rand(2, 5) + "s";
    }

    const sun = el("div", "sun", root);
    el("div", "sun-glow", sun);
    el("div", "sun-disc", sun);

    // clouds drifting across the sunset
    const clouds = el("div", "clouds", root);
    for (let i = 0; i < 6; i++) {
      const c = el("div", "cloud", clouds);
      c.style.top = rand(8, 40) + "%";
      c.style.width = rand(260, 520) + "px";
      c.style.animationDuration = rand(70, 140) + "s";
      c.style.animationDelay = -rand(0, 140) + "s";
      c.style.opacity = rand(0.25, 0.6);
    }

    // skyline with flickering windows
    const sky = el("div", "skyline", root);
    let x = 0;
    while (x < 1920) {
      const w = rand(50, 130);
      const h = rand(80, 330) * (Math.abs(x - 960) < 420 ? 1.25 : 1);
      const b = el("div", "bldg", sky);
      b.style.left = x + "px";
      b.style.width = w + "px";
      b.style.height = h + "px";
      if (Math.random() < 0.25) b.classList.add("spire");
      const n = Math.floor((w * h) / 2600);
      for (let i = 0; i < n; i++) {
        const win = el("i", "", b);
        win.style.left = Math.floor(rand(6, w - 10) / 10) * 10 + "px";
        win.style.top = Math.floor(rand(10, h - 10) / 14) * 14 + "px";
        if (Math.random() < 0.3) {
          win.classList.add("flick");
          win.style.animationDelay = rand(0, 8) + "s";
          win.style.animationDuration = rand(3, 9) + "s";
        }
        if (Math.random() < 0.3) win.classList.add("teal");
      }
      x += w + rand(-12, 6);
    }

    // ocean with sun reflection
    const sea = el("div", "sea", root);
    const refl = el("div", "reflection", sea);
    for (let i = 0; i < 16; i++) {
      const r = el("i", "", refl);
      r.style.top = i * 6.2 + "%";
      r.style.width = 320 - i * 14 + rand(-30, 30) + "px";
      r.style.animationDelay = rand(0, 3) + "s";
    }

    // perspective neon grid (synthwave floor)
    if (opt.grid !== "false") {
      const g = el("div", "grid-wrap", root);
      el("div", "grid", g);
    }

    // palms
    if (opt.palms !== "false") {
      const pl = el("div", "palm palm-left", root);
      pl.innerHTML = palmSVG(false);
      const pr = el("div", "palm palm-right", root);
      pr.innerHTML = palmSVG(true);
      const pl2 = el("div", "palm palm-left2", root);
      pl2.innerHTML = palmSVG(false);
    }

    // road + passing car
    if (opt.road !== "false") {
      const road = el("div", "road", root);
      el("div", "road-lines", road);
      const car = el("div", "car", root);
      car.innerHTML = carSVG();
    }

    // birds
    const birds = el("div", "birds", root);
    for (let i = 0; i < 5; i++) {
      const b = el("i", "", birds);
      b.style.top = rand(0, 60) + "px";
      b.style.left = i * rand(28, 44) + "px";
      b.style.animationDelay = rand(0, 1) + "s";
    }

    el("div", "haze", root);
    el("div", "scanlines", root);
    el("div", "vignette", root);
  }

  /* ---------- widgets ---------- */
  function bindText() {
    $$("[data-bind]").forEach((e) => {
      const v = C[e.dataset.bind];
      if (v !== undefined && v !== "") e.textContent = v;
    });
    $$("[data-bind-hide]").forEach((e) => {
      if (!C[e.dataset.bindHide]) e.remove();
    });
  }

  function buildTicker() {
    $$(".ticker-track").forEach((t) => {
      const items = [
        C.twitch && ["TWITCH", "twitch.tv/" + C.twitch],
        C.twitter && ["X", "@" + C.twitter],
        C.youtube && ["YOUTUBE", "youtube.com/@" + C.youtube],
        C.tiktok && ["TIKTOK", "@" + C.tiktok],
        C.discord && ["DISCORD", C.discord],
        C.schedule && ["SCHEDULE", C.schedule],
      ].filter(Boolean);
      const html = items
        .map(([k, v]) => `<span class="tk"><b>${k}</b>${v}</span><span class="tk-star">★</span>`)
        .join("");
      t.innerHTML = `<div class="tk-run">${html.repeat(3)}</div><div class="tk-run">${html.repeat(3)}</div>`;
    });
  }

  function countdown() {
    const box = $("[data-countdown]");
    if (!box) return;
    const mins = Number(C.countdown);
    if (!mins) { box.style.display = "none"; return; }
    const end = Date.now() + mins * 60000;
    const bar = $("[data-progress]");
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      box.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      if (bar) bar.style.width = (100 - (left / (mins * 60000)) * 100).toFixed(2) + "%";
      if (left <= 0) {
        box.textContent = "ROLLING OUT";
        box.classList.add("done");
        return;
      }
      requestAnimationFrame(() => setTimeout(tick, 250));
    };
    tick();
  }

  function tips() {
    const t = $("[data-tips]");
    if (!t || !C.tips || !C.tips.length) return;
    let i = 0;
    const show = () => {
      t.classList.remove("in");
      setTimeout(() => {
        t.textContent = C.tips[i++ % C.tips.length];
        t.classList.add("in");
      }, 450);
    };
    show();
    setInterval(show, 7000);
  }

  function clock() {
    const els = $$("[data-clock]");
    if (!els.length) return;
    const tick = () => {
      const d = new Date();
      const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      els.forEach((e) => (e.textContent = t));
    };
    tick();
    setInterval(tick, 1000);
  }

  function eq() {
    $$("[data-eq]").forEach((e) => {
      for (let i = 0; i < 14; i++) {
        const b = el("i", "", e);
        b.style.animationDelay = -rand(0, 1.2) + "s";
        b.style.animationDuration = rand(0.6, 1.3) + "s";
      }
    });
  }

  function goal() {
    const g = $("[data-goal]");
    if (!g) return;
    const target = Number(C.goalNow) || 0;
    const max = Number(C.goal) || 1;
    const fill = $("[data-goal-fill]");
    let cur = 0;
    const step = () => {
      cur += Math.max(1, Math.ceil((target - cur) / 12));
      if (cur > target) cur = target;
      g.textContent = `${cur.toLocaleString()} / ${max.toLocaleString()}`;
      if (fill) fill.style.width = Math.min(100, (cur / max) * 100) + "%";
      if (cur < target) setTimeout(step, 50);
    };
    setTimeout(step, 800);
  }

  // split headline text into letters for staggered neon flicker / drop-in
  function splitLetters() {
    $$("[data-split]").forEach((e) => {
      const txt = e.textContent;
      e.textContent = "";
      e.setAttribute("aria-label", txt);
      [...txt].forEach((ch, i) => {
        const s = el("span", "ch", e);
        s.textContent = ch === " " ? " " : ch;
        s.style.setProperty("--i", i);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fitStage();
    addEventListener("resize", fitStage);
    $$("[data-scene]").forEach(buildScene);
    bindText();
    splitLetters();
    buildTicker();
    countdown();
    tips();
    clock();
    eq();
    goal();
    document.body.classList.add("ready");
  });
})();
