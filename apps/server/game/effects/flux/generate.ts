import type { Effects } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

const MAX_FLUX = 100;
/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const generate: Effects.EffectHandler["flux"]["generate"] = (
  { state },
  args,
) => {
  const { domain, amount } = args;
  const player = getPlayer(state, state.activePlayer);
  player.flux[domain] += amount;

  if (player.flux[domain] > MAX_FLUX) player.flux[domain] = MAX_FLUX;
  return state;
};
