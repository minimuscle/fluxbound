import type { Cards, Game } from "@fluxbound/schema";
/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type InitialPlayerState = Omit<Game.PlayerState, "deck"> & {
  deck: Cards.CardId[];
};

/**********************************************************************************************************
 *   CLASS START
 **********************************************************************************************************/
export class GameStateClass {
  private activePlayer: Game.PlayerId;
  private player1: Game.PlayerState;
  private player2: Game.PlayerState;
  private turn: `${number}-${1 | 2}`;

  // Initial Game State
  constructor(player1: InitialPlayerState, player2: InitialPlayerState) {
    const player1Deck = this.assignCardIds(player1.id, player1.deck);
    const player2Deck = this.assignCardIds(player2.id, player2.deck);

    const shuffledPlayer1Deck = this.shuffleDeck(player1Deck);
    const shuffledPlayer2Deck = this.shuffleDeck(player2Deck);

    const initialPlayer1Hand = this.drawCard(shuffledPlayer1Deck, 6);
    const initialPlayer2Hand = this.drawCard(shuffledPlayer2Deck, 6);

    this.activePlayer = player1.id;
    this.player1 = {
      ...player1,
      deck: initialPlayer1Hand.deck,
      hand: initialPlayer1Hand.cards,
    };
    this.player2 = {
      ...player2,
      deck: initialPlayer2Hand.deck,
      hand: initialPlayer2Hand.cards,
    };
    this.turn = "1-1";
  }

  // Gets Current Game State
  get gameState(): Game.GameState {
    return {
      activePlayer: this.activePlayer,
      player1: this.player1,
      player2: this.player2,
      turn: this.turn,
    };
  }

  // Gives each card in the starting player's deck a unique id for the game
  private assignCardIds(playerId: Game.PlayerId, deck: Cards.CardId[]): Game.GameCard[] {
    return deck.map((cardId, index) => ({
      id: `${playerId}-${index}` as Game.CardId,
      cardId,
    }));
  }

  // Shuffles the Deck
  private shuffleDeck(deck: Game.GameCard[]): Game.GameCard[] {
    const nextDeck = [...deck];

    // Fisher–Yates shuffle
    for (let index = nextDeck.length - 1; index > 0; index--) {
      const j = Math.floor(Math.random() * (index + 1));
      const currentCard = nextDeck[index];
      const swapCard = nextDeck[j];

      if (currentCard === undefined || swapCard === undefined) {
        continue;
      }

      nextDeck[index] = swapCard;
      nextDeck[j] = currentCard;
    }
    return nextDeck;
  }

  private showOnlyCartCount(playerId: Game.PlayerId): Game.PlayerState {
    const player = playerId === this.player1.id ? this.player1 : this.player2;
    return {
      ...player,
      hand: Array(player.hand.length).fill(null),
      deck: Array(player.field.length).fill(null),
    };
  }

  // Draws a card from the deck
  drawCard(deck: Game.GameCard[], numberOfCards = 1): { deck: Game.GameCard[]; cards: Game.GameCard[] } {
    const cards = deck.slice(0, numberOfCards);
    const rest = deck.slice(numberOfCards);

    return { deck: rest, cards };
  }

  getStateForPlayer(playerId: Game.PlayerId): Game.GameState {
    return {
      activePlayer: playerId,
      player1: playerId === this.player1.id ? this.player1 : this.showOnlyCartCount(this.player1.id),
      player2: playerId === this.player2.id ? this.player2 : this.showOnlyCartCount(this.player2.id),
      turn: this.turn,
    };
  }
}
