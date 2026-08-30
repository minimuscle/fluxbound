import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { conditionResolve } from "game/actions/condition-resolve";
import { calculateDamage } from "game/helpers/calculate-damage";
import { getOpponent } from "game/helpers/get-opponent";
import { getPlayer } from "game/helpers/get-player";
import { runCardTrigger } from "game/helpers/run-card-trigger";
import { setPlayerState } from "game/helpers/set-player-state";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const endTurn = (state: Game.GameState): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const nextPlayerField = player.field.map((card) => {
    const cardData = CARD_LIBRARY[card.cardId];
    if (
      card.activations === undefined ||
      !cardData ||
      !("activations" in cardData)
    )
      return card;

    return {
      ...card,
      activations: cardData.activations,
    };
  });

  const nextState = setPlayerState(state, player.id, {
    field: nextPlayerField,
    flux: {
      ...player.flux,
    },
  });

  // Do any damage from other spell affects

  // Draw a card from the deck for the other player
  const opponent = getOpponent(nextState);

  const nextStateHealth = calculateDamage(nextState);
  const nextOpponentHealth = getOpponent(nextStateHealth).health;

  // Trigger any cards in play with the onTurnEnd trigger
  const triggeredState = player.field.reduce(
    (currentState, card) =>
      runCardTrigger({ state: currentState, cardId: card.id }, "onTurnEnd"),
    nextState,
  );

  // Resolve any condition effects.
  const resolvedState = player.field.reduce(
    (currentState, card) => conditionResolve(currentState, card.id),
    triggeredState,
  );

  // Plus 1 flux for the players attunement
  getPlayer(resolvedState, player.id).flux[player.attunement] += 1;

  const nextTurnState = setPlayerState(resolvedState, opponent.id, {
    health: nextOpponentHealth,
  });

  // End the turn
  const turn = state.turn.split("-");
  // Check if it is player 1 or 2, and if 1, set turn to X-2 or else X+1-1
  if (state.player1.id === state.activePlayer) {
    turn[1] = "2";
  } else {
    turn[0] = String(Number(turn[0]) + 1);
    turn[1] = "1";
  }
  return {
    ...nextTurnState,
    activePlayer:
      state.player1.id === state.activePlayer
        ? state.player2.id
        : state.player1.id,
    turn: turn.join("-") as Game.GameState["turn"],
  };
};
