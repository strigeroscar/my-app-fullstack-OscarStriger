import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';//importar axios

const CountContext = React.createContext();

// Child component som visar count och en Pokemon
function CounterDisplay() {
  const { count } = useContext(CountContext);
 const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${count}`);
      setPokemon(response.data);//hämtar api där ${count} är pokemonen som blir hämtad
    }
    fetchPokemon();
  }, [count]);

  return (
    <div class="randPoke">
      <div>Pokédex entry: #{count}</div>{/* renderar count vilket är pokemonens nummer */}
      {pokemon && (
        <div>
          <img id="pokeImg" src={pokemon.sprites.front_default} alt={pokemon.name} />{/* renderar bild och namn */}
          <div><h3 id="pokeTitle">{pokemon.name}</h3></div>
        </div>
      )}
    </div>
  );
}


// Child component som genererar ett nummer mellan 1-1015
function CounterButton() {
  const { setCount } = useContext(CountContext);

  const handleClick = () => {
     const randomNum = Math.floor(Math.random() * 1015) + 1;
    setCount(randomNum);
  };

  return <button onClick={handleClick}>Click me for a random Pokemon!</button>;
}

// Parent component that uses CountContext to manage state and pass props to children
function Counter() {
  const [count, setCount] = useState(1); // börjar på 1 med bulbasaur

  return (//returnar en div med en h1 och de två övre child componenterna
    <div>
      <h1>Random Pokemon Generator</h1>
      <CountContext.Provider value={{ count, setCount }}>
        <CounterDisplay />
        <CounterButton />
      </CountContext.Provider>
    </div>
  );
}

export default Counter;
