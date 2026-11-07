import type { Game } from "@fluxbound/schema";
import { getOpponent } from "./get-opponent";
import { getPlayer } from "./get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const calculateDamage = (state: Game.GameState): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state, state.activePlayer);

  // Get a list of cards in a players field that have the damage property and not conditions that prevent attacking
  const damageCards = player.field
    .filter((card) => card.damage !== undefined)
    .filter(
      ({ conditions }) =>
        !conditions?.some(({ id }) =>
          ["frozen", "paralyzed", "sleeping", "stunned"].includes(id),
        ),
    );

  for (const card of damageCards) {
    opponent.health -= card.damage ?? 0;
  }

  // Ensure you can't go below 0
  opponent.health = Math.max(0, opponent.health);

  return state;
};
