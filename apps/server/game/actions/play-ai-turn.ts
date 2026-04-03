import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { endTurn } from "game/actions/end-turn";
import { getPlayer } from "game/helpers/get-player";
import { playACard } from "./play-card";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const playAITurn = (state: Game.GameState): Game.GameState => {
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

  const finalState = endTurn(state);
  return finalState;
};
