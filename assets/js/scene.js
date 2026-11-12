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

  /* ---------- police cruiser (generic, black & white with lightbar) ---------- */
  function copSVG() {
    return `<svg viewBox="0 0 420 130" class="car-svg">
      <path d="M18 96 C 20 78, 40 70, 76 66 L 128 40 C 150 30, 262 30, 286 40 L 340 66 C 382 70, 402 80, 404 96 L 400 106 L 22 106 Z" fill="#f2f2f2"/>
      <path d="M22 84 L 402 84 L 400 106 L 22 106 Z" fill="#111"/>
      <path d="M140 44 C 160 37, 255 36, 278 44 L 300 66 L 120 66 Z" fill="#0e1226"/>
      <rect x="196" y="22" width="56" height="12" rx="3" fill="#222"/>
      <rect x="198" y="24" width="25" height="8" rx="2" class="lb-red"/>
      <rect x="225" y="24" width="25" height="8" rx="2" class="lb-blue"/>
      <rect x="390" y="76" width="14" height="7" rx="3" fill="#fff6c8"/>
      <circle cx="98" cy="106" r="22" fill="#05030a"/><circle cx="98" cy="106" r="9" fill="#888"/>
      <circle cx="330" cy="106" r="22" fill="#05030a"/><circle cx="330" cy="106" r="9" fill="#888"/>
    </svg>`;
  }
  function heliSVG() {
    return `<svg viewBox="0 0 260 110" class="heli-svg">
      <rect class="rotor" x="10" y="8" width="230" height="5" rx="2" fill="#0b0414"/>
      <rect x="122" y="10" width="6" height="16" fill="#0b0414"/>
      <path d="M70 40 C 80 22, 150 20, 168 30 L 176 44 C 180 66, 160 78, 120 78 L 86 78 C 66 78, 60 58, 70 40 Z" fill="#0b0414"/>
      <path d="M150 34 C 160 36, 168 42, 170 50 L 146 50 Z" fill="#57e7ff" opacity=".55"/>
      <path d="M86 50 L 10 44 L 6 36 L 0 36 L 4 58 L 10 58 L 86 62 Z" fill="#0b0414"/>
      <rect class="tail-rotor" x="0" y="30" width="5" height="34" fill="#0b0414"/>
      <path d="M90 84 L 170 84 M100 78 L 96 84 M150 78 L 154 84" stroke="#0b0414" stroke-width="4"/>
      <circle cx="104" cy="78" r="3" class="heli-strobe"/>
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
      const cop = el("div", "car cop", root);
      cop.innerHTML = copSVG();
      el("div", "cop-glow", root); // red/blue wash when the chase passes
    }

    // police helicopter with a sweeping searchlight
    if (opt.heli !== "false") {
      const h = el("div", "heli", root);
      el("div", "searchlight", h);
      const body = el("div", "heli-body", h);
      body.innerHTML = heliSVG();
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

  /* wanted level: data-wanted="auto" climbs with the countdown, a number fixes it */
  function wanted() {
    $$("[data-wanted]").forEach((w) => {
      w.classList.add("wanted");
      for (let i = 0; i < 5; i++) el("span", "", w).textContent = "★";
      const stars = $$("span", w);
      const set = (n) => stars.forEach((s, i) => s.classList.toggle("on", i < n));
      const fixed = w.dataset.wanted;
      if (fixed !== "auto") { setTimeout(() => set(fixed === "" ? Number(C.wanted) || 0 : Number(fixed)), 900); return; }
      const mins = Number(C.countdown) || 5;
      const start = Date.now();
      const tick = () => set(Math.min(5, 1 + Math.floor(((Date.now() - start) / (mins * 60000)) * 5)));
      tick();
      setInterval(tick, 1000);
    });
  }

  /* mission-style subtitle: {word} is highlighted, words fade in one by one */
  function mission() {
    $$("[data-mission]").forEach((m) => {
      const lines = [].concat(C[m.dataset.mission] || []);
      if (!lines.length) return;
      let i = 0;
      const show = () => {
        const txt = lines[i++ % lines.length].split("{name}").join(C.name);
        m.innerHTML = "";
        let hl = false, n = 0;
        txt.split(/([{}])/).forEach((part) => {
          if (part === "{") { hl = true; return; }
          if (part === "}") { hl = false; return; }
          part.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            const s = el("span", hl ? "hl" : "", m);
            s.textContent = w;
            s.style.animationDelay = (n++ * 0.06).toFixed(2) + "s";
          });
        });
      };
      show();
      if (lines.length > 1) setInterval(show, 8000);
    });
  }

  /* phone widget: socials as contacts */
  function phone() {
    $$("[data-phone]").forEach((p) => {
      const apps = [
        C.twitch && ["T", "Twitch", C.twitch, "#9146ff"],
        C.twitter && ["X", "X", "@" + C.twitter, "#222"],
        C.youtube && ["▶", "YouTube", C.youtube, "#ff0033"],
        C.tiktok && ["♪", "TikTok", "@" + C.tiktok, "#00b3b8"],
        C.discord && ["D", "Discord", C.discord, "#5865f2"],
      ].filter(Boolean);
      p.innerHTML = `<div class="ph-notch"></div><div class="ph-top"><span data-clock>00:00</span><span>▮▮▮ 92%</span></div>
        <div class="ph-title">CONTACTS</div>
        ${apps.map(([g, n, v, c], i) => `<div class="ph-app" style="animation-delay:${(1.6 + i * 0.15).toFixed(2)}s"><b style="background:${c}">${g}</b><div><small>${n}</small>${v}</div></div>`).join("")}`;
    });
  }

  /* cash counter that ticks up like a mission payout */
  function cash() {
    $$("[data-cash]").forEach((c) => {
      const target = Number(C.cash) || 0;
      let t0 = null;
      const step = (t) => {
        if (t0 === null) t0 = t + 2600;
        const k = Math.max(0, Math.min(1, (t - t0) / 1600));
        c.textContent = "$" + Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString("en-US");
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
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
    phone();
    clock();
    eq();
    goal();
    wanted();
    mission();
    cash();
    document.body.classList.add("ready");
  });
})();
