import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { endTurn } from "game/actions/end-turn";
import { getPlayer } from "game/helpers/get-player";
import { activateCard } from "./activate-card";
import { playACard } from "./play-card";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const playAITurn = async (
  state: Game.GameState,
): Promise<Game.GameState> => {
  // Play all runes
  const player = getPlayer(state, state.activePlayer);
  player.hand.forEach((card) => {
    const cardData = CARD_LIBRARY[card.cardId];
    if (!cardData) return;
    if (cardData.type !== "RUNE") return;
    state = playACard(state, card.id);
  });

  // Play any cards in hand that can be played / afforded
  player.hand.forEach((card) => {
    const cardData = CARD_LIBRARY[card.cardId];
    if (!cardData) return;
    if (player.flux[cardData.domain] < cardData.cost) return;

    state = playACard(state, card.id);
  });

  // Activate any cards in the field that can be activated
  player.field.forEach(async (card) => {
    const cardData = CARD_LIBRARY[card.cardId];
    if (!cardData) return;
    if ("activations" in card) {
      if (!card.activations) return;
      card.activations--;
      state = await activateCard(state, card.id);
    }
  });

  const finalState = await endTurn(state);
  return finalState;
};
