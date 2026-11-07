import type { CardEffectRegistry, LIGHT_CARDS } from "@fluxbound/schema";

export const LIGHT_EFFECTS = {
  // Light Rune
  "0li0": {
    onEndTurn: () => {},
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
    onActivated: () => {},
  },
  // Clear Horizon
  "0lia": {
    onActivated: () => {},
  },
  // Prismatic Reversal
  "0lib": {
    onActivated: () => {},
  },
  // Honest Measure
  "0lic": {
    onActivated: () => {},
  },
  // Watchful Dawn
  "0lid": {
    onActivated: () => {},
  },
  // Ray of Certainty
  "0lio": {
    onActivated: () => {},
  },
  // Morning Safeguard
  "0lip": {
    onActivated: () => {},
  },
  // Read the Gleam
  "0liq": {
    onActivated: () => {},
  },
  // Luminous Resolve
  "0lir": {
    onActivated: () => {},
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
