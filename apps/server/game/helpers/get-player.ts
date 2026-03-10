import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function getPlayer(gameState: Game.GameState, playerId: Game.PlayerId): Game.PlayerState {
  return gameState.player1.id === playerId ? gameState.player1 : gameState.player2;
}
