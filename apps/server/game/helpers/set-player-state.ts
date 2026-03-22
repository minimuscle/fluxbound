import type { Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const setPlayerState = (state: Game.GameState, playerId: Game.PlayerId, playerState: Partial<Game.PlayerState>): Game.GameState => {
  // Automatically adds the state to player 1 or player 2 depending on the Ids that match
  if (playerId === state.player1.id) {
    return {
      ...state,
      player1: {
        ...state.player1,
        ...playerState,
      },
    };
  } else {
    return {
      ...state,
      player2: {
        ...state.player2,
        ...playerState,
      },
    };
  }
  
}