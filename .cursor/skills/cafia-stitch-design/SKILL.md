---
name: cafia-stitch-design
description: >-
  Apply CafIA visual design and port Google Stitch screens into the Vite shell.
  Use when changing UI, Tailwind classes, sidebar/header, forms, colors, typography,
  or implementing views from Stitch project 9014673166241808888.
---

# CafIA + Stitch design

## Before writing UI code

1. Read [docs/design-system.md](../../../docs/design-system.md) (tokens, components).
2. Read [docs/stitch-porting.md](../../../docs/stitch-porting.md) (port workflow).
3. Skim [AGENTS.md](../../../AGENTS.md) for stack and conventions.

## Hard rules

- **Never** embed a second sidebar or app header in a page module. Use:
  - [src/components/sidebar.js](../../../src/components/sidebar.js)
  - [src/components/app-header.js](../../../src/components/app-header.js)
  - [src/pages/shell.js](../../../src/pages/shell.js)
- Colors and fonts **only** via Tailwind utilities from [src/styles/tailwind.css](../../../src/styles/tailwind.css) (`@theme`).
- Keep Stitch HTML class names when porting; strip CDN Tailwind and duplicate chrome.
- UI copy in **Spanish**.

## Quick route map

| Hash route | Stitch screens (primary) |
|------------|---------------------------|
| `#/inicio` | ¿Qué está pasando?, Dashboard Principal, Así está tu finca hoy |
| `#/mi-finca` | Mi finca, Registro de Finca |
| `#/simular` | Simulador Climático |
| `#/asistente` | Asistente CafIA |

Design source: https://stitch.withgoogle.com/projects/9014673166241808888

## Port workflow (summary)

1. Fetch HTML for target screen (MCP or manual).
2. Extract inner main content only.
3. Add `render*` in `src/pages/`.
4. Wire into shell / replace placeholder for that route.
5. Run `pnpm dev` and verify active nav + build.

Full steps: [docs/stitch-porting.md](../../../docs/stitch-porting.md).

## Screen inventory

See [reference.md](reference.md) for Stitch screen titles in this project.

## Login

Login is **not** in Stitch. Match [src/pages/login.js](../../../src/pages/login.js) and form patterns in design-system.md.
