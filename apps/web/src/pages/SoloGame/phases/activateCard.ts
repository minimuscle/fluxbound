import { runCardTrigger } from "pages/SoloGame/utils/functions";
import type { Action, State } from "utils/types/game";

export const activateCard = (state: State, action: Action): State => {
  if (!action.card) return state;
  return runCardTrigger(state, state.activePlayer, action.card, "onActivated");
};
