import { routes } from "./app/routes";

const server = Bun.serve({
  routes,
  websocket: {
    open(ws) {
      ws.send("Connection established");
      console.log("WebSocket opened");
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
