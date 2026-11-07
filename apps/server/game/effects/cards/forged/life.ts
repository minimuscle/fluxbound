import type { CardEffectRegistry, FORGED_LIFE_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_LIFE_EFFECTS = {
  // Tempered Life Rune
  "1l0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "LIFE", quantity: 2 });
    },
  },
  // Amberhive Tender
  "1l1": {
    onActivated: () => {},
  },
  // Roseplate Beetle
  "1l2": {},
  // Heartroot Sapling
  "1l3": {},
  // Sunbloom Sentinel
  "1l5": {
    onActivated: () => {},
  },
  // Ascendant Emerald Elemental
  "1l6": {},
  // Dewcrown Capybara
  "1ld": {
    onActivated: () => {},
  },
  // Bloomtail Newt
  "1le": {
    onActivated: () => {},
  },
  // Briarpatch Tapir
  "1lf": {
    onEndTurn: () => {},
  },
  // Dawnroot Elk
  "1lh": {
    onActivated: () => {},
  },
  // Eldermoss Warden
  "1lq": {
    onDamaged: () => {},
  },
  // Heartwell
  "1l7": {
    onActivated: () => {},
  },
  // Everblossom Field
  "1l8": {
    onActivated: () => {},
  },
  // Verdant Awakening
  "1li": {
    onActivated: () => {},
  },
  // Living Graft
  "1lj": {
    onActivated: () => {},
  },
  // Briar Sanctuary
  "1lk": {
    onActivated: () => {},
  },
  // Endless Spring
  "1ll": {
    onActivated: () => {},
  },
  // Rootheart Transplant
  "1lr": {
    onActivated: () => {},
  },
  // Golden Harvest
  "1ls": {
    onActivated: () => {},
  },
  // Briarheart Shield
  "1l9": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Elder Canopy
  "1lm": {
    onBeforeDamage: () => {},
  },
  // Harvest Moon
  "1ln": {
    onDamaged: () => {},
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_LIFE_CARDS>;
