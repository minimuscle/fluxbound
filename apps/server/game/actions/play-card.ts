import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { runCardTrigger } from "game/helpers/run-card-trigger";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function playACard(
  state: Game.GameState,
  cardId: Game.CardId,
  target?: Array<Game.CardId | "self" | "opponent">,
): Game.GameState {
  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state, state.activePlayer);
  const cardIndex = player.hand.findIndex(({ id }) => id === cardId);
  if (cardIndex === -1) return state;

  const playedCard = player.hand[cardIndex];
  if (!playedCard) return state;

  const gameCard = CARD_LIBRARY[playedCard.cardId];
  if (!gameCard) return state;

  if (gameCard.type !== "SPELL") {
    player.hand.splice(cardIndex, 1);
  }

  if (gameCard.type === "CREATURE") {
    const creatureCard = {
      ...playedCard,
      damage: (gameCard as Cards.Creature).damage,
      health: (gameCard as Cards.Creature).health,
      activations: 0,
    };

    player.field.push(creatureCard);
  }

  if (gameCard.type !== "SPELL" && gameCard.type !== "CREATURE") {
    player.field.push(playedCard);
  }

  target?.forEach((targetId) => {
    if (targetId === "self" || targetId === "opponent") {
      runCardTrigger(
        {
          state,
          cardId,
          playerId: targetId === "self" ? player.id : opponent.id,
        },
        "onActivated",
      );
      return;
    }
    runCardTrigger({ state, cardId, target: targetId }, "onActivated");
  });

  if (gameCard.type === "SPELL") {
    const playedCardIndex = player.hand.findIndex(({ id }) => id === cardId);
    if (playedCardIndex !== -1) player.hand.splice(playedCardIndex, 1);
  }

  // Update the flux of the player
  player.flux[gameCard.domain] -= gameCard.cost;

  return state;
}
