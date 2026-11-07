import type { CardEffectRegistry, FORGED_FIRE_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/generateFlux";

export const FORGED_FIRE_EFFECTS = {
  // Tempered Fire Rune
  "1f0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "FIRE", quantity: 2 });
    },
  },
  // Sootfang Fox
  "1f1": {},
  // Dawnfire Phoenix
  "1f2": {
    onDeath: () => {},
  },
  // Everglow Ash
  "1f3": {
    onActivated: () => {},
  },
  // Furnacehorn Ram
  "1f4": {
    onActivated: () => {},
  },
  // Mistbrand Wyvern
  "1f5": {
    onActivated: () => {},
  },
  // Heartflame
  "1f7": {
    onActivated: () => {},
  },
  // Ascendant Ruby Elemental
  "1f8": {},
  // Hearthscale Salamander
  "1fi": {
    onEndTurn: () => {},
  },
  // Forgeplate Pangolin
  "1fj": {
    onDamaged: () => {},
  },
  // Cinderprism Jackal
  "1fl": {
    onActivated: () => {},
  },
  // Starfire Bolt
  "1f9": {
    onActivated: () => {},
  },
  // Crownfire
  "1fa": {
    onActivated: () => {},
  },
  // Crucible Fury
  "1fb": {
    onActivated: () => {},
  },
  // Solar Detonation
  "1fc": {
    onActivated: () => {},
  },
  // Cinderbrand
  "1fd": {
    onActivated: () => {},
  },
  // Afterglow Reserve
  "1fo": {
    onActivated: () => {},
  },
  // Inferno Pact
  "1fp": {
    onActivated: () => {},
  },
  // Crucible Exchange
  "1fq": {
    onActivated: () => {},
  },
  // Final Flare
  "1fr": {
    onActivated: () => {},
  },
  // Crownfire Rampart
  "1fe": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Crucible Rampart
  "1ff": {
    onBeforeDamage: () => {},
  },
  // Solarbrand
  "1fg": {
    onStateChanged: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_FIRE_CARDS>;
