import { activateCard } from "pages/SoloGame/phases/activateCard";
import { endTurn } from "pages/SoloGame/phases/endTurn";
import { playCard } from "pages/SoloGame/phases/playCard";
import { restartGame } from "pages/SoloGame/phases/restartGame";
import { startGame } from "pages/SoloGame/phases/startGame";
import { startTurn } from "pages/SoloGame/phases/startTurn";
import type { Phases, State } from "../../../utils/types/game";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const phases: Phases = (state, action): State => {
  switch (action.phase) {
    case "START_GAME":
      return startGame(state);
    case "START_TURN":
      return startTurn(state);
    case "PLAY_CARD":
      return playCard(state, action);
    case "ACTIVATE_CARD":
      return activateCard(state, action);
    case "END_TURN":
      return endTurn(state);
    case "RESTART_GAME":
      return restartGame();
    default:
      return state;
  }
};
