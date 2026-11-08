import type { CardEffectRegistry, LIGHT_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const LIGHT_EFFECTS = {
  // Light Rune
  "0li0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "LIGHT", quantity: 1 });
    },
  },
  // Prismback Tortoise
  "0li2": {
    onBeforeDamage: () => {},
  },
  // Lanternsnout Coati
  "0li4": {
    onActivated: () => {},
  },
  // Sunglass Stag
  "0li5": {
    onActivated: () => {},
  },
  // Citrine Elemental
  "0li8": {},
  // Sunseal Sentry
  "0lig": {
    onBeforeDamage: () => {},
  },
  // Aurora Scribe
  "0lih": {
    onActivated: () => {},
  },
  // Glasswing Herald
  "0lii": {
    onActivated: () => {},
  },
  // Opaline Witness
  "0lik": {
    onActivated: () => {},
  },
  // Lucent Bailiff
  "0lim": {
    onActivated: () => {},
  },
  // Crown of Day
  "0lin": {
    onEndTurn: () => {},
  },
  // Guiding Glimmer
  "0li9": {
    onPlayed: () => {},
  },
  // Clear Horizon
  "0lia": {
    onPlayed: () => {},
  },
  // Prismatic Reversal
  "0lib": {
    onPlayed: () => {},
  },
  // Honest Measure
  "0lic": {
    onPlayed: () => {},
  },
  // Watchful Dawn
  "0lid": {
    onPlayed: () => {},
  },
  // Ray of Certainty
  "0lio": {
    onPlayed: () => {},
  },
  // Morning Safeguard
  "0lip": {
    onPlayed: () => {},
  },
  // Read the Gleam
  "0liq": {
    onPlayed: () => {},
  },
  // Luminous Resolve
  "0lir": {
    onPlayed: () => {},
  },
  // Firstlight Aegis
  "0lie": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Dawnglass Ward
  "0lis": {
    onBeforeDamage: () => {},
  },
  // Horizon Needle
  "0lif": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof LIGHT_CARDS>;
