import type { CardEffectRegistry, WATER_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const WATER_EFFECTS = {
  // Water Run
  "0w0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "WATER", quantity: 1 });
    },
  },
  // River Sprite
  "0w1": {},
  // Coral Guardian
  "0w2": {},
  // Frostfin Serpent
  "0w3": {
    onActivated: () => {},
  },
  // Bloomtide Nymph
  "0w4": {
    onActivated: () => {},
  },
  // Sapphire Elemental
  "0w6": {},
  // Siltwhisker Otter
  "0wg": {
    onActivated: () => {},
  },
  // Pearlvent Nudibranch
  "0wh": {
    onEndTurn: () => {},
  },
  // Brineglass Cuttle
  "0wi": {
    onActivated: () => {},
  },
  // Tideclock Nautilus
  "0wk": {
    onEndTurn: () => {},
  },
  // Reservoir Colossus
  "0ws": {
    onActivated: () => {},
  },
  // Tidal Wave
  "0w7": {
    onPlayed: () => {},
  },
  // Freeze Ray
  "0w8": {
    onPlayed: () => {},
  },
  // Healing Rain
  "0w9": {
    onPlayed: () => {},
  },
  // Whirlpool
  "0wa": {
    onPlayed: () => {},
  },
  // Frostbite Spear
  "0wb": {
    onPlayed: () => {},
  },
  // Shared Current
  "0wm": {
    onPlayed: () => {},
  },
  // Saltwater Bargain
  "0wn": {
    onPlayed: () => {},
  },
  // Pressure Equalisation
  "0wo": {
    onPlayed: () => {},
  },
  // Receding Tide
  "0wp": {
    onPlayed: () => {},
  },
  // Stillwater Reflection
  "0wt": {
    onPlayed: () => {},
  },
  // Ice Wall
  "0wc": {
    onBeforeDamage: () => {},
  },
  // Tidepool Mantle
  "0wq": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Estuary Fork
  "0wr": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof WATER_CARDS>;
