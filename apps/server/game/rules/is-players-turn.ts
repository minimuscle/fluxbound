import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type IsPlayersTurn =
  | {
      ok: true;
    }
  | {
      ok: false;
      code: string;
      message: string;
    };

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export function isPlayersTurn(gameState: Game.GameState, playerId: Game.PlayerId): IsPlayersTurn {
  return gameState.activePlayer === playerId ? { ok: true } : { ok: false, code: "NOT_PLAYERS_TURN", message: "It is not your turn" };
}
