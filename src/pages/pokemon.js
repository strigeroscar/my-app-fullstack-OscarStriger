import { useState, useEffect } from 'react';
import axios from 'axios';//hämtar axios

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);//pokemonList är en tom array som kommer fyllas från API:t
  const [selectedType, setSelectedType] = useState('all');//selected type är "filtret" som är satt till all från början

  useEffect(() => {//fetch
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')//valde att hämta 151 pokemon här (det är alla i första generationens pokemon)
      .then(response => {
        const pokemonPromises = response.data.results.map(pokemon => axios.get(pokemon.url));
        return Promise.all(pokemonPromises);//hämtar en array av urls för varje pokemon, sedan promise all för att kunna hämta ur data ur alla urls
      })
      .then(responses => {
        const updatedPokemonList = responses.map(response => {//updaterar pokemonlist med värden
          const types = response.data.types.map(types => types.type.name);
          return {
            name: response.data.name,//namn
            id: response.data.id,//id för key
            image: response.data.sprites.front_default,//bild
            types: types,//type som vi filtrerar med sen
          };
        });
        setPokemonList(updatedPokemonList);//updaterar arrayen
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleTypeChange = (event) => {//används för att updatera selectedtype
    setSelectedType(event.target.value);
  };

  const filteredPokemonList = selectedType === 'all'//selectedtype = all så visas alla pokemon
    ? pokemonList
    : pokemonList.filter(pokemon => pokemon.types.includes(selectedType));//om selectedtype = grass tex så ska bara grass pokemon visas

  return (
    <div>
      <h1>Pokémon List</h1>
      <div>
        <label htmlFor="type-filter">Filter by Type: </label>
        <select id="type-filter" value={selectedType} onChange={handleTypeChange}>{/*alla filter*/}
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>{/* dark finns inte i gen1 pokemon men lade till den endå */}
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <ul>
        {filteredPokemonList.map(pokemon => (//rendering från api:t id=pokedex nr men fungerar även som key, namn,type och bild
          <li key={pokemon.id}>
            <span>#{pokemon.id}. {pokemon.name}</span>
            <img src={pokemon.image} alt={pokemon.name} />
            <div>Types: {pokemon.types.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
