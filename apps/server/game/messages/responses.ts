import type { Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { GameEngine } from "game/engine";
import { updateGameState } from "game/messages/gameResponses/update-game-state";
import { closeRoomConnections, rooms } from "game/messages/lobby";
import { GameResponse } from "utils/responses";

export const gameStatesByRoomId = new Map<string, Game.GameState>();

export const game = {
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
    return void updateGameState(server, engine, ws.data.roomId);
  },

  playCard: (
    server: Bun.Server<GameSocketData>,
    ws: Bun.ServerWebSocket<GameSocketData>,
    cardId: Game.CardId,
    target?: Array<Game.CardId | "self" | "opponent">,
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

    const result = engine.playCard(cardId, target);
    if (!result.ok)
      return void ws.send(GameResponse({ type: "game/error", ...result }));

    gameStatesByRoomId.set(ws.data.roomId, engine.gameState);
    return void updateGameState(server, engine, ws.data.roomId);
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
    return void updateGameState(server, engine, ws.data.roomId);
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
          state: engine.getPlayerView(ws.data.userId),
          winner: result.winner,
        }),
      );
      closeRoomConnections(ws.data.roomId, 1000, "Game Ended");
      return;
    }

    const { player1, player2 } = rooms.get(ws.data.roomId)!;
    const players = [player1.id, player2!.id];

    players.forEach((playerId) => {
      server.publish(
        `player:${playerId}`,
        GameResponse({
          type: "game/turnEnded",
          state: engine.getPlayerView(playerId),
        }),
      );
    });

    if (engine.gameState.activePlayer.includes("AI")) {
      //TODO: actually have a robust way to check if the AI is playing as this is not a good way
      // Do AI Turn
      engine.startTurn();
      const AIResult = await engine.playAITurn();
      if (!AIResult.ok) {
        return void ws.send(GameResponse({ type: "game/error", ...AIResult }));
      }

      if (AIResult.code === "GAME_ENDED" && !!AIResult.winner) {
        updateGameState(server, engine, ws.data.roomId);
        closeRoomConnections(ws.data.roomId, 1000, "Game Ended");
        return;
      }

      updateGameState(server, engine, ws.data.roomId);
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
    return void updateGameState(server, engine, ws.data.roomId);
  },
};
