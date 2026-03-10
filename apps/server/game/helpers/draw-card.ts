import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function drawCard(deck: Game.GameCard[], numberOfCards = 1): { deck: Game.GameCard[]; hand: Game.GameCard[] } {
  const hand = deck.slice(0, numberOfCards);
  const rest = deck.slice(numberOfCards);

  return { deck: rest, hand };
}
