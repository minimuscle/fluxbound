import { CARD_LIBRARY } from "components/Cards/library";
import type { Action, State } from "utils/types/game";

export const playCard = (state: State, action: Action): State => {
  const activePlayer = state.activePlayer.toLowerCase() as "player" | "enemy";
  const selectedCard = state[activePlayer].hand.find((card) => card.gameCardId === action.card)?.id;
  const cardData = selectedCard ? CARD_LIBRARY[selectedCard] : null;

  if (!cardData) return state;
  if (cardData?.cost > state[activePlayer].flux[cardData.element]) {
    return state;
  }

  const fieldNoExtraShield =
    cardData.type === "SHIELD" ? state[activePlayer].field.filter(({ id }) => CARD_LIBRARY[id].type !== "SHIELD") : state[activePlayer].field;

  const nextHand = state[activePlayer].hand.filter((card) => card.gameCardId !== action.card);

  const playedCard = state[activePlayer].hand.find((card) => card.gameCardId === action.card)!;
  if ("activations" in cardData) {
    playedCard.activations = cardData.activations;
  }

  const nextField = [...fieldNoExtraShield, playedCard];
  const nextFlux = {
    ...state[activePlayer].flux,
    [cardData.element]: state[activePlayer].flux[cardData.element] - cardData.cost,
  };

  return {
    ...state,
    nextPhase: "END_TURN",
    [activePlayer]: {
      ...state[activePlayer],
      hand: nextHand,
      field: nextField,
      flux: nextFlux,
    },
  };
};
