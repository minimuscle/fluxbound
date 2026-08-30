import { CARD_LIBRARY, type Effects, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const modify: Effects.EffectHandler["target"]["modify"] = (
  { state, cardId, target, playerId },
  args,
): Game.GameState => {
  const { stats } = args; // TODO: add guard for target type here

  const player = getPlayer(state, state.activePlayer);
  const foundCard =
    player.field.find((card) => card.id === cardId) ??
    player.hand.find(
      (card) =>
        card.id === cardId && CARD_LIBRARY[card.cardId]?.type === "SPELL",
    );

  if (!foundCard) return state;

  if (playerId) {
    // The card is targeting the player, not a card in play
    const targetPlayer = getPlayer(state, playerId);
    for (const { stat, amount } of stats) {
      targetPlayer.health =
        stat === "health" ? targetPlayer.health + amount : targetPlayer.health; //TODO: player can only take health damage, so fix this
    }
  }

  if (target) {
    // The card is targeting a card in play
    const opponent = getOpponent(state, state.activePlayer);
    const targetCard =
      player.field.find((card) => card.id === target) ??
      opponent.field.find((card) => card.id === target);
    if (!targetCard) return state;

    for (const { stat, amount } of stats) {
      targetCard[stat] = (targetCard[stat] ?? 0) + amount;
    }

    if (targetCard.health && targetCard.health < 0) {
      const field = player.field.includes(targetCard)
        ? player.field
        : opponent.field;
      field.splice(field.indexOf(targetCard), 1);
    }
  }

  return state;
};
