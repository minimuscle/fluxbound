import type { CardEffectRegistry, FORGED_DEATH_CARDS } from "@fluxbound/schema";

export const FORGED_DEATH_EFFECTS = {
  // Tempered Death Rune
  "1d0": {
    onEndTurn: () => {},
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
    onActivated: () => {},
  },
  // Merciful Passing
  "1da": {
    onActivated: () => {},
  },
  // Ossuary Toll
  "1db": {
    onActivated: () => {},
  },
  // Stolen Tomorrow
  "1dc": {
    onActivated: () => {},
  },
  // Silent Reaping
  "1dd": {
    onActivated: () => {},
  },
  // Ossuary Dividend
  "1do": {
    onActivated: () => {},
  },
  // Candlelit Vigil
  "1dp": {
    onActivated: () => {},
  },
  // Legacy of Strength
  "1dq": {
    onActivated: () => {},
  },
  // Lasting Eulogy
  "1dr": {
    onActivated: () => {},
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
