import HttpError from '@wasp/core/HttpError.js'

export const evaluateTrade = async (args, context) => {
  const pokemonA = await context.entities.Pokemon.findUnique({
    where: { id: args.pokemonIdA }
  });

  const pokemonB = await context.entities.Pokemon.findUnique({
    where: { id: args.pokemonIdB }
  });

  const difference = Math.abs(pokemonA.experiencePoints - pokemonB.experiencePoints);
  const fairThreshold = Math.max(pokemonA.experiencePoints, pokemonB.experiencePoints) * 0.1;

  if (difference < fairThreshold) {
    return 'fair';
  } else {
    return 'unfair';
  }
}

export const registerTrade = async (args, context) => {
  const { pokemonIdA, pokemonIdB } = args;
  const { user, entities } = context;

  if (!user) { throw new HttpError(401) }

  const trade = await entities.Trade.create({
    data: {
      pokemonA: { connect: { id: pokemonIdA } },
      pokemonB: { connect: { id: pokemonIdB } },
      user: { connect: { id: user.id } }
    }
  });

  return trade;
}