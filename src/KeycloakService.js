import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'elearning-realm',
    clientId: 'react-client',
});

// Initialisation unique
export const initKeycloak = () =>
    keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false, // évite les boucles silencieuses
        promiseType: 'native',   // assure une gestion propre des erreurs
    });

// Appels API sécurisés
export const fetchWithAuth = async (url, options = {}) => {
    const token = keycloak.token;
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
};

// Déconnexion
export const logout = () => keycloak.logout();

export default keycloak;
