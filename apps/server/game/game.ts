import { rooms } from "game/lobby";
import { GameResponse } from "utils/responses";
import type { GameSocketData } from "../app/routes";
import { GameStateClass } from "./GameStateClass";

const gameStatesByRoomId = new Map<string, GameStateClass>();

export const game = {
  start: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
    if (!ws.data.roomId) return ws.send(GameResponse({ type: "game/error", error: "No Room ID" }));
    if (!rooms.has(ws.data.roomId)) return ws.send(GameResponse({ type: "game/error", error: "Room does not exist" }));

    const room = rooms.get(ws.data.roomId)!;
    if (!room.player1 || !room.player2) return ws.send(GameResponse({ type: "game/error", error: "Room is not full" }));

    console.log(`Starting game for room:${ws.data.roomId}`);

    // Create the game state
    const state = new GameStateClass(
      {
        id: room.player1,
        deck: [],
        hand: [],
        field: [],
        health: 100,
        healthMax: 100,
        attunement: "FIRE",
      },
      {
        id: room.player2,
        deck: [],
        hand: [],
        field: [],
        health: 100,
        healthMax: 100,
        attunement: "FIRE",
      },
    );

    gameStatesByRoomId.set(ws.data.roomId, state);

    server.publish(`room:${ws.data.roomId}`, JSON.stringify({ type: "game/started", state: state.gameState }));
  },
  // playCard: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, cardId: ) => {
  //   console.log("Playing card", card);
  // },
};
