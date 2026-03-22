import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const generate: Game.EffectHandlers["flux"]["generate"] = (state, args) => {
  const { domain, amount } = args;
  const player = getPlayer(state, state.activePlayer);
  player.mana[domain] += amount;
  return state;
};
