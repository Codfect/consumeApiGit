import React, { useState } from 'react';

import api from '../../services/api';
import { Redirect, Link } from 'react-router-dom';

import './styles.css';

function Dashboard() {
  const [inputRepository, setInputRepository] = useState() //estado que armazen o input
  const [repositories, setRepositories] = useState([]);
  const [inputError, setInputError] = useState('');

  async function whenUserSubmit(ev) {
    ev.preventDefault();

    if (!inputRepository) {
      setInputError('Digite um nome no campo acima');
      return;
    }

    try {
      const response = await api.get(`users/${inputRepository}`);
      console.log(response.data);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setInputRepository('');
      setInputError('');
    } catch(err) {
      setInputError(<Redirect to={`/404`} />);
    }
  }

  return (
    <>
     <section className="dashboardContainer">
      <h1> Search a Github repository </h1>

      <form className="searchArea" onSubmit={whenUserSubmit}>
        <input
          value={inputRepository}

          //Quando o usuario altera o valor do input -> Valor do input disponivel em eve
          onChange={(e) => setInputRepository(e.target.value)} 
          placeholder="Digite o nome do usuario"
        />

        <button type="submit">Pesquisar</button>
      </form>

      { inputError && <span className="error">{inputError}</span>}

      <div className="repositories"> 
        {repositories.map(repository => (
          <Link key={repository.login} to={ `users/${repository.login}/repos` }>
            <img 
              src={repository.avatar_url}
              alt={repository.login}
            />
          
            <div>
              <div className="user-infos">
                <strong>{repository.login}</strong>
                <p>{repository.name}</p>
              </div>

              <div className="social-infos">
                <p>{repository.followers} followers</p>
                <p>{repository.following} following </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
     </section>
    </>
  );
}

export default Dashboard;