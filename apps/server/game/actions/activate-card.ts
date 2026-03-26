import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const activateCard = (state: Game.GameState, cardId: Game.CardId): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);

  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;

  card.activations = (card.activations ?? 0) - 1;
  return state;
};
