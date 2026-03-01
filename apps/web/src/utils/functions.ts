import type { ClientGame, ClientLobby } from "@fluxbound/schema";

export const createTypedWebSocketSender = (ws: WebSocket) => {
  return {
    send: (message: ClientLobby | ClientGame) => {
      ws.send(JSON.stringify(message));
    },
    close: (code?: number, reason?: string) => {
      ws.close(code, reason);
    },
    readyState: ws.readyState,
  };
};
