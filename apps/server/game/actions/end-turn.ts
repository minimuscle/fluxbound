import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { drawCard } from "game/helpers/draw-card";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { runCardTrigger } from "game/helpers/run-card-trigger";
import { setPlayerState } from "game/helpers/set-player-state";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const endTurn = (state: Game.GameState): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  // Do any damage from creatures / weapons in the field

  // Do any damage from other spell affects

  // Trigger any cards in play with the onTurnEnd trigger
  player.field.forEach(async (card) => {
    const cardData = CARD_LIBRARY[card.cardId];
    if (!cardData) return;
    await runCardTrigger(state, cardData, "onTurnEnd");
  });

  // Draw a card from the deck for the other player
  const opponent = getOpponent(state);
  const nextOpponentDeckandHand = drawCard(opponent.deck, 1);
  const nextTurnState = setPlayerState(state, opponent.id, {
    ...opponent,
    deck: nextOpponentDeckandHand.deck,
    hand: [...opponent.hand, ...nextOpponentDeckandHand.hand],
  });

  // End the turn
  const turn = state.turn.split("-");
  // Check if it is player 1 or 2, and if 1, set turn to X-2 or else X+1-1
  if (state.player1.id === state.activePlayer) {
    turn[1] = "2";
  } else {
    turn[0] = String(Number(turn[0]) + 1);
  }
  return {
    ...nextTurnState,
    activePlayer: state.player1.id === state.activePlayer ? state.player2.id : state.player1.id,
    turn: turn.join("-") as Game.GameState["turn"],
  };
};
