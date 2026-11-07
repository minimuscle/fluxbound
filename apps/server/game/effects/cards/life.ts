import type { CardEffectRegistry, LIFE_CARDS } from "@fluxbound/schema";

export const LIFE_EFFECTS = {
  // Life Rune
  "0l0": {
    onEndTurn: () => {},
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
    onActivated: () => {},
  },
  // Blossoming Field
  "0l8": {
    onActivated: () => {},
  },
  // New Shoots
  "0li": {
    onActivated: () => {},
  },
  // Graft Exchange
  "0lj": {
    onActivated: () => {},
  },
  // Sheltered Growth
  "0lk": {
    onActivated: () => {},
  },
  // Second Spring
  "0ll": {
    onActivated: () => {},
  },
  // Tender Transplant
  "0lr": {
    onActivated: () => {},
  },
  // Harvest Circle
  "0ls": {
    onActivated: () => {},
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
