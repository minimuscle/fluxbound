import type { Cards, Game } from "@fluxbound/schema";
import { effects } from "game/effects";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const runCardTrigger = async (state: Game.GameState, card: Cards.Card, triggerType: Cards.TriggerTypes): Promise<Game.GameState> => {
  const triggers = card.triggers?.[triggerType];
  if (!triggers) return state;
  let newState = state;
  for (const trigger of triggers) {
    const effect = trigger.id.split(".");
    newState = await effects[effect[0] as keyof typeof effects][effect[1] as keyof (typeof effects)[keyof typeof effects]](newState, trigger.args);
  }
  return newState;
};
