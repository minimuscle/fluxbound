import { drawCard } from "pages/SoloGame/utils/functions";
import type { State } from "utils/types/game";

export const startTurn = (state: State): State => {
  const owner = state.activePlayer === "PLAYER" ? state.player : state.enemy;
  const { deck: nextDeck, cards } = drawCard(owner.deck);

  if (owner.deck.length === 0) {
    return {
      ...state,
      nextPhase: "GAME_OVER",
    };
  }

  return {
    ...state,
    [state.activePlayer === "PLAYER" ? "player" : "enemy"]: {
      ...owner,
      deck: nextDeck,
      hand: [...owner.hand, ...cards],
    },
    nextPhase: "END_TURN",
  };
};
