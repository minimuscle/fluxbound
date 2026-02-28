import type { GameSocketData } from "../app/routes";
import { getRoomId } from "./utils";

export const lobby = {
  create: (ws: Bun.ServerWebSocket<GameSocketData>) => {
    console.log("Creating lobby for", ws.data.userId);
    // Generate room id a 6-letter/digit string
    const roomId = Math.random().toString(36).slice(2, 7).toUpperCase();
    const wsRoom = getRoomId(roomId);

    ws.subscribe(`room:${wsRoom}`);
    ws.data.roomId = roomId;
    ws.send(JSON.stringify({ type: "lobby/created", roomId }));
  },
  join: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, roomId: string) => {
    console.log("Joining lobby for", ws.data.userId);
    const wsRoom = getRoomId(roomId);
    console.log("Joining room", wsRoom, roomId);
    ws.subscribe(`room:${wsRoom}`);
    ws.data.roomId = roomId;
    ws.send(JSON.stringify({ type: "lobby/joined", roomId }));
    server.publish(`room:${wsRoom}`, JSON.stringify({ type: "lobby/player-joined" }));
  },
};
