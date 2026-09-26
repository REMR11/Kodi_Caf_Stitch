import { assets } from '../config/assets.js';

export function renderAppHeader(subtitle = 'Monitoreo Agroclimático Cafetalero') {
  return `
    <header class="fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(46,50,48,0.04)] z-40 flex items-center justify-between px-8">
      <div class="flex items-center gap-2">
        <img alt="CafIA" class="h-6 w-auto object-contain" src="${assets.logo}" />
        <span class="text-xs font-label text-on-surface-variant">${subtitle}</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-xs text-on-surface-variant font-medium">
          <span class="material-symbols-outlined text-sm text-primary">wb_sunny</span>
          <span>Santa Ana, 22°C</span>
        </div>
        <img alt="Perfil" class="w-8 h-8 rounded-full object-cover" src="${assets.avatar}" />
      </div>
    </header>
  `;
}
