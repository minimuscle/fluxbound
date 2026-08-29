import type { Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { createInitialState } from "game/actions/create-initial-state";
import { GameEngine } from "game/engine";
import { enginesByRoomId } from "game/messages";
import { publishGameStarted } from "game/messages/gameResponses/game-started";
import { gameStatesByRoomId } from "game/messages/responses";
import { checkForRoom } from "game/messages/utils/checkForRoom";
import { playerStarterTestDeck } from "game/testData/playerDeck";

export const startGame = (
  server: Bun.Server<GameSocketData>,
  ws: Bun.ServerWebSocket<GameSocketData>,
) => {
  const room = checkForRoom(ws);
  if (!room) return;

  const basePlayerStats = {
    deck: playerStarterTestDeck,
    hand: [],
    field: [],
    health: 100,
    healthMax: 100,
    attunement: "FIRE" as const,
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

  const player1: Game.InitialPlayerState = {
    ...basePlayerStats,
    id: room.player1.id,
    name: room.player1.name,
  };

  const player2: Game.InitialPlayerState = {
    ...basePlayerStats,
    id: room.player2.id,
    name: room.player2.name,
  };

  const initialGameState = createInitialState(player1, player2);
  const engine = new GameEngine(initialGameState, ws.data.userId);
  enginesByRoomId.set(room.roomId, engine);
  gameStatesByRoomId.set(room.roomId, engine.gameState);

  publishGameStarted(server, engine, room.roomId);
};
