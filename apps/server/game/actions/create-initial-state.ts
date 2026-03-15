import type { Cards, Game } from "@fluxbound/schema";
import { drawCard } from "game/helpers/draw-card";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function createInitialState(player1: Game.InitialPlayerState, player2: Game.InitialPlayerState): Game.GameState {
  const player1Deck = assignCardIds(player1.deck, player1.id);
  const player2Deck = assignCardIds(player2.deck, player2.id);
  const shuffledPlayer1Deck = shuffleDeck(player1Deck);
  const shuffledPlayer2Deck = shuffleDeck(player2Deck);

  const initialPlayer1Hand = drawCard(shuffledPlayer1Deck, 6);
  const initialPlayer2Hand = drawCard(shuffledPlayer2Deck, 6);

  const turn = "1-1";
  const activePlayer = player1.id; //Math.random() < 0.5 ? player1.id : player2.id; // TEMP
  return {
    activePlayer,
    player1: {
      ...player1,
      ...initialPlayer1Hand,
    },
    player2: {
      ...player2,
      ...initialPlayer2Hand,
    },
    turn,
  };
}

// Assigns each card a unique ID for this game
function assignCardIds(deck: Cards.CardId[], playerId: Game.PlayerId): Game.GameCard[] {
  return deck.map((cardId, index) => ({
    id: `${playerId}-${index}` as Game.CardId,
    cardId,
  }));
}

// Shuffles the deck of cards randomly
function shuffleDeck(deck: Game.GameCard[]): Game.GameCard[] {
  const nextDeck = [...deck];

  // Fisher–Yates shuffle
  for (let index = nextDeck.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentCard = nextDeck[index];
    const swapCard = nextDeck[randomIndex];

    if (currentCard === undefined || swapCard === undefined) {
      continue;
    }

    nextDeck[index] = swapCard;
    nextDeck[randomIndex] = currentCard;
  }

  return nextDeck;
}
