# Kodi_Caf_Stitch — CafIA

Frontend web de **CafIA** (*Clima & Riesgo*), orientado a productores cafetaleros. Este repositorio implementa la base de la aplicación a partir del diseño generado en [Google Stitch — proyecto 9014673166241808888](https://stitch.withgoogle.com/projects/9014673166241808888?pli=1) (*Remix of CafIA AgroClimatic Dashboard*).

## Qué hay hoy (fase 1)

| Implementado | Pendiente (siguientes fases) |
|--------------|------------------------------|
| Proyecto **Vite 7** + **JavaScript** (ES modules) + **Tailwind CSS 4** | Backend, API real, autenticación OAuth/JWT |
| **Login demo** con validación en cliente | Pantalla de login en Stitch (no existía en el mock; se diseñó con el mismo sistema visual) |
| **Sidebar** fijo igual al HTML exportado de Stitch | Contenido completo de las ~12 pantallas del mock |
| **Header** superior (clima, logo, avatar) | Assets locales en `/public` (hoy URLs remotas de Google) |
| **Router por hash** con protección de rutas | Router tipo History API / despliegue con rutas limpias |
| **4 rutas** con textos placeholder | Dashboard, riesgo, simulador, asistente, etc. |

En la práctica: puedes **iniciar sesión**, ver el **layout principal** (sidebar + header) y **navegar** entre secciones; el área central muestra un aviso de “vista por implementar”, no el diseño completo de Stitch.

## Guía para agentes de IA

Instrucciones portables (Cursor, Copilot, Codex, Windsurf, Aider, etc.):

| Archivo | Para qué |
|---------|----------|
| [AGENTS.md](AGENTS.md) | Contexto del repo, comandos, arquitectura, convenciones |
| [docs/design-system.md](docs/design-system.md) | Tokens, tipografía y patrones UI CafIA |
| [docs/stitch-porting.md](docs/stitch-porting.md) | Cómo portar pantallas desde Google Stitch |
| [`.cursor/rules/cafia-general.mdc`](.cursor/rules/cafia-general.mdc) | Reglas always-on en **Cursor** |
| [`.cursor/skills/cafia-stitch-design/SKILL.md`](.cursor/skills/cafia-stitch-design/SKILL.md) | Skill UI/Stitch en Cursor |
| [`.kiro/steering/cafia-general.md`](.kiro/steering/cafia-general.md) | Reglas always-on en **Kiro** (steering) |
| [`.kiro/steering/cafia-stitch-ui.md`](.kiro/steering/cafia-stitch-ui.md) | Steering auto para UI/Stitch en Kiro |
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Reglas always-on en **VS Code + Copilot** |

**Equivalencia:** Cursor Rules ≈ Kiro Steering ≈ Copilot custom instructions; detalle en la sección [Reglas por editor](AGENTS.md#reglas-por-editor) de `AGENTS.md`.

## Stack técnico

- **Vite** — dev server y build
- **Vanilla JS** — sin React/Vue; cada pantalla se renderiza con funciones que generan HTML
- **Tailwind CSS 4** — plugin `@tailwindcss/vite`; tokens de color/tipografía en `src/styles/tailwind.css`
- **Fuentes:** [Literata](https://fonts.google.com/specimen/Literata) (títulos), [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) (cuerpo)
- **Iconos:** [Material Symbols Outlined](https://fonts.google.com/icons)

## GitHub: fork y colaboración (introducción)

Si estás aprendiendo a programar y es tu primer contacto con GitHub, **no clones solo el repo y empieces a push** sin entender el flujo del curso.

Un **fork** es una copia del proyecto en *tu* cuenta de GitHub. Sirve para practicar, proponer cambios con **Pull Requests** y no alterar el repositorio del equipo o del instructor. Es la forma habitual de contribuir cuando no tienes permiso de escritura directa.

| Paso rápido | Acción |
|-------------|--------|
| 1 | En GitHub, botón **Fork** en el repo original |
| 2 | **Clone** la URL de *tu* fork |
| 3 | Rama nueva → commits → `git push` a tu fork |
| 4 | Abre un **Pull Request** hacia el repo original |

Guía completa para nivel junior (qué es, para qué sirve, paso a paso y FAQ): **[docs/github-fork.md](docs/github-fork.md)**.

## Cómo ejecutar

Requisitos: **Node.js 18+** y **[pnpm](https://pnpm.io/installation)**.

```bash
pnpm install
pnpm dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`). La app usa rutas con hash (`#/login`, `#/inicio`, …).

Producción:

```bash
pnpm build    # salida en dist/
pnpm preview  # sirve dist/ localmente
```

El lockfile del proyecto es **`pnpm-lock.yaml`**. No uses `npm install` en este repo (evita mezclar lockfiles).

## Uso de la aplicación

### Rutas

| Hash | Acceso | Contenido actual |
|------|--------|------------------|
| `#/login` | Público | Formulario de acceso |
| `#/inicio` | Requiere sesión | Placeholder “Inicio” |
| `#/mi-finca` | Requiere sesión | Placeholder “Mi finca” |
| `#/simular` | Requiere sesión | Placeholder “Simular” |
| `#/asistente` | Requiere sesión | Placeholder “Asistente” |

Si entras a una ruta protegida sin sesión, el router te redirige a `#/login`. Si ya tienes sesión y visitas `#/login`, vas a `#/inicio`. Rutas desconocidas (por ejemplo `#/foo`) caen en `#/inicio`.

### Credenciales demo

| Campo | Valor |
|-------|--------|
| Correo | `carlos@cafia.local` |
| Contraseña | Cualquier texto **no vacío** |

Tras un login correcto se guarda la sesión en **`sessionStorage`**, clave `cafia_auth`, con nombre **Carlos** y finca **Finca El Pinar, Santa Ana** (coherente con el perfil del mock).

**Cerrar sesión:** enlace al pie del sidebar; borra la sesión y lleva a `#/login`.

## Arquitectura

```text
index.html → main.js → router.js
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
        pages/login.js                  pages/shell.js
        + auth.js                       ├── components/sidebar.js
                                        ├── components/app-header.js
                                        └── pages/placeholders.js
```

1. **`main.js`** importa estilos y arranca el router.
2. **`router.js`** escucha `hashchange`, resuelve la ruta (`resolveRoute`) y monta login o shell en `#app`.
3. **`pages/shell.js`** compone sidebar + header + contenido según la ruta activa.
4. **`auth.js`** centraliza login/logout y lectura de sesión (solo cliente, sin servidor).

No hay framework de estado global: la sesión vive en `sessionStorage` y cada render lee lo necesario (por ejemplo el sidebar muestra nombre y finca desde `getSession()`).

## Estructura del código

```text
Kodi_Caf_Stitch/
├── index.html              # Entrada HTML, fuentes Google
├── vite.config.js          # Vite + plugin Tailwind
├── package.json
└── src/
    ├── main.js             # Punto de entrada
    ├── router.js           # Navegación hash y guards
    ├── auth.js             # Sesión demo (sessionStorage)
    ├── config/
    │   ├── navigation.js   # Ítems del sidebar y helpers de hash
    │   ├── assets.js       # URLs logo y avatar (export Stitch)
    │   └── theme.js        # Referencia de colores del mock (documentación)
    ├── components/
    │   ├── sidebar.js      # Aside w-72, nav, sync, perfil, logout
    │   └── app-header.js   # Barra superior fija (pl-72)
    ├── pages/
    │   ├── login.js        # Vista y handlers del formulario
    │   ├── shell.js        # Layout autenticado
    │   └── placeholders.js # Títulos y textos por ruta
    └── styles/
        └── tailwind.css    # @theme con tokens Material 3 del mock
```

### Sidebar (alineado con Stitch)

- Ancho **288px** (`w-72`), fondo `surface-container-low`
- Marca **CafIA** + subtítulo **Clima & Riesgo**
- Navegación: **Inicio**, **Mi finca**, **Simular**, **Asistente** (iconos Material)
- Ítem activo: fondo `surface-container-highest`, texto `primary`, negrita
- Pie: indicador “Sincronizado hoy 08:30 AM” y tarjeta de usuario

### Login (derivado del design system)

No viene de una pantalla Stitch; reutiliza inputs y botón primario inspirados en *Registro de Finca* del mock (bordes redondeados, `focus:ring-primary/40`, CTA verde `#4a7c59`).

## Sistema de diseño

Tokens principales (definidos en `src/styles/tailwind.css`):

| Token | Uso |
|-------|-----|
| `primary` `#4a7c59` | Botones, ítem activo, acentos |
| `surface` / `background` `#faf6f0` | Fondo general |
| `on-surface` `#2e3230` | Texto principal |
| `surface-container-*` | Tarjetas, sidebar, inputs |

Clases de utilidad Tailwind: `font-headline`, `font-body`, `font-label`, `bg-surface`, `text-on-surface-variant`, etc.

## Relación con pantallas Stitch

Mapa orientativo para futuras iteraciones (contenido **no** portado aún):

| Ruta app | Pantallas Stitch relacionadas |
|----------|-------------------------------|
| `#/inicio` | *¿Qué está pasando?*, *Dashboard Principal*, *Así está tu finca hoy* |
| `#/mi-finca` | *Mi finca*, *Registro de Finca* |
| `#/simular` | *Simulador Climático* |
| `#/asistente` | *Asistente CafIA* |

Otras del proyecto Stitch (riesgo, plan de acción, recomendaciones, monitoreo, …) se pueden añadir como subrutas o ampliar el menú más adelante.

## Verificación manual

Comprueba en el navegador:

1. `#/login` — card centrada, logo, errores si el correo es incorrecto o campos vacíos.
2. Login con `carlos@cafia.local` → redirección a `#/inicio` con sidebar y header.
3. Clic en cada ítem del menú — cambia el hash y el placeholder del main.
4. Recargar en `#/inicio` — la sesión persiste (misma pestaña).
5. **Cerrar sesión** — vuelta a `#/login`; `#/inicio` sin sesión redirige al login.

## Limitaciones conocidas

- **Autenticación ficticia:** no hay comprobación en servidor; no usar en producción.
- **Assets remotos:** logo y fotos dependen de URLs de Google; pueden caducar — conviene copiarlas a `public/` en una fase posterior.
- **Hash routing:** las URLs llevan `#/`; adecuado para SPA estática sin configuración de servidor.

## Licencia y origen del diseño

Código de este repo: según política del equipo/proyecto *practicaSDD*.  
Identidad visual y layouts de referencia: diseño generado en **Google Stitch** (enlace al [proyecto](https://stitch.withgoogle.com/projects/9014673166241808888?pli=1) arriba).
