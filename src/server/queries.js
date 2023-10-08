import HttpError from '@wasp/core/HttpError.js'

export const getUserTrades = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const trades = await context.entities.Trade.findMany({
    where: {
      userId: context.user.id
    }
  });

  return trades;
}

export const getPokemon = async ({ id }, context) => {
  const pokemon = await context.entities.Pokemon.findUnique({
    where: { id }
  });

  if (!pokemon) throw new HttpError(404, 'No Pokemon with id ' + id);

  return pokemon;
}
