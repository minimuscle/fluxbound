import { CARD_LIBRARY, type Effects, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const modify: Effects.EffectHandler["target"]["modify"] = (
  { state, cardId, target, playerId, targetPlayerId },
  args,
): Game.GameState => {
  const { stats } = args; // TODO: add guard for target type here
  const player = getPlayer(state, playerId ?? state.activePlayer);
  const foundCard =
    player.field.find((card) => card.id === cardId) ??
    player.hand.find(
      (card) =>
        card.id === cardId && CARD_LIBRARY[card.cardId]?.type === "SPELL",
    );

  if (!foundCard) return state;

  if (targetPlayerId) {
    // The card is targeting the player, not a card in play
    const targetPlayer = getPlayer(state, targetPlayerId);
    for (const { stat, amount } of stats) {
      targetPlayer.health =
        stat === "health" ? targetPlayer.health + amount : targetPlayer.health; //TODO: player can only take health damage, so fix this
    }
  }

  if (target) {
    // The card is targeting a card in play
    const opponent = getOpponent(state, state.activePlayer);
    const playerTargetIndex = player.field.findIndex(
      (card) => card.id === target,
    );
    const targetField =
      playerTargetIndex === -1 ? opponent.field : player.field;
    const targetIndex =
      playerTargetIndex === -1
        ? opponent.field.findIndex((card) => card.id === target)
        : playerTargetIndex;
    const targetCard = targetField[targetIndex];
    if (!targetCard) return state;

    for (const { stat, amount } of stats) {
      targetCard[stat] = (targetCard[stat] ?? 0) + amount;
    }

    if (targetCard.health !== undefined && targetCard.health <= 0) {
      targetField.splice(targetIndex, 1);
    }
  }

  return state;
};
