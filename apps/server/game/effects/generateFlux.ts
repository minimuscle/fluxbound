import type { Cards, Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type GenerateFluxProps = {
  player: Game.PlayerState;
  domain: Cards.Domain;
  quantity: number;
};

const MAX_FLUX = 100;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const generateFlux = ({
  player,
  domain,
  quantity,
}: GenerateFluxProps) => {
  player.flux[domain] = Math.min(player.flux[domain] + quantity, MAX_FLUX);
};
