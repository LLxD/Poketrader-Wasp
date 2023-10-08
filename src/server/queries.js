import HttpError from "@wasp/core/HttpError.js";
import Pokedex from "pokedex-promise-v2";

export const getUserTrades = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const trades = await context.entities.Trade.findMany({
    where: {
      userId: context.user.id,
    },
  });

  return trades;
};

async function loadPokemons() {
  const P = new Pokedex();
  const response = await P.getGenerationByName("generation-i");
  const pokemons = response.pokemon_species;
  const pokemonsWithImages = await Promise.all(
    pokemons.map(async (pokemon) => {
      const pokemonData = await P.getPokemonByName(pokemon.name);
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        base_experience: pokemonData.base_experience,
        image: pokemonData.sprites.front_default,
      };
    })
  );

  return pokemonsWithImages;
}

export const getPokemon = async () => {
  const pokemons = await loadPokemons();

  return pokemons;
};
