import type { AETHER_CARDS, CardEffectRegistry } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const AETHER_EFFECTS = {
  // Aether Rune
  "0ae0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "AETHER", quantity: 1 });
    },
  },
  // Threadfin Axolotl
  "0ae1": {
    onEndTurn: () => {},
  },
  // Weftwing Sugar Glider
  "0ae2": {
    onStateChanged: () => {},
  },
  // Prismwhisker Ferret
  "0ae3": {
    onActivated: () => {},
  },
  // Starwoven Pangolin
  "0ae6": {
    onStateChanged: () => {},
  },
  // Confluence Caracal
  "0ae7": {
    onEndTurn: () => {},
  },
  // Opal Elemental
  "0ae8": {},
  // Crossweave Apprentice
  "0aeh": {
    onActivated: () => {},
  },
  // Chromatic Effigy
  "0aej": {
    onActivated: () => {},
  },
  // Stitchgate Custodian
  "0ael": {
    onActivated: () => {},
  },
  // Astral Mosaic
  "0aem": {
    onActivated: () => {},
  },
  // Colourshift
  "0ae9": {
    onActivated: () => {},
  },
  // Shared Pattern
  "0aea": {
    onActivated: () => {},
  },
  // Convergent Thought
  "0aeb": {
    onActivated: () => {},
  },
  // Borrowed Colour
  "0aed": {
    onActivated: () => {},
  },
  // Braided Reserves
  "0aeo": {
    onActivated: () => {},
  },
  // Unlikely Kinship
  "0aep": {
    onActivated: () => {},
  },
  // Spectrum Balance
  "0aeq": {
    onActivated: () => {},
  },
  // Common Thread
  "0aer": {
    onActivated: () => {},
  },
  // Woven Horizon
  "0aee": {
    onBeforeDamage: () => {},
  },
  // Mosaic Shelter
  "0aes": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Concordance Spindle
  "0aef": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof AETHER_CARDS>;
