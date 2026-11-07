import type { CardEffectRegistry, FORGED_AETHER_CARDS } from "@fluxbound/schema";

export const FORGED_AETHER_EFFECTS = {
  // Tempered Aether Rune
  "1ae0": {
    onEndTurn: () => {},
  },
  // Prismgill Axolotl
  "1ae1": {
    onEndTurn: () => {},
  },
  // Aurora Sugar Glider
  "1ae2": {
    onStateChanged: () => {},
  },
  // Leyglass Ferret
  "1ae3": {
    onActivated: () => {},
  },
  // Constellation Pangolin
  "1ae6": {
    onStateChanged: () => {},
  },
  // Starbraid Caracal
  "1ae7": {
    onEndTurn: () => {},
  },
  // Ascendant Opal Elemental
  "1ae8": {},
  // Chromatic Mentor
  "1aeh": {
    onActivated: () => {},
  },
  // Prismatic Effigy
  "1aej": {
    onActivated: () => {},
  },
  // Worldseam Custodian
  "1ael": {
    onActivated: () => {},
  },
  // Celestial Mosaic
  "1aem": {
    onActivated: () => {},
  },
  // Prismshift
  "1ae9": {
    onActivated: () => {},
  },
  // Harmonic Pattern
  "1aea": {
    onActivated: () => {},
  },
  // Confluence of Thought
  "1aeb": {
    onActivated: () => {},
  },
  // Borrowed Horizon
  "1aed": {
    onActivated: () => {},
  },
  // Braided Firmament
  "1aeo": {
    onActivated: () => {},
  },
  // Impossible Kinship
  "1aep": {
    onActivated: () => {},
  },
  // Perfect Spectrum
  "1aeq": {
    onActivated: () => {},
  },
  // Unbroken Thread
  "1aer": {
    onActivated: () => {},
  },
  // Worldwoven Horizon
  "1aee": {
    onBeforeDamage: () => {},
  },
  // Prismatic Shelter
  "1aes": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Worldweave Spindle
  "1aef": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_AETHER_CARDS>;
