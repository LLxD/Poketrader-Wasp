import HttpError from "@wasp/core/HttpError.js";

export const evaluateTrade = async (args) => {
  const pokemonAList = args.tradeAreaA;
  const pokemonBList = args.tradeAreaB;

  const totalA = pokemonAList.reduce(
    (acc, pokemon) => acc + pokemon.base_experience,
    0
  );
  const totalB = pokemonBList.reduce(
    (acc, pokemon) => acc + pokemon.base_experience,
    0
  );

  const difference = Math.abs(totalA - totalB);
  const fairThreshold = (totalA + totalB) * 0.1;

  if (difference < fairThreshold) {
    return "fair";
  } else {
    return "unfair";
  }
};

export const registerTrade = async (args, context) => {
  const pokemonAList = args.tradeAreaA;
  const pokemonBList = args.tradeAreaB;
  const { user, entities } = context;

  const stringifiedPokemonAList = JSON.stringify(pokemonAList);
  const stringifiedPokemonBList = JSON.stringify(pokemonBList);

  if (!user) {
    throw new HttpError(401);
  }

  const trade = await entities.Trade.create({
    data: {
      tradeAreaA: stringifiedPokemonAList,
      tradeAreaB: stringifiedPokemonBList,
      fairness: args.fairness,
      user: { connect: { id: user.id } },
    },
  });

  return trade;
};
