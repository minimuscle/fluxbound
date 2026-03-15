import type { Game, GameResponse } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function isPlayersTurn(gameState: Game.GameState, playerId: Game.PlayerId): GameResponse {
  return gameState.activePlayer === playerId ? { ok: true } : { ok: false, code: "NOT_PLAYERS_TURN", message: "It is not your turn" };
}
