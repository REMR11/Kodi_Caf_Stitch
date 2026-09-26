# GitHub: qué es un fork y por qué importa

Esta guía está pensada para quienes empiezan a programar y usan **GitHub** por primera vez. Forma parte del flujo de trabajo del proyecto **CafIA** (*practicaSDD*): aprender a colaborar sin romper el repositorio original.

## En una frase

Un **fork** es **tu copia del proyecto en GitHub**, bajo tu cuenta. Te permite experimentar, practicar y proponer cambios **sin modificar directamente** el repositorio del equipo o del profesor.

## Analogía sencilla

Imagina un cuaderno de clase compartido:

| Concepto | En el cuaderno | En GitHub |
|----------|----------------|-----------|
| Original | El cuaderno del profesor en el escritorio | El **repositorio upstream** (el del equipo) |
| Tu copia | Fotocopias el cuaderno y trabajas en tu mesa | Tu **fork** (repositorio en *tu* usuario) |
| Entregar tarea | Le pasas solo las páneas nuevas para que las peguen | Abres un **Pull Request (PR)** |

Si te equivocas en tu fotocopia, el cuaderno original sigue intacto. Eso es la idea del fork.

## ¿Para qué se utiliza un fork?

1. **Aprender con seguridad** — Puedes romper cosas, borrar ramas o rehacer commits en *tu* fork; el repo principal no se ve afectado.
2. **Contribuir a proyectos ajenos** — En proyectos open source casi nadie tiene permiso de escribir en el repo original; se hace fork → cambios → PR.
3. **Trabajo en equipo (clase o empresa)** — Cada persona tiene su fork o ramas, y los cambios entran al repo central solo después de revisión.
4. **Mantener tu versión** — Si necesitas una variante del proyecto (por ejemplo tu propio despliegue), el fork puede vivir en paralelo al original.
5. **Sincronizarte con el original** — Cuando el profesor o el equipo actualiza el repo, puedes **traer esos cambios** a tu fork (ver más abajo).

### Fork no es lo mismo que *clone*

| | **Fork** | **Clone** |
|---|----------|-----------|
| **Dónde ocurre** | En el servidor de GitHub (en la web) | En tu computadora (Git local) |
| **Qué obtienes** | Un repositorio nuevo en *tu* cuenta de GitHub | Una carpeta con el código en tu disco |
| **Cuándo usarlo** | Antes de colaborar o cuando no tienes permiso de push al repo original | Siempre que quieras editar y ejecutar el código localmente |

Flujo habitual: **primero fork** (si no eres colaborador directo) → **luego clone** de *tu* fork → trabajas → **Pull Request** hacia el repo original.

## Cómo crear un fork (paso a paso)

### Requisitos

- Cuenta en [GitHub](https://github.com/signup).
- Estar logueado en el navegador.

### Desde la interfaz web

1. Abre la página del repositorio original (por ejemplo el de **Kodi_Caf_Stitch** / CafIA).
2. Arriba a la derecha, pulsa el botón **Fork**.
3. Elige tu cuenta personal como destino (o la organización si te lo indicaron).
4. Espera unos segundos: GitHub crea `https://github.com/TU_USUARIO/Kodi_Caf_Stitch` (o el nombre que tenga el repo).

Listo: ese URL es **tu fork**. El original suele llamarse **upstream** en la documentación.

### Clonar *tu* fork en la computadora

Sustituye `TU_USUARIO` por tu nombre de usuario de GitHub:

```bash
git clone https://github.com/TU_USUARIO/Kodi_Caf_Stitch.git
cd Kodi_Caf_Stitch
pnpm install
pnpm dev
```

> **Importante:** clona la URL de **tu fork**, no la del repo del profesor, si vas a subir cambios con `git push`. Si solo clonas el original sin fork, no podrás hacer push (y eso es normal: GitHub te protege de escribir donde no debes).

### (Opcional) Enlazar el repositorio original como *upstream*

Así podrás bajar actualizaciones del equipo cuando publiquen cambios:

```bash
git remote add upstream URL_DEL_REPO_ORIGINAL
git fetch upstream
git checkout main   # o la rama principal que use el proyecto
git merge upstream/main
git push origin main
```

Pide la **URL del repo original** a tu instructor o mírala en la página del proyecto (botón verde **Code**).

## Flujo de trabajo recomendado para principiantes

```text
1. Fork del repo en GitHub
2. Clone de TU fork
3. Rama nueva para cada tarea:  git checkout -b feat/mi-cambio
4. Commits pequeños y mensajes claros
5. Push a TU fork:  git push -u origin feat/mi-cambio
6. En GitHub: "Compare & pull request" hacia el repo original
7. Revisión → merge → ¡cambio integrado!
```

### Buenas prácticas

- **Una rama por tarea** (login, sidebar, documentación, etc.).
- **Mensajes de commit** descriptivos, por ejemplo: `docs: explicar fork en guía para juniors`.
- No hagas commit de contraseñas, API keys ni archivos `.env` con secretos.
- Si el PR pide cambios, edita en la misma rama y vuelve a hacer push; el PR se actualiza solo.

## Por qué esto es importante en tu formación

- **Profesionalismo:** En la industria, fork + PR es el camino estándar para contribuir a código que no es tuyo.
- **Trazabilidad:** Cada cambio queda registrado: quién lo propuso, qué archivos tocó y por qué.
- **Revisión:** Aprendes a recibir feedback en el PR antes de que el código entre a la rama principal.
- **Confianza:** Entiendes la diferencia entre *tu* espacio de trabajo (fork/rama) y el *código compartido* (main del equipo).

## Preguntas frecuentes

**¿Puedo trabajar sin fork si me dieron permiso de escritura en el repo?**  
Sí. Entonces clonas el repo original, creas ramas y abres PRs desde ramas del mismo repositorio. El fork sigue siendo útil si quieres una copia personal permanente.

**¿Mi fork se actualiza solo cuando el profesor cambia el repo?**  
No. Debes traer cambios con `fetch`/`merge` desde `upstream` (o la herramienta que use el curso).

**¿Puedo borrar mi fork?**  
Sí, en GitHub: *Settings* del repositorio → zona peligrosa → *Delete this repository*.

**¿Qué es un Pull Request entonces?**  
Es una **solicitud formal** para que alguien con permiso incorpore tus commits desde tu rama (o desde tu fork) hacia el proyecto principal. Es donde se conversa el código y se aprueba el merge.

## Siguiente paso

Después de crear tu fork y clonarlo, vuelve al [README](../README.md) para instalar dependencias con **pnpm** y ejecutar la app. Cuando tengas cambios listos, abre un PR y describe qué hiciste y cómo probarlo.

## Recursos oficiales

- [Fork a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) — Guía rápida de GitHub (inglés).
- [Collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) — Cómo trabajar con PRs.
