import HttpError from "@wasp/core/HttpError.js";

export const evaluateTrade = async (args) => {
  const pokemonAList = args.pokemonA;
  const pokemonBList = args.pokemonB;

  const totalA = pokemonAList.reduce(
    (acc, pokemon) => acc + pokemon.base_experience,
    0
  );
  const totalB = pokemonBList.reduce(
    (acc, pokemon) => acc + pokemon.base_experience,
    0
  );

  const difference = Math.abs(totalA - totalB);
  const fairThreshold = 10;

  if (difference < fairThreshold) {
    return "fair";
  } else {
    return "unfair";
  }
};

export const registerTrade = async (args, context) => {
  const { pokemonIdA, pokemonIdB } = args;
  const { user, entities } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const trade = await entities.Trade.create({
    data: {
      pokemonA: { connect: { id: pokemonIdA } },
      pokemonB: { connect: { id: pokemonIdB } },
      user: { connect: { id: user.id } },
    },
  });

  return trade;
};
