import type { Tagged } from "type-fest";
import z from "zod";

export const Lobby = {
  create: z.object({
    type: z.literal("lobby/create"),
  }),
  join: z.object({
    type: z.literal("lobby/join"),
    roomId: z.string().min(1, "Room ID is required").brand<Lobby.RoomId>(),
  }),
} as const;

export namespace Lobby {
  export type RoomId = Tagged<string, "RoomId">;

  export type Create = z.infer<typeof Lobby.create>;
  export type Join = z.infer<typeof Lobby.join>;
}
