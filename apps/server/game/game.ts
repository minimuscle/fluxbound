import type { GameSocketData } from "../app/routes";
import { getState } from "./state";

export const game = {
  start: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
    console.log(`Starting game for room:${ws.data.roomId}`);
    console.log(ws.isSubscribed(`room:${ws.data.roomId}`));
    server.publish(`room:${ws.data.roomId}`, JSON.stringify({ type: "game/started", state: getState() }));
  },
};
