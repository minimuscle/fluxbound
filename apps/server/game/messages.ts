import type { ClientGame, ClientLobby } from "@fluxbound/schema";
import type { GameSocketData } from "../app/routes";
import { game } from "./game";
import { lobby } from "./lobby";

export function message(
  server: Bun.Server<GameSocketData>,
  ws: Bun.ServerWebSocket<GameSocketData>,
  message: string | Buffer<ArrayBuffer>,
): void | Promise<void> {
  if (typeof message !== "string") return;
  const parsed: ClientLobby | ClientGame = JSON.parse(message);

  switch (parsed.type) {
    case "lobby/create":
      return lobby.create(ws);
    case "lobby/join":
      return lobby.join(server, ws, parsed.roomId);

    case "game/start":
      return game.start(server, ws);

    case "game/startSolo":
      return game.startSolo(server, ws);

    default:
      console.log("Received unknown message", parsed);
      break;
  }
}
