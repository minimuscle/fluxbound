import type { CardEffectRegistry, EARTH_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const EARTH_EFFECTS = {
  // Earth Rune
  "0e0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "EARTH", quantity: 1 });
    },
  },
  // Mossling
  "0e1": {},
  // Stoneback Turtle
  "0e2": {
    onActivated: () => {},
  },
  // Mountain Titan
  "0e5": {
    onActivated: () => {},
  },
  // Topaz Elemental
  "0e6": {},
  // Pebblejaw Wombat
  "0ef": {
    onActivated: () => {},
  },
  // Cairnback Armadillo
  "0eg": {
    onDamaged: () => {},
  },
  // Flintroot Mole
  "0eh": {
    onActivated: () => {},
  },
  // Geodeback Ibex
  "0ei": {
    onEndTurn: () => {},
  },
  // Basalt Burrower
  "0ek": {
    onStateChanged: () => {},
  },
  // Claybound Surveyor
  "0et": {
    onActivated: () => {},
  },
  // Rockfall
  "0e7": {
    onPlayed: () => {},
  },
  // Entangle
  "0e8": {
    onPlayed: () => {},
  },
  // Tremor
  "0e9": {
    onPlayed: () => {},
  },
  // Fortify
  "0ea": {
    onPlayed: () => {},
  },
  // Quicksand
  "0eb": {
    onPlayed: () => {},
  },
  // Set in Stone
  "0el": {
    onPlayed: () => {},
  },
  // Loadbearing Bond
  "0em": {
    onPlayed: () => {},
  },
  // Patient Pressure
  "0en": {
    onPlayed: () => {},
  },
  // Reinforced Footing
  "0eo": {
    onPlayed: () => {},
  },
  // Seismic Appraisal
  "0es": {
    onPlayed: () => {},
  },
  // Granite Wall
  "0ec": {
    onBeforeDamage: () => {},
  },
  // Layered Bulwark
  "0ep": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Quarry Tooth
  "0eq": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof EARTH_CARDS>;
