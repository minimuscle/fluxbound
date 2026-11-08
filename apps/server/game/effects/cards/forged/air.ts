import type { CardEffectRegistry, FORGED_AIR_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_AIR_EFFECTS = {
  // Tempered Air Rune
  "1a0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "AIR", quantity: 2 });
    },
  },
  // Thundercrest Finch
  "1a1": {},
  // Slipstream Jackrabbit
  "1a2": {},
  // Monsoon Roc
  "1a3": {
    onActivated: () => {},
  },
  // Ascendant Diamond Elemental
  "1a5": {
    onActivated: () => {},
  },
  // Galesong Gecko
  "1ae": {
    onEndTurn: () => {},
  },
  // Cloudlace Glider
  "1af": {
    onEndTurn: () => {},
  },
  // Thunderpouch Jerboa
  "1ag": {
    onEndTurn: () => {},
  },
  // Stormchime Cicada
  "1ah": {
    onActivated: () => {},
  },
  // Auroribbon Manta
  "1ai": {
    onActivated: () => {},
  },
  // Skybreak Antelope
  "1aj": {
    onEndTurn: () => {},
  },
  // Forked Lightning
  "1a6": {
    onPlayed: () => {},
  },
  // Sovereign Cyclone
  "1a7": {
    onPlayed: () => {},
  },
  // Stormwell Charge
  "1a8": {
    onPlayed: () => {},
  },
  // Skyward Grace
  "1a9": {
    onPlayed: () => {},
  },
  // Rolling Thunder
  "1aa": {
    onPlayed: () => {},
  },
  // Ride the Skybreak
  "1ak": {
    onPlayed: () => {},
  },
  // Crosswind Dance
  "1al": {
    onPlayed: () => {},
  },
  // Jetstream Relay
  "1am": {
    onPlayed: () => {},
  },
  // Thunderous Timing
  "1an": {
    onPlayed: () => {},
  },
  // Storm Crescendo
  "1as": {
    onPlayed: () => {},
  },
  // Tempest Barrier
  "1ab": {
    onBeforeDamage: () => {},
  },
  // Stormfold Veil
  "1ao": {
    onBeforeDamage: () => {},
  },
  // Stormsong Needle
  "1ap": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_AIR_CARDS>;
