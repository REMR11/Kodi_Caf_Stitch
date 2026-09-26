# AGENTS.md — Kodi_Caf_Stitch / CafIA

Instrucciones para agentes de codificación (Cursor, Copilot, Codex, Windsurf, Aider, etc.). Formato abierto: [agents.md](https://agents.md/).

## Resumen del proyecto

**CafIA** (*Clima & Riesgo*) es un frontend para productores cafetaleros. Implementación: **Vite 7**, **JavaScript** (ES modules, sin React/Vue), **Tailwind CSS 4**, gestor **pnpm**.

Diseño de referencia en **Google Stitch**: [proyecto 9014673166241808888](https://stitch.withgoogle.com/projects/9014673166241808888?pli=1) (*Remix of CafIA AgroClimatic Dashboard*).

Fase actual: login demo, shell (sidebar + header), router hash y placeholders por ruta. Detalle humano: [README.md](README.md).

## Comandos

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
pnpm preview
```

Usa **solo pnpm** (`pnpm-lock.yaml`). No ejecutes `npm install`.

## Arquitectura

```text
index.html → src/main.js → src/router.js
  ├── #/login     → src/pages/login.js + src/auth.js
  └── rutas app   → src/pages/shell.js
        ├── src/components/sidebar.js
        ├── src/components/app-header.js
        └── contenido (placeholders → futuras src/pages/*.js)
```

- Rutas hash: `#/login`, `#/inicio`, `#/mi-finca`, `#/simular`, `#/asistente`.
- Sesión demo en `sessionStorage` (`cafia_auth`); ver `src/auth.js`.
- Config: `src/config/navigation.js`, `src/config/assets.js`.

## Convenciones de código

- **Módulos ES** con imports explícitos (`.js`).
- UI: funciones `render*` que devuelven HTML string; eventos en `bind*` llamados tras montar en `#app`.
- **Reutiliza** sidebar y header; no copies `<aside>` ni header fijo en cada vista nueva.
- **Diff mínimo**: no refactorizar ni añadir dependencias no pedidas.
- Textos de producto y UI en **español**.
- Commits: **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`).

## Diseño UI (obligatorio leer antes de cambiar vistas)

| Documento | Contenido |
|-----------|-----------|
| [docs/design-system.md](docs/design-system.md) | Tokens, tipografía, patrones de componentes |
| [docs/stitch-porting.md](docs/stitch-porting.md) | Cómo portar pantallas desde Stitch al shell |

Fuente de tokens en código: `src/styles/tailwind.css` (`@theme`). No inventes colores fuera de esas utilidades Tailwind.

## Google Stitch (referencia)

- **Project ID:** `9014673166241808888`
- Pantallas útiles vía Stitch MCP (si está configurado en el editor): `list_screens`, descarga de `htmlCode`, `fetch_screen_code` / screenshots.
- **No hay pantalla de login en Stitch**; el login actual sigue el design system (inputs tipo *Registro de Finca*).
- No commitear API keys; configuración MCP local del usuario fuera de este repo.

## Qué no hacer

- No duplicar el sidebar/header en HTML importado de Stitch.
- No sustituir Tailwind por CSS custom salvo `@theme` existente.
- No usar npm ni mezclar lockfiles.
- No editar archivos en `.cursor/plans/` salvo petición explícita del usuario.

## Progressive disclosure

Para tareas grandes, lee solo lo necesario: este archivo → design-system / stitch-porting → archivos `src/` afectados.

## Reglas por editor

Este archivo (`AGENTS.md`) es la **fuente canónica** de contexto. Cada editor tiene un archivo delgado equivalente a las *Project Rules* de Cursor:

| Editor | Mecanismo | Archivo en este repo |
|--------|-----------|----------------------|
| **Cursor** | Project Rules (`.mdc`) | `.cursor/rules/cafia-general.mdc` |
| **Kiro** | [Steering](https://kiro.dev/docs/steering/) | `.kiro/steering/cafia-general.md` (`inclusion: always`) |
| **VS Code + Copilot** | [Custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions) | `.github/copilot-instructions.md` |

Para UI y portado desde Stitch:

| Editor | Archivo |
|--------|---------|
| Cursor | `.cursor/skills/cafia-stitch-design/SKILL.md` |
| Kiro | `.kiro/steering/cafia-stitch-ui.md` (`inclusion: auto`; también `#cafia-stitch-ui` en chat) |

**Mantenimiento:** al cambiar reglas globales del proyecto, actualiza en sync `.cursor/rules/cafia-general.mdc`, `.kiro/steering/cafia-general.md` y `.github/copilot-instructions.md` (y este `AGENTS.md` si aplica al contenido extendido).
