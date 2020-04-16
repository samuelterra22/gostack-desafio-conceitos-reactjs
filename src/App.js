import React, { useEffect, useState } from 'react'

import './styles.css'
import api                            from './services/api'

function App () {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [repositories])

  async function handleAddRepository () {
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${ Date.now() }`,
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository (id) {
    api.delete(`/repositories/${ id }`)
      .then(() => {
        setRepositories(repositories.filter(repository => repository.id !== id))
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => <li key={ repository.id }>
          { repository.title }

          <button onClick={ () => handleRemoveRepository(repository.id) }>
            Remover
          </button>
        </li>) }
      </ul>

      <button onClick={ handleAddRepository }>Adicionar</button>
    </div>
  )
}

export default App
