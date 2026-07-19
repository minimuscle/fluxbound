import type { Game } from "@fluxbound/schema";
import { GameResponse } from "utils/responses";
import type { GameSocketData } from "../../app/routes";

type Players = {
  room: `room:${Game.RoomId}`;
  player1: Game.PlayerId;
  player2?: Game.PlayerId;
};

export const rooms = new Map<Game.RoomId, Players>();
const connectionsByRoomId = new Map<Game.RoomId, Set<Bun.ServerWebSocket<GameSocketData>>>();

export const closeRoomConnections = (
  roomId: Game.RoomId,
  code: number,
  reason: string,
) => {
  const connections = connectionsByRoomId.get(roomId);
  if (!connections) return;

  connectionsByRoomId.delete(roomId);
  for (const connection of connections) connection.close(code, reason);
};

export const lobby = {
  create: (ws: Bun.ServerWebSocket<GameSocketData>) => {
    // Generate RoomId
    const roomId = Math.random().toString(36).slice(2, 7).toUpperCase() as Game.RoomId;

    // Set the room up
    rooms.set(roomId, {
      room: `room:${roomId}`,
      player1: ws.data.userId,
    });

    // Subscribe to the room
    const channel = rooms.get(roomId)!.room;
    ws.subscribe(channel);
    ws.subscribe(`player:${ws.data.userId}`);

    ws.data.roomId = roomId;
    connectionsByRoomId.set(roomId, new Set([ws]));

    ws.send(GameResponse({ type: "lobby/created", roomId }));
  },
  join: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, roomId: Game.RoomId) => {
    // Check if room exists and is not full
    if (!rooms.has(roomId)) ws.send(GameResponse({ type: "lobby/error", error: "Room does not exist" }));
    if (rooms.get(roomId)?.player2) ws.send(GameResponse({ type: "lobby/error", error: "Room is full" }));

    // Join the room
    rooms.set(roomId, { ...rooms.get(roomId)!, player2: ws.data.userId });

    // Subscribe to the room
    const channel = rooms.get(roomId)!.room;
    ws.subscribe(channel);
    ws.subscribe(`player:${ws.data.userId}`);

    ws.data.roomId = roomId;
    connectionsByRoomId.get(roomId)?.add(ws);

    server.publish(channel, JSON.stringify({ type: "lobby/player-joined" }));
  },
};
