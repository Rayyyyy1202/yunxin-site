const STORAGE_KEY = "aiever-admin-secret";
const HEADER_NAME = "x-admin-secret";

export function getAdminSecret(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function setAdminSecret(secret: string): void {
  if (typeof window === "undefined") return;
  if (secret) {
    window.localStorage.setItem(STORAGE_KEY, secret);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function clearAdminSecret(): void {
  setAdminSecret("");
}

export function adminAuthHeader(): Record<string, string> {
  const secret = getAdminSecret();
  return secret ? { [HEADER_NAME]: secret } : {};
}

export const ADMIN_HEADER_NAME = HEADER_NAME;
