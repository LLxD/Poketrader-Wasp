import React from "react";

function TradeArea({
  pokemons,
  tradeAreaName,
  setSelectedPokemon,
  selectedPokemon,
  setTradeArea,
  tradeArea,
}) {
  const displayName =
    tradeAreaName === "areaA" ? "Trade Area A" : "Trade Area B";
  return (
    <div>
      <h3 className="text-xl">{displayName}</h3>
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
            setSelectedPokemon({
              ...selectedPokemon,
              [tradeAreaName]: targetPokemon,
            });
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
            if (!selectedPokemon[tradeAreaName]) return;

            if (tradeArea.length < 6) {
              setTradeArea([...tradeArea, selectedPokemon[tradeAreaName]]);
            }
          }}
        >
          Add to {displayName}
        </button>
      </div>
    </div>
  );
}

export default TradeArea;
