import type { CardEffectRegistry, FIRE_CARDS } from "@fluxbound/schema";
import { createCreature } from "game/effects/createCreature";
import { generateFlux } from "game/effects/generateFlux";

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
    onActivated: () => {},
  },
  // Blazehorn Ram
  "0f4": {
    onActivated: () => {},
  },
  // Steamforged Drake
  "0f5": {
    onActivated: () => {},
  },
  // Ember
  "0f7": {
    onActivated: () => {},
  },
  // Ruby Elemental
  "0f8": {},
  // Kilnback Skink
  "0fi": {
    onEndTurn: () => {},
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
