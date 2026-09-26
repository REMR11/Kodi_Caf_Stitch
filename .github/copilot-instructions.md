# CafIA — reglas generales (VS Code + GitHub Copilot)

La fuente principal de contexto es [AGENTS.md](../AGENTS.md). Este archivo es el equivalente de **Cursor Project Rules** para **VS Code** (instrucciones always-on de Copilot Chat).

- Sigue [AGENTS.md](../AGENTS.md) como fuente principal de contexto del proyecto.
- Gestor de paquetes: **pnpm** únicamente (`pnpm install`, `pnpm dev`, `pnpm build`).
- Stack: Vite + **vanilla JavaScript** (ES modules); no introducir React/Vue sin petición explícita.
- Textos de producto y UI en **español**; commits en **Conventional Commits**.
- Cambios de UI o portado desde Stitch: lee [docs/design-system.md](../docs/design-system.md) y [docs/stitch-porting.md](../docs/stitch-porting.md).
- Mantén diffs pequeños; reutiliza `sidebar.js` y `app-header.js`; no dupliques layout del mock.
- No commitear secretos; no editar `.cursor/plans/` salvo que el usuario lo pida.

**Mantenimiento:** si cambias reglas globales, actualiza también `.cursor/rules/cafia-general.mdc`, `.kiro/steering/cafia-general.md` y `.github/copilot-instructions.md`.
