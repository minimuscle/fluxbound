import z from "zod";
import type { CODES } from "./codes";
import type { Game } from "./game";

export const clientLobby = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("lobby/create"),
  }),
  z.object({
    type: z.literal("lobby/join"),
    roomId: z.custom<Game.RoomId>(z.coerce.string().parse),
  }),
]);

export type ClientLobby = z.infer<typeof clientLobby>;

export const serverLobby = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("lobby/created"),
    roomId: z.custom<Game.RoomId>(z.coerce.string().parse),
  }),
  z.object({
    type: z.literal("lobby/player-joined"),
  }),
  z.object({
    type: z.literal("lobby/error"),
    error: z.string(),
  }),
]);

export type ServerLobby = z.infer<typeof serverLobby>;

export const clientGame = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("game/start"),
  }),
  z.object({
    type: z.literal("game/startSolo"),
  }),
  z.object({
    type: z.literal("game/play-card"),
    cardId: z.custom<Game.CardId>(z.coerce.string().parse),
  }),
]);

export type ClientGame = z.infer<typeof clientGame>;

export const serverGame = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("game/started"),
    state: z.custom<Game.GameStateView>(),
  }),
  z.object({
    type: z.literal("game/stateUpdated"),
    state: z.custom<Game.GameStateView>(),
  }),
  z.object({
    type: z.literal("game/error"),
    code: z.string(),
    message: z.string(),
    ok: z.literal(false),
  }),
]);

export type ServerGame = z.infer<typeof serverGame>;

export type GameResponse =
  | {
      ok: true;
    }
  | {
      ok: false;
      code: (typeof CODES)[number];
      message: string;
    };
