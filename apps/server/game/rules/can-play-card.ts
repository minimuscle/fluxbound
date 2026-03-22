import { CARD_LIBRARY, type Game, type GameResponse } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const canPlayCard = (player: Game.PlayerState, cardId?: Game.CardId): GameResponse => {
  const cardInHand = player.hand.find((handCard) => handCard.id === cardId);
  if (!cardInHand) return { ok: false, code: "CARD_NOT_FOUND", message: "Card is not in your hand" };

  const gameCard = CARD_LIBRARY[cardInHand.cardId];
  if (!gameCard) return { ok: false, code: "CARD_NOT_FOUND", message: "Card does not exist" };

  const hasEnoughMana = player.mana[gameCard.domain] >= gameCard.cost;
  if (!hasEnoughMana) return { ok: false, code: "INSUFFICIENT_MANA", message: "Not enough mana to play this card" };

  //TODO check type of card and if those actions it can perform are allowed, such as targeting creature, but there are no targetable creatures

  return { ok: true };
};
