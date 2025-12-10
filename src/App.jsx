import React, { useEffect, useState } from 'react';
import { initKeycloak, fetchWithAuth, logout } from './keycloak/KeycloakService';

function App() {
  const [courses, setCourses] = useState([]);
  const [me, setMe] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  useEffect(() => {
    initKeycloak().then(() => {
      fetchWithAuth('http://localhost:8081/courses')
        .then(r => r.json()).then(setCourses).catch(console.error);
      fetchWithAuth('http://localhost:8081/me')
        .then(r => r.json()).then(setMe).catch(console.error);
    });
  }, []);

  const addCourse = () => {
    fetchWithAuth('http://localhost:8081/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse)
    })
      .then(r => r.json())
      .then(course => setCourses([...courses, course]))
      .catch(console.error);
  };

  const isAdmin = me && me.realm_access && me.realm_access.roles.includes('ADMIN');

  return (
    <div>
      <h1>Plateforme E-Learning</h1>
      {me && <div>Utilisateur: {me.preferred_username} ({me.email})</div>}
      <button onClick={logout}>Logout</button>
      <h2>Cours disponibles</h2>
      <ul>{courses.map(c => <li key={c.id}>{c.title}: {c.description}</li>)}</ul>
      {isAdmin && (
        <div>
          <h2>Gestion des cours</h2>
          <input placeholder="Titre" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
          <input placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
          <button onClick={addCourse}>Ajouter</button>
        </div>
      )}
    </div>
  );
}

export default App;