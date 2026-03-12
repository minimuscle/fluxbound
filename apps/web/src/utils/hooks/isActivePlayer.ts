import { use } from "react";
import { GameContext } from "routes/_app/game/-components/context";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const useIsActivePlayer = () => {
  const { state, playerId } = use(GameContext)!;
  console.log(state);
  return state.activePlayer === playerId;
};
