import { CARD_LIBRARY, type Effects, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const targetCondition: Effects.EffectHandler["target"]["conditions"] = (
  { state, cardId, target, playerId },
  args,
): Game.GameState => {
  const { conditions, chance, length } = args;

  const player = getPlayer(state, playerId ?? state.activePlayer);
  const foundCard =
    player.field.find((card) => card.id === cardId) ??
    player.hand.find(
      (card) =>
        card.id === cardId && CARD_LIBRARY[card.cardId]?.type === "SPELL",
    );

  if (!foundCard) return state;

  const opponent = getOpponent(state, playerId ?? state.activePlayer);
  const targetCard =
    player.field.find((card) => card.id === target) ??
    opponent.field.find((card) => card.id === target);
  if (!targetCard || CARD_LIBRARY[targetCard.cardId]?.type !== "CREATURE") {
    return state;
  }
  if (chance !== undefined && Math.random() >= chance) return state;

  console.log("conditions", conditions, length);
  const existingConditions = new Map(
    targetCard.conditions?.map((condition) => [condition.id, condition]),
  );
  for (const condition of conditions) {
    if (!existingConditions.has(condition)) {
      existingConditions.set(condition, { id: condition, length });
    }
  }
  targetCard.conditions = [...existingConditions.values()];
  console.log("conditions2", targetCard.conditions);
  return state;
};
