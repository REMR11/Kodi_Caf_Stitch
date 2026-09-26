export const pageContent = {
  inicio: {
    title: 'Inicio',
    subtitle: 'Resumen agroclimático de tu finca',
    body: 'Aquí irá el dashboard principal exportado desde Stitch (¿Qué está pasando? / Dashboard Principal).',
  },
  'mi-finca': {
    title: 'Mi finca',
    subtitle: 'Perfil y ubicación',
    body: 'Vista placeholder para el detalle de finca y registro.',
  },
  simular: {
    title: 'Simular',
    subtitle: 'Simulador climático',
    body: 'Vista placeholder para escenarios y proyecciones.',
  },
  asistente: {
    title: 'Asistente',
    subtitle: 'Asistente CafIA',
    body: 'Vista placeholder para el chat y recomendaciones.',
  },
};

export function renderPlaceholder(path) {
  const content = pageContent[path] ?? pageContent.inicio;
  return `
    <div class="flex flex-col w-full max-w-6xl mx-auto py-4">
      <header class="mb-8 max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-label font-bold mb-3">
          <span class="material-symbols-outlined text-sm">eco</span>
          <span>CafIA</span>
        </div>
        <h1 class="font-headline text-3xl sm:text-4xl font-semibold text-on-surface tracking-tight leading-tight">
          ${content.title}
        </h1>
        <p class="mt-3 text-on-surface-variant text-base max-w-2xl">${content.subtitle}</p>
      </header>
      <div class="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgba(46,50,48,0.04)]">
        <p class="text-on-surface-variant text-sm leading-relaxed">${content.body}</p>
      </div>
    </div>
  `;
}
