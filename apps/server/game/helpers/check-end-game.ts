import type { Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type EndGameCheck =
  | {
      ended: true;
      winner: Game.PlayerId;
    }
  | { ended: false };

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const checkEndGame = (state: Game.GameState): EndGameCheck => {
  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state, state.activePlayer);

  // Check if opponent is out of cards to draw or less than 0 health
  if (opponent.deck.length === 0 || opponent.health <= 0) {
    return { ended: true, winner: player.id };
  }

  // Check if player is less than 0 health
  if (player.health <= 0) {
    return { ended: true, winner: opponent.id };
  }

  return { ended: false };
};
