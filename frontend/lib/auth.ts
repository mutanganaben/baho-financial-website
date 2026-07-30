export interface AdminUserSession {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

const TOKEN_KEY = "baho_admin_token";
const USER_KEY = "baho_admin_user";

export function setAdminSession(token: string, user: AdminUserSession) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=28800; SameSite=Lax`;
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function getAdminUser(): AdminUserSession | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
