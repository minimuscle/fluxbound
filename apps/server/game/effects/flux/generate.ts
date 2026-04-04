import type { Effects } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const generate: Effects.EffectHandler["flux"]["generate"] = ({ state }, args) => {
  const { domain, amount } = args;
  const player = getPlayer(state, state.activePlayer);
  player.flux[domain] += amount;
  return state;
};
