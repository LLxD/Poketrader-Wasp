import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPokemon from '@wasp/queries/getPokemon';
import evaluateTrade from '@wasp/actions/evaluateTrade';

export function Trade() {
  const { data: pokemonA, isLoading: isLoadingA, error: errorA } = useQuery(getPokemon, { id: 1 });
  const { data: pokemonB, isLoading: isLoadingB, error: errorB } = useQuery(getPokemon, { id: 2 });
  const evaluateTradeFn = useAction(evaluateTrade);
  const [fairness, setFairness] = useState(null);

  if (isLoadingA || isLoadingB) return 'Loading...';
  if (errorA || errorB) return 'Error: ' + (errorA || errorB);

  const handleEvaluateTrade = async () => {
    const result = await evaluateTradeFn({
      pokemonIdA: pokemonA.id,
      pokemonIdB: pokemonB.id
    });
    setFairness(result);
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-4'>Trade</h2>
      <div className='flex gap-x-4 mb-4'>
        <div>
          <h3 className='text-xl'>Trade Area A</h3>
          <p>Pokemon: {pokemonA.name}</p>
          <p>Experience Points: {pokemonA.experiencePoints}</p>
        </div>
        <div>
          <h3 className='text-xl'>Trade Area B</h3>
          <p>Pokemon: {pokemonB.name}</p>
          <p>Experience Points: {pokemonB.experiencePoints}</p>
        </div>
      </div>
      <button
        onClick={handleEvaluateTrade}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Evaluate Trade
      </button>
      {fairness && (
        <p className='mt-4'>Trade is {fairness}</p>
      )}
    </div>
  );
}