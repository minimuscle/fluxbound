import type { Game, GameResponse } from "@fluxbound/schema";
import { createInitialState } from "game/actions/create-initial-state";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { isPlayersTurn } from "game/rules/is-players-turn";

/**********************************************************************************************************
 *   CLASS START
 **********************************************************************************************************/
export class GameEngine {
  private state: Game.GameState;
  private playerId: Game.PlayerId;

  constructor(initialGameState: Game.GameState, playerId: Game.PlayerId) {
    this.state = initialGameState;
    this.playerId = playerId;
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
  public playCard(cardId: Game.CardId): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;
    return { ok: true };

    //TODO continue with this play card
  }

  // End the players turn
  public endTurn() {
    // return this.state;
  }

  // Get the player view of the game state hiding opponents private information
  public getPlayerView(): Readonly<Game.GameStateView> {
    const player = getPlayer(this.state, this.playerId);
    const opponent = getOpponent(this.state, this.playerId);

    return {
      ...this.state,
      you: player,
      opponent: {
        ...opponent,
        deckCount: opponent.deck.length,
        handCount: opponent.hand.length,
      },
    };
  }
}
