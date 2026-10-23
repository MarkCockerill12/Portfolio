import { PortfolioData } from "./types"

const BASE_URL = "https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio"

export const defaultPortfolioData: PortfolioData = {
  projects: [
    {
      id: 32,
      title: "ScrapBook",
      description: "A website made of 27 single-screen channels, each rebuilding a different corner of internet nostalgia, from Frutiger Aero and the early web to the Wii menu and a 1996 3D chat world.",
      media: {
        images: [
          `${BASE_URL}/media/ScrapBook/map.webp`,
          `${BASE_URL}/media/ScrapBook/silicon-dreams.webp`,
          `${BASE_URL}/media/ScrapBook/frutiger-aero.webp`,
          `${BASE_URL}/media/ScrapBook/early-internet.webp`,
          `${BASE_URL}/media/ScrapBook/xbox-360.webp`,
          `${BASE_URL}/media/ScrapBook/cottagecore.webp`,
          `${BASE_URL}/media/ScrapBook/vaporwave.webp`,
          `${BASE_URL}/media/ScrapBook/academia.webp`,
          `${BASE_URL}/media/ScrapBook/wii.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/scrapbook",
      technologies: ["Next.js", "React", "TypeScript", "Three.js", "anime.js", "Zustand", "CSS Modules", "Cloudflare R2", "Playwright", "Bun"],
      details: "<p>ScrapBook is a collage of aesthetics. Each of its 27 channels is its own little world with its own layout, fonts, sounds and toys: Frutiger Aero, Early Internet, Cottagecore, the Xbox 360 dashboard, Vaporwave, Dark Academia, the Wii menu and more. You flip between them with a CRT-style channel dial, or open the map, drawn as a scrapbook lying open on a desk. The rule for every page was that no two should share any visual DNA.</p><p>Every page is interactive, with things to drag and throw, custom cursors, easter eggs, achievements, and visitor counters and guestbooks kept in the browser. All of the sound is synthesised in code, with no audio files, and each channel has its own audio bus. Silicon Dreams is entered through the screen of an SGI Octane and drops you into a 1996-style 3D chat world built in three.js, with four worlds, a ray-traced render gallery and a free-fly camera. The PS1 channel runs on its own software rasteriser.</p><p>Every page is designed on a fixed 1600&times;900 canvas and scaled to fit, so the composition is identical at any size. Tailwind only styles the shell; each page gets its own CSS Module, design tokens, fonts and reset, so styles can never leak from one channel into another. Images go through a pipeline (raw, to WebP, to a manifest, to Cloudflare R2) and pages ask for images by slot rather than by filename, so layouts never wait on assets. Shader compile time in Silicon Dreams went from 7 seconds to 2.7, and every page is checked by a Playwright screenshot review at two sizes. It is built for desktop: on a phone the 16:9 canvas would only fill about a quarter of the screen.</p>",
      categories: ["Web"]
    },
    {
      id: 31,
      title: "CodeCards",
      description: "A gamified flashcard app for learning software engineering: 1,694 cards across 59 topics, scheduled by spaced repetition so you revise just before you would forget.",
      media: {
        images: [
          `${BASE_URL}/media/CodeCards/dashboard.webp`,
          `${BASE_URL}/media/CodeCards/card.webp`,
          `${BASE_URL}/media/CodeCards/path.webp`,
          `${BASE_URL}/media/CodeCards/session.webp`,
          `${BASE_URL}/media/CodeCards/stats.webp`,
          `${BASE_URL}/media/CodeCards/shop.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/CodeCards",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "ts-fsrs", "Shiki", "Zod", "Playwright", "GitHub Actions"],
      details: "<p>CodeCards teaches programming languages, computer science, security, cloud and systems through flashcards. You pick your topics and climb each one through five tiers, from Basics to Expert. Flip a card, say how well you knew it (Again, Hard, Good or Easy), and the FSRS-5 algorithm decides when you see it next. A tier is cleared once every card has been seen and 80% are remembered, and a tier test lets you skip ahead if you already know a topic.</p><p>There are seven kinds of card: plain flip, predict the output, spot the bug, fill the gap, compare, complexity and scenario. Get a card wrong and up to two of the cards it builds on are slipped into the same session. Weak spots are tracked per tag, and a slow \"Good\" counts against you too. Reviews earn XP, coins and chests (6% of reviews drop one), spent in a shop of 86 purely cosmetic items: card skins, themes, mascots and synthesised sound packs. There are deliberately no streaks, daily quests or leaderboards.</p><p>Everything runs in the browser, with no server, no account and no tracking. Progress stays on your device, with a privacy mode, export and import, and offline support. The cards are treated as code: every card that can be checked is run in 9 real runtimes (Node, Python, Go, Rust, Java, C#, PHP, Kotlin and C) and its stored answer compared, which caught a wrong answer about JavaScript's largest safe integer. The build rejects circular prerequisites, code is highlighted at build time so it costs nothing at runtime, and a nightly job checks every linked resource still works.</p>",
      categories: ["Web"]
    },
    {
      id: 30,
      title: "DolphinAchiever",
      description: "Patches the Dolphin emulator so that, when you enter a level, it shows which RetroAchievements you can still earn right there.",
      media: {
        images: [
          `${BASE_URL}/media/DolphinAchiever/galaxy.webp`,
          `${BASE_URL}/media/DolphinAchiever/sunshine.webp`,
          `${BASE_URL}/media/DolphinAchiever/patcher.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/DolphinAchieveHelper",
      technologies: ["C++", "PowerShell", "WinForms", "Dolphin", "rcheevos", "Dear ImGui", "CMake", "MSBuild"],
      details: "<p>RetroAchievements are hard to hunt in big Wii and GameCube games because nothing tells you which ones are possible where you are standing. DolphinAchiever fixes that. Enter a level and a panel in the corner lists the achievements you can still earn there, missable ones first, each with its badge, title, points and how to unlock it. Hold the apostrophe key to bring the list back, and achievements drop off it the moment they unlock. It draws with Dolphin's own on-screen display, so it works in windowed, fullscreen and exclusive fullscreen with nothing running alongside.</p><p>Nothing is written per game. Where you are is worked out from the achievement set itself: every trigger is scanned for memory compared against fixed values, and the address compared against the widest spread of values is taken as the game's \"where am I\". A list only appears once it has stayed the same for 45 frames. It places 136 of Super Mario Galaxy's 161 achievements, and of the 97 that name a galaxy, 94 land in the right one and none in a wrong one. It also covers Galaxy 2, Sunshine, both Twilight Princess releases, Kirby's Epic Yarn, Return to Dream Land and both Mario Kart games.</p><p>It started as an overlay that read Dolphin's memory from outside, but exclusive fullscreen hides overlays, so it became a set of patches to Dolphin instead. A double-click patcher with its own window reads the exact version of your Dolphin, downloads that source, applies the patches, builds it and swaps in the new Dolphin.exe, backing up every file it replaces. It handles both of Dolphin's build systems and offers to install any missing tools. A first run takes about 10 minutes and a re-run about 1.</p><p><strong>Download:</strong> <a href='https://github.com/MarkCockerill12/DolphinAchieveHelper/archive/refs/heads/main.zip'>the patcher (zip)</a>, then run Patch Dolphin.cmd. Windows only.</p>",
      categories: ["C/C++/C#", "Game"]
    },
    {
      id: 29,
      title: "SpotiLIE",
      description: "An Android app that runs Spotify's full desktop web player and reshapes it into a phone app, with ads muted, lock-screen controls and background playback.",
      media: {
        images: [
          `${BASE_URL}/media/SpotiLIE/cover.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/SpotiLie",
      technologies: ["Kotlin", "GeckoView", "AndroidX Media3", "WebExtensions", "TypeScript", "Bun", "Gradle"],
      details: "<p>Spotify's desktop web player does more on a free account than its phone app: pick any song, skip as often as you like, see the lyrics and the full queue. SpotiLIE runs that desktop player on Android and reshapes it into a phone interface, with bottom navigation, a mini player that expands to full screen, and a Library tab with filters, search and sort. You sign in to your own account, and nothing is downloaded or redistributed.</p><p>On top of the player it adds what a music app needs: a media notification and lock-screen controls with artwork and seeking, playback that carries on in the background, and a pause when headphones or Bluetooth disconnect. Audio ads are spotted the moment they load and muted, so an ad break becomes about 2.7 seconds of silence, and uBlock Origin is installed and kept up to date automatically. If the engine crashes, a page fails to load or playback stalls, it recovers by itself.</p><p>It runs on Mozilla's GeckoView rather than Android's built-in WebView, because WebView drops the DRM session that playback depends on. Fixing a GeckoView bug where the user-agent override broke cross-origin requests took those failures from 142 to 0. Removing a 139.5 MB native library that never actually ran, then compressing the rest, took the arm64 download from 183 MB to 87 MB. It has played about 35 songs back-to-back without stopping.</p><p><strong>Download:</strong> <a href='https://github.com/MarkCockerill12/SpotiLie/releases/latest'>APKs on GitHub</a> (arm64 for most phones). Android 8.0 or newer.</p>",
      categories: ["Mobile"]
    },
    {
      id: 28,
      title: "DisPinterest",
      description: "An Android app that opens the real Pinterest with the ads taken out, adds swiping between pins and saving videos, and weighs 0.22 MB.",
      media: {
        images: [
          `${BASE_URL}/media/DisPinterest/cover.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/DisPinterest",
      technologies: ["Kotlin", "Android WebView", "AndroidX WebKit", "JavaScript", "Gradle", "R8"],
      details: "<p>DisPinterest is Pinterest's own website inside a tiny Android app, with the parts I didn't want taken out. Sponsored pins disappear from every feed and the pins around them close up, so there are no gaps. It is always in dark mode, while photos and videos keep their real colours. Swipe left and right to move between pins, and save videos and full-size pictures (the original upload, when there is one) straight to your gallery. Ad and analytics trackers are blocked, and the constant \"open in the app\" prompts are stopped. Everything else, from search and boards to messages and creating pins, is Pinterest as normal, and Google sign-in works.</p><p>The engine was chosen by measuring it. Against GeckoView, Android's WebView loaded the page in about 1.1 seconds instead of 4.0, used about 420 MB of memory instead of 1,190 MB, and added 0.17 MB to the app instead of 87 MB. A native app talking to Pinterest's API was built first and dropped, because its traffic would not look like a normal browser's.</p><p>Sponsored pins are hidden by a style injected before the page even starts, so they are already gone when Pinterest's grid measures its tiles. Swipes are captured before the browser can treat them as scrolling. Saved videos come from Pinterest's public video servers as MP4, with the file's creation time rewritten so they show up as the newest item in your gallery. The release APK is 0.22 MB, against about 90 MB for the official app.</p><p><strong>Download:</strong> <a href='https://github.com/MarkCockerill12/DisPinterest/releases/latest'>DisPinterest APK on GitHub</a>. Android 10 or newer.</p>",
      categories: ["Mobile"]
    },
    {
      id: 27,
      title: "HandCamera - Gesture Calculator",
      description: "A calculator you work with your hands in front of a webcam: hold up fingers for numbers and make gestures for the operators, all recognised in the browser.",
      media: {
        images: [
          `${BASE_URL}/media/HandCamera/two.webp`,
          `${BASE_URL}/media/HandCamera/ten.webp`,
          `${BASE_URL}/media/HandCamera/one.webp`,
          `${BASE_URL}/media/HandCamera/thumbs-up.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/HandCamera",
      technologies: ["Next.js", "React", "TypeScript", "MediaPipe", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Bun"],
      details: "<p>Hold up fingers to enter a number, from 0 to 5 on one hand and up to 10 with two. Touch or cross your index fingers for plus and times, hold a flat hand sideways or at an angle for minus and divide, give a thumbs up for equals and a thumbs down to delete. Press your palms together to clear. Your hands are tracked live on the camera feed, and nothing leaves your device.</p><p>Tracking comes from MediaPipe Hands (21 points per hand, two hands at once), but the gestures themselves are plain geometry rather than a trained model, so the same pose always gives the same answer. Whether a finger is up is decided from its joint angles in 3D, so it doesn't matter how the camera is angled, and the thresholds come from measured data: straight fingers read 126 to 157 degrees, folded ones 3 to 42. To stop stray input, a gesture has to win 3 of the last 5 frames and then be held for 450 ms before it counts.</p><p>It didn't start that way. An earlier trained classifier scored 99.88% in validation and didn't work at all in the browser: 6 of its 19 gestures had been prepared differently in training than in the app, and about 38,000 of its training samples were synthetic against only 4,450 real ones. It was deleted and replaced with the geometry. A test harness now feeds photos to Chrome as a fake webcam and runs the whole pipeline end to end, and a live diagnostics panel shows the frame rate, the joint angles and which rule fired. MediaPipe is hosted with the app, so it works offline and behind ad blockers.</p>",
      categories: ["Web", "AI"]
    },
    {
      id: 26,
      title: "Webalyzer",
      description: "Point it at any website and it reports what the site is built with, which APIs its scripts call, its DNS and email setup, its security health and its history.",
      media: {
        images: [
          `${BASE_URL}/media/Webalyzer/overview.webp`,
          `${BASE_URL}/media/Webalyzer/dns.webp`,
          `${BASE_URL}/media/Webalyzer/graph.webp`,
          `${BASE_URL}/media/Webalyzer/live-scan.webp`,
          `${BASE_URL}/media/Webalyzer/endpoints.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/webalyzer",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Puppeteer", "Docker"],
      details: "<p>Webalyzer is a reconnaissance tool for researching a website from public information. Enter a URL and a headless Chrome loads the page, recording its scripts, network requests, cookies and runtime globals. From that it identifies the site's technology, with exact versions where it can (around 120 signatures), pulls the API, GraphQL, storage and WebSocket addresses out of its scripts, and flags API keys or tokens left in the code, decoding the role inside any JWTs it finds.</p><p>Alongside the page itself it looks up the site's DNS and email setup, its hosting and location, its TLS certificate and security headers (rolled into a 0 to 100 score, with each finding marked by severity), subdomains from certificate logs, 23 well-known or sensitive paths, robots.txt, and its history on the Wayback Machine. Results land in a tabbed dashboard with a live scan log, a two-ring network graph and recent-scan history, and can be exported as JSON, Markdown or a printable report.</p><p>Results stream to the page as they are found, which is what drives the live console. Every redirect is checked so the scanner can't be pointed at private or internal addresses. An overhaul removed every made-up fallback (fake IPs, dates and subdomains), so everything on screen is something it actually found, and fixed the headless browser crashing mid-scan. It runs in Docker with its own Chromium.</p>",
      categories: ["Web", "Cyber Security"]
    },
    {
      id: 25,
      title: "ChessBless - AI Chess Coach",
      description: "A chess coach that runs entirely on your own computer: play Stockfish, then have a small local AI explain your moves in plain English and draw on the board.",
      media: {
        images: [
          `${BASE_URL}/media/ChessBless/game.webp`,
          `${BASE_URL}/media/ChessBless/settings.webp`,
        ],
      },
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Chessground", "chess.js", "Zustand", "FastAPI", "Python", "Stockfish", "Ollama"],
      details: "<p>Play against the Stockfish engine at the strength you choose, with a live evaluation bar beside the board. When you want to know what just happened, press Explain Move, or ask for a Hint. The coach answers in plain English, streaming as it writes, and draws arrows and circles on the board to show what it means. There are three coaches to pick from (The Professor, The Grandmaster and The Mystic) and three local models, depending on whether you want speed or quality.</p><p>All of it runs on your own machine, with no cloud and no account, and it was built to run on a laptop with no graphics card. The coaching comes from a small language model (1.5 to 3.8 billion parameters) running through Ollama. The model never works out moves itself: the backend keeps the one true copy of the game, Stockfish does the analysis, and the model's only job is to explain it. It marks up the board by writing tags such as [ARROW:green:e2:e4], which are turned into drawings, and if it gives none, arrows are drawn from Stockfish's own analysis instead. A single script downloads Stockfish and starts the backend and frontend.</p>",
      categories: ["AI", "Python", "Web"]
    },
    {
      id: 24,
      title: "Crypto Trading Bot",
      description: "A self-hosted crypto trading bot built on freqtrade, running around the clock on an old laptop, with a strategy chosen by testing it on years of data it had never seen.",
      media: {
        images: [
          `${BASE_URL}/media/Crypto/frequi-trades.webp`,
          `${BASE_URL}/media/Crypto/frequi-chart.webp`,
          `${BASE_URL}/media/Crypto/frequi-backtesting.webp`,
        ],
      },
      technologies: ["Python", "freqtrade", "pandas", "NumPy", "numba", "LightGBM", "Docker", "SQLite", "Debian"],
      details: "<p>A trading bot for cryptocurrency, built on the open-source freqtrade framework and running 24/7 in Docker on a repurposed laptop running headless Linux. It started life on a rooted Android phone running Debian before moving to the laptop. Trades, positions and performance are watched through FreqUI, freqtrade's web dashboard. For now it trades on paper only, with no real money in it.</p><p>The first version used machine learning: a LightGBM model predicting how prices would move. Testing it over longer periods showed its edge had only been noise from too short a test, so it was dropped. The strategy now is a simple trend breakout on 4-hour candles: buy when a coin closes above its 20-day high, sell when it falls below its 3-day low. It only buys when the whole market is healthy, meaning at least half the coins it tracks are in an uptrend and Bitcoin is above its 200-day average. If any of that data is missing, it doesn't buy.</p><p>Picking that strategy was the real work. I built my own backtesting simulator, sped up with numba, and checked it against freqtrade's own results to within a few trades. Ideas were only explored on data up to the end of 2023, with everything after that kept back as a final test. Each one was scored across 24 random sets of coins so a lucky pick couldn't flatter it, and checked against coins that later faded or were delisted. Settings were taken from the middle of a stable range rather than from the single best result. Plenty of ideas looked great on the first period and fell apart on the held-back one, including a dip-buying strategy that had won 76% of its trades.</p><p>The laptop needed work too before it could run unattended. A freeze was traced to the disk's power saving and fixed, the system now reboots itself if it ever hangs, and a watchdog restarts the wifi, then the whole machine, if the network drops.</p><p><em>The pictures show FreqUI from freqtrade's own documentation, not my bot.</em></p>",
      categories: ["Python", "AI"]
    },
    {
      id: 23,
      title: "RickRoll Trap",
      description: "An Android prank app: set a timer, hand the phone back, and when time runs out it forces itself to the front and plays Rick Astley full screen.",
      media: {
        images: [
          `${BASE_URL}/media/RickRoll/cover.webp`,
          `${BASE_URL}/media/RickRoll/setup.webp`,
        ],
      },
      technologies: ["Tauri", "Rust", "React", "TypeScript", "Vite", "Kotlin", "Android"],
      details: "<p>Set a countdown, tap Set Trap, then close the app or lock the phone and hand it back to its owner. When the timer runs out the app pulls itself back to the front and plays Never Gonna Give You Up full screen, on loop. A hidden tap in the top-right corner resets it.</p><p>It is a Tauri app with a React interface and a custom Kotlin plugin for the Android side. The plugin asks for the \"Display over other apps\" permission (and checks again when you come back from Settings), holds a wake lock so the phone can't sleep through the countdown, and relaunches the app over whatever is on screen when time is up. The native side reports back to the interface over Tauri channels, and the video is preloaded, muted and hidden, so it starts the instant the trap springs.</p>",
      categories: ["Mobile", "Rust"]
    },
    {
      id: 22,
      title: "Free(up)Mail",
      description: "Clears the junk out of Outlook, Gmail and any other inbox from one private desktop app. It runs entirely on your own computer, and every email is backed up before it goes.",
      media: {
        images: [
          `${BASE_URL}/media/FreeUpMail/main.webp`,
          `${BASE_URL}/media/FreeUpMail/theme-dark.webp`,
          `${BASE_URL}/media/FreeUpMail/review.webp`,
          `${BASE_URL}/media/FreeUpMail/accounts.webp`,
          `${BASE_URL}/media/FreeUpMail/rules.webp`,
          `${BASE_URL}/media/FreeUpMail/deleted.webp`,
          `${BASE_URL}/media/FreeUpMail/welcome.webp`,
          `${BASE_URL}/media/FreeUpMail/theme-aero.webp`,
        ],
      },
      github: "https://github.com/MarkCockerill12/Free-up-Mail",
      technologies: ["Python", "SQLite", "IMAP", "Microsoft Graph", "JavaScript", "pywebview", "PyInstaller", "GitHub Actions"],
      details: "<p>Free(up)Mail reads every mailbox you own (Outlook, Gmail, Yahoo, iCloud or any IMAP account) and groups all of it by sender. Each sender gets a suggestion: <strong>Delete</strong> for mailing lists and marketing, <strong>Keep</strong> for people you have emailed, <strong>Review</strong> for anything unclear. You decide, then one Clean up moves the junk to Trash. A copy of every email is saved on your computer first, so anything can be put back, even after the Trash has been emptied. Rules sort new mail too, either inside the app or installed straight into Gmail and Outlook.</p><p>There is no server and no account: it talks directly to Gmail and IMAP providers, and to Outlook through Microsoft Graph with Microsoft's own sign-in page. Every account has its own permissions (list, open, move to Trash, sort, create rules), checked before every call. People you have emailed, starred mail, receipts, security alerts and delivery updates are protected, and each email is re-checked on the server before it is moved, so nothing that changed since the scan is touched. The local interface only answers a secret key made fresh on every launch.</p><p>Written in Python with only the standard library, it ships as a single file with its own native window and five themes, from Windows XP to a minimal dark mode. The sender list and totals come from an in-memory cache kept in step by SQLite triggers, which took the sender list from 730 ms to 7 ms on a 13,000-email mailbox. Big Gmail cleanups run over several connections at once, and Outlook moves emails while the remaining backups are still downloading. It updates itself from GitHub releases, checking the download's SHA-256 against the published one before swapping itself in, and its tests run against fake Gmail, IMAP and Outlook servers so they never touch a real mailbox.</p><p><strong>Download:</strong> <a href='https://github.com/MarkCockerill12/Free-up-Mail/releases/latest/download/FreeUpMail-windows.exe'>Windows (FreeUpMail-windows.exe)</a> &middot; <a href='https://github.com/MarkCockerill12/Free-up-Mail/releases/latest'>macOS, Linux and the Python version</a>. Start it with <code>--demo</code> to try it on made-up mailboxes. The Windows build is not code-signed, so SmartScreen will want a \"More info\" then \"Run anyway\".</p>",
      categories: ["Python", "Web"]
    },
    {
      id: 21,
      title: "Cosy3D",
      description: "A low-fi 3D island to wander around, shipped with a launcher that keeps itself and the game up to date.",
      media: {
        images: [
          `${BASE_URL}/media/Cosy3D/town.webp`,
          `${BASE_URL}/media/Cosy3D/cliffs.webp`,
          `${BASE_URL}/media/Cosy3D/hot_springs.webp`,
          `${BASE_URL}/media/Cosy3D/observatory.webp`,
          `${BASE_URL}/media/Cosy3D/beach.webp`,
          `${BASE_URL}/media/Cosy3D/snowfield.webp`,
          `${BASE_URL}/media/Cosy3D/metro.webp`,
          `${BASE_URL}/media/Cosy3D/cave.webp`,
          `${BASE_URL}/media/Cosy3D/bus_stop.webp`,
          `${BASE_URL}/media/Cosy3D/bedroom.webp`,
        ],
      },
      technologies: ["Godot 4", "GDScript", "Blender", "Mixamo", "Jolt Physics", "Cloudflare R2", "Python"],
      details: "<p>A small island to be on rather than to win. You wander, sit on benches and campfire logs, talk to the people who live there, swim, and turn up somewhere you have not been before - a cave, a hot spring, an observatory, a snowfield at the top of the cliffs. Every new place is photographed into a journal you can travel back through.</p><p>Built in Godot 4.8 in GDScript, on the GL Compatibility renderer so it runs on anything. It renders at 70% and upscales, which is where the soft, low-fi look comes from, and it drops the render scale further by itself if the frame rate ever dips. Shaders are compiled behind the loading screen rather than in front of the player, which took the stutter on a first run from 3.3 seconds to about 0.15.</p><p>It ships as one program. The launcher asks where to install, fetches only the files whose checksums changed, verifies each one, and starts the game; it updates itself the same way, by renaming itself out of its own way. Builds live in Cloudflare R2, stored by content hash so a pack shared by both platforms is kept once. Every texture was given its own resolution by measuring what it actually loses when shrunk, which halved the download.</p><p><strong>Download:</strong> <a href='https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/cosy-3d/CosyLauncher.exe'>Windows (CosyLauncher.exe)</a> &middot; <a href='https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/cosy-3d/CosyLauncher-linux.tar.gz'>Linux (tar.gz)</a>. Both are the launcher, not the game: run it and it installs the rest. The Windows build is not code-signed, so SmartScreen will want a \"More info\" then \"Run anyway\".</p>",
      categories: ["Game"]
    },
    {
      id: 20,
      title: "Omni-Convert",
      description: "A secure, high-performance client-side file conversion and media downloading toolkit.",
      media: {
        images: [`${BASE_URL}/media/Omni/omniconvert.WEBP`, `${BASE_URL}/media/Omni/omniconvert2.WEBP`],
      },
      github: "https://github.com/MarkCockerill12/OmniConverter",
      demo: "https://omniconverter.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FFmpeg.wasm", "Three.js", "Web Workers", "OPFS"],
      details: "A comprehensive, privacy-first conversion suite running entirely in the browser. It features multithreaded FFmpeg.wasm for media transcoding, an interactive audio editor with trimming and bitrate controls, headless 3D loaders and exporters (supporting GLB, GLTF, OBJ, STL), a binary parser for Wii/Nintendo models, and a secure media downloader using client-side salt-and-pepper SHA-256 password validation.",
      categories: ["Web"]
    },
    { 
      id: 19,
      title: "WikiRithim",
      description: "A website that showcases many algorithims",
      media: {
        images: [`${BASE_URL}/media/WikiRithim/WikiRithim.webp`],
      },
      github: "https://github.com/MarkCockerill12/WikiRithim",
      demo: "https://wiki-rithim.vercel.app/",
      technologies: ["Trunk", "Rust", "WASM"],
      details: "This website displays different types of algorithims and how they work. It includes Sorting, Searching, Linear, Trees, Graphs, Strings, Geometric and Maths algorithims.",
      categories: ["Web"]
    },
    { 
      id: 18,
      title: "Handwronging - Neural Handwriting OCR",
      description: "A specialized Optical Character Recognition engine featuring a custom Vision Transformer, honed through 13 iterations to decode complex cursive.",
      media: {
        images: [`${BASE_URL}/media/Handwronging/handwronging1.webp`, `${BASE_URL}/media/Handwronging/handwronging2.webp`],
      },
      huggingface: "https://huggingface.co/spaces/Hypernova823/Handwronging/tree/main/",
      demo: "https://hypernova823-handwronging.hf.space/",
      technologies: ["Python", "PyTorch", "Transformers", "Streamlit", "EasyOCR"],
      details: "This application utilizes a two-stage 'forensic' neural architecture. First, an EasyOCR computer vision engine performs mathematical line fusion to isolate horizontal text rows. Second, a TrOCR model (DeiT Vision Encoder + RoBERTa Language Decoder) translates the visual features into text. The engine features the 'V13 Specialist' model, the culmination of 13 rigorous training iterations, fine-tuning a base TrOCR architecture on the IAM Handwriting Database (>65,000 instances) alongside a heavily augmented synthetic data pipeline. The application allows users to directly compare this custom specialist against Microsoft's massive 1.3B parameter generalist model. While the Microsoft model excels at broad, generalized text, the V13 Specialist is explicitly engineered to outperform it in specific edge cases, mastering complex cursive loops and messy manual pen-strokes. The frontend is built in Streamlit, utilizing deep programmatic CSS overrides to achieve a flawless dark-mode UI, complete with real-time neural matrix loading bars, confidence score tracking, and Text-to-Speech (gTTS) audio playback. The entire pipeline is deployed on Hugging Face Spaces.",
      categories: ["AI", "Web", "Python"]
    },
    { 
      id: 17,
      title: "Agentic RAG System",
      description: "A high-performance Retrieval-Augmented Generation (RAG) web application engineered with Rust, HTMX, and Groq",
      media: {
        images: [`${BASE_URL}/media/RAG/rag1.webp`],
      },
      github: "https://github.com/MarkCockerill12/Honours",
      demo: "https://agentic-rag-n4wm.onrender.com/",
      technologies: ["Rust", "Axum", "SQLite", "HTMX", "Groq API", "HuggingFace Candle", "Tailwind CSS", "Docker"],
      details: "This system transforms local documents into an interactive knowledge base with autonomous agentic capabilities. It features dual-model resilience between Llama 3.3 and 3.1, private local embeddings using BERT, and an autonomous reasoning loop for precise document retrieval and synthesis. Optimized for performance with SQLite WAL mode and containerized for deployment on Render.",
      categories: ["Web", "AI", "Rust"]
    },
    { 
      id: 16,
      title: "DevOps- Conference Booking System",
      description: "A conference booking system with full DevOps implementation",
      media: {
        images: [`${BASE_URL}/media/DevOps/DevOps.webp`, `${BASE_URL}/media/DevOps/DevOps1.webp`, `${BASE_URL}/media/DevOps/DevOps2.webp`, `${BASE_URL}/media/DevOps/DevOps3.webp`, `${BASE_URL}/media/DevOps/DevOps4.webp`, `${BASE_URL}/media/DevOps/DevOps5.webp`, `${BASE_URL}/media/DevOps/DevOps6.webp`,  `${BASE_URL}/media/DevOps/DevOps7.webp`, `${BASE_URL}/media/DevOps/DevOps8.webp`, `${BASE_URL}/media/DevOps/DevOps9.webp`, `${BASE_URL}/media/DevOps/DevOps10.webp`, `${BASE_URL}/media/DevOps/DevOps11.webp`, `${BASE_URL}/media/DevOps/DevOps12.webp`, `${BASE_URL}/media/DevOps/DevOps13.webp`],
        video: `${BASE_URL}/media/DevOps/DevOps14.webm`,
      },
      github: "https://github.com/MarkCockerill12/Booking-System",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "AWS", "Vercel"],
      details: "This project was created to showcase different DevOps practices, such as CI/CD, Infrastructure as Code and Automated Testing. The conference booking system allows users to create accounts, book and manage their bookings for different conferences. The frontend is hosted on Vercel and the backend is hosted on AWS. It makes use of multiple different AWS services such as Lambda, API Gateway, DynamoDB and S3. ",
      categories: ["Web"]
    },
    { 
      id: 15,
      title: "Minecraft Book",
      description: "A simple website that acts like a book from minecraft",
      media: {
        images: [`${BASE_URL}/media/MCbook/MCbook.webp`],
      },
      github: "https://github.com/MarkCockerill12/MinecraftBook",
      demo: "https://minecraft-book.vercel.app/",
      technologies: ["React", "Typescript", "Vercel", "Next.js"],
      details: "This website acts like a book from minecraft, It allows you to edit and export text as pictures",
      categories: ["Web"]
    },
    { 
      id: 14,
      title: "LoFi Web",
      description: "A website that plays LoFi music with visuals to help with focus, studying and relaxation",
      media: {
        images: [`${BASE_URL}/media/Lofi/Lofi1.webp`, `${BASE_URL}/media/Lofi/Lofi2.webp`, `${BASE_URL}/media/Lofi/Lofi3.webp`, `${BASE_URL}/media/ChrisLofi/Lofi4.webp`, `${BASE_URL}/media/ChrisLofi/Lofi5.webp`],
      },
      github: "https://github.com/MarkCockerill12/LofiWeb",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Cloudflare R2", "Vercel"],
      demo: "https://lofiweb.vercel.app/",
      details: "This website was designed to help with studying and calming down. It displays a looping background with music, users can choose between different visuals, sound overlays, colours and songs to best fit their needs. The songs and videos are hosted on Cloudflare's R2 and the frontend is hosted on Vercel.",
      categories: ["Web"]
    },
    { 
      id: 13,
      title: "CrossExamination- Christian Apologetics Website",
      description: "A website that showcases different sources, facts and arguments regarding Christianity",
      media: {
        images: [`${BASE_URL}/media/Chris/ChristianWeb1.webp`, `${BASE_URL}/media/Chris/ChristianWeb2.webp`, `${BASE_URL}/media/Chris/ChristianWeb3.webp`, `${BASE_URL}/media/Chris/ChristianWeb4.webp`],
      },
      github: "https://github.com/MarkCockerill12/ChristianWeb",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Vercel"],
      demo: "https://crossexamination.vercel.app/",
      details: "This website goes into depth regarding multiple aspects of both Christianity and other religions. It tackles numerous topics and arguments, such as the problem of Evil in the world, Historical/Archaeological reliability and Science vs Religion. It explores these meticulously, quoting sources and conveying information in an easy to understand way. The website includes a homepage, biblical timeline, topics page, personal story and resources page. The frontend is hosted on Vercel.",
      categories: ["Web"]
    },
    { 
      id: 12,
      title: "Investment Platform Project- University module sponsored by BarClays",
      description: "An all in one investment platform for both investors and pitch founders",
      media: {
        images: [`${BASE_URL}/media/Invest/Invest1.webp`, `${BASE_URL}/media/Invest/Invest2.webp`, `${BASE_URL}/media/Invest/Invest3.webp`, `${BASE_URL}/media/Invest/Invest4.webp`, `${BASE_URL}/media/Invest/Invest5.webp`, `${BASE_URL}/media/Invest/Invest6.webp`, `${BASE_URL}/media/Invest/Invest7.webp`, `${BASE_URL}/media/Invest/Invest8.webp`, `${BASE_URL}/media/Invest/Invest9.webp`, `${BASE_URL}/media/Invest/Invest10.webp`],
        video: `${BASE_URL}/media/Invest/DEMO.webm`,
      },
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Docker", "MongoDB", "Google Cloud"],
      details: "This project covers different aspects of an investment platform, covering the Frontend, Backend, BankAPI as well as MongoDB database. We created an intuitive and accessible website that allows users to create, browse and invest in different pitches. It handles transactions through a separate secure API and has a working notification system. My team took inspirations from other apps and websites such as CrowdCube and KickStarter.",
      categories: ["Web"]
    },
    { 
      id: 11,
      title: "ATM Simulation- University module sponsored by NCR",
      description: "An application that acts as a mock ATM for NCR",
      media: {
        images: [`${BASE_URL}/media/Agile/Agile2.webp`, `${BASE_URL}/media/Agile/Agile3.webp`, `${BASE_URL}/media/Agile/Agile4.webp`, `${BASE_URL}/media/Agile/Agile5.webp`, `${BASE_URL}/media/Agile/Agile6.webp`, `${BASE_URL}/media/Agile/Agile7.webp`, `${BASE_URL}/media/Agile/Agile8.webp`, `${BASE_URL}/media/Agile/Agile1.webp`, `${BASE_URL}/media/Agile/Agile9.webp`],
      },
      github: "https://github.com/MarkCockerill12/AC31007AgileGroup1",
      technologies: ["Visual Studio Code", "MySQL", "Go", "Amazon Web Services", "Docker", "React", "Electron", "Next.js", "Python", "Agile Methodologies"],
      details: "This mock ATM program was our task issued by NCR for learning agile methodologies, it utilises electron to showcase the front end, which handles the visual aspects. The front end then communicates with a Go-coded switch by sending JSON, the switch sorts out the different card numbers and sends them to a separate simulation which in turn interacts with information in a database.",
      categories: ["Web", "SQL"]
    },
    {
      id: 10,
      title: "SQL Company Website",
      description: "A website that interacts with a database in form of SQL",
      media: {
        images: [`${BASE_URL}/media/SteelSummit/Steel1.webp`, `${BASE_URL}/media/SteelSummit/Steel2.webp`, `${BASE_URL}/media/SteelSummit/Steel3.webp`, `${BASE_URL}/media/SteelSummit/Steel4.webp`, `${BASE_URL}/media/SteelSummit/Steel5.webp`, `${BASE_URL}/media/SteelSummit/Steel6.webp`, `${BASE_URL}/media/SteelSummit/Steel7.webp`, `${BASE_URL}/media/SteelSummit/Steel8.webp`],
      },
      github: "https://github.com/MarkCockerill12/DataAWS",
      technologies: ["Visual Studio Code", "MySQL", "PHP", "Amazon Web Services", "Docker"],
      details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predefined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
      categories: ["SQL", "Web"]
    },
    {
      id: 9,
      title: "Visual Novel Addon",
      description: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato",
      media: {
        images: [`${BASE_URL}/media/Doki/DokiDev.webp`, `${BASE_URL}/media/Doki/DokiGame.webp`],
      },
      technologies: ["RenPy", "PicsArt", "Visual Studio Code"],
      details: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato. This project was made for fun and the desire to experience the RenPy coding language.",
      categories: ["Game"]
    },
    {
      id: 8,
      title: "NextGen ATM Website",
      description: "A website that expands upon the possibilities of ATMs, sponsored by NCR for 2025 Dundee Hackathon",
      media: {
        images: [`${BASE_URL}/media/Hak-ATM/atm1.webp`, `${BASE_URL}/media/Hak-ATM/atm2.webp`, `${BASE_URL}/media/Hak-ATM/atm3.webp`, `${BASE_URL}/media/Hak-ATM/atm4.webp`],
      },
      github: "https://github.com/MarkCockerill12/Hak25--NCR",
      technologies: ["Visual Studio Code", "React", "Next.js", "Vercel"],
      demo: "https://hak25-ncr.vercel.app",
      details: "This mock ATM website was one of the projects my team took on during the 2025 Dundee Uni Hackathon. Our task was to create an ATM that would represent the future, and all the new functionalities that come with it. The website uses local storage to remember any additions you make to your bank account.",
      categories: ["Web", "SQL"]
    },
    {
      id: 7,
      title: "Raspberry Pi Pico Web Texter",
      description: "A program that uses Twilio and a Raspberry Pi Pico W to send text messages",
      media: {
        images: [`${BASE_URL}/media/Twilio/Twi1.webp`, `${BASE_URL}/media/Twilio/Twi2.webp`],
      },
      technologies: ["Python", "Twilio API", "Raspberry Pi Pico W"],
      details: "The Raspberry Pi W hosts a web server which allows the user to input text, the program then uses the Twilio API to send text messages through the pico.",
      categories: ["Python", "Raspberry Pi"]
    },
    {
      id: 6,
      title: "3D Animation- Penthouse",
      description: "An animation of my room becoming a penthouse suite",
      media: {
        images: [`${BASE_URL}/media/3D/Penthouse/Penthouse.webp`],
        video: `${BASE_URL}/media/3D/Penthouse/PenthouseVid.webm`,
      },
      technologies: ["Blender", "DaVinci Resolve"],
      details: "This project was a combination of real life and blender animation, using DaVinci Resolve video editor to join the two together.",
      categories: ["3D Animation"]
    },
    {
      id: 5,
      title: "Encrypted Login System with backdoor",
      description: "A login system that is supposedly secure",
      media: {
        images: [`${BASE_URL}/media/Wadiya/Wadiya1.webp`, `${BASE_URL}/media/Wadiya/Wadiya2.webp`],
      },
      github: "https://github.com/MarkCockerill12/VirusWadiya",
      technologies: ["Visual Studio Code", "C++"],
      details: `This project was a product of our University Information Security module, where we were tasked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code.`,
      categories: ["Cyber Security", "C/C++/C#"]
    },
    {
      id: 4,
      title: "This portfolio",
      description: "This very Portfolio, made with react and tailwind",
      media: {
        images: [`${BASE_URL}/media/Portfolio/Port1.webp`, `${BASE_URL}/media/Portfolio/Port2.webp`],
      },
      github: "https://github.com/MarkCockerill12/Portfolio",
      demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      technologies: ["Visual Studio Code", "React", "Next.js", "TypeScript", "Tailwind", "Vercel", "Cloudflare R2"],
      details: "This project is the exact portfolio website you are looking at right now, hosting metadata databases securely in R2 and frontend logic on Vercel.",
      categories: ["Web"]
    },
    {
      id: 3,
      title: "Sonic Digital Drawing",
      description: "A drawing of Sonic, created on Krita",
      media: {
        images: [`${BASE_URL}/media/Sonic/Sonic.webp`, `${BASE_URL}/media/Sonic/SonicShow.webp`],
      },
      technologies: ["Krita"],
      details: "A digital drawing of Sonic the Hedgehog racing alongside Metal Sonic, created on Krita.",
      categories: ["Digital Art"]
    },
    {
      id: 2,
      title: "Chat Bot and Server",
      description: "A chat Bot and Server that interact with HexChat",
      media: {
        images: [`${BASE_URL}/media/HexChat/Hex1.webp`, `${BASE_URL}/media/HexChat/Hex2.webp`],
      },
      github: "https://github.com/MarkCockerill12/ChatBotLol",
      technologies: ["HexChat", "Python", "MiniIRC", "Visual Studio Code"],
      details: "A chat Bot and Server that interact with HexChat, the chat Bot responds to commands and user messages. The server attempts to replicate a MiniIRC server.",
      categories: ["Python"]
    },
    {
      id: 1,
      title: "Shrimp",
      description: "Shrimp",
      media: {
        images: [`${BASE_URL}/media/Shrimp/Shrimp.webp`, `${BASE_URL}/media/Shrimp/ShrimpShow.webp`],
      },
      technologies: ["C#", "Pure uncompromising genius", "Visual Studio"],
      details: "A shrimple program that asks if you are a shrimp or not.",
      categories: ["C/C++/C#", "Game"]
    }
  ],
  jobExperiences: [
    {
      id: 'Insights',
      title: "Enterprise Technology Intern @ Insights: 2026-Present",
      website: "https://www.insights.com",
      icon: "Code",
      items: [
        {
          id: 'insights-main',
          text: "Insights is a global leader in workplace experience and learning, providing solutions that help organizations and their people improve their products and services through data, research and technology."
        }
      ]
    },
    {
      id: 'Outlier',
      title: "Independent Contractor @ Outlier AI: 2025-Present",
      website: "https://www.outlier.ai",
      icon: "Code",
      items: [
        {
          id: 'outlier-main',
          text: "Outlier is a platform that connects subject matter experts to help build the world's most advanced Generative AI."
        },
        {
          id: 'outlier-details',
          text: `My work at Outlier consists of training AI models and reviewing their responses and provided code to make sure it is up to standard and there are no errors. I have worked on multiple projects, where I have had to:
<ul class="list-disc list-inside ml-6 mt-2">
  <li>Train AI models to respond to a specific prompt and rate their outputs based on truthfulness and other factors. This could take the form of complete code generation, refactoring, and testing.</li>
  <br>
  <li>Review different GitHub pull requests and issues, where I would have to read through the code and provide problem statements, requirements, and classifications.</li>
</ul>`
        }
      ]
    },
    {
      id: 'fish-works',
      title: "Retail Assistant @ The Fish Works: 2023-Present",
      website: "https://thefishworks.co.uk",
      icon: "FishSymbol",
      items: [
        {
          id: 'fish-works-main',
          text: "The Fish Works is a multi award winning fish and chip shop, recognized in 2023 for Best Quality Fish and Chips and ranked third in the UK. They were also ranked the second-place winner in the 2025 Takeaway of the Year category."
        },
        {
          id: 'fish-works-details',
          text: `The fish works is an extremely fast paced environment, where the team each need to carry out their roles under pressure. Some of my roles have been:
<ul class="list-disc list-inside ml-6 mt-2">
  <li>Serving customers on the till and at the counter, this requires effective communication skills, financial responsibility, critical thinking and de-escalation skills.</li>
  <br>
  <li>Preparing food items and topping up supplies, this requires multitasking, communication and teamwork, and the ability to work efficiently</li>
</ul>`
        }
      ]
    },
    {
      id: 'dusa',
      title: "Retail Assistant @ DUSA Premier: 2023-2024",
      website: "https://www.dusa.co.uk",
      icon: "Palette",
      items: [
        {
          id: 'dusa-main',
          text: "Having worked in DUSA Premier on Dundee University Campus this role required me to manage financial transactions at the till, communicate with customers and restock items wherever needed in the shop."
        },
        {
          id: 'dusa-details',
          text: "Effective communication was needed in order to navigate the working environment, as well as quick learning and multitasking."
        }
      ]
    }
  ],
  otherExperiences: [
    {
      id: 'hackathon25',
      title: "2025 Dundee Uni Hackathon",
      icon: "Code",
      items: [
        {
          id: 'hackathon25-main',
          text: "The Dundee University Hackathon is a 24-hour event where students are tasked with creating a project set out by a company with the chance to win prizes. Multiple companies sponsored this hackathon, such as Rockstar, BlackRock, NCR Atleos and Synechron."
        },
        {
          id: 'hackathon25-details',
          text: "BlackRock tasked us with creating an environmental events webpage, showcasing green efforts and upcoming activities and plans. NCR Atleos tasked us with creating an ATM that utilizes new innovative features to bring to future of finance to the current day. Synechron tasked us with making a simple game using GameMaker. My team tackled all of these projects, as I created the ATM independently for my group, I included it in the projects of this portfolio."
        }
      ]
    },
    {
      id: 'agile',
      title: "Agile Practices",
      icon: "Code",
      items: [
        {
          id: 'agile-main',
          text: "During our Universities agile module where we created an ATM simulation for NCR, we learned and displayed proper agile development practices through taking notes and GitHub. We used Kanban boards, planning poker, MoSCoW, retrospectives, sprint reviews, scrum meetings and more."
        }
      ]
    },
    {
      id: 'hackathon24',
      title: "2024 Dundee Uni Hackathon",
      icon: "Code",
      items: [
        {
          id: 'hackathon24-main',
          text: "Multiple companies sponsored this hackathon, such as BlackRock, NCR Atleos and GE Vernova."
        },
        {
          id: 'hackathon24-details',
          text: "BlackRock tasked us with creating a student friendly application, whether it be for shopping or studying and NCR Atleos tasking us with creating a map where we could plot ATM locations on. I attempted both of these tasks and was able to achieve second place in NCR Atleos' challenge."
        }
      ]
    },
    {
      id: 'holiday-club',
      title: "Helper @ Children Summer Holiday Club: 2016-Present",
      icon: "Gamepad",
      items: [
        {
          id: 'holiday-club-main',
          text: "I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilizing my communication skills with other helpers and children. Each morning I have multiple responsibilities such as leading a specific group of primary pupils through activities, managing time and sorting conflicts. During afternoon social events I lead children with games as well as serving food to multiple families."
        }
      ]
    }
  ],
  educationHistory: [
    {
      institution: "Dundee University",
      years: "2022 - Present",
      qualification: "Bachelor of Science with Honours - Computing Science (BSc)",
      status: "Achieved",
      grade: {
        achieved: "1st",
        label: "Achieved Grade"
      }
    },
    {
      institution: "Largs Academy",
      years: "2016 - 2022",
      qualifications: [
        { subject: "Mathematics", level: "Higher", grade: "A" },
        { subject: "Graphic Communications", level: "Higher", grade: "B" },
        { subject: "English", level: "Higher", grade: "B" },
        { subject: "Computing Science", level: "Higher", grade: "B" },
        { subject: "Physics", level: "Higher", grade: "C" },
        { subject: "Chemistry", level: "Higher", grade: "C" }
      ]
    }
  ],
  modules: [
    {
      id: 'CS41001',
      name: 'Honours Project - Privacy Sentinel',
      year: 4,
      semester: 2,
      moduleGrade: 'A3 / 1st',
      description: 'Privacy Sentinel is a high-performance, multi-platform digital defence suite designed to restore digital sovereignty. Spanning Desktop, Mobile, and Browser environments, the system implements a unified security framework containing: a low-latency Direct-to-Spoke WireGuard VPN across 5 global regions; an AI Guardian powered by Groq LPUs for real-time website summarisation, translation, and trigger warning detection; an Intelligent Content Filter with DOM-level adblocking, blurring, redaction, and a custom "Kitten Mode" for mental well-being; and a heuristic CyberScanner to analyze phishing links and malicious domains. Deployed on cost-optimised AWS Graviton (ARM64) infrastructure via Terraform with automated auto-shutdown mechanisms, it was built using pnpm, Turborepo, Bun, Electron, Next.js, and Expo.',
    },
    {
      id: 'AC31007',
      name: 'Industrial Project',
      year: 4,
      semester: 1,
      moduleGrade: 'A1 / 1st',
      description: 'This project covers different aspects of an investment platform, covering the Frontend, Backend, BankAPI as well as MongoDB database. We created an intuitive and accessible website that allows users to create, browse and invest in different pitches. It handles transactions through a separate secure API and has a working notification system. The website securely holds user data and contains an online wallet.',
    },
    {
      id: 'AC51041',
      name: 'Devops and MicroServices',
      year: 4,
      semester: 1,
      moduleGrade: 'Provisional: A4 / 1st',
      description: 'This project is about developing a Booking system for conference rooms for my Developer Operations University Module. It integrates a simulated Weather Forecast system, AWS Lambda, S3, DynamoDB, Cognito, Cloudwatch as well as Stripe for the financial system and Vercel to host the front end.',
      projects: [
        {
          name: 'Preliminary Report',
          grade: 'A4 / 1st',
          description: 'I was tasked with creating a preliminary report outlining the architecture, design decisions and technologies to be used within the project. This included diagrams and explanations on how each microservice would interact with each other.'
        },
        {
          name: 'Full Dev Ops Service and CI/CD Pipeline',
          grade: 'A4 / 1st',
          description: 'The full service was created using a microservices architecture within a monorepo. Each microservice was containerised using Docker and deployed to AWS using GitHub Actions as the CI/CD pipeline.'
        }
      ]
    },
    {
      id: 'CS51009',
      name: 'Machine Learning',
      year: 4,
      semester: 1,
      moduleGrade: 'Provisional: B3 / 2:1',
      description: 'The point of this module was to gain an understanding of machine learning concepts and algorithms.',
      projects: [
        {
          name: 'Hurricane Dataset Assignment',
          grade: 'A1 / 1st',
          description: 'This project entailed training a machine learning model to predict the category of a hurricane based on various meteorological features. I preprocessed the data, selected relevant features, and experimented with different algorithms to achieve high accuracy.'
        }
      ]
    },
    {
      id: 'AC31007_Agile',
      name: 'Agile Software Engineering',
      year: 3,
      semester: 2,
      moduleGrade: 'B1 / 2:1',
      description: 'Introduction to Agile practices. We were tasked by NCR Atleos to create a full-stack application using Agile methodologies. This application was a recreation of an ATM system.',
      projects: [
        {
          name: 'Agile Methodologies Sprint/Week 1',
          grade: 'B2 / 2:1',
          description: 'Week one was spent building the foundations of the Front End and Back End. This consisting of a webpage, switch and database.'
        },
        {
          name: 'Agile Methodologies Sprint/Week 2',
          grade: 'B1 / 2:1',
          description: 'Week two was spent implementing further features and confirming everything was set up and working well together.'
        }
      ]
    },
    {
      id: 'CS23005',
      name: 'Mobile Application Development',
      year: 3,
      semester: 2,
      moduleGrade: 'A4 / 1st',
      description: 'Introduction to mobile application development. I used React Native to create a Bus App using the Google Maps API.',
      projects: [
        {
          name: 'Design Proposal',
          grade: 'A2 / 1st',
          description: 'Propose a mobile application idea and design. The application had to use some form of mobile phone input sensor.'
        },
        {
          name: 'Mobile App Creation',
          grade: 'A5 / 1st',
          description: 'Build the application with full functionality and give demo of it.'
        }
      ]
    },
    {
      id: 'AC31008',
      name: 'Networks',
      year: 3,
      semester: 1,
      moduleGrade: 'B3 / 2:1',
      description: 'Introduction to computer networks and network programming.',
      projects: [
        {
          name: 'Network Programming',
          grade: 'A5 / 1st',
          description: 'Created a client-server application implementing TCP/IP protocols as well as a bot to interact with it. This utilises HexChat.'
        },
        {
          name: 'Network Simulation',
          grade: 'A4 / 1st',
          description: 'Configured and simulated a network using Cisco Packet Tracer.'
        }
      ]
    },
    {
      id: 'AC31012',
      name: 'Information Security',
      year: 3,
      semester: 1,
      moduleGrade: 'A5 / 1st',
      description: 'Introduction to information security and cryptography.',
      projects: [
        {
          name: 'Applied Cryptography',
          grade: 'A3 / 1st',
          description: 'Created a login program with a backdoor that requires careful examining of the code as well as decryption and brute forcing to bypass.'
        },
        {
          name: 'Ethical Hacking',
          grade: 'A2 / 1st',
          description: 'The task was to attempt to crack other students login problems and take advantage of their vulnerabilities.'
        }
      ]
    },
    {
      id: 'AC32006',
      name: 'Database Systems',
      year: 3,
      semester: 1,
      moduleGrade: 'B2 / 2:1',
      description: 'Database design, implementation and management.',
      projects: [
        {
          name: 'Database Design',
          grade: 'B1 / 2:1',
          description: 'Designed and created a specification, entity-relationship diagram and SQL statements for a database system and company.'
        },
        {
          name: 'Database Implementation',
          grade: 'B2 / 2:1',
          description: 'Built a full-stack application with database integration utilizing HTML, SQL and PHP.'
        }
      ]
    }
  ],
  certificates: [
    {
      id: 'cert1',
      title: 'Cyber Security Vulnerability Certificate',
      description: 'Using Hacksplain.com, I completed a series of lessons and tests educating on the different types of security vulnerabilities and how to prevent them from occurring.',
      image: `${BASE_URL}/media/Certificates/hacksplain.webp`
    },
    {
      id: 'cert2',
      title: 'Allergen Training Certificate',
      description: 'As a result of my work in the Award winning fish and chip shop, The Fish Works, I was able to undergo training on allergen awareness and management.',
      image: `${BASE_URL}/media/Certificates/allergen.webp`
    },
    {
      id: 'cert3',
      title: 'Check My Links Certification',
      description: 'I achieved this certificate by completing a series of lessons and tests on the Check My Links platform, educating on how to use the extension in order to web crawl and analyse links, as well as different error codes.',
      image: `${BASE_URL}/media/Certificates/LinksCert.webp`
    },
    {
      id: 'cert4',
      title: 'Certification of Higher Maths',
      description: 'I was awarded this certificate at graduation as a showcase of exemplary math skills during coursework and exams.',
      image: `${BASE_URL}/media/Certificates/maths.webp`
    }
  ]
}
