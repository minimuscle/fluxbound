export namespace Game {
  export const ELEMENTS = ["FIRE", "EARTH", "WATER", "AIR", "LIGHT", "DARK", "LIFE", "DEATH", "AETHER", "VOID"] as const;
  export type Element = (typeof ELEMENTS)[number];
  export type PlayerId = string;

  export type PlayerState = {
    id: PlayerId;
    deck: object[];
    hand: object[];
    field: object[];
    health: number;
    healthMax: 100;
    attunement: string;
  };

  export type GameState = {
    activePlayer: PlayerId;
    player1: PlayerState;
    player2: PlayerState;
    turn: `${number}-${1 | 2}`;
    coinTossWinner: PlayerId;
  };
}
