import type { Lobby } from "@fluxbound/schema/src/lobby";
import { createContext } from "react";
import type { createTypedWebSocketSender } from "utils/functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type WebSocketContext = {
  websocket: ReturnType<typeof createTypedWebSocketSender> | null;
  roomId: Lobby.RoomId | null;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const WebSocketContext = createContext<WebSocketContext | null>(null);
