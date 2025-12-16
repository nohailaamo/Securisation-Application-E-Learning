import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './KeycloakService';

keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
    if (authenticated) {
        ReactDOM.render(<App />, document.getElementById('root'));
    } else {
        window.location.reload();
    }
});
