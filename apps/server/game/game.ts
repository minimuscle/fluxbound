import type { Cards, Game } from "@fluxbound/schema";
import { rooms } from "game/lobby";
import { enemyStarterTestDeck } from "testData/enemyDeck";
import { playerStarterTestDeck } from "testData/playerDeck";
import { GameResponse } from "utils/responses";
import type { GameSocketData } from "../app/routes";
import { GameStateClass, type InitialPlayerState } from "./GameStateClass";

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
        mana: {
          FIRE: 0,
          WATER: 0,
          EARTH: 0,
          AIR: 0,
          LIGHT: 0,
          DARK: 0,
          LIFE: 0,
          DEATH: 0,
          AETHER: 0,
          VOID: 0,
        },
      },
      {
        id: room.player2,
        deck: [],
        hand: [],
        field: [],
        health: 100,
        healthMax: 100,
        attunement: "FIRE",
        mana: {
          FIRE: 0,
          WATER: 0,
          EARTH: 0,
          AIR: 0,
          LIGHT: 0,
          DARK: 0,
          LIFE: 0,
          DEATH: 0,
          AETHER: 0,
          VOID: 0,
        },
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

    const firstPlayer = Math.random() < 0.5 ? "player" : "ai";

    const player: InitialPlayerState = {
      id: room.player1,
      deck: playerStarterTestDeck as Cards.CardId[],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      mana: {
        FIRE: 10,
        WATER: 0,
        EARTH: 0,
        AIR: 0,
        LIGHT: 0,
        DARK: 0,
        LIFE: 0,
        DEATH: 0,
        AETHER: 0,
        VOID: 0,
      },
    };
    const ai: InitialPlayerState = {
      id: "AI_0" as Game.PlayerId,
      deck: enemyStarterTestDeck as Cards.CardId[],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      mana: {
        FIRE: 0,
        WATER: 0,
        EARTH: 0,
        AIR: 0,
        LIGHT: 0,
        DARK: 0,
        LIFE: 0,
        DEATH: 0,
        AETHER: 0,
        VOID: 0,
      },
    };
    const players: [InitialPlayerState, InitialPlayerState] = firstPlayer === "player" ? [player, ai] : [ai, player];

    // Create the game state
    const state = new GameStateClass(players[0], players[1]);
    console.log(state);

    gameStatesByRoomId.set(ws.data.roomId, state);

    console.log(state.getStateForPlayer(ws.data.userId));
    server.publish(`player:${ws.data.userId}`, GameResponse({ type: "game/started", state: state.getStateForPlayer(ws.data.userId) }));
  },
  // playCard: (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, cardId: ) => {
  //   console.log("Playing card", card);
  // },
};
