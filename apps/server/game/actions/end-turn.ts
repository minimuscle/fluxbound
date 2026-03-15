import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const endTurn = (state: Game.GameState): Game.GameState => {
  // Do any damage from creatures / weapons in the field

  // Do any damage from other spell affects

  // Trigger any cards in play with the onTurnEnd trigger

  // End the turn
  const turn = state.turn.split("-");
  // Check if it is player 1 or 2, and if 1, set turn to X-2 or else X+1-1
  if (state.player1.id === state.activePlayer) {
    turn[1] = "2";
  } else {
    turn[0] = String(Number(turn[0]) + 1);
  }
  return {
    ...state,
    turn: turn.join("-") as Game.GameState["turn"],
  };
};
