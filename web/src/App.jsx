import './App.css'
import axios from 'axios'

import { useEffect, useState } from 'react'

function App() {

  let [pokemon, setPokemon] = useState('bulbasaur')
  let [dados, setDados] = useState({
    name: '',
    id: '',
    img: '',
    types: [],
  })
  const colorsTypes = {
    'bug': 'DarkGreen',
    'dark': 'grey11',
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
    data();
    types();
  }, [pokemon, dados])

  async function data(){
     await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`).then((response) => {
      setDados({
        name: response.data.name,
        id: response.data.id,
        img: response.data.sprites.front_default,
        types: response.data.types
      })
    })
  }

  function pesquisar(e){
    e.preventDefault();
    setPokemon(document.getElementById('pesquisa').value)
    document.getElementById('pesquisa').value = ''
  }

  function types(){
    var typeName = document.getElementById('typeName')

    if(dados.types[0]?.type.name == 'bug'){
      typeName.style.backgroundColor = 'DarkGreen'
    }else if(dados.types[0]?.type.name == 'dark'){
      dtypeName.style.backgroundColor = 'grey11'
    }else if(dados.types[0]?.type.name == 'dragon'){
      typeName.style.backgroundColor = 'DeepSkyBlue'
    }else if(dados.types[0]?.type.name == 'electric'){
      typeName.style.backgroundColor = 'Yellow'
    }else if(dados.types[0]?.type.name == 'fairy'){
      typeName.style.backgroundColor = 'MediumVioletRed'
    }else if(dados.types[0]?.type.name == 'fighting'){
      typeName.style.backgroundColor = 'Orange'
    }else if(dados.types[0]?.type.name == 'fire'){
      typeName.style.backgroundColor = 'red'
    }else if(dados.types[0]?.type.name == 'flying'){
      typeName.style.backgroundColor = 'CadetBlue'
    }else if(dados.types[0]?.type.name == 'ghost'){
      typeName.style.backgroundColor = 'Indigo'
    }else if(dados.types[0]?.type.name == 'grass'){
      typeName.style.backgroundColor = 'green'
    }else if(dados.types[0]?.type.name == 'ground'){
      typeName.style.backgroundColor = 'Chocolate'
    }else if(dados.types[0]?.type.name == 'ice'){
      typeName.style.backgroundColor = 'Aqua'
    }else if(dados.types[0]?.type.name == 'normal'){
      typeName.style.backgroundColor = 'PaleVioletRed'
    }else if(dados.types[0]?.type.name == 'poison'){
      typeName.style.backgroundColor = 'Purple'
    }else if(dados.types[0]?.type.name == 'psychic'){
      typeName.style.backgroundColor = 'DeepPink'
    }else if(dados.types[0]?.type.name == 'rock'){
      typeName.style.backgroundColor = 'Maroon'
    }else if(dados.types[0]?.type.name == 'steel'){
      typeName.style.backgroundColor = 'MediumAquamarine'
    }else if(dados.types[0]?.type.name == 'water'){
      typeName.style.backgroundColor = 'blue'
    }
  }
    
  return (
    <div className="App">
      <div id='typeName' className='container'>
        <div className='apresentacao'>
          <div className='containerPesquisa'>
            <form onSubmit={pesquisar}>
              <input id='pesquisa' placeholder={dados.name}/>
            </form>
            <p className='id'>#{dados.id}</p>
          </div>

          
          <div className='containerImg'>
            <img className='imgPokemon' alt='' src={dados.img}/>
          </div>
        </div>

        <div className='info'>
          <div className='types'>
            {dados.types.map((typeInfo, index) => {
                return(
                  <div style={{backgroundColor: `${colorsTypes[typeInfo.type.name]}`}} className='typeName' value={typeInfo.type.name} key={index}>
                    <p>{typeInfo.type.name}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
