import z from "zod";
import { CODES } from "./codes";
import type { Game } from "./game";

type ServerGameState = typeof process.env.DEBUG extends "true"
  ? Game.GameState
  : Game.GameStateView;

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
    type: z.enum(["game/play-card", "game/discard-card"]),
    cardId: z.custom<Game.CardId>(z.coerce.string().parse),
  }),
  z.object({
    type: z.literal("game/activate-card"),
    cardId: z.custom<Game.CardId>(z.coerce.string().parse),
  }),
  z.object({
    type: z.literal("game/end-turn"),
  }),
]);

export type ClientGame = z.infer<typeof clientGame>;

export const serverGame = z.discriminatedUnion("type", [
  z.object({
    type: z.enum(["game/started", "game/turnEnded", "game/stateUpdated"]),
    state: z.custom<ServerGameState>(),
  }),
  z.object({
    type: z.literal("game/error"),
    code: z.enum(CODES),
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
