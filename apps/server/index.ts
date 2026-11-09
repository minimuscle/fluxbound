import { type GameSocketData, routes } from "./app/routes";
import { message as wsMessage } from "./game/messages";
import { GameResponse } from "./utils/responses";
import { initializeMessaging } from "./utils/messaging";

const server = Bun.serve<GameSocketData>({
  routes,
  websocket: {
    open(ws) {
      console.log("WebSocket opened", ws.data.userId);
    },
    close(ws, code) {
      console.log("WebSocket closed", code, ws.data.userId);
    },
    async message(ws, message): Promise<void> {
      try {
        await wsMessage(server, ws, message);
      } catch (error) {
        console.error("Failed to handle WebSocket message", error);
        try {
          ws.send(GameResponse({
            type: "game/error",
            ok: false,
            code: "SERVER_ERROR",
            message: "An unexpected server error occurred. Please try again.",
          }));
        } catch (sendError) {
          console.error("Failed to send server error", sendError);
        }
      }
    },
  },
});

initializeMessaging(server);

console.log(`Listening on http://${server.url}:${server.port}/`);
