import { CARD_LIBRARY, getCardActivationCost, getCardTriggers, type Game, type GameResponse } from "@fluxbound/schema";

export const canActivateCard = (player: Game.PlayerState, cardId: Game.CardId): GameResponse => {
  const card = player.field.find(({ id }) => id === cardId);
  if (!card) return { ok: false, code: "CARD_NOT_FOUND", message: "The card you are trying to activate does not exist" };

  const definition = CARD_LIBRARY[card.cardId];
  if (!definition || !getCardTriggers(definition).includes("onActivated") || (card.activations ?? 0) <= 0) {
    return { ok: false, code: "CARD_NOT_ACTIVATABLE", message: "The card you are trying to activate is not activatable" };
  }

  const cost = getCardActivationCost(definition);
  if (!cost || player.flux[cost.domain] < cost.amount) {
    return { ok: false, code: "INSUFFICIENT_FLUX", message: "Not enough flux to activate this card" };
  }

  return { ok: true };
};
