import type { CardEffectRegistry, WATER_CARDS } from "@fluxbound/schema";

export const WATER_EFFECTS = {
  // Water Run
  "0w0": {
    onEndTurn: () => {},
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
    onActivated: () => {},
  },
  // Freeze Ray
  "0w8": {
    onActivated: () => {},
  },
  // Healing Rain
  "0w9": {
    onActivated: () => {},
  },
  // Whirlpool
  "0wa": {
    onActivated: () => {},
  },
  // Frostbite Spear
  "0wb": {
    onActivated: () => {},
  },
  // Shared Current
  "0wm": {
    onActivated: () => {},
  },
  // Saltwater Bargain
  "0wn": {
    onActivated: () => {},
  },
  // Pressure Equalisation
  "0wo": {
    onActivated: () => {},
  },
  // Receding Tide
  "0wp": {
    onActivated: () => {},
  },
  // Stillwater Reflection
  "0wt": {
    onActivated: () => {},
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
