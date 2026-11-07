import type { CardEffectRegistry, FORGED_WATER_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/generateFlux";

export const FORGED_WATER_EFFECTS = {
  // Tempered Water Rune
  "1w0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "WATER", quantity: 2 });
    },
  },
  // Riversong Sprite
  "1w1": {},
  // Reefwarden Crab
  "1w2": {},
  // Rimecrest Serpent
  "1w3": {
    onActivated: () => {},
  },
  // Springtide Naiad
  "1w4": {
    onActivated: () => {},
  },
  // Ascendant Sapphire Elemental
  "1w6": {},
  // Moonpool Otter
  "1wg": {
    onActivated: () => {},
  },
  // Pearlcrown Nudibranch
  "1wh": {
    onEndTurn: () => {},
  },
  // Glassreef Cuttle
  "1wi": {
    onActivated: () => {},
  },
  // Moonclock Nautilus
  "1wk": {
    onEndTurn: () => {},
  },
  // Greatlake Colossus
  "1ws": {
    onActivated: () => {},
  },
  // Undertow Surge
  "1w7": {
    onActivated: () => {},
  },
  // Deepfreeze Ray
  "1w8": {
    onActivated: () => {},
  },
  // Silver Rain
  "1w9": {
    onActivated: () => {},
  },
  // Spiral Current
  "1wa": {
    onActivated: () => {},
  },
  // Glacial Javelin
  "1wb": {
    onActivated: () => {},
  },
  // Kindred Current
  "1wm": {
    onActivated: () => {},
  },
  // Brineheart Bargain
  "1wn": {
    onActivated: () => {},
  },
  // Crushing Equilibrium
  "1wo": {
    onActivated: () => {},
  },
  // Returning Undertow
  "1wp": {
    onActivated: () => {},
  },
  // Mirrorlake Reflection
  "1wt": {
    onActivated: () => {},
  },
  // Glacier Wall
  "1wc": {
    onBeforeDamage: () => {},
  },
  // Frostglass Bastion
  "1wq": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Tideglass Fork
  "1wr": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_WATER_CARDS>;
