import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { setPlayerState } from "game/helpers/set-player-state";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const discardCard = (state: Game.GameState, cardId: Game.CardId): Game.GameState => {
  // Check if the card is in the players hand
  const player = getPlayer(state, state.activePlayer);
  if (!player.hand.find((card) => card.id === cardId)) return state;

  // Remove the card from the players hand
  const nextPlayerHand = player.hand.filter((card) => card.id !== cardId);
  return setPlayerState(state, state.activePlayer, {
    ...player,
    hand: nextPlayerHand,
  });
};