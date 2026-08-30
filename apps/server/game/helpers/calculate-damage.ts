import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { getOpponent } from "./get-opponent";
import { getPlayer } from "./get-player";
import { runCardTrigger } from "./run-card-trigger";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const calculateDamage = (state: Game.GameState): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state, state.activePlayer);

  // Get a list of cards in a players field that have the damage property
  const damageCards = player.field.filter((card) => card.damage !== undefined);

  // Check if the opponent has a shield
  const opponentShield = opponent.field.find(
    (card) => CARD_LIBRARY[card.cardId]?.type === "SHIELD",
  );
  for (const card of damageCards) {
    // If the opponent has a shield, reduce the damage by the shield's value
    if (opponentShield) {
      const newState = runCardTrigger(
        {
          state,
          cardId: opponentShield.id,
          target: card.id,
          playerId: opponent.id,
        },
        "onAttacked",
      );
      const newPlayer = getPlayer(newState, state.activePlayer);

      opponent.health =
        opponent.health -
        (newPlayer.field.find(({ id }) => id === card.id)?.damage ?? 0);
    } else {
      opponent.health = opponent.health - card.damage!;
    }
  }

  // Ensure you can't go below 0
  opponent.health = Math.max(0, opponent.health);

  return state;
};
