import type { Tagged } from "type-fest";
import type { Cards } from "./cards";

export namespace Game {
  export type RoomId = Tagged<string, "roomId">;
  export type PlayerId = Tagged<string, "playerId">;
  export type CardId = Tagged<string, "gameCardId">;

  export type GameCard = {
    id: CardId;
    cardId: Cards.CardId; // The non-unique id of the card to match to the library
  };

  export type PlayerState = {
    id: PlayerId;
    deck: GameCard[];
    hand: GameCard[];
    field: GameCard[];
    health: number;
    healthMax: number;
    attunement: string;
    mana: Record<Cards.Domain, number>;
  };

  export type InitialPlayerState = Omit<PlayerState, "deck" | "hand" | "field"> & {
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
