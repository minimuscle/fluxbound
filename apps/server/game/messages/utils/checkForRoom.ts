import type { GameSocketData } from "app/routes";
import { rooms, type RoomMap } from "game/messages/lobby";
import { GameResponse } from "utils/responses";

export const checkForRoom = (
  ws: Bun.ServerWebSocket<GameSocketData>,
  type?: "singleplayer",
): Required<RoomMap> | undefined => {
  if (ws.data.roomId) {
    const room = rooms.get(ws.data.roomId);
    if (room && (room.player2 || type === "singleplayer"))
      return room as Required<RoomMap>;
  }
  return void ws.send(
    GameResponse({
      type: "game/error",
      ok: false,
      message: "No Room ID",
      code: "NO_ROOM_ID",
    }),
  );
};
