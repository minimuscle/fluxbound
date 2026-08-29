import { type Game, type GameResponse } from "@fluxbound/schema";
import { drawCard } from "game/actions/draw-card";
import { endTurn } from "game/actions/end-turn";
import { playAITurn } from "game/actions/play-ai-turn";
import { playACard } from "game/actions/play-card";
import { checkEndGame } from "game/helpers/check-end-game";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { canPlayCard } from "game/rules/can-play-card";
import { isPlayersTurn } from "game/rules/is-players-turn";
import { activateCard } from "./actions/activate-card";
import { discardCard } from "./actions/discard-card";

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

  public startTurn(): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    this.state = drawCard(this.state, 1);

    return { ok: true };
  }

  // Play the turn for the AI
  public async playAITurn(): Promise<GameResponse> {
    console.log("playing AI turn");
    this.state = drawCard(this.state, 1);
    this.state = await playAITurn(this.state);
    const endGameCheck = checkEndGame(this.state);
    console.log("ai checking engame", endGameCheck);
    if (endGameCheck.ended) {
      return { ok: true, code: "GAME_ENDED", winner: endGameCheck.winner }; //TODO: need to create a game save code and save the data to be reviewed
    }
    return { ok: true };
  }

  // Discard a card from the players hand
  public discardCard(cardId: Game.CardId): GameResponse {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    const player = getPlayer(this.state, this.playerId);
    const newState = discardCard(this.state, cardId);
    const newPlayerState = getPlayer(newState, this.playerId);

    if (player.hand.length === newPlayerState.hand.length)
      return {
        ok: false,
        code: "CARD_NOT_FOUND",
        message: "The card you are trying to discard does not exist",
      };
    this.state = newState;
    return { ok: true };
  }

  // Activate a card
  public async activateCard(cardId: Game.CardId): Promise<GameResponse> {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    const player = getPlayer(this.state, this.playerId);
    const card = player.field.find(({ id }) => id === cardId);
    if (!card)
      return {
        ok: false,
        code: "CARD_NOT_FOUND",
        message: "The card you are trying to activate does not exist",
      };
    if (card.activations === 0)
      return {
        ok: false,
        code: "CARD_NOT_ACTIVATABLE",
        message: "The card you are trying to activate is not activable",
      };

    this.state = await activateCard(this.state, card.id);

    return { ok: true };
  }

  // End the players turn
  public async endTurn(): Promise<GameResponse> {
    const turnValidation = isPlayersTurn(this.state, this.playerId);
    if (!turnValidation.ok) return turnValidation;

    //Check if the player has too many cards (10) in hand
    const player = getPlayer(this.state, this.playerId);
    if (player.hand.length >= 7)
      return {
        ok: false,
        code: "TOO_MANY_CARDS_IN_HAND",
        message: "You have too many cards in your hand",
      };

    // Run the end turn action
    this.state = await endTurn(this.state);

    //Check end game
    const endGameCheck = checkEndGame(this.state);
    if (endGameCheck.ended) {
      return { ok: true, code: "GAME_ENDED", winner: endGameCheck.winner }; //TODO: need to create a game save code and save the data to be reviewed
    }

    return { ok: true };
  }

  // Get the player view of the game state hiding opponents private information
  public getPlayerView(playerId: Game.PlayerId): Game.GameStateView {
    const player = getPlayer(this.state, playerId);
    const opponent = getOpponent(this.state, playerId);

    const debugFields = {
      deck: opponent.deck,
      hand: opponent.hand,
    };

    return {
      activePlayer: this.state.activePlayer,
      turn: this.state.turn,
      you: player,
      opponent: {
        id: opponent.id,
        name: opponent.name,
        attunement: opponent.attunement,
        field: opponent.field,
        health: opponent.health,
        flux: opponent.flux,
        healthMax: opponent.healthMax,
        deckCount: opponent.deck.length,
        handCount: opponent.hand.length,
        ...(process.env.DEBUG ? debugFields : {}),
      },
    };
  }
}
