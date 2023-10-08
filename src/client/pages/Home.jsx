import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import evaluateTrade from '@wasp/actions/evaluateTrade';
import registerTrade from '@wasp/actions/registerTrade';
import getUserTrades from '@wasp/queries/getUserTrades';
import getPokemon from '@wasp/queries/getPokemon';

export function HomePage() {
  const { data: trades, isLoading: tradesLoading, error: tradesError } = useQuery(getUserTrades);
  const { data: pokemons, isLoading: pokemonsLoading, error: pokemonsError } = useQuery(getPokemon);
  const evaluateTradeFn = useAction(evaluateTrade);
  const registerTradeFn = useAction(registerTrade);

  if (tradesLoading || pokemonsLoading) return 'Loading...';
  if (tradesError || pokemonsError) return 'Error: ' + (tradesError || pokemonsError);

  const handleEvaluateTrade = () => {
    evaluateTradeFn();
  };

  const handleRegisterTrade = () => {
    registerTradeFn();
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to Poketrader!</h1>
      <p className='text-lg'>This is the home page of the application. Here, you can navigate to other pages and learn more about the app.</p>
      <div className='mt-4'>
        <Link to='/trade' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>Go to Trade Area</Link>
        <Link to='/profile' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Go to Profile</Link>
      </div>
      <div className='mt-4'>
        <button onClick={handleEvaluateTrade} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2'>Evaluate Trade</button>
        <button onClick={handleRegisterTrade} className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>Register Trade</button>
      </div>
    </div>
  );
}