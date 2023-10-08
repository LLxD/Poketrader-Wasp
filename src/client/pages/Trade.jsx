import React, { useState, useEffect } from "react";
import { useQuery } from "@wasp/queries";
import { useAction } from "@wasp/actions";
import getPokemon from "@wasp/queries/getPokemon";
import evaluateTrade from "@wasp/actions/evaluateTrade";
import registerTrade from "@wasp/actions/registerTrade";
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
  const [tradeRegisteredStatus, setTradeRegisteredStatus] = useState(false);

  const evaluateTradeFn = useAction(evaluateTrade);
  const [fairness, setFairness] = useState(null);

  if (isLoadingPokemons) return "Loading...";
  if (errorLoadingPokemons) return "Error: " + errorLoadingPokemons;

  const handleRegisterTrade = async () => {
    await registerTrade({
      tradeAreaA: tradeAreaA,
      tradeAreaB: tradeAreaB,
      fairness: fairness,
    });

    setTradeRegisteredStatus(true);
  };

  const handleEvaluateTrade = async () => {
    const result = await evaluateTradeFn({
      tradeAreaA: tradeAreaA,
      tradeAreaB: tradeAreaB,
    });
    setFairness(result);
  };

  useEffect(() => {
    if (tradeAreaA.length > 0 && tradeAreaB.length > 0) {
      handleEvaluateTrade();
    }
  }, [tradeAreaA, tradeAreaB]);

  return (
    <div className="p-4">
      <h2
        className={`text-2xl mb-4 font-bold ${
          fairness === "fair" ? "text-green-500" : "text-red-500"
        } `}
      >
        Trade {fairness && `- is ${fairness}`}
      </h2>

      <div className="grid gap-x-4 mb-4">
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
      <div className="grid">
        <button
          onClick={() => {
            setTradeAreaA([]);
            setTradeAreaB([]);
            setFairness(null);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reset
        </button>
        <button
          onClick={handleRegisterTrade}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Register Trade
        </button>
        {tradeRegisteredStatus && (
          <p className="mt-4 text-green-500">Trade successfully registered!</p>
        )}
        {!tradeRegisteredStatus && (
          <p className="mt-4 text-gray-500">Trade pending register!</p>
        )}
      </div>
    </div>
  );
}
