import type { CardEffectRegistry, FORGED_DARK_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_DARK_EFFECTS = {
  // Tempered Dark Rune
  "1da0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "DARK", quantity: 2 });
    },
  },
  // Gloamspine Tenrec
  "1da1": {
    onActivated: () => {},
  },
  // Moonveil Bat
  "1da2": {
    onEndTurn: () => {},
  },
  // Gravesilk Spider
  "1da3": {
    onActivated: () => {},
  },
  // Abyssglass Eel
  "1da5": {
    onEndTurn: () => {},
  },
  // Dreadruff Hyena
  "1da6": {
    onActivated: () => {},
  },
  // Ascendant Onyx Elemental
  "1da8": {
    onActivated: () => {},
  },
  // Nightveil Whisperer
  "1dah": {
    onActivated: () => {},
  },
  // Midnight Bargainer
  "1dai": {
    onEndTurn: () => {},
  },
  // Dreadweave Oracle
  "1daj": {
    onActivated: () => {},
  },
  // Velvet Oblivion
  "1dan": {
    onActivated: () => {},
  },
  // Shattered Resolve
  "1da9": {
    onActivated: () => {},
  },
  // Absolute Hush
  "1daa": {
    onActivated: () => {},
  },
  // Veiled Passage
  "1dab": {
    onActivated: () => {},
  },
  // Banquet of Doubt
  "1dac": {
    onActivated: () => {},
  },
  // Deepening Shadow
  "1dad": {
    onActivated: () => {},
  },
  // Broken Boast
  "1dao": {
    onActivated: () => {},
  },
  // Stolen Terror
  "1dap": {
    onActivated: () => {},
  },
  // Gathering Night
  "1daq": {
    onActivated: () => {},
  },
  // Silent Inquisition
  "1dar": {
    onActivated: () => {},
  },
  // Silenceweave Screen
  "1dae": {
    onBeforeDamage: () => {},
  },
  // Midnight Screen
  "1das": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Dreadfang
  "1daf": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_DARK_CARDS>;
