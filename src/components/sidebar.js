import { assets } from '../config/assets.js';
import { navItems, pathToHash } from '../config/navigation.js';
import { getSession } from '../auth.js';

const activeClasses =
  'bg-surface-container-highest text-primary font-bold shadow-sm';
const idleClasses =
  'text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-sm font-medium';

function renderNavLink(item, activePath) {
  const isActive = item.path === activePath;
  const linkClasses = isActive
    ? `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${activeClasses}`
    : `flex items-center gap-3.5 px-4 py-3 rounded-xl ${idleClasses}`;

  return `
    <a
      href="${pathToHash(item.path)}"
      data-path="${item.path}"
      class="${linkClasses}"
      ${isActive ? 'aria-current="page"' : ''}
    >
      <span class="material-symbols-outlined text-[22px]">${item.icon}</span>
      <span>${item.label}</span>
    </a>
  `;
}

export function renderSidebar(activePath) {
  const session = getSession();
  const name = session?.name ?? 'Carlos';
  const farm = session?.farm ?? 'Finca El Pinar, Santa Ana';

  const navHtml = navItems.map((item) => renderNavLink(item, activePath)).join('');

  return `
    <aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between p-6 shadow-[0_1px_8px_rgba(46,50,48,0.04)]">
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-3 px-2">
          <img alt="CafIA" class="h-8 w-auto object-contain" src="${assets.logo}" />
          <div class="flex flex-col">
            <span class="font-headline font-bold text-lg leading-tight text-on-surface tracking-tight">CafIA</span>
            <span class="text-xs font-label text-on-surface-variant tracking-normal">Clima &amp; Riesgo</span>
          </div>
        </div>
        <nav class="flex flex-col gap-1.5" data-active-classes="${activeClasses}">
          ${navHtml}
        </nav>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container w-fit">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="text-[11px] font-label text-on-surface-variant">Sincronizado hoy 08:30 AM</span>
        </div>
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-lowest shadow-[0_4px_20px_rgba(46,50,48,0.04)]">
          <img alt="Perfil" class="w-10 h-10 rounded-full object-cover" src="${assets.avatar}" />
          <div class="flex flex-col min-w-0 flex-1">
            <span class="text-sm font-bold text-on-surface truncate">${name}</span>
            <span class="text-xs text-on-surface-variant truncate">${farm}</span>
          </div>
        </div>
        <button
          type="button"
          id="btn-logout"
          class="text-left text-xs font-label text-secondary hover:text-primary transition-colors px-2"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  `;
}
