import type { Cards, Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { createInitialState } from "game/actions/create-initial-state";
import { GameEngine } from "game/engine";
import { closeRoomConnections, lobby } from "game/messages/lobby";
import { enemyStarterTestDeck } from "game/testData/enemyDeck";
import { playerStarterTestDeck } from "game/testData/playerDeck";
import { GameResponse } from "utils/responses";

const gameStatesByRoomId = new Map<string, Game.GameState>();

export const game = {
  start: (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
  ) => {},
  startSolo: async (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
  ) => {
    await lobby.create(ws);
    if (!ws.data.roomId)
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          message: "No Room ID",
          code: "NO_ROOM_ID",
        }),
      );
    const player1: Game.InitialPlayerState = {
      id: ws.data.userId,
      name: ws.data.name,
      deck: playerStarterTestDeck as Cards.CardId[],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      flux: {
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
    const player2: Game.InitialPlayerState = {
      id: "AI_0" as Game.PlayerId,
      name: "Novice AI" as Game.PlayerName,
      deck: enemyStarterTestDeck as Cards.CardId[],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      flux: {
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
    const initialGameState = createInitialState(player1, player2);
    const engine = new GameEngine(initialGameState, ws.data.userId);

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    server.publish(
      `player:${ws.data.userId}`,
      GameResponse({ type: "game/started", state: engine.getPlayerView() }),
    );
  },

  startTurn: (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
  ) => {
    if (!ws.data.roomId || !gameStatesByRoomId.has(ws.data.roomId)) {
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          code: "NO_ROOM_ID",
          message: "No Room ID",
        }),
      );
    }
    const gameState = gameStatesByRoomId.get(ws.data.roomId)!;
    const engine = new GameEngine(gameState, ws.data.userId);

    const result = engine.startTurn();
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return void server.publish(
      `player:${ws.data.userId}`,
      GameResponse({
        type: "game/stateUpdated",
        state: engine.getPlayerView(),
      }),
    );
  },

  playCard: (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
    cardId: Game.CardId,
  ) => {
    if (!ws.data.roomId || !gameStatesByRoomId.has(ws.data.roomId)) {
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          code: "NO_ROOM_ID",
          message: "No Room ID",
        }),
      );
    }
    const initialGameState = gameStatesByRoomId.get(ws.data.roomId)!;
    const engine = new GameEngine(initialGameState, ws.data.userId);

    const result = engine.playCard(cardId);
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return void server.publish(
      `player:${ws.data.userId}`,
      GameResponse({
        type: "game/stateUpdated",
        state: engine.getPlayerView(),
      }),
    );
  },

  activateCard: async (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
    cardId: Game.CardId,
  ) => {
    if (!ws.data.roomId || !gameStatesByRoomId.has(ws.data.roomId)) {
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          code: "NO_ROOM_ID",
          message: "No Room ID",
        }),
      );
    }
    const gameState = gameStatesByRoomId.get(ws.data.roomId)!;
    const engine = new GameEngine(gameState, ws.data.userId);

    const result = await engine.activateCard(cardId);
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return void server.publish(
      `player:${ws.data.userId}`,
      GameResponse({
        type: "game/stateUpdated",
        state: engine.getPlayerView(),
      }),
    );
  },

  endTurn: async (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
  ) => {
    if (!ws.data.roomId || !gameStatesByRoomId.has(ws.data.roomId)) {
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          code: "NO_ROOM_ID",
          message: "No Room ID",
        }),
      );
    }
    const gameState = gameStatesByRoomId.get(ws.data.roomId)!;
    const engine = new GameEngine(gameState, ws.data.userId);

    const result = await engine.endTurn();
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    if (result.code === "GAME_ENDED" && !!result.winner) {
      server.publish(
        `room:${ws.data.roomId}`,
        GameResponse({
          type: "game/gameEnded",
          state: engine.getPlayerView(),
          winner: result.winner,
        }),
      );
      closeRoomConnections(ws.data.roomId, 1000, "Game Ended");
      return;
    }

    server.publish(
      `player:${ws.data.userId}`,
      GameResponse({ type: "game/turnEnded", state: engine.getPlayerView() }),
    );

    if (engine.gameState.activePlayer.includes("AI")) {
      //TODO: actually have a robust way to check if the AI is playing as this is not a good way
      // Do AI Turn
      engine.startTurn();
      const AIResult = await engine.playAITurn();
      if (!AIResult.ok) {
        return void ws.send(GameResponse({ type: "game/error", ...AIResult }));
      }

      if (AIResult.code === "GAME_ENDED" && !!AIResult.winner) {
        server.publish(
          `room:${ws.data.roomId}`,
          GameResponse({
            type: "game/gameEnded",
            state: engine.getPlayerView(),
            winner: AIResult.winner,
          }),
        );
        closeRoomConnections(ws.data.roomId, 1000, "Game Ended");
        return;
      }

      server.publish(
        `player:${ws.data.userId}`,
        GameResponse({
          type: "game/stateUpdated",
          state: engine.getPlayerView(),
        }),
      );
    }

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return;
  },

  discardCard: (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
    cardId: Game.CardId,
  ) => {
    if (!ws.data.roomId || !gameStatesByRoomId.has(ws.data.roomId)) {
      return void ws.send(
        GameResponse({
          type: "game/error",
          ok: false,
          code: "NO_ROOM_ID",
          message: "No Room ID",
        }),
      );
    }
    const gameState = gameStatesByRoomId.get(ws.data.roomId)!;
    const engine = new GameEngine(gameState, ws.data.userId);

    const result = engine.discardCard(cardId);
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return void server.publish(
      `player:${ws.data.userId}`,
      GameResponse({
        type: "game/stateUpdated",
        state: engine.getPlayerView(),
      }),
    );
  },
};
