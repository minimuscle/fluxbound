import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { runCardTrigger } from "game/helpers/run-card-trigger";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const activateCard = async (state: Game.GameState, cardId: Game.CardId): Promise<Game.GameState> => {
  const player = getPlayer(state, state.activePlayer);

  const card = player.field.find((card) => card.id === cardId);
  if (!card) return state;

  card.activations = (card.activations ?? 1) - 1;
  return runCardTrigger({ state, cardId }, "onActivated");
};
