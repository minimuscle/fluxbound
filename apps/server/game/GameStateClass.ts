import type { Game } from "@fluxbound/schema";

export class GameStateClass {
  private activePlayer: Game.PlayerId;
  private player1: Game.PlayerState;
  private player2: Game.PlayerState;
  private turn: `${number}-${1 | 2}`;

  constructor(player1: Game.PlayerState, player2: Game.PlayerState) {
    this.activePlayer = player1.id;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = "1-1";
  }

  get gameState() {
    return {
      activePlayer: this.activePlayer,
      player1: this.player1,
      player2: this.player2,
      turn: this.turn,
    };
  }
}
