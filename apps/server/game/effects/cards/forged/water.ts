import type { CardEffectRegistry, FORGED_WATER_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

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
    onPlayed: () => {},
  },
  // Deepfreeze Ray
  "1w8": {
    onPlayed: () => {},
  },
  // Silver Rain
  "1w9": {
    onPlayed: () => {},
  },
  // Spiral Current
  "1wa": {
    onPlayed: () => {},
  },
  // Glacial Javelin
  "1wb": {
    onPlayed: () => {},
  },
  // Kindred Current
  "1wm": {
    onPlayed: () => {},
  },
  // Brineheart Bargain
  "1wn": {
    onPlayed: () => {},
  },
  // Crushing Equilibrium
  "1wo": {
    onPlayed: () => {},
  },
  // Returning Undertow
  "1wp": {
    onPlayed: () => {},
  },
  // Mirrorlake Reflection
  "1wt": {
    onPlayed: () => {},
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
