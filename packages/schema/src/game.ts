import type { Tagged } from "type-fest";

export namespace Game {
  export type RoomId = Tagged<string, "roomId">;
  export type PlayerId = Tagged<string, "playerId">;
  export type CardId = Tagged<string, "cardId">;

  export type Card = {
    id: CardId;
    cardId: string; // The non-unique id of the card to match to the library
  };

  export type PlayerState = {
    id: PlayerId;
    deck: Card[];
    hand: Card[];
    field: Card[];
    health: number;
    healthMax: 100;
    attunement: string;
  };

  export type GameState = {
    activePlayer: PlayerId;
    player1: PlayerState;
    player2: PlayerState;
    turn: `${number}-${1 | 2}`;
  };
}
