import type { Cards, Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type GenerateFluxProps = {
  state: Game.GameState;
  player: Game.PlayerId;
  domain: Cards.Domain;
  quantity?: number;
};

const MAX_FLUX = 100;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const generateFlux = ({
  state,
  player,
  domain,
  quantity = 1,
}: GenerateFluxProps) => {
  const playerState = getPlayer(state, player);
  playerState.flux[domain] = Math.min(playerState.flux[domain] + quantity, MAX_FLUX);
  return state;
};
