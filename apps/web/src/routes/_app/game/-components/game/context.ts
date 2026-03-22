import type { Game } from "@fluxbound/schema";
import { createContext } from "react";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerContext = {
  stage: "PLAYER";
  player: Game.PlayerState;
} | {
  stage: "ENEMY";
  player: Game.PublicPlayerStateView;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerContext = createContext<PlayerContext>({ stage: "PLAYER", player: {} as Game.PlayerState });
