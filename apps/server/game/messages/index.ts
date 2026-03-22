import type { ClientGame, ClientLobby } from "@fluxbound/schema";
import type { GameSocketData } from "../../app/routes";
import { lobby } from "./lobby";
import { game } from "./responses";

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
      return game.start(server, ws);
    case "game/startSolo":
      return game.startSolo(server, ws);
    case "game/play-card":
      return game.playCard(server, ws, parsed.cardId);
    case "game/end-turn":
      return game.endTurn(server, ws);
    case "game/discard-card":
      return game.discardCard(server, ws, parsed.cardId);

    default:
      console.log("Received unknown message", parsed);
      break;
  }
}
