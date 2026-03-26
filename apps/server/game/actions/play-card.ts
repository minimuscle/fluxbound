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

  let creatureCard: Game.GameCard = playedCard;
  if (gameCard.type === "CREATURE") {
    creatureCard = {
      ...playedCard,
      damage: gameCard.damage,
      health: gameCard.health,
      activations: gameCard.activations,
    };
  }

  player.field.push(creatureCard);

  // Update the flux of the player
  player.flux[gameCard.domain] -= gameCard.cost;

  return state;
}
