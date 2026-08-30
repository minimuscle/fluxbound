import { CARD_LIBRARY, type Effects, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const targetDestroy: Effects.EffectHandler["target"]["destroy"] = (
  { state, cardId, target },
  args,
): Game.GameState => {
  const { condition } = args; // TODO: add guard for target type here

  const player = getPlayer(state, state.activePlayer);
  const foundCard =
    player.field.find((card) => card.id === cardId) ??
    player.hand.find(
      (card) =>
        card.id === cardId && CARD_LIBRARY[card.cardId]?.type === "SPELL",
    );

  if (!foundCard) return state;

  const opponent = getOpponent(state, state.activePlayer);
  const targetCard =
    player.field.find((card) => card.id === target) ??
    opponent.field.find((card) => card.id === target);
  if (!targetCard) return state;

  const matchesCondition = (() => {
    if (!(condition.field in targetCard)) return false;
    switch (condition.modififer) {
      case "lessThan":
        return targetCard[condition.field]! < condition.value;
      case "equalTo":
        return targetCard[condition.field] === condition.value;
      case "greaterThan":
        return targetCard[condition.field]! > condition.value;
    }
  })();

  if (matchesCondition) {
    // destroy card
    const field = player.field.includes(targetCard)
      ? player.field
      : opponent.field;
    field.filter(({ id }) => id !== targetCard.id);
  }

  return state;
};
