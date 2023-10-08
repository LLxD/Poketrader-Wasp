import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@wasp/queries";
import getUserTrades from "@wasp/queries/getUserTrades";

export function Profile() {
  const { data: trades, isLoading, error } = useQuery(getUserTrades);
  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trade History</h1>
      {trades.map((trade) => {
        const tradeAreaA = JSON.parse(trade.tradeAreaA);
        const tradeAreaB = JSON.parse(trade.tradeAreaB);
        return (
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-bold">Trade ID: </span>
              <span>{trade.id}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Trade Area A: </span>
              <span>
                {tradeAreaA.map((pokemon) => {
                  return pokemon.name + " ";
                })}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Trade Area B: </span>
              <span>
                {tradeAreaB.map((pokemon) => {
                  return pokemon.name + " ";
                })}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Fairness: </span>
              <span>{trade.fairness}</span>
            </div>
          </div>
        );
      })}
      <Link
        to="/trade"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Trade Page
      </Link>
    </div>
  );
}
