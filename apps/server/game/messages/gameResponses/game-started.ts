import type { Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import type { GameEngine } from "game/engine";
import { rooms } from "game/messages/lobby";
import { GameResponse } from "utils/responses";

export const publishGameStarted = (
  server: Bun.Server<GameSocketData>,
  engine: GameEngine,
  roomId: Game.RoomId,
) => {
  const room = rooms.get(roomId);
  if (!room || !room.player2) return;

  const { player1, player2 } = room;
  const players = [player1, player2];

  players.forEach(({ id }) => {
    server.publish(
      `player:${id}`,
      GameResponse({
        type: "game/started",
        state: engine.getPlayerView(id),
      }),
    );
  });
};
