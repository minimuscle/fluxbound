import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function drawCard(
  state: Game.GameState,
  numberOfCards = 1,
): Game.GameState {
  const player = getPlayer(state, state.activePlayer);
  player.hand = [...player.hand, ...player.deck.slice(0, numberOfCards)];
  player.deck = player.deck.slice(numberOfCards);
  return state;
}
