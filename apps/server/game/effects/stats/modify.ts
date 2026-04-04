import type { Effects } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const modify: Effects.EffectHandler["stats"]["modify"] = ({ state, cardId }, args) => {
  const { stats, cost } = args;

  const player = getPlayer(state, state.activePlayer);
  if (player.flux[cost.domain] < cost.amount) return state;
  player.flux[cost.domain] -= cost.amount;

  const foundCard = player.field.find((card) => card.id === cardId);
  if (!foundCard) return state;

  for (const { stat, amount } of stats) {
    foundCard[stat] = (foundCard[stat] ?? 0) + amount;
  }

  return state;
};
