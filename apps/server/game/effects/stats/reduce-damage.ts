import type { Effects, Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const reduceDamage: Effects.EffectHandler["stats"]["reduceDamage"] = ({ state, target }, args): Game.GameState => {
  const { amount } = args;

  const player = getPlayer(state, state.activePlayer);
  const targetCard = player.field.find((card) => card.id === target);

  if (targetCard) {
    targetCard.damage = (targetCard.damage ?? 0) - amount;
    if (targetCard.damage < 0) {
      targetCard.damage = 0;
    }
  }

  return state;
};
