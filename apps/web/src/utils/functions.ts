import type { ClientRegistry } from "@fluxbound/schema";

export const createTypedWebSocketSender = (ws: WebSocket) => {
  return {
    send: (message: ClientRegistry[keyof ClientRegistry]) => {
      ws.send(JSON.stringify(message));
    },
    close: (code?: number, reason?: string) => {
      ws.close(code, reason);
    },
    readyState: ws.readyState,
  };
};
