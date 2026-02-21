import { CARD_LIBRARY } from "components/Cards/library";
import { damageTaken } from "pages/SoloGame/utils/audio";
import { runCardTrigger } from "pages/SoloGame/utils/functions";
import type { State } from "utils/types/game";

const DAMAGE_SOUND_POOL_SIZE = 6;
const damageTakenPool: HTMLAudioElement[] = Array.from({ length: DAMAGE_SOUND_POOL_SIZE }, () => {
  const audio = damageTaken.cloneNode(true) as HTMLAudioElement;
  audio.volume = 0.2;
  audio.preload = "auto";
  return audio;
});
let damageTakenPoolIndex = 0;
const playDamageTaken = () => {
  const audio = damageTakenPool[damageTakenPoolIndex];
  damageTakenPoolIndex = (damageTakenPoolIndex + 1) % DAMAGE_SOUND_POOL_SIZE;
  try {
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  } catch {
    // Ignore if the browser blocks playback or the element isn't ready yet.
  }
};

export const endTurn = (state: State): State => {
  const activePlayer = state.activePlayer === "PLAYER" ? state.player : state.enemy;
  const otherPlayer = state.activePlayer === "PLAYER" ? state.enemy : state.player;

  const fieldDamage = activePlayer.field.reduce((acc, card) => {
    const cardData = CARD_LIBRARY[card.id];
    if (!("damage" in cardData)) return acc;
    const base = cardData.damage ?? 0;
    const dmg = card.damage ?? base;
    return acc + dmg;
  }, 0);

  const newOtherHealth = otherPlayer.health - fieldDamage < 0 ? 0 : otherPlayer.health - fieldDamage;

  let next: State = {
    ...state,
    [state.activePlayer.toLowerCase() as "player" | "enemy"]: {
      ...activePlayer,
      flux: {
        ...activePlayer.flux,
        [activePlayer.attunement]: activePlayer.flux[activePlayer.attunement] + 1,
      },
    },
    [state.activePlayer === "PLAYER" ? "enemy" : "player"]: {
      ...otherPlayer,
      health: newOtherHealth,
    },
    nextPhase: newOtherHealth <= 0 ? "GAME_OVER" : "TURN_START",
    turn: state.turn + 1,
  };

  const owner = state.activePlayer;
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const fieldIds = state[sideKey].field.map((c) => c.gameCardId);

  for (const id of fieldIds) {
    next = runCardTrigger(next, owner, id, "onTurnEnd");
  }

  //Run sound effects for all damage taken
  const wait = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
  const playDamageSoundsSequentially = async () => {
    const damageCount = activePlayer.field.reduce((count, card) => {
      return count + ("damage" in CARD_LIBRARY[card.id] ? 1 : 0);
    }, 0);
    if (damageCount <= 0) return;

    const plays = Math.min(damageCount, 12);
    const minGapMs = 55;
    const maxGapMs = 120;
    const totalBudgetMs = 850;
    const gapMs = Math.max(minGapMs, Math.min(maxGapMs, Math.floor(totalBudgetMs / plays)));

    for (let i = 0; i < plays; i += 1) {
      playDamageTaken();
      if (i < plays - 1) await wait(gapMs);
    }
  };
  playDamageSoundsSequentially();

  //Reset Activations for the next turn
  for (const gameCardId of fieldIds) {
    if (next.player.field.find((card) => card.gameCardId === gameCardId)?.activations) {
      next.player.field.find((card) => card.gameCardId === gameCardId)!.activations = 0;
    }
  }

  return {
    ...next,
    activePlayer: state.activePlayer === "PLAYER" ? "ENEMY" : "PLAYER",
  };
};
