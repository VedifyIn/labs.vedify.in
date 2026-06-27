# labs.vedify.in

Personal lab showcase — a fast, SSR-first Next.js site for listing and exploring projects.

Live at **[labs.vedify.in](https://labs.vedify.in)**

---

## Stack

- **Next.js 15** (App Router, server components)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** — card animations
- **TypeScript**
- Data driven via **YAML** → JSON pipeline

---

## Views & Themes

The site supports three visual layouts and two themes, configurable via env vars or `data/site.yaml`.

| View | Description |
|------|-------------|
| `polished` | Default. Card grid with featured slider and category filters |
| `terminal` | Monospace CRT-style table layout |
| `bento` | Bento-grid mosaic layout |

| Theme | Description |
|-------|-------------|
| `dark` | Default. Deep dark backgrounds |
| `light` | Warm parchment tones |

---

## Getting Started

```bash
npm install
npm run dev
```

This runs `generate-data.mjs` first (compiles YAML → JSON), then starts the dev server at `http://localhost:3000`.

---

## Adding a Project

Copy the template and fill it in:

```bash
cp data/projects/_template.yaml data/projects/my-project.yaml
```

Edit `data/projects/my-project.yaml`, then restart dev (or re-run `node scripts/generate-data.mjs`).

Key fields:

```yaml
id: my-project          # unique slug
title: My Project
description: One-liner shown in cards
longDesc: Longer description for featured cards   # optional
status: live            # live | in-progress | todo
tech: "Next.js · TypeScript"
icon: sparkles          # see components/icons.tsx for available names
color: purple           # purple | teal | coral | pink | amber | blue
tags: [Agents, RAG]
featured: true          # shows in the featured slider
featuredOrder: 1
links:
  github: https://github.com/you/repo
  demo: https://your-demo.com
  readmore: https://blog.you/post    # optional
stats:                  # optional — shown on featured cards
  - label: requests/day
    value: "10k+"
```

---

## Demo Mode (6 variants)

Run all six view × theme combos simultaneously:

```bash
bash demo.sh
```

Opens ports 3001–3006:

| Port | View | Theme |
|------|------|-------|
| 3001 | polished | dark |
| 3002 | polished | light |
| 3003 | terminal | dark |
| 3004 | terminal | light |
| 3005 | bento | dark |
| 3006 | bento | light |

You can also override per-instance with env vars:

```bash
DEMO_VIEW=bento DEMO_THEME=light npm run dev
```

---

## Project Structure

```
app/
  layout.tsx          # Root layout — sets data-theme on <html>
  page.tsx            # Server component — reads JSON, passes to client
  client-page.tsx     # Client root — view/theme routing, tagline rotation
  globals.css         # Tailwind + CSS custom properties for all themes

components/
  views/
    polished.tsx      # Polished card-grid view
    terminal.tsx      # CRT terminal view
    bento.tsx         # Bento grid view
  LabBackground.tsx   # Animated background (polished view)
  FeaturedSlider.tsx  # Auto-advancing carousel
  ProjectCard.tsx     # Individual project card (Framer Motion)
  ProjectGrid.tsx     # Responsive card grid
  CategoryFilter.tsx  # Tag filter with responsive overflow
  SearchBar.tsx       # Live search input
  PlannedAccordion.tsx # Collapsible planned projects
  SiteHeader.tsx      # Site title + links header
  FooterNote.tsx      # Footer with tagline rotation
  icons.tsx           # SVG icon components

data/
  site.yaml           # Site metadata, default view/theme
  projects/           # One YAML file per project
    _template.yaml    # Copy this to add a project

scripts/
  generate-data.mjs   # Compiles data/ YAMLs → public/data/*.json

public/
  data/
    projects.json     # Generated — do not edit directly
    site.json         # Generated — do not edit directly
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Generate data + start dev server |
| `npm run build` | Generate data + production build |
| `npm run start` | Start production server |
| `npm run check-types` | TypeScript type check |
| `npm run format` | Format all files with Prettier |
| `npm run lint` | ESLint |

---

## Deployment

Deploys to **Vercel** automatically. The `prebuild` script runs `generate-data.mjs` before every build, so the YAML source files are the source of truth — no need to commit generated JSON.
