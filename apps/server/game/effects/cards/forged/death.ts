import type { CardEffectRegistry, FORGED_DEATH_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_DEATH_EFFECTS = {
  // Tempered Death Rune
  "1d0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "DEATH", quantity: 2 });
    },
  },
  // Ossuary Shrew
  "1d1": {
    onCreatureDeath: () => {},
  },
  // Vigilkeeper Scarab
  "1d2": {
    onCreatureDeath: () => {},
  },
  // Shroudbloom Opossum
  "1d3": {
    onDeath: () => {},
  },
  // Riftmarrow Angler
  "1d4": {
    onActivated: () => {},
  },
  // Cinderwake Heron
  "1d6": {
    onEndTurn: () => {},
  },
  // Ascendant Garnet Elemental
  "1d8": {},
  // Gravegold Scarab
  "1dg": {
    onDeath: () => {},
  },
  // Veilbound Usher
  "1dh": {
    onActivated: () => {},
  },
  // Soulwax Familiar
  "1dl": {
    onDeath: () => {},
  },
  // Ossuary Sovereign
  "1dn": {
    onCreatureDeath: () => {},
  },
  // Sovereign Bequest
  "1d9": {
    onPlayed: () => {},
  },
  // Merciful Passing
  "1da": {
    onPlayed: () => {},
  },
  // Ossuary Toll
  "1db": {
    onPlayed: () => {},
  },
  // Stolen Tomorrow
  "1dc": {
    onPlayed: () => {},
  },
  // Silent Reaping
  "1dd": {
    onPlayed: () => {},
  },
  // Ossuary Dividend
  "1do": {
    onPlayed: () => {},
  },
  // Candlelit Vigil
  "1dp": {
    onPlayed: () => {},
  },
  // Legacy of Strength
  "1dq": {
    onPlayed: () => {},
  },
  // Lasting Eulogy
  "1dr": {
    onPlayed: () => {},
  },
  // Graveward Shroud
  "1de": {
    onBeforeDamage: () => {},
  },
  // Ossuary Shroud
  "1ds": {
    onCreatureDeath: () => {},
    onBeforeDamage: () => {},
  },
  // Requiem Hook
  "1df": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_DEATH_CARDS>;
