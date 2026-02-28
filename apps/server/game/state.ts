import type { Game } from "@fluxbound/schema";

export const getState = (): Game.GameState => {
  return {
    activePlayer: "PLAYER",
    player1: {
      id: "PLAYER",
      deck: [],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
    },
    player2: {
      id: "ENEMY",
      deck: [],
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
    },
    turn: "1-1",
  };
};
