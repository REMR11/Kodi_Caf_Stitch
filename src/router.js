import { isAuthenticated } from './auth.js';
import { defaultRoute, hashToPath, navItems, pathToHash } from './config/navigation.js';
import { bindLoginPage, renderLoginPage } from './pages/login.js';
import { bindShell, renderShell } from './pages/shell.js';

const appRoot = () => document.getElementById('app');

function isAppRoute(path) {
  return navItems.some((item) => item.path === path);
}

function navigateTo(path) {
  window.location.hash = pathToHash(path);
}

export function resolveRoute(path) {
  if (path === 'login') {
    if (isAuthenticated()) {
      return defaultRoute;
    }
    return 'login';
  }

  if (!isAuthenticated()) {
    return 'login';
  }

  if (!isAppRoute(path)) {
    return defaultRoute;
  }

  return path;
}

function render(path) {
  const root = appRoot();
  if (!root) return;

  const resolved = resolveRoute(path);

  if (resolved !== path) {
    navigateTo(resolved);
    return;
  }

  if (resolved === 'login') {
    root.innerHTML = renderLoginPage();
    bindLoginPage(() => render(hashToPath(window.location.hash)));
    return;
  }

  root.innerHTML = renderShell(resolved);
  bindShell();
}

export function startRouter() {
  const onRoute = () => {
    const path = hashToPath(window.location.hash);
    render(path);
  };

  window.addEventListener('hashchange', onRoute);

  if (!window.location.hash || window.location.hash === '#') {
    window.location.hash = isAuthenticated() ? pathToHash(defaultRoute) : '#/login';
  } else {
    onRoute();
  }
}
