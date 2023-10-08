import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserTrades from '@wasp/queries/getUserTrades';

export function Profile() {
  const { data: trades, isLoading, error } = useQuery(getUserTrades);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trade History</h1>
      {trades.map((trade) => (
        <div key={trade.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
          <div>Trade ID: {trade.id}</div>
          <div>Pokemon A: {trade.pokemonA.name}</div>
          <div>Pokemon B: {trade.pokemonB.name}</div>
        </div>
      ))}
      <Link to="/trade" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Trade Page
      </Link>
    </div>
  );
}