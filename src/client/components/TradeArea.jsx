import React from "react";

function TradeArea({
  pokemons,
  tradeAreaName,
  setSelectedPokemon,
  selectedPokemon,
  setTradeArea,
  tradeArea,
}) {
  return (
    <div>
      <h3 className="text-xl">{tradeAreaName}</h3>
      {tradeArea.map((pokemon) => (
        <div className="grid grid-flow-col items-center">
          <p>
            Pokemon: <strong className="capitalize"> {pokemon.name} </strong>
          </p>
          <img className="w-10" src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
      <div className="grid gap-2">
        <select
          className="border border-gray-400 rounded-md"
          onChange={(e) => {
            const targetPokemon = pokemons.find(
              (pokemon) => pokemon.name === e.target.value
            );
            setSelectedPokemon({ ...selectedPokemon, areaA: targetPokemon });
          }}
        >
          <option disabled selected value>
            -- select an option --
          </option>
          {pokemons.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (!selectedPokemon.areaA) return;

            if (tradeArea.length < 6) {
              setTradeArea([...tradeArea, selectedPokemon.areaA]);
            }
          }}
        >
          Add to {tradeAreaName}
        </button>
      </div>
    </div>
  );
}

export default TradeArea;
