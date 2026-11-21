import type { Cards, ERROR_CODES, Game } from "@fluxbound/schema";
import React, { createContext } from "react";
import type { createTypedWebSocketSender } from "utils/functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type WebSocketContext = {
  websocket: ReturnType<typeof createTypedWebSocketSender>;
  roomId: Game.RoomId;
  lobby: {
    player1: { name: Game.PlayerName; id: Game.PlayerId };
    player2?: { name: Game.PlayerName; id: Game.PlayerId };
  } | null;
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
  setSpellCardId: React.Dispatch<
    React.SetStateAction<Game.CardId | null | undefined>
  >;
  spellTargets: Array<Cards.Targets> | null;
  selectedCreatureTargets: Array<Game.CardId>;
  setSelectedCreatureTargets: React.Dispatch<React.SetStateAction<Array<Game.CardId>>>;
  setSpellTargets: React.Dispatch<
    React.SetStateAction<Array<Cards.Targets> | null>
  >;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const WebSocketContext = createContext<WebSocketContext | null>(null);
export const GameContext = createContext<GameContext | null>(null);
export const GameErrorContext = createContext<GameErrorContext | null>(null);
export const SpellContext = createContext<SpellContext | null>(null);
