import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { resolveCardEffect } from "game/rules/resolve-triggers";

const initialConditions = ({ conditions = [] }: Cards.Creature) => conditions.map((id) => ({ id, length: 999 }));

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function playACard(state: Game.GameState, cardId: Game.CardId, target?: Game.Target): Game.GameState {
  const player = getPlayer(state, state.activePlayer);
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
      damage: gameCard.damage,
      health: gameCard.health,
      maxHealth: gameCard.health,
      activations: 0,
      conditions: initialConditions(gameCard),
    };

    player.field.push(creatureCard);
  }

  if (gameCard.type !== "SPELL" && gameCard.type !== "CREATURE") {
    player.field.push(playedCard);
  }

  if (gameCard.type === "SPELL") {
    const playedCardIndex = player.hand.findIndex(({ id }) => id === cardId);
    if (playedCardIndex !== -1) player.hand.splice(playedCardIndex, 1);
  }

  // Update the flux of the player
  player.flux[gameCard.domain] -= gameCard.cost;

  const source = player.field.find(({ id }) => id === cardId) ?? playedCard;
  return resolveCardEffect(state, source, "onPlayed", target);
}
