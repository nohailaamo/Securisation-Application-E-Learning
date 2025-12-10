import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'elearning-realm',
  clientId: 'react-client'
});

export function initKeycloak(onAuthenticated) {
  return keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
    .then(authenticated => {
      if (authenticated) {
        onAuthenticated && onAuthenticated();
      }
      return authenticated;
    });
}

export function getToken() {
  return keycloak.token;
}

export function getKeycloak() {
  return keycloak;
}

export function logout() {
  keycloak.logout();
}

export function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return fetch(url, { ...options, headers });
}

export function getUserRoles() {
  if (keycloak.tokenParsed && keycloak.tokenParsed.realm_access) {
    return keycloak.tokenParsed.realm_access.roles;
  }
  return [];
}

export function isAdmin() {
  return getUserRoles().includes('ADMIN');
}