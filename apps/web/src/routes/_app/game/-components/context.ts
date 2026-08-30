import type { ERROR_CODES, Game } from "@fluxbound/schema";
import React, { createContext } from "react";
import type { createTypedWebSocketSender } from "utils/functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type WebSocketContext = {
  websocket: ReturnType<typeof createTypedWebSocketSender>;
  roomId: Game.RoomId;
  restartSinglePlayer: () => void;
};

export type GameContext = {
  state: Game.GameStateView;
  playerId: Game.PlayerId;
  ended: false | Game.PlayerId;
};

export type GameErrorContext = {
  gameError: (typeof ERROR_CODES)[number] | null;
  setGameError: React.Dispatch<
    React.SetStateAction<(typeof ERROR_CODES)[number] | null>
  >;
};

export type SpellContext = {
  cardId?: Game.CardId | null;
  setSpellCardId: React.Dispatch<React.SetStateAction<Game.CardId | null>>;
  spellTargets: Array<"self" | "creature" | "opponent" | "permanent"> | null;
  setSpellTargets: React.Dispatch<
    React.SetStateAction<Array<
      "self" | "creature" | "opponent" | "permanent"
    > | null>
  >;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const WebSocketContext = createContext<WebSocketContext | null>(null);
export const GameContext = createContext<GameContext | null>(null);
export const GameErrorContext = createContext<GameErrorContext | null>(null);
export const SpellContext = createContext<SpellContext | null>(null);
