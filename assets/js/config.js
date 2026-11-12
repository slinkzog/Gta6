/*
 * NEON COAST — stream package config
 * ------------------------------------------------------------
 * Edit the defaults below, OR override any value per-scene with
 * URL parameters in your OBS browser source, e.g.
 *   screens/starting.html?name=SlinkZ&countdown=5&twitter=slinkz
 */
window.NC_DEFAULTS = {
  name: "YOUR NAME",              // channel / streamer name
  tagline: "Live from the Neon Coast",
  countdown: 5,                    // minutes on the Starting Soon timer (0 = hide)
  twitch: "yourchannel",
  twitter: "yourhandle",
  youtube: "yourchannel",
  tiktok: "yourhandle",
  discord: "discord.gg/yourinvite",
  station: "NEON FM 104.2",        // fake radio station shown in the "Now Playing" widget
  song: "Night Drive — Synthwave Mix",
  schedule: "MON / WED / FRI — 8PM",
  goal: 100,                       // follower / sub goal shown in the HUD money counter
  goalNow: 64,
  goalLabel: "FOLLOWER GOAL",
  // Rotating "loading screen" tips on the Starting Soon screen
  tips: [
    "Grab a drink and get comfy — the city never sleeps.",
    "Drop a follow so you don't miss the next heist.",
    "Be cool in chat. The cops are watching.",
    "Hit that hype button when we roll out.",
    "Join the Discord to squad up after stream.",
  ],
};

window.NC = (function () {
  const cfg = Object.assign({}, window.NC_DEFAULTS);
  const params = new URLSearchParams(location.search);
  for (const [k, v] of params) {
    if (k === "tips") cfg.tips = v.split("|");
    else if (typeof cfg[k] === "number") cfg[k] = Number(v);
    else cfg[k] = v;
  }
  return cfg;
})();
