import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initKeycloak } from './KeycloakService';
import keycloak from './KeycloakService';

initKeycloak()
    .then(authenticated => {
        if (authenticated) {
            ReactDOM.render(<App keycloak={keycloak} />, document.getElementById('root'));
        } else {
            console.warn("Utilisateur non authentifié");
            document.body.innerHTML = "<h2>Échec d'authentification Keycloak</h2>";
        }
    })
    .catch(error => {
        console.error("Échec d'initialisation Keycloak :", error);
        document.body.innerHTML = `<h2>Erreur Keycloak : ${error?.message || 'Erreur inconnue'}</h2>`;
    });
