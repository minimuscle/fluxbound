import { createContext } from "react";
import type { Action, State } from "utils/types/game";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type GameContext = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const GameContext = createContext<GameContext | null>(null);
