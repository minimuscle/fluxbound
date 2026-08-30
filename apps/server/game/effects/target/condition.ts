import { CARD_LIBRARY, type Effects, type Game } from "@fluxbound/schema";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const targetCondition: Effects.EffectHandler["target"]["conditions"] = (
  { state, cardId, target },
  args,
): Game.GameState => {
  const { conditions, chance } = args;

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
  if (!targetCard || CARD_LIBRARY[targetCard.cardId]?.type !== "CREATURE") {
    return state;
  }
  if (chance !== undefined && Math.random() >= chance) return state;

  targetCard.conditions = [...(targetCard.conditions ?? []), ...conditions];

  return state;
};
