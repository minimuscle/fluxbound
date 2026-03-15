import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function playACard(state: Game.GameState, cardId: Game.CardId): Game.GameState {
  const player = getPlayer(state, state.activePlayer);
  const cardIndex = player.hand.findIndex(({ id }) => id === cardId);
  if (!cardIndex) return state;

  player.field.push(player.hand[cardIndex] as Game.GameCard);
  player.hand.splice(cardIndex, 1);
  return state;
}
