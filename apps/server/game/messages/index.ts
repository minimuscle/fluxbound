import type { ClientGame, ClientLobby, Game } from "@fluxbound/schema";
import type { GameEngine } from "game/engine";
import { startGame } from "game/messages/responses/start-game";
import { startGameSingleplayer } from "game/messages/responses/start-game-singleplayer";
import type { GameSocketData } from "../../app/routes";
import { lobby } from "./lobby";
import { game } from "./responses";

export const enginesByRoomId = new Map<Game.RoomId, GameEngine>();

export function message(
  server: Bun.Server<GameSocketData>,
  ws: Bun.ServerWebSocket<GameSocketData>,
  message: string | Buffer<ArrayBuffer>,
): void | Promise<void> {
  if (typeof message !== "string") return;
  const parsed: ClientLobby | ClientGame = JSON.parse(message);
  console.log("Received message", parsed);

  switch (parsed.type) {
    case "lobby/create":
      return lobby.create(ws);
    case "lobby/join":
      return lobby.join(server, ws, parsed.roomId);
    case "game/start":
      return startGame(server, ws);
    case "game/startSolo":
      return startGameSingleplayer(server, ws, 0); // TODO: implement level selection when it's implemented
    case "game/start-turn":
      return game.startTurn(server, ws);
    case "game/play-card":
      return game.playCard(server, ws, parsed.cardId, parsed.target);
    case "game/activate-card":
      return game.activateCard(server, ws, parsed.cardId);
    case "game/end-turn":
      return game.endTurn(server, ws);
    case "game/discard-card":
      return game.discardCard(server, ws, parsed.cardId);

    default:
      console.error("Received unknown message", parsed);
      break;
  }
}
