import type { AIR_CARDS, CardEffectRegistry } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const AIR_EFFECTS = {
  // Air Rune
  "0a0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "AIR", quantity: 1 });
    },
  },
  // Gale Finch
  "0a1": {},
  // Cloudrunner Hare
  "0a2": {},
  // Tempest Roc
  "0a3": {
    onActivated: () => {},
  },
  // Diamond Elemental
  "0a5": {
    onActivated: () => {},
  },
  // Whistlecrest Gecko
  "0ae": {
    onEndTurn: () => {},
  },
  // Kitefin Glider
  "0af": {
    onEndTurn: () => {},
  },
  // Gustpocket Jerboa
  "0ag": {
    onEndTurn: () => {},
  },
  // Chimewing Cicada
  "0ah": {
    onActivated: () => {},
  },
  // Ribboncloud Manta
  "0ai": {
    onActivated: () => {},
  },
  // Jetstream Antelope
  "0aj": {
    onEndTurn: () => {},
  },
  // Lightning Bolt
  "0a6": {
    onPlayed: () => {},
  },
  // Cyclone
  "0a7": {
    onPlayed: () => {},
  },
  // Static Charge
  "0a8": {
    onPlayed: () => {},
  },
  // Flight
  "0a9": {
    onPlayed: () => {},
  },
  // Thunderstorm
  "0aa": {
    onPlayed: () => {},
  },
  // Catch the Updraft
  "0ak": {
    onPlayed: () => {},
  },
  // Crosswind Step
  "0al": {
    onPlayed: () => {},
  },
  // Slipstream Relay
  "0am": {
    onPlayed: () => {},
  },
  // Perfect Timing
  "0an": {
    onPlayed: () => {},
  },
  // Gathering Tempo
  "0as": {
    onPlayed: () => {},
  },
  // Wind Brrier
  "0ab": {
    onBeforeDamage: () => {},
  },
  // Crossbreeze Veil
  "0ao": {
    onBeforeDamage: () => {},
  },
  // Cadence Needle
  "0ap": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof AIR_CARDS>;
