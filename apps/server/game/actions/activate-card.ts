import { CARD_LIBRARY, getCardTriggers, type Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { resolveCardEffect } from "game/rules/resolve-triggers";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const activateCard = async (state: Game.GameState, cardId: Game.CardId): Promise<Game.GameState> => {
  const player = getPlayer(state, state.activePlayer);

  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;
  const definition = CARD_LIBRARY[card.cardId];
  if (!definition || !getCardTriggers(definition).includes("onActivated") || (card.activations ?? 0) <= 0) return state;

  card.activations = (card.activations ?? 0) - 1;
  return resolveCardEffect(state, card, "onActivated");
};
