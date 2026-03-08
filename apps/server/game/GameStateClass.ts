import type { Game } from "@fluxbound/schema";

export class GameStateClass {
  private activePlayer: Game.PlayerId;
  private player1: Game.PlayerState;
  private player2: Game.PlayerState;
  private turn: `${number}-${1 | 2}`;

  // Initial Game State
  constructor(player1: Game.PlayerState, player2: Game.PlayerState) {
    const shuffledPlayer1Deck = this.shuffleDeck(player1.deck);
    const shuffledPlayer2Deck = this.shuffleDeck(player2.deck);

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

  // Draws a card from the deck
  drawCard(deck: Game.GameCard[], numberOfCards = 1): { deck: Game.GameCard[]; cards: Game.GameCard[] } {
    const cards = deck.slice(0, numberOfCards);
    const rest = deck.slice(numberOfCards);

    return { deck: rest, cards };
  }
}
