import { type Game, type GameResponse } from "@fluxbound/schema";
import { endTurn } from "game/actions/end-turn";
import { playAITurn } from "game/actions/play-ai-turn";
import { playACard } from "game/actions/play-card";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { canPlayCard } from "game/rules/can-play-card";
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

  // Play a card into the field or run its trigger
  public playCard(cardId: Game.CardId): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    const player = getPlayer(this.state, this.playerId)!;
    const cardValidation = canPlayCard(player, cardId);
    if (!cardValidation.ok) return cardValidation;

    this.state = playACard(this.state, cardId);

    return { ok: true };
  }

  // Play the turn for the AI
  public playAITurn(): GameResponse {
    this.state = playAITurn(this.state);
    return { ok: true };
  }

  //

  // End the players turn
  public endTurn(): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;
    this.state = endTurn(this.state);

    return { ok: true };
  }

  // Get the player view of the game state hiding opponents private information
  public getPlayerView(): Readonly<Game.GameStateView> {
    const player = getPlayer(this.state, this.playerId);
    const opponent = getOpponent(this.state, this.playerId);
    

    return {
      activePlayer: this.state.activePlayer,
      turn: this.state.turn,
      you: player,
      opponent: {
        attunement: opponent.attunement,
        field: opponent.field,
        health: opponent.health,
        mana: opponent.mana,
        healthMax: opponent.healthMax,
        id: opponent.id,
        deckCount: opponent.deck.length,
        handCount: opponent.hand.length,
      },
    };
  }
}
