import { CARD_LIBRARY, getCardActivationCost, type Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { canActivateCard } from "game/rules/can-activate-card";
import { resolveCardEffect } from "game/rules/resolve-triggers";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const activateCard = async (state: Game.GameState, cardId: Game.CardId, target?: Game.Target): Promise<Game.GameState> => {
  const player = getPlayer(state, state.activePlayer);
  if (!canActivateCard(player, cardId).ok) return state;

  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;
  const definition = CARD_LIBRARY[card.cardId];
  if (!definition) return state;
  const cost = getCardActivationCost(definition);
  if (!cost) return state;

  player.flux[cost.domain] -= cost.amount;
  card.activations = (card.activations ?? 0) - 1;
  return resolveCardEffect(state, card, "onActivated", target);
};
