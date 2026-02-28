import type { GameSocketData } from "../app/routes";

export const lobby = {
  create: (ws: Bun.ServerWebSocket<GameSocketData>) => {
    console.log("Creating lobby for", ws.data.userId);
    // Generate room id a 6-letter/digit string
    const roomId = Math.random().toString(36).slice(2, 7).toUpperCase();
    console.log("Created room id", roomId);
    ws.subscribe(`room:${roomId}`);
    ws.send(JSON.stringify({ type: "lobby/created", roomId }));
  },
};
