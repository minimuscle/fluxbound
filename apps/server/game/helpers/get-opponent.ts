import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function getOpponent(gameState: Game.GameState, playerId: Game.PlayerId = gameState.activePlayer): Game.PlayerState {
  return gameState.player1.id === playerId ? gameState.player2 : gameState.player1;
}
