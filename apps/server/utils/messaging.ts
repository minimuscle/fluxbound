import type { Game, ServerGame, ServerLobby } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { GameResponse } from "./responses";

const messaging: { server?: Pick<Bun.Server<GameSocketData>, "publish"> } = {};

export const initializeMessaging = (
  server: Pick<Bun.Server<GameSocketData>, "publish">,
): void => {
  messaging.server = server;
};

const publish = (topic: string, message: ServerLobby | ServerGame): number => {
  if (!messaging.server) {
    throw new Error("WebSocket messaging has not been initialized");
  }

  return messaging.server.publish(topic, GameResponse(message));
};

export const sendToRoom = (
  roomId: Game.RoomId,
  message: ServerLobby | ServerGame,
): number => publish(`room:${roomId}`, message);

export const sendToPlayer = (
  playerId: Game.PlayerId,
  message: ServerLobby | ServerGame,
): number => publish(`player:${playerId}`, message);
