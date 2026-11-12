/*
 * NEON COAST — stream package config
 * ------------------------------------------------------------
 * Edit the defaults below, OR override any value per-scene with
 * URL parameters in your OBS browser source, e.g.
 *   screens/starting.html?name=SlinkZ&countdown=5&twitter=slinkz
 */
window.NC_DEFAULTS = {
  name: "YOUR NAME",              // channel / streamer name
  tagline: "Live from South Beach",
  countdown: 5,                    // minutes on the Starting Soon timer (0 = hide)
  twitch: "yourchannel",
  twitter: "yourhandle",
  youtube: "yourchannel",
  tiktok: "yourhandle",
  discord: "discord.gg/yourinvite",
  station: "OCEAN FM 98.6",        // fake radio station shown in the "Now Playing" widget
  hotelLeft: "CORAL",              // neon signs on the art-deco hotels
  hotelRight: "PALMS",
  song: "Miami Nights — Synthwave Mix",
  schedule: "MON / WED / FRI — 8PM",
  goal: 100,                       // follower / sub goal shown in the HUD money counter
  goalNow: 64,
  goalLabel: "FOLLOWER GOAL",
  wanted: 3,                       // wanted stars on the HUD (1-5)
  cash: 1000000,                   // payout counted up on the Mission Passed screen
  wastedText: "WASTED",            // big word on screens/wasted.html (try BUSTED)
  // Mission-style subtitles. Wrap words in {braces} to highlight them. {name} = your name.
  missionStart: [
    "Get to the {stream} and wait for {{name}}.",
    "Lose the {cops} and meet the crew on {Ocean Drive}.",
  ],
  missionBrb: [
    "{{name}} stepped out. Stay in the {car}.",
    "Grab a {mojito} and hold the beach until the {crew} returns.",
  ],
  missionEnd: [
    "Go to the {Discord} and lay low at the {beach house} until next time.",
  ],
  missionWasted: [
    "Technical difficulties. {{name}} is respawning at the {hospital}.",
  ],
  // Rotating "loading screen" tips on the Starting Soon screen
  tips: [
    "Grab a cold drink. It's 90° and humid on Ocean Drive.",
    "Drop a follow so you don't miss the next heist.",
    "Be cool in chat. Miami PD is watching.",
    "Hit that hype button when we roll out.",
    "Join the Discord to squad up after stream.",
    "Sunscreen on, windows down, radio up.",
  ],
};

window.NC = (function () {
  const cfg = Object.assign({}, window.NC_DEFAULTS);
  const params = new URLSearchParams(location.search);
  for (const [k, v] of params) {
    if (Array.isArray(cfg[k])) cfg[k] = v.split("|");
    else if (typeof cfg[k] === "number") cfg[k] = Number(v);
    else cfg[k] = v;
  }
  return cfg;
})();
