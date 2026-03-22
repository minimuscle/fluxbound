import type { CODES, Game } from "@fluxbound/schema";
import { createContext } from "react";
import type { createTypedWebSocketSender } from "utils/functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type WebSocketContext = {
  websocket: ReturnType<typeof createTypedWebSocketSender> | null;
  roomId: Game.RoomId | null;
};

export type GameContext = {
  state: Game.GameStateView;
  playerId: Game.PlayerId;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const WebSocketContext = createContext<WebSocketContext | null>(null);
export const GameContext = createContext<GameContext | null>(null);
export const GameErrorContext = createContext<typeof CODES[number] | null>(null);