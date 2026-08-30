import z from "zod";
import { ERROR_CODES, SUCCESS_CODES } from "./codes";
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
    player1: z.object({
      id: z.custom<Game.PlayerId>(),
      name: z.custom<Game.PlayerName>(),
    }),
  }),
  z.object({
    type: z.literal("lobby/player-joined"),
    player1: z.object({
      id: z.custom<Game.PlayerId>(),
      name: z.custom<Game.PlayerName>(),
    }),
    player2: z.object({
      id: z.custom<Game.PlayerId>(),
      name: z.custom<Game.PlayerName>(),
    }),
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
    target: z
      .array(
        z.union([
          z.enum([
            "self",
            "opponent",
            "all",
            "selfCreatures",
            "opponentCreatures",
          ]),
          z.custom<Game.CardId>(z.coerce.string().parse),
        ]),
      )
      .optional(),
  }),
  z.object({
    type: z.literal("game/activate-card"),
    cardId: z.custom<Game.CardId>(z.coerce.string().parse),
  }),
  z.object({
    type: z.literal("game/end-turn"),
  }),
  z.object({
    type: z.literal("game/start-turn"),
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
    code: z.enum(ERROR_CODES),
    message: z.string(),
    ok: z.literal(false),
  }),
  z.object({
    type: z.literal("game/gameEnded"),
    winner: z.custom<Game.PlayerId>(),
    state: z.custom<ServerGameState>(),
  }),
]);

export type ServerGame = z.infer<typeof serverGame>;

export type GameResponse =
  | {
      ok: true;
      code?: (typeof SUCCESS_CODES)[number];
      winner?: Game.PlayerId;
    }
  | {
      ok: false;
      code: (typeof ERROR_CODES)[number];
      message: string;
    };
