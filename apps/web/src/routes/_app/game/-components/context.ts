import { createContext, type RefObject } from "react";

export const WebSocketContext = createContext<RefObject<WebSocket | null> | null>(null);
