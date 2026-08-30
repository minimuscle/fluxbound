import type { Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";

export const conditionResolve = (
  state: Game.GameState,
  cardId: Game.CardId,
): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const card = player.field.find(({ id }) => id === cardId);
  if (!card) return state;

  for (const condition of card.conditions ?? []) {
    switch (condition.id) {
      case "burning":
        if (card.health) {
          card.health--;

          if (card.health <= 0) {
            player.field = player.field.filter(({ id }) => id !== cardId);
          }
        }
        break;
    }
    condition.length--;
    if (condition.length <= 0) {
      card.conditions = card.conditions?.filter(
        (condition) => condition.id !== condition.id,
      );
    }
  }
  return state;
};
