import type { CardEffectRegistry, FORGED_EARTH_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/generateFlux";

export const FORGED_EARTH_EFFECTS = {
  // Tempered Earth Rune
  "1e0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "EARTH", quantity: 2 });
    },
  },
  // Granitebud
  "1e1": {},
  // Citadel Tortoise
  "1e2": {
    onActivated: () => {},
  },
  // Worldroot Titan
  "1e5": {
    onActivated: () => {},
  },
  // Ascendant Topaz Elemental
  "1e6": {},
  // Ironroot Wombat
  "1ef": {
    onActivated: () => {},
  },
  // Rampart Armadillo
  "1eg": {
    onDamaged: () => {},
  },
  // Flintheart Delver
  "1eh": {
    onActivated: () => {},
  },
  // Prismhorn Ibex
  "1ei": {
    onEndTurn: () => {},
  },
  // Deepstone Burrower
  "1ek": {
    onStateChanged: () => {},
  },
  // Terracotta Pathfinder
  "1et": {
    onActivated: () => {},
  },
  // Meteorfall
  "1e7": {
    onActivated: () => {},
  },
  // Rootbound Snare
  "1e8": {
    onActivated: () => {},
  },
  // Faultline Pulse
  "1e9": {
    onActivated: () => {},
  },
  // Adamant Resolve
  "1ea": {
    onActivated: () => {},
  },
  // Hungry Ground
  "1eb": {
    onActivated: () => {},
  },
  // Cast in Adamant
  "1el": {
    onActivated: () => {},
  },
  // Bedrock Covenant
  "1em": {
    onActivated: () => {},
  },
  // Mountain Pressure
  "1en": {
    onActivated: () => {},
  },
  // Unshakable Footing
  "1eo": {
    onActivated: () => {},
  },
  // Deepfault Appraisal
  "1es": {
    onActivated: () => {},
  },
  // Adamant Wall
  "1ec": {
    onBeforeDamage: () => {},
  },
  // Adamant Bulwark
  "1ep": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Bedrock Fang
  "1eq": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_EARTH_CARDS>;
