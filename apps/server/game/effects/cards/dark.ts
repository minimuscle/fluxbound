import type { CardEffectRegistry, DARK_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const DARK_EFFECTS = {
  // Dark Rune
  "0da0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "DARK", quantity: 1 });
    },
  },
  // Duskpocket Tenrec
  "0da1": {
    onActivated: () => {},
  },
  // Velvetjaw Bat
  "0da2": {
    onEndTurn: () => {},
  },
  // Umbrasilk Spider
  "0da3": {
    onActivated: () => {},
  },
  // Nightglass Eel
  "0da5": {
    onEndTurn: () => {},
  },
  // Gloamruff Hyena
  "0da6": {
    onActivated: () => {},
  },
  // Onyx Elemental
  "0da8": {
    onActivated: () => {},
  },
  // Veilmouth Whisperer
  "0dah": {
    onActivated: () => {},
  },
  // Nightmarket Broker
  "0dai": {
    onEndTurn: () => {},
  },
  // Fearthread Weaver
  "0daj": {
    onActivated: () => {},
  },
  // Silken Eclipse
  "0dan": {
    onActivated: () => {},
  },
  // Stolen Nerve
  "0da9": {
    onPlayed: () => {},
  },
  // Smothered Intent
  "0daa": {
    onPlayed: () => {},
  },
  // Unlit Path
  "0dab": {
    onPlayed: () => {},
  },
  // Feast on Doubt
  "0dac": {
    onPlayed: () => {},
  },
  // Long Shadow
  "0dad": {
    onPlayed: () => {},
  },
  // Muted Boast
  "0dao": {
    onPlayed: () => {},
  },
  // Borrowed Dread
  "0dap": {
    onPlayed: () => {},
  },
  // Crowded Shadows
  "0daq": {
    onPlayed: () => {},
  },
  // Quiet Interrogation
  "0dar": {
    onPlayed: () => {},
  },
  // Hushcloth Screen
  "0dae": {
    onBeforeDamage: () => {},
  },
  // Velvet Bastion
  "0das": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Whisperfang
  "0daf": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof DARK_CARDS>;
