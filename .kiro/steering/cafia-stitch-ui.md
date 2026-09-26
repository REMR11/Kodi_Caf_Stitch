---
inclusion: auto
name: cafia-stitch-ui
description: Portar pantallas desde Google Stitch, tokens Tailwind y design-system. Usar al cambiar UI en src/.
---

# CafIA — UI y portado Stitch (Kiro steering)

Equivalente funcional a la skill **cafia-stitch-design** de Cursor. Antes de escribir UI:

1. Lee [docs/design-system.md](../../docs/design-system.md) (tokens, componentes).
2. Lee [docs/stitch-porting.md](../../docs/stitch-porting.md) (flujo de portado).
3. Reutiliza [src/components/sidebar.js](../../src/components/sidebar.js), [src/components/app-header.js](../../src/components/app-header.js) y [src/pages/shell.js](../../src/pages/shell.js); no dupliques sidebar ni header en páginas.
4. Colores y tipografía solo con utilidades Tailwind de [src/styles/tailwind.css](../../src/styles/tailwind.css) (`@theme`).
5. Copia UI en **español**. Proyecto Stitch: `9014673166241808888`.
