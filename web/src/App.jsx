import { useEffect, useState } from 'react'
import './App.scss'

import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState("bulbasaur")
  const [dados, setDados] = useState({
    name: '',
    id: '',
    img: '',
    types: [],
    stats: [],
    abilities: [],
  })
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
  }

  useEffect(() => {
    getDados()
    typesColor()
  }, [pokemon, dados])

  async function getDados(){
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`).then(function (response){
      setDados({
          name: response.data.name,
          id: response.data.id,
          img: response.data.sprites.front_default,
          types: response.data.types,
          stats: response.data.stats,
          abilities: response.data.abilities,
        }
      )
    })
  }

  function typesColor(){
    var backgroud = document.getElementById('container-App')

    if(dados.types[0]?.type.name == 'bug'){
      backgroud.style.backgroundColor = 'DarkGreen'
    }else if(dados.types[0]?.type.name == 'dark'){
      backgroud.style.backgroundColor = 'grey'
    }else if(dados.types[0]?.type.name == 'dragon'){
      backgroud.style.backgroundColor = 'DeepSkyBlue'
    }else if(dados.types[0]?.type.name == 'electric'){
      backgroud.style.backgroundColor = 'Yellow'
    }else if(dados.types[0]?.type.name == 'fairy'){
      backgroud.style.backgroundColor = 'MediumVioletRed'
    }else if(dados.types[0]?.type.name == 'fighting'){
      backgroud.style.backgroundColor = 'Orange'
    }else if(dados.types[0]?.type.name == 'fire'){
      backgroud.style.backgroundColor = 'red'
    }else if(dados.types[0]?.type.name == 'flying'){
      backgroud.style.backgroundColor = 'CadetBlue'
    }else if(dados.types[0]?.type.name == 'ghost'){
      backgroud.style.backgroundColor = 'Indigo'
    }else if(dados.types[0]?.type.name == 'grass'){
      backgroud.style.backgroundColor = 'green'
    }else if(dados.types[0]?.type.name == 'ground'){
      backgroud.style.backgroundColor = 'Chocolate'
    }else if(dados.types[0]?.type.name == 'ice'){
      backgroud.style.backgroundColor = 'Aqua'
    }else if(dados.types[0]?.type.name == 'normal'){
      backgroud.style.backgroundColor = 'PaleVioletRed'
    }else if(dados.types[0]?.type.name == 'poison'){
      backgroud.style.backgroundColor = 'Purple'
    }else if(dados.types[0]?.type.name == 'psychic'){
      backgroud.style.backgroundColor = 'DeepPink'
    }else if(dados.types[0]?.type.name == 'rock'){
      backgroud.style.backgroundColor = 'Maroon'
    }else if(dados.types[0]?.type.name == 'steel'){
      backgroud.style.backgroundColor = 'MediumAquamarine'
    }else if(dados.types[0]?.type.name == 'water'){
      backgroud.style.backgroundColor = 'blue'
    }
  }

  return (
    <div id='container-App' className='container-App'>
      <div className='container-Pokedex'>

        <div className='container-pesquisa'>
          <input defaultValue={pokemon} placeholder={pokemon} onChange={(e) => setPokemon(e.target.value)}/>
          <p>#{dados.id}</p>
        </div>

        <img src={dados.img}/>
        <p className='name'>{dados.name}</p>

        <div className='container-Types'>
            {dados.types.map((item, index) => {
                return(
                    <p key={index} style={{backgroundColor: `${colorsTypes[item.type.name]}`}} className='typeName' value={item.type.name}>{item.type.name}</p>
                )
              })}
          </div>

        <div className='container-Info'>
              <div className='container-Stats'>
                <p className='titulo'>Status</p>
                {dados.stats.map((item, index) => {
                  return(
                    <div className='stats' key={index}>
                      <p>{item.stat.name}:</p>
                      <p>{item.base_stat}</p>
                    </div>
                  )
                })}
              </div>

              <div className='container-Abilities'>
                <p className='titulo'>Habilidades</p>
                {dados.abilities.map((item, index) => {
                  return(
                    <p key={index}>{index + 1}. {item.ability.name}</p>
                  )
                })}
              </div>
        </div>

      </div>
    </div>
  )
}

export default App
