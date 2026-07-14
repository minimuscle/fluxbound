import type { CODES, Game } from "@fluxbound/schema";
import React, { createContext } from "react";
import type { createTypedWebSocketSender } from "utils/functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type WebSocketContext = {
  websocket: ReturnType<typeof createTypedWebSocketSender>;
  roomId: Game.RoomId;
};

export type GameContext = {
  state: Game.GameStateView;
  playerId: Game.PlayerId;
};

export type GameErrorContext = {
  gameError: (typeof CODES)[number] | null;
  setGameError: React.Dispatch<React.SetStateAction<(typeof CODES)[number] | null>>;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const WebSocketContext = createContext<WebSocketContext | null>(null);
export const GameContext = createContext<GameContext | null>(null);
export const GameErrorContext = createContext<GameErrorContext | null>(null);
