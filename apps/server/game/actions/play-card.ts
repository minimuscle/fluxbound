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
  target?: Game.Target,
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
      conditions:
        (gameCard as Cards.Creature).conditions?.map((condition) => ({
          id: condition,
          length: 999,
        })) ?? [],
    };

    player.field.push(creatureCard);
  }

  if (gameCard.type !== "SPELL" && gameCard.type !== "CREATURE") {
    player.field.push(playedCard);
  }

  target?.forEach(async (targetId) => {
    if (targetId === "self" || targetId === "opponent") {
      runCardTrigger(
        {
          state,
          cardId,
          targetPlayerId: targetId === "self" ? player.id : opponent.id,
        },
        "onActivated",
      );
      return;
    }
    if (targetId === "all") {
      player.field.forEach(async (card) => {
        const isCreature = CARD_LIBRARY[card.cardId]?.type === "CREATURE";
        if (isCreature) {
          await runCardTrigger(
            { state, cardId, target: card.id },
            "onActivated",
          );
        }
      });
      opponent.field.forEach(async (card) => {
        const isCreature = CARD_LIBRARY[card.cardId]?.type === "CREATURE";
        if (isCreature) {
          await runCardTrigger(
            { state, cardId, target: card.id },
            "onActivated",
          );
        }
      });
      return;
    }
    if (targetId === "opponentCreatures") {
      opponent.field.forEach(async (card) => {
        const isCreature = CARD_LIBRARY[card.cardId]?.type === "CREATURE";
        if (isCreature) {
          await runCardTrigger(
            { state, cardId, target: card.id },
            "onActivated",
          );
        }
      });
      return;
    }
    if (targetId === "selfCreatures") {
      player.field.forEach(async (card) => {
        const isCreature = CARD_LIBRARY[card.cardId]?.type === "CREATURE";
        if (isCreature) {
          await runCardTrigger(
            { state, cardId, target: card.id },
            "onActivated",
          );
        }
      });
      return;
    }
    await runCardTrigger(
      { state, cardId, target: targetId as Game.CardId },
      "onActivated",
    );
  });

  if (gameCard.type === "SPELL") {
    const playedCardIndex = player.hand.findIndex(({ id }) => id === cardId);
    if (playedCardIndex !== -1) player.hand.splice(playedCardIndex, 1);
  }

  // Update the flux of the player
  player.flux[gameCard.domain] -= gameCard.cost;

  return state;
}
