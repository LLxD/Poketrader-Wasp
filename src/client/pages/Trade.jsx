import React, { useState } from "react";
import { useQuery } from "@wasp/queries";
import { useAction } from "@wasp/actions";
import getPokemon from "@wasp/queries/getPokemon";
import evaluateTrade from "@wasp/actions/evaluateTrade";
import TradeArea from "../components/TradeArea";

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
  const [tradeAreaB, setTradeAreaB] = useState([]);

  const evaluateTradeFn = useAction(evaluateTrade);
  const [fairness, setFairness] = useState(null);

  if (isLoadingPokemons) return "Loading...";
  if (errorLoadingPokemons) return "Error: " + errorLoadingPokemons;

  const handleEvaluateTrade = async () => {
    const result = await evaluateTradeFn({
      tradeAreaA: tradeAreaA,
      tradeAreaB: tradeAreaB,
    });
    setFairness(result);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Trade</h2>
      <div className="flex gap-x-4 mb-4">
        <div className="grid grid-flow-col gap-2">
          <TradeArea
            pokemons={pokemons}
            tradeAreaName="areaA"
            setSelectedPokemon={setSelectedPokemon}
            selectedPokemon={selectedPokemon}
            setTradeArea={setTradeAreaA}
            tradeArea={tradeAreaA}
          />
          <TradeArea
            pokemons={pokemons}
            tradeAreaName="areaB"
            setSelectedPokemon={setSelectedPokemon}
            selectedPokemon={selectedPokemon}
            setTradeArea={setTradeAreaB}
            tradeArea={tradeAreaB}
          />
        </div>
      </div>
      <button
        onClick={handleEvaluateTrade}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Evaluate Trade
      </button>
      {fairness && <p className="mt-4">Trade is {fairness}</p>}
    </div>
  );
}
