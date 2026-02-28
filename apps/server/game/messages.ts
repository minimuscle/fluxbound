import type { GameSocketData } from "../app/routes";
import { lobby } from "./lobby";

export function message(ws: Bun.ServerWebSocket<GameSocketData>, message: string): void | Promise<void> {
  const parsed = JSON.parse(message);
  switch (parsed.type) {
    case "lobby/create":
      return lobby.create(ws);
    case "lobby/join":
      return lobby.join(ws, parsed.roomId);
    default:
      console.log("Received unknown message", parsed);
      break;
  }
}
