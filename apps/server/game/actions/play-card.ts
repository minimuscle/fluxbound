import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function playACard(state: Game.GameState, cardId: Game.CardId): Game.GameState {
  const player = getPlayer(state, state.activePlayer);
  const cardIndex = player.hand.findIndex(({ id }) => id === cardId);
  if (cardIndex === -1) return state;

  // Play the card into the field and remove from hand
  const [playedCard] = player.hand.splice(cardIndex, 1);
  if (!playedCard) return state;

  const gameCard = CARD_LIBRARY[playedCard.cardId];
  if (!gameCard) return state;

  player.field.push(playedCard);

  // Update the mana of the player
  player.mana[gameCard.domain] -= gameCard.cost;

  return state;
}
