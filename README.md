# POCKET DIMENSION

A cyberpunk-themed personal website hosted on Neocities. Hand-built HTML/CSS/JS with a retro-futurist aesthetic — matrix rain, CRT overlays, glitch effects, neon glow, and a bento-grid layout.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Landing page — latest log entry, currently watching, mood, interests, and ally links |
| Intel | `intel/` | Personal dossier — bio, skill tree, reading list, contact/signal info, and philosophy quotes |
| Logs | `logs/` | Blog — all entries loaded from `logs/log.json`, displayed newest-first |
| Experiment | `experiment/` | Roguelike dungeon game with narrative branching and secret content |

## Features

- **Matrix rain** canvas animation background on all main pages
- **CRT overlay** scanline effect
- **Glitch / neon-pulse** header animation with random trigger
- **Timezone slider** — cycles through world clocks (LA, DC, Geneva, Delhi, Tokyo) every 3 seconds
- **Visitor counter** — live view count fetched from Neocities API
- **Log system** — blog entries stored in `log.json` (epoch timestamp, title, content, tags); homepage shows latest excerpt, logs page shows all entries
- **Roguelike game** (`experiment/`) — procedurally generated dungeon with 13 narrative floors, two branching paths (ghost vs machine), collectible story fragments, secret portal floors, and a transmission log sidebar

## Structure

```
index.html          — home
css/
  style.css         — shared styles for all main pages
code/
  script.js         — shared JS (matrix rain, timezone, visitor count, log rendering)
  rogue.js          — roguelike game engine
intel/
  index.html        — about/dossier page
logs/
  index.html        — blog listing page
  log.json          — blog data (array of entries with title, date, content, tags)
experiment/
  index.html        — roguelike game UI
```

## Stack

Pure HTML, CSS, and vanilla JavaScript. No build step, no frameworks, no dependencies beyond the Neocities visitor count API.

## Deploying to Neocities

The site is deployed using the [Neocities Ruby gem](https://github.com/neocities/neocities-ruby).

### Install

Requires Ruby > 3.0.

```bash
gem install neocities
```

### Authenticate

Run any push command the first time — you'll be prompted for your API key. Find your key at **neocities.org → your site → Settings → API Key**.

```bash
neocities push .
```

Credentials are saved locally after the first login. To remove them:

```bash
neocities logout
```

### Deploy

Push the entire site (only changed files are uploaded):

```bash
neocities push .
```

Upload a single file:

```bash
neocities upload logs/log.json
```

Delete a file from the live site:

```bash
neocities delete old-file.html
```

List all files currently on the live site:

```bash
neocities list
```

### Git hook (optional)

To auto-deploy whenever you `git push`, add a pre-push hook. Create `.git/hooks/pre-push` (or `post-push` if you prefer it to run after):

```bash
#!/bin/sh
neocities push .
```

Make it executable:

```bash
chmod +x .git/hooks/pre-push
```

> Note: `.gitignore` entries are automatically respected — files ignored by git won't be pushed to Neocities.
