import { type GameSocketData, routes } from "./app/routes";
import { message } from "./game/messages";

const server = Bun.serve<GameSocketData>({
  routes,
  websocket: {
    open(ws) {
      ws.send("Connection established");
      console.log("WebSocket opened", ws.data.userId);
    },
    close(ws, code, reason) {
      console.log("WebSocket closed", code, ws.data.userId);
    },
    message,
  },
});

console.log(`Listening on http://localhost:${server.port}/`);
