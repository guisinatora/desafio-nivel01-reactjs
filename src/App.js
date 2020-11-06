import React, { useEffect, useState } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "Diego Fernandes",
      techs: ["Tech do Front"]
    });

    const repository = response.data;

    setRepository([...repositories, repository])
  };

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repositories.filter(
      repository => repository.id !== id
    ))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id, 1)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
