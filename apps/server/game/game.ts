import type { Game } from "@fluxbound/schema";
import { rooms } from "game/lobby";
import { supabase } from "utils/database";
import { GameResponse } from "utils/responses";
import type { GameSocketData } from "../app/routes";
import { GameStateClass } from "./GameStateClass";

const gameStatesByRoomId = new Map<string, GameStateClass>();

export const game = {
  start: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
    if (!ws.data.roomId) return void ws.send(GameResponse({ type: "game/error", error: "No Room ID" }));
    if (!rooms.has(ws.data.roomId)) return void ws.send(GameResponse({ type: "game/error", error: "Room does not exist" }));

    const room = rooms.get(ws.data.roomId)!;
    if (!room.player1 || !room.player2) return void ws.send(GameResponse({ type: "game/error", error: "Room is not full" }));

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

    server.publish(room.room, GameResponse({ type: "game/started", state: state.gameState }));
  },
  startSolo: async (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
    if (!ws.data.roomId) return void ws.send(GameResponse({ type: "game/error", error: "No Room ID" }));
    if (!rooms.has(ws.data.roomId)) return void ws.send(GameResponse({ type: "game/error", error: "Room does not exist" }));

    const room = rooms.get(ws.data.roomId)!;
    if (room.player2) return void ws.send(GameResponse({ type: "game/error", error: "Too many players" }));

    console.log(`Starting solo game for room:${ws.data.roomId}`);

    const { data } = await supabase.from("users").select("*").maybeSingle();

    const firstPlayer = Math.random() < 0.5 ? "player" : "ai";

    const player = {
      id: room.player1,
      deck: [],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
    };
    const ai = {
      id: "AI_0" as Game.PlayerId,
      deck: [],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
    };
    const players: [Game.PlayerState, Game.PlayerState] = firstPlayer === "player" ? [player, ai] : [ai, player];

    // Create the game state
    const state = new GameStateClass(players[0], players[1]);

    gameStatesByRoomId.set(ws.data.roomId, state);

    server.publish(room.room, GameResponse({ type: "game/started", state: state.gameState }));
  },
  // playCard: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, cardId: ) => {
  //   console.log("Playing card", card);
  // },
};
