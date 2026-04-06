import type { Effects } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const modify: Effects.EffectHandler["stats"]["modify"] = ({ state, cardId, target, playerId }, args) => {
  const { stats, cost } = args;

  const player = getPlayer(state, playerId ?? state.activePlayer);
  const targetPlayer = getPlayer(state, state.activePlayer);

  if (player.flux[cost.domain] < cost.amount) return state;
  player.flux[cost.domain] -= cost.amount;

  const foundCard = player.field.find((card) => card.id === cardId);
  const targetCard = targetPlayer.field.find((card) => card.id === target);

  for (const { stat, amount } of stats) {
    if (targetCard) {
      targetCard[stat] = (targetCard[stat] ?? 0) + amount;
    } else if (foundCard) {
      foundCard[stat] = (foundCard[stat] ?? 0) + amount;
    }
  }

  return state;
};
