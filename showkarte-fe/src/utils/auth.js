import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "showkarte_token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  removeToken();
}
