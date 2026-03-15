import { CARD_LIBRARY, type Game, type GameResponse } from "@fluxbound/schema";
import { playACard } from "game/actions/play-card";
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

  // Play a card into the field or run its trigger
  public playCard(cardId: Game.CardId): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    const player = getPlayer(this.state, this.playerId);
    const card = player.hand.find((handCard) => handCard.id === cardId);
    if (!card) return { ok: false, code: "CARD_NOT_IN_HAND", message: "Card is not in your hand" };

    const cardData = CARD_LIBRARY[card.cardId];
    if (!cardData) return { ok: false, code: "CARD_NOT_FOUND", message: "Card does not exist" };
    if (player.mana[cardData.domain] < cardData.cost) {
      return { ok: false, code: "INSUFFICIENT_MANA", message: "Not enough mana to play this card" };
    }

    player.mana[cardData.domain] -= cardData.cost;
    this.state = playACard(this.state, cardId);
    return { ok: true };
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
      activePlayer: this.state.activePlayer,
      turn: this.state.turn,
      you: player,
      opponent: {
        ...opponent,
        deckCount: opponent.deck.length,
        handCount: opponent.hand.length,
      },
    };
  }
}
