import { CARD_LIBRARY, type Cards, type Effects, type Game } from "@fluxbound/schema";
import { effects } from "game/effects";
import { getPlayer } from "./get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const runCardTrigger = async (
  context: {
    state: Game.GameState;
    cardId: Game.CardId;
    target?: Game.CardId;
  },
  triggerType: Cards.TriggerTypes,
): Promise<Game.GameState> => {
  const { state, cardId, target } = context;
  const player = getPlayer(state, state.activePlayer);
  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;

  const triggers = CARD_LIBRARY[card.cardId]?.triggers?.[triggerType];
  if (!triggers) return state;

  let newState = state;
  for (const trigger of triggers) {
    const [effectGroup, effectName] = trigger.id.split(".") as [Effects.EffectGroups, string];
    runEffect(effects, effectGroup, effectName as keyof Effects.Effect[typeof effectGroup] & string, { state, cardId, target }, trigger.args);
  }
  return newState;
};

function runEffect<TGroup extends Effects.EffectGroups, TName extends keyof Effects.Effect[TGroup] & string>(
  effects: Effects.EffectHandler,
  effectGroup: TGroup,
  effectName: TName,
  context: {
    state: Game.GameState;
    cardId: Game.CardId;
    target?: Game.CardId;
  },
  args: Effects.EffectArgumentsByParts<TGroup, TName>,
): Game.GameState {
  return effects[effectGroup][effectName](context, args);
}
