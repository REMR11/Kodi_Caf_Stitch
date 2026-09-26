# CafIA — Design system (Stitch)

Sistema visual derivado del export HTML de [Stitch — CafIA](https://stitch.withgoogle.com/projects/9014673166241808888?pli=1). Implementación en [`src/styles/tailwind.css`](../src/styles/tailwind.css).

## Principios

- Material 3–inspired: roles semánticos (`primary`, `surface`, `on-surface`, containers).
- Tipografía editorial: **Literata** títulos, **Nunito Sans** cuerpo y labels.
- Iconos: **Material Symbols Outlined** (Google Fonts).
- Bordes suaves: `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px).

## Tokens de color (usar clases Tailwind)

| Clase | Hex | Uso |
|-------|-----|-----|
| `primary` | `#4a7c59` | CTAs, ítem nav activo, acentos |
| `on-primary` | `#ffffff` | Texto sobre primary |
| `surface` / `background` | `#faf6f0` | Fondo app |
| `on-surface` | `#2e3230` | Texto principal |
| `on-surface-variant` | `#4a4e4a` | Texto secundario |
| `surface-container-low` | `#f5f1ea` | Sidebar |
| `surface-container` | `#f0ece4` | Badges, hover nav |
| `surface-container-highest` | `#e4e0d8` | Nav activo |
| `surface-container-lowest` | `#ffffff` | Tarjetas elevadas |
| `secondary` | `#6b6358` | Enlaces secundarios |
| `secondary-container` | `#f0e8db` | Chips / etiquetas |
| `tertiary` | `#705c30` | Acentos cálidos |
| `error` / `error-container` | `#b83230` / `#ffdad8` | Errores formulario |
| `outline-variant` | `#c4c8bc` | Bordes sutiles |

Lista completa de variables: `@theme` en `src/styles/tailwind.css`.

## Tipografía

| Clase | Fuente | Uso |
|-------|--------|-----|
| `font-headline` | Literata | H1, marca, botones primarios destacados |
| `font-body` | Nunito Sans | Párrafos, layout general (`body`) |
| `font-label` | Nunito Sans | Labels, badges, metadata |

Ejemplo título: `font-headline text-3xl font-semibold text-on-surface tracking-tight`.

## Layout shell (no repetir en vistas)

| Zona | Clases clave |
|------|----------------|
| Sidebar | `fixed left-0 top-0 h-full w-72 bg-surface-container-low p-6 z-50` |
| Contenido | contenedor padre `pl-72` |
| Header app | `fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl z-40` |
| Main | `pt-16 px-8 pb-12 bg-surface min-h-screen` |

Implementación: [`src/components/sidebar.js`](../src/components/sidebar.js), [`src/components/app-header.js`](../src/components/app-header.js), [`src/pages/shell.js`](../src/pages/shell.js).

## Navegación lateral

Ítem **activo**:

```html
<a class="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all bg-surface-container-highest text-primary font-bold shadow-sm" aria-current="page">
  <span class="material-symbols-outlined text-[22px]">potted_plant</span>
  <span>Inicio</span>
</a>
```

Ítem **inactivo**:

```html
<a class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-sm font-medium">
  ...
</a>
```

## Tarjetas y sombras

- Tarjeta usuario / contenido: `rounded-2xl bg-surface-container-lowest shadow-[0_4px_20px_rgba(46,50,48,0.04)]`
- Sidebar sombra: `shadow-[0_1px_8px_rgba(46,50,48,0.04)]`

## Formularios

Input (mock *Registro de Finca*):

```html
<input class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
```

Botón primario:

```html
<button class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-headline font-bold shadow-md hover:bg-primary/90 transition-all">
  Iniciar sesión
</button>
```

## Assets

Logo y avatares: [`src/config/assets.js`](../src/config/assets.js) (URLs remotas del export). Preferir copiar a `public/` en fases futuras.
