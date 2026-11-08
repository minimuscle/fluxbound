import type { CardEffectRegistry, FIRE_CARDS } from "@fluxbound/schema";
import { applyCondition } from "game/effects/effects/condition/apply";
import { createCreature } from "game/effects/effects/creature/create";
import { destroyCreature } from "game/effects/effects/creature/destroy";
import { generateFlux } from "game/effects/effects/flux/generate";
import { updateStats } from "game/effects/effects/stats/update";

export const FIRE_EFFECTS = {
  // Fire Rune
  "0f0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "FIRE", quantity: 1 });
    },
  },
  // Cinder Rat
  "0f1": {},
  // Phoenix
  "0f2": {
    onDeath: ({ player }) => {
      createCreature({ player, cardId: "0f3" });
    },
  },
  // Ash
  "0f3": {
    onActivated: ({ player, card }) => {
      destroyCreature({ player, gameCardId: card.id });
      createCreature({ player, cardId: "0f2" });
    },
  },
  // Blazehorn Ram
  "0f4": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 1,
          health: (card.health ?? 1) - 1,
        },
      });
      if ((card.health ?? 1) <= 0) {
        destroyCreature({ player, gameCardId: card.id });
      }
    },
  },
  // Steamforged Drake
  "0f5": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 2,
        },
      });
      applyCondition({
        player,
        gameCardId: card.id,
        condition: {
          id: "enhanced",
          length: 0,
        },
      });
    },
    onEndTurn: ({ player, card }) => {
      if (card.conditions?.some((condition) => condition.id === "enhanced" && condition.length === 0)) {
        updateStats({
          player,
          gameCardId: card.id,
          statOptions: {
            damage: (card.damage ?? 0) - 2,
          },
        });
      }
    },
  },
  // Ember
  "0f7": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 2,
        },
      });
    },
  },
  // Ruby Elemental
  "0f8": {},
  // Kilnback Skink
  "0fi": {
    onEndTurn: ({ player, card }) => {
      if (card.health < card.maxHealth) {
        // TODO: handle card health and maxHealth and damage being possibly undefined for all creatures. By this point they will be defined if its a creature which we will know
        updateStats({
          player,
          gameCardId: card.id,
          statOptions: {
            damage: (card.damage ?? 0) + 1,
          },
        });
      }
    },
  },
  // Coalcoil Pangolin
  "0fj": {
    onDamaged: () => {},
  },
  // Glassmane Jackal
  "0fl": {
    onActivated: () => {},
  },
  // Fireball
  "0f9": {
    onActivated: () => {},
  },
  // Wildfire
  "0fa": {
    onActivated: () => {},
  },
  // Molten Rage
  "0fb": {
    onActivated: () => {},
  },
  // Flash Ignition
  "0fc": {
    onActivated: () => {},
  },
  // Burn
  "0fd": {
    onActivated: () => {},
  },
  // Banked Embers
  "0fo": {
    onActivated: () => {},
  },
  // Flashover Pact
  "0fp": {
    onActivated: () => {},
  },
  // Heat Exchange
  "0fq": {
    onActivated: () => {},
  },
  // Last Spark
  "0fr": {
    onActivated: () => {},
  },
  // Wall of Fire
  "0fe": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Heat Shield
  "0ff": {
    onBeforeDamage: () => {},
  },
  // Flametongue Blade
  "0fg": {
    onStateChanged: () => {},
  },
} satisfies CardEffectRegistry<typeof FIRE_CARDS>;
