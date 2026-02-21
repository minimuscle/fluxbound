import { drawCard } from "pages/SoloGame/utils/functions";
import type { State } from "utils/types/game";

export const startGame = (state: State): State => {
  const { deck: playerDeck, cards: playerHand } = drawCard(state.player.deck, 6);
  const { deck: enemyDeck, cards: enemyHand } = drawCard(state.enemy.deck, 6);

  return {
    ...state,
    gameStarted: true,
    showCoinToss: false,
    nextPhase: "TURN_START",
    // playerDeck: startingDeck,
    // playerHand: cards,
    player: {
      ...state.player,
      deck: playerDeck,
      hand: playerHand,
    },
    enemy: {
      ...state.enemy,
      deck: enemyDeck,
      hand: enemyHand,
    },
  };
};
