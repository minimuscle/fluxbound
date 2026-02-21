import { type GameSocketData, routes } from "./app/routes";

const server = Bun.serve<GameSocketData>({
  routes,
  websocket: {
    open(ws) {
      ws.send("Connection established");
      console.log("WebSocket opened", ws.data.userId);
    },
    close(ws, code, reason) {
      console.log("WebSocket closed", code, reason, ws);
    },
    message(ws, message) {
      console.log("WebSocket message", message);
      ws.send(message);
    },
  },
});

console.log(`Listening on http://localhost:${server.port}/`);
