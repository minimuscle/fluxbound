import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { effects } from "game/effects";
import { getPlayer } from "./get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const runCardTrigger = async (state: Game.GameState, cardId: Game.CardId, triggerType: Cards.TriggerTypes): Promise<Game.GameState> => {
  const player = getPlayer(state, state.activePlayer);
  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;

  const triggers = CARD_LIBRARY[card.cardId]?.triggers?.[triggerType];
  if (!triggers) return state;

  let newState = state;
  for (const trigger of triggers) {
    const [group, name] = trigger.id.split(".") as any;
    const effectHandler = getEffectHandler(group, name);
    newState = await effectHandler({ state: newState, cardId }, trigger.args, cardId);
  }
  return newState;
};

const getEffectHandler = <TGroup extends keyof Game.EffectHandlers>(group: TGroup, name: keyof Game.EffectHandlers[TGroup]) => {
  return effects[group][name];
};
