# NEON COAST — GTA6-inspired animated stream package

A fully animated, vice-city-at-sunset style stream package built as HTML/CSS browser sources for **OBS / Streamlabs**.
No images, videos or installs — everything (sunset, skyline, palm trees, synthwave grid, passing sports car, neon text) is drawn and animated in code, so it stays crisp at any resolution.

> Fan-made theme inspired by the GTA6 vibe. It uses no official Rockstar logos, fonts or artwork.

## What's included

| Scene | File | Animated bits |
|---|---|---|
| Starting Soon | `screens/starting.html` | Drop-in neon title, live countdown, loading bar, rotating "loading screen" tips |
| Be Right Back | `screens/brb.html` | Bouncing title, looping loading bar, "Now Playing" radio widget |
| Stream Ending | `screens/ending.html` | **MISSION PASSED** slam-in with glitch, **+RESPECT** pop, next stream schedule |
| Offline | `screens/offline.html` | Offline title + schedule card |
| Just Chatting | `overlays/just-chatting.html` | Big neon webcam frame, chat panel, animated follower-goal meter |
| Gameplay overlay | `overlays/gameplay.html` | **Transparent** — webcam frame, HUD clock, `$` goal counter, flashing "wanted" stars, radio widget |

Every full scene also has: a sliding sunset sky, twinkling stars, drifting clouds, a striped retro sun, a city skyline with flickering windows and beacon lights, a shimmering ocean reflection, a moving neon grid, swaying palm trees, flying birds, a sports car that drives past with its headlights on, scanlines, a scrolling socials ticker and a colour-bar wipe intro.

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
| `overlays/gameplay.html` | x 50, y 650, 560 × 315 | Put the overlay above your game capture |
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
| `station`, `song` | `NEON FM 104.2` | Radio "Now Playing" widget |
| `goal`, `goalNow`, `goalLabel` | `100`, `64`, `SUB GOAL` | Goal meter / HUD money counter |
| `tips` | `Tip one\|Tip two` | Starting Soon tips, separated by `\|` |

Colours live as CSS variables at the top of `assets/css/theme.css` (`--pink`, `--teal`, `--yellow`, …) if you want to re-tint the whole pack.

Fonts (Anton, Pacifico, Rajdhani) load from Google Fonts, so the PC needs an internet connection the first time.
