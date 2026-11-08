import type { CardEffectRegistry, LIFE_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const LIFE_EFFECTS = {
  // Life Rune
  "0l0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "LIFE", quantity: 1 });
    },
  },
  // Honeypot Ant
  "0l1": {
    onActivated: () => {},
  },
  // Bloomshell Beetle
  "0l2": {},
  // Sproutling
  "0l3": {},
  // Sunpetal Guardian
  "0l5": {
    onActivated: () => {},
  },
  // Emerald Elemental
  "0l6": {},
  // Budcrowned Capybara
  "0ld": {
    onActivated: () => {},
  },
  // Grafttail Newt
  "0le": {
    onActivated: () => {},
  },
  // Orchardback Tapir
  "0lf": {
    onEndTurn: () => {},
  },
  // Crownroot Elk
  "0lh": {
    onActivated: () => {},
  },
  // Mosscradle Warden
  "0lq": {
    onDamaged: () => {},
  },
  // Heal
  "0l7": {
    onPlayed: () => {},
  },
  // Blossoming Field
  "0l8": {
    onPlayed: () => {},
  },
  // New Shoots
  "0li": {
    onPlayed: () => {},
  },
  // Graft Exchange
  "0lj": {
    onPlayed: () => {},
  },
  // Sheltered Growth
  "0lk": {
    onPlayed: () => {},
  },
  // Second Spring
  "0ll": {
    onPlayed: () => {},
  },
  // Tender Transplant
  "0lr": {
    onPlayed: () => {},
  },
  // Harvest Circle
  "0ls": {
    onPlayed: () => {},
  },
  // Thorn Shield
  "0l9": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Living Canopy
  "0lm": {
    onBeforeDamage: () => {},
  },
  // Pruning Crescent
  "0ln": {
    onDamaged: () => {},
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof LIFE_CARDS>;
