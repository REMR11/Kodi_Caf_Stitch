const STORAGE_KEY = 'cafia_auth';

const demoUser = {
  email: 'carlos@cafia.local',
  name: 'Carlos',
  farm: 'Finca El Pinar, Santa Ana',
};

export function getSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getSession() !== null;
}

export function login(email, password) {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, message: 'Ingresa correo y contraseña.' };
  }

  if (trimmedEmail.toLowerCase() !== demoUser.email) {
    return {
      ok: false,
      message: `Usa el correo demo: ${demoUser.email}`,
    };
  }

  const session = {
    email: demoUser.email,
    name: demoUser.name,
    farm: demoUser.farm,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return { ok: true, session };
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export { demoUser };
