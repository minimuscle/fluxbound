import { enemyStarterTestDeck } from "components/Cards/starterDecks/enemyDeck";
import { playerStarterTestDeck } from "components/Cards/starterDecks/playerDeck";
import { generateRandomPlayer, shuffle } from "pages/SoloGame/utils/functions";
import type { State } from "utils/types/game";

export const restartGame = (): State => {
  return {
    activePlayer: generateRandomPlayer(),
    gameStarted: false,
    showCoinToss: true,
    player: {
      deck: shuffle(playerStarterTestDeck),
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      flux: {
        FIRE: 0,
        WATER: 0,
        EARTH: 0,
        AIR: 0,
        LIGHT: 0,
        DARK: 0,
        LIFE: 0,
        DEATH: 0,
        AETHER: 0,
        VOID: 0,
      },
    },
    enemy: {
      deck: shuffle(enemyStarterTestDeck),
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE",
      flux: {
        FIRE: 0,
        WATER: 0,
        EARTH: 0,
        AIR: 0,
        LIGHT: 0,
        DARK: 0,
        LIFE: 0,
        DEATH: 0,
        AETHER: 0,
        VOID: 0,
      },
    },

    turn: 0,
    nextPhase: "START_GAME",
  };
};
