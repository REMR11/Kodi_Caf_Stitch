import { assets } from '../config/assets.js';
import { demoUser, login } from '../auth.js';
import { pathToHash } from '../config/navigation.js';

const inputClass =
  'w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';

export function renderLoginPage() {
  return `
    <div class="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <div class="rounded-2xl bg-surface-container-lowest shadow-[0_4px_20px_rgba(46,50,48,0.08)] p-8 border border-outline-variant/20">
          <div class="flex flex-col items-center text-center mb-8">
            <img alt="CafIA" class="h-10 w-auto object-contain mb-4" src="${assets.logo}" />
            <h1 class="font-headline text-2xl font-semibold text-on-surface tracking-tight">Bienvenido a CafIA</h1>
            <p class="text-sm text-on-surface-variant mt-2">Clima &amp; Riesgo para tu finca cafetalera</p>
          </div>
          <form id="login-form" class="flex flex-col gap-5" novalidate>
            <div id="login-error" class="hidden rounded-lg bg-error-container text-on-error-container text-sm px-3 py-2" role="alert"></div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wide" for="email">Correo</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="username"
                  class="${inputClass}"
                  placeholder="${demoUser.email}"
                  value=""
                />
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wide" for="password">Contraseña</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">lock</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="${inputClass}"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-on-primary font-headline font-bold text-base shadow-md hover:bg-primary/90 active:scale-[0.99] transition-all mt-2"
            >
              <span class="material-symbols-outlined text-xl">login</span>
              Iniciar sesión
            </button>
            <p class="text-xs text-center text-on-surface-variant">
              Demo: <span class="font-semibold">${demoUser.email}</span> y cualquier contraseña no vacía.
            </p>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function bindLoginPage(onSuccess) {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    const result = login(email, password);

    if (!result.ok) {
      errorEl.textContent = result.message;
      errorEl.classList.remove('hidden');
      return;
    }

    errorEl.classList.add('hidden');
    window.location.hash = pathToHash('inicio');
    onSuccess?.();
  });
}
