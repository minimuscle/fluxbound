import type { CardEffectRegistry, FORGED_VOID_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_VOID_EFFECTS = {
  // Tempered Void Rune
  "1v0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "VOID", quantity: 2 });
    },
  },
  // Starless Mite
  "1v1": {
    onActivated: () => {},
  },
  // Riftcarapace Isopod
  "1v2": {
    onEndTurn: () => {},
  },
  // Nullpocket Bilby
  "1v3": {
    onActivated: () => {},
  },
  // Ascendant Obsidian Elemental
  "1v8": {
    onActivated: () => {},
  },
  // Zeroheart Ticker
  "1vg": {
    onEndTurn: () => {},
  },
  // Starless Drifter
  "1vh": {
    onStateChanged: () => {},
  },
  // Graveglass Hermit
  "1vi": {
    onActivated: () => {},
  },
  // Hollowstar Compass
  "1vj": {
    onEndTurn: () => {},
  },
  // Eclipsed Orbit
  "1vm": {
    onBeforeDamage: () => {},
  },
  // Warden of Nothing
  "1vn": {
    onEndTurn: () => {},
  },
  // Empty the World
  "1v9": {
    onActivated: () => {},
  },
  // Reservoir Ruin
  "1va": {
    onActivated: () => {},
  },
  // Perfect Absence
  "1vb": {
    onActivated: () => {},
  },
  // Hunger Beyond
  "1vc": {
    onActivated: () => {},
  },
  // Riftstep Sanctuary
  "1vd": {
    onActivated: () => {},
  },
  // Grasp of Nothing
  "1vo": {
    onActivated: () => {},
  },
  // Collapsing Reserve
  "1vp": {
    onActivated: () => {},
  },
  // Absolute Zero Hour
  "1vq": {
    onActivated: () => {},
  },
  // The Final Measure
  "1vr": {
    onActivated: () => {},
  },
  // Nullglass Shell
  "1ve": {
    onBeforeDamage: () => {},
  },
  // Event Horizon Shell
  "1vs": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Null Horizon
  "1vf": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_VOID_CARDS>;
