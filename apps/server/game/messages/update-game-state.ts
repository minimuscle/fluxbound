import type { Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import type { GameEngine } from "game/engine";
import { rooms } from "game/messages/lobby";
import { GameResponse } from "utils/responses";

export const updateGameState = (
  server: Bun.Server<GameSocketData>,
  engine: GameEngine,
  roomId: Game.RoomId,
) => {
  const { player1, player2 } = rooms.get(roomId)!;
  const players = [player1.id, player2!.id];

  players.forEach((playerId) => {
    server.publish(
      `player:${playerId}`,
      GameResponse({
        type: "game/stateUpdated",
        state: engine.getPlayerView(playerId),
      }),
    );
  });
};
