import type { CardEffectRegistry, VOID_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const VOID_EFFECTS = {
  // Void Rune
  "0v0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "VOID", quantity: 1 });
    },
  },
  // Nullgrain Mite
  "0v1": {
    onActivated: () => {},
  },
  // Hollowgut Isopod
  "0v2": {
    onEndTurn: () => {},
  },
  // Riftpouch Bilby
  "0v3": {
    onActivated: () => {},
  },
  // Obsidian Elemental
  "0v8": {
    onActivated: () => {},
  },
  // Absence Ticker
  "0vg": {
    onEndTurn: () => {},
  },
  // Nullwake Drifter
  "0vh": {
    onStateChanged: () => {},
  },
  // Riftglass Hermit
  "0vi": {
    onActivated: () => {},
  },
  // Famine Compass
  "0vj": {
    onEndTurn: () => {},
  },
  // Hollow Orbit
  "0vm": {
    onBeforeDamage: () => {},
  },
  // Keeper of Zero
  "0vn": {
    onEndTurn: () => {},
  },
  // Empty the Vessel
  "0v9": {
    onActivated: () => {},
  },
  // Resource Collapse
  "0va": {
    onActivated: () => {},
  },
  // Balanced Absence
  "0vb": {
    onActivated: () => {},
  },
  // Hunger Between
  "0vc": {
    onActivated: () => {},
  },
  // Narrow Escape
  "0vd": {
    onActivated: () => {},
  },
  // Scant Remains
  "0vo": {
    onActivated: () => {},
  },
  // Vanishing Reserve
  "0vp": {
    onActivated: () => {},
  },
  // Zero Hour
  "0vq": {
    onActivated: () => {},
  },
  // The Last Measure
  "0vr": {
    onActivated: () => {},
  },
  // Vacuum Shell
  "0ve": {
    onBeforeDamage: () => {},
  },
  // Empty Vault
  "0vs": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Hollowedge
  "0vf": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof VOID_CARDS>;
