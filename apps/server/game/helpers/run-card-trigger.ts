import {
  CARD_LIBRARY,
  type Cards,
  type Effects,
  type Game,
} from "@fluxbound/schema";
import { effects } from "game/effects";
import { getPlayer } from "./get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const runCardTrigger = (
  context: Effects.EffectContext,
  triggerType: Cards.TriggerTypes,
): Game.GameState => {
  const { state, cardId, target, playerId, targetPlayerId } = context;
  const player = getPlayer(state, playerId ?? state.activePlayer);
  const card =
    player.field.find((card) => card.id === cardId) ??
    player.hand.find(
      (card) =>
        card.id === cardId && CARD_LIBRARY[card.cardId]?.type === "SPELL",
    );
  if (!card) return state;

  const triggers = CARD_LIBRARY[card.cardId]?.triggers?.[triggerType];
  if (!triggers) return state;

  let newState = state;
  for (const trigger of triggers) {
    const [effectGroup, effectName] = trigger.id.split(".") as [
      Effects.EffectGroups,
      string,
    ];
    newState = runEffect(
      effects,
      effectGroup,
      effectName as keyof Effects.Effect[typeof effectGroup] & string,
      {
        state: newState,
        cardId,
        target,
        playerId,
        targetPlayerId,
      } as Effects.EffectContext,
      trigger.args,
    );
  }
  return newState;
};

function runEffect<
  TGroup extends Effects.EffectGroups,
  TName extends keyof Effects.Effect[TGroup] & string,
>(
  effects: Effects.EffectHandler,
  effectGroup: TGroup,
  effectName: TName,
  context: Effects.EffectContext,
  args: Effects.EffectArgumentsByParts<TGroup, TName>,
): Game.GameState {
  return effects[effectGroup][effectName](context, args);
}
