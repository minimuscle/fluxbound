import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const modify: Game.EffectHandlers["stats"]["modify"] = (state, args) => {
  const { stats, cost } = args;

  const player = getPlayer(state, state.activePlayer);
  if (player.flux[cost.domain] < cost.amount) return state;

  const foundCard = player.field.find((card) => card.id === cardId);
  if (!foundCard) return state;

  for (const { stat, amount } of stats) {
    if (stat in foundCard) {
      foundCard[stat] += amount;
    }
  }

  return state;
};
