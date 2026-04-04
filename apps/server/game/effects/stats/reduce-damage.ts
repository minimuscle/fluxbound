import type { Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const reduceDamage: Game.EffectHandlers["stats"]["reduceDamage"] = ({ state, cardId, target }, args): Game.GameState => {
  const { amount } = args;

  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state);

  const foundReduction = opponent.field.find((card) => card.id === cardId);
  if (!foundReduction) return state;

  const foundCard = player.field.find((card) => card.id === target);
  if (!foundCard) return state;

  // Reduce the damage of foundCard by the amount, and if it is less than 0, set it to 0
  foundCard.damage = (foundCard.damage ?? 0) - amount;
  if (foundCard.damage < 0) {
    foundCard.damage = 0;
  }

  // Return the new state of foundCard
  return state;
};
