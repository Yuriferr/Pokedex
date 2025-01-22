import { useEffect, useState } from 'react';
import './App.scss';

import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState("bulbasaur");
  const [dados, setDados] = useState({
    name: '',
    id: '',
    img: '',
    types: [],
    stats: [],
    abilities: [],
  });
  
  const [pokemonList, setPokemonList] = useState([]);
  const colorsTypes = {
    'bug': 'DarkGreen',
    'dark': 'grey',
    'dragon': 'DeepSkyBlue',
    'electric': 'Yellow',
    'fairy': 'MediumVioletRed',
    'fighting': 'Orange',
    'fire': 'red',
    'flying': 'CadetBlue',
    'ghost': 'Indigo',
    'grass': 'green',
    'ground': 'Chocolate',
    'ice': 'Aqua',
    'normal': 'PaleVioletRed',
    'poison': 'Purple',
    'psychic': 'DeepPink',
    'rock': 'Maroon',
    'steel': 'MediumAquamarine',
    'water': 'blue'
  };

  useEffect(() => {
    getDados();
  }, [pokemon]);

  useEffect(() => {
    async function fetchPokemonList() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      setPokemonList(response.data.results.map(p => p.name));
    }
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        changePokemon(-1);
      } else if (event.key === 'ArrowRight') {
        changePokemon(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pokemon, pokemonList]);

  async function getDados() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    setDados({
      name: response.data.name,
      id: response.data.id,
      img: response.data.sprites.front_default,
      types: response.data.types,
      stats: response.data.stats,
      abilities: response.data.abilities,
    });
    typesColor(response.data.types);
  }

  function changePokemon(direction) {
    const currentIndex = pokemonList.indexOf(pokemon.toLowerCase());
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + direction + pokemonList.length) % pokemonList.length;
      setPokemon(pokemonList[nextIndex]);
    }
  }

  function typesColor(types) {
    var backgroud = document.getElementById('container-App');
    if (backgroud) {
      const type = types[0]?.type.name;
      backgroud.style.backgroundColor = colorsTypes[type] || 'white';
    }
  }

  return (
    <div id='container-App' className='container-App'>
      <div className='container-Pokedex'>
        <div className='container-pesquisa'>
          <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
          <p>#{dados.id}</p>
        </div>
        <img src={dados.img} alt={dados.name} />
        <p className='name'>{dados.name}</p>
        <div className='container-Types'>
          {dados.types.map((item, index) => (
            <p key={index} style={{ backgroundColor: colorsTypes[item.type.name] }} className='typeName' value={item.type.name}>
              {item.type.name}
            </p>
          ))}
        </div>
        <div className='container-Info'>
          <div className='container-Stats'>
            <p className='titulo'>Status</p>
            {dados.stats.map((item, index) => (
              <div className='stats' key={index}>
                <p>{item.stat.name}:</p>
                <p>{item.base_stat}</p>
              </div>
            ))}
          </div>
          <div className='container-Abilities'>
            <p className='titulo'>Habilidades</p>
            {dados.abilities.map((item, index) => (
              <p key={index}>{index + 1}. {item.ability.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;