import type { Game } from "@fluxbound/schema";
import { endTurn } from "game/actions/end-turn";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const playAITurn = (state: Game.GameState): Game.GameState => {
  // TODO: Actually play a turn and do things.

  const finalState = endTurn(state);
  return finalState;
};
