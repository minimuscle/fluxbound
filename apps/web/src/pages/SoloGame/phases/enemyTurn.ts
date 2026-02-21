import { CARD_LIBRARY } from "components/Cards/library";
import type { Action, State } from "utils/types/game";

export const enemyTurn = (state: State, dispatch: React.Dispatch<Action>) => {
  dispatch({ phase: "START_TURN" });

  state.enemy.hand.forEach((card) => {
    const cardData = CARD_LIBRARY[card.id];
    if (cardData.cost === 0 || cardData.cost < state.enemy.flux[cardData.element]) {
      dispatch({ phase: "PLAY_CARD", card: card.gameCardId });
    }
  });
  dispatch({ phase: "END_TURN" });
};
