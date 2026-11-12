# NEON COAST — GTA6-inspired animated stream package

A fully animated, Miami-at-sunset style stream package built as HTML/CSS browser sources for **OBS / Streamlabs**.
No images, videos or installs — everything (sunset, skyline, palm trees, synthwave grid, passing sports car, neon text) is drawn and animated in code, so it stays crisp at any resolution.

> Fan-made theme inspired by the GTA6 vibe. It uses no official Rockstar logos, fonts or artwork.

## What's included

| Scene | File | Animated bits |
|---|---|---|
| Starting Soon | `screens/starting.html` | Drop-in neon title, live countdown, loading bar, rotating tips, mission subtitle, **wanted level that climbs from 1 to 5 stars** as the countdown runs |
| Be Right Back | `screens/brb.html` | Bouncing title, looping loading bar, radio widget, phone with your socials, mission subtitle |
| Stream Ending | `screens/ending.html` | **MISSION PASSED** slam-in with glitch, **+RESPECT** pop, cash payout counting up, wanted level cleared, next stream schedule |
| Offline | `screens/offline.html` | Offline title, schedule card, phone with your socials as contacts |
| Wasted / Busted | `screens/wasted.html` | Technical-difficulties screen: scene drains to grayscale and zooms, red **WASTED** fades in, letterbox bars, "Respawning" spinner. Add `?wastedText=BUSTED` for the other one |
| Just Chatting | `overlays/just-chatting.html` | Big neon webcam frame, chat panel, animated follower-goal meter |
| Gameplay overlay | `overlays/gameplay.html` | **Transparent** game HUD: radar minimap with blips and flashing police edge, health / armour bars, clock, `$` goal counter with `+$` pickups, wanted stars, webcam frame, radio widget |

Every full scene is a Miami beach at sunset: a pastel sky with drifting clouds and a striped retro sun, a hazy skyline across the bay, a turquoise ocean with a shimmering sun reflection and a speedboat leaving a wake, surf washing onto the sand, flamingos dipping their heads, a rainbow lifeguard tower with a flapping flag, and two pastel art-deco hotels with neon outlines and chasing neon signs. Up front, palm trees sway over Ocean Drive while a sports car is chased by a police cruiser with flashing lights (the whole scene flashes red and blue as they pass), and a police helicopter sweeps its searchlight overhead. On top of that there's a scrolling socials ticker and a colour-bar wipe intro.

**Scene options** (add to a scene's `<div class="scene" data-scene ...>`): `data-hotels="false"`, `data-beach="false"`, `data-palms="false"`, `data-road="false"`, `data-heli="false"`, or `data-grid="true"` to bring back the synthwave neon grid.

Open `index.html` in a browser to preview everything at once.

## Setup in OBS

1. Download / clone this folder somewhere permanent on your PC.
2. In OBS add a **Browser** source → tick **Local file** → pick e.g. `screens/starting.html`.
3. Set **Width 1920**, **Height 1080**.
4. Tick **Refresh browser when scene becomes active** (restarts the intro animations and countdown each time you switch to the scene).
5. Repeat for each scene.

**Webcam positions (1920×1080 canvas)** — put your camera source *above* the browser source:

| Overlay | Webcam box | Other |
|---|---|---|
| `overlays/gameplay.html` | x 50, y 50, 480 × 270 | Put the overlay above your game capture |
| `overlays/just-chatting.html` | x 60, y 150, 1240 × 698 | Chat browser source / dock at x 1360, y 150, 500 × 698 |

## Customise it

Edit the defaults at the top of `assets/js/config.js` (name, socials, schedule, countdown length, radio station, song, goal, tips).

Or override anything per scene with URL parameters — handy because you can use one copy of the files for everything. In OBS untick **Local file** and use a `file:///` URL:

```
file:///C:/Streaming/neon-coast/screens/starting.html?name=SlinkZ&countdown=10&twitter=slinkz&discord=discord.gg/abc
```

| Param | Example | What it does |
|---|---|---|
| `name` | `SlinkZ` | Channel name in badges / cam tag |
| `tagline` | `Live from the coast` | Line under your name |
| `countdown` | `10` | Starting Soon timer in minutes (`0` hides it) |
| `twitch`, `twitter`, `youtube`, `tiktok`, `discord` | `slinkz` | Ticker entries (leave empty to hide one) |
| `schedule` | `TUE / THU — 7PM` | Schedule on the ticker, Ending and Offline screens |
| `station`, `song` | `OCEAN FM 98.6` | Radio "Now Playing" widget |
| `hotelLeft`, `hotelRight` | `CORAL`, `PALMS` | Neon signs on the art-deco hotels (short words fit best) |
| `goal`, `goalNow`, `goalLabel` | `100`, `64`, `SUB GOAL` | Goal meter / HUD money counter |
| `tips` | `Tip one\|Tip two` | Starting Soon tips, separated by `\|` |
| `missionStart`, `missionBrb`, `missionEnd`, `missionWasted` | `Get to the {stream}\|Lose the {cops}` | Mission subtitles. `{word}` is highlighted yellow, `{name}` becomes your name |
| `wanted` | `4` | Wanted stars on BRB / gameplay / just chatting |
| `cash` | `250000` | Payout on the Mission Passed screen |
| `wastedText` | `BUSTED` | Big word on the Wasted screen |

Colours live as CSS variables at the top of `assets/css/theme.css` (`--pink`, `--teal`, `--yellow`, …) if you want to re-tint the whole pack.

## GTA font

**All text** in the pack (headlines, neon script lines, mission subtitles, tips, ticker, phone, HUD and widgets) uses **Pricedown**, the GTA logo font.
It's licensed, so it isn't in this repo. Install it on your PC or drop the file into `assets/fonts/`; see
[`assets/fonts/README.md`](assets/fonts/README.md). Without it the pack falls back to its original fonts (Anton, Pacifico, Rajdhani), and headlines
automatically shrink to fit whichever font is in use.

Fonts (Anton, Pacifico, Rajdhani) load from Google Fonts, so the PC needs an internet connection the first time.
