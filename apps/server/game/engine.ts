import type { Game } from "@fluxbound/schema";
import { createInitialState } from "game/actions/create-initial-state";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   CLASS START
 **********************************************************************************************************/
export class GameEngine {
  private state: Game.GameState;

  constructor(initialGameState: Game.GameState) {
    this.state = initialGameState;
  }

  // Gets Current Game State
  get gameState(): Readonly<Game.GameState> {
    return this.state;
  }

  // Inital Game state
  public initializeGame(player1: Game.InitialPlayerState, player2: Game.InitialPlayerState) {
    this.state = createInitialState(player1, player2);
  }

  // Play a card into the field or run its trigger
  public playCard(playerId: Game.PlayerId, cardId: Game.CardId) {
    // return this.state;
  }

  // End the players turn
  public endTurn(playerId: Game.PlayerId) {
    // return this.state;
  }

  public getPlayerView(playerId: Game.PlayerId): Readonly<Game.PlayerState> {
    return getPlayer(this.state, playerId);
  }
}
