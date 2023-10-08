import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@wasp/queries";
import { useAction } from "@wasp/actions";
import getPokemon from "@wasp/queries/getPokemon";
import evaluateTrade from "@wasp/actions/evaluateTrade";

export function Trade() {
  const {
    data: pokemons,
    isLoading: isLoadingPokemons,
    error: errorLoadingPokemons,
  } = useQuery(getPokemon);

  const [selectedPokemon, setSelectedPokemon] = useState({
    areaA: null,
    areaB: null,
  });
  const [tradeAreaA, setTradeAreaA] = useState([]);

  const evaluateTradeFn = useAction(evaluateTrade);
  const [fairness, setFairness] = useState(null);

  if (isLoadingPokemons) return "Loading...";
  if (errorLoadingPokemons) return "Error: " + errorLoadingPokemons;

  // const handleEvaluateTrade = async () => {
  //   const result = await evaluateTradeFn({
  //     pokemonIdA: pokemons.id,
  //     pokemonIdB: pokemonB.id,
  //   });
  //   setFairness(result);
  // };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Trade</h2>
      <div className="flex gap-x-4 mb-4">
        <div>
          <h3 className="text-xl">Trade Area A</h3>
          {tradeAreaA.map((pokemon) => (
            <div>
              <p>Pokemon: {pokemon.name}</p>
            </div>
          ))}
          <select
            onChange={(e) => {
              const targetPokemon = pokemons.find(
                (pokemon) => pokemon.name === e.target.value
              );
              setSelectedPokemon({ ...selectedPokemon, areaA: targetPokemon });
            }}
          >
            {pokemons.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (tradeAreaA.length <= 6) {
              setTradeAreaA([...tradeAreaA, selectedPokemon.areaA]);
            }
          }}
        >
          Add to Trade Area A
        </button>
        {/* <div>
          <h3 className="text-xl">Trade Area B</h3>
          <p>Pokemon: {pokemonB.name}</p>
          <p>Experience Points: {pokemonB.experiencePoints}</p>
        </div> */}
      </div>
      {/* <button
        onClick={handleEvaluateTrade}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Evaluate Trade
      </button> */}
      {fairness && <p className="mt-4">Trade is {fairness}</p>}
    </div>
  );
}
