import { createContext } from "react";
import type { Opponents } from "routes/_app/game/lobby/-components/singlePlayer/selection";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type SelectedOpponentContext = {
  selectedOpponent: Opponents | null;
  setSelectedOpponent: React.Dispatch<React.SetStateAction<Opponents | null>>;
};

/**********************************************************************************************************
 *   CONTEXT START
 **********************************************************************************************************/
export const SelectedOpponentContext = createContext<SelectedOpponentContext>({
  selectedOpponent: null,
  setSelectedOpponent: () => null,
});
