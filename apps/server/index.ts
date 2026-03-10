import { type GameSocketData, routes } from "./app/routes";
import { message as wsMessage } from "./game/messages";

const server = Bun.serve<GameSocketData>({
  routes,
  websocket: {
    open(ws) {
      console.log("WebSocket opened", ws.data.userId);
    },
    close(ws, code) {
      console.log("WebSocket closed", code, ws.data.userId);
    },
    message(ws, message): void | Promise<void> {
      return wsMessage(server, ws, message);
    },
  },
});

console.log(`Listening on http://localhost:${server.port}/`);
