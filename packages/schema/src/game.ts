import type { Tagged } from "type-fest";
import type { Cards } from "./cards";

export namespace Game {
  export type RoomId = Tagged<string, "roomId">;
  export type PlayerId = Tagged<string, "playerId">;
  export type CardId = Tagged<string, "gameCardId">;
  export type PlayerName = Tagged<string, "playerName">;

  export type Target = Array<CardId | Omit<Cards.Targets, "creature">>;

  export type GameCard = {
    id: CardId;
    cardId: Cards.CardId; // The non-unique id of the card to match to the library
  } & GameCreatureCard;

  export type GameCreatureCard = Partial<{
    damage: number;
    health: number;
    maxHealth: number;
    activations: number;
    conditions: Cards.Conditions[];
  }>;

  export type PlayerState = {
    id: PlayerId;
    name: PlayerName;
    deck: GameCard[];
    hand: GameCard[];
    field: GameCard[];
    health: number;
    healthMax: number;
    attunement: Cards.Domain;
    flux: Record<Cards.Domain, number>;
  };

  export type InitialPlayerState = Omit<
    PlayerState,
    "deck" | "hand" | "field"
  > & {
    deck: Cards.CardId[];
    hand: never[];
    field: never[];
  };

  export type GameState = {
    activePlayer: PlayerId;
    player1: PlayerState;
    player2: PlayerState;
    turn: `${number}-${1 | 2}`;
  };

  export type PublicPlayerStateView = Omit<PlayerState, "deck" | "hand"> & {
    deckCount: number;
    handCount: number;
  };

  export type GameStateView = {
    activePlayer: PlayerId;
    you: PlayerState;
    opponent: PublicPlayerStateView;
    turn: `${number}-${1 | 2}`;
  };
}
