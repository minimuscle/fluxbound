import type { CardEffectRegistry, DEATH_CARDS } from "@fluxbound/schema";

export const DEATH_EFFECTS = {
  // Death Rune
  "0d0": {
    onEndTurn: () => {},
  },
  // Boneburrow Shrew
  "0d1": {
    onCreatureDeath: () => {},
  },
  // Wakekeeper Beetle
  "0d2": {
    onCreatureDeath: () => {},
  },
  // Shroudtail Opossum
  "0d3": {
    onDeath: () => {},
  },
  // Marrow Lanternfish
  "0d4": {
    onActivated: () => {},
  },
  // Pallbearer Heron
  "0d6": {
    onEndTurn: () => {},
  },
  // Garnet Elemental
  "0d8": {},
  // Coffinwheel Scarab
  "0dg": {
    onDeath: () => {},
  },
  // Ashen Usher
  "0dh": {
    onActivated: () => {},
  },
  // Waxbone Familiar
  "0dl": {
    onDeath: () => {},
  },
  // Gravemarch Regent
  "0dn": {
    onCreatureDeath: () => {},
  },
  // Final Bequest
  "0d9": {
    onActivated: () => {},
  },
  // Measured Passing
  "0da": {
    onActivated: () => {},
  },
  // Toll of the Fallen
  "0db": {
    onActivated: () => {},
  },
  // Borrowed Hours
  "0dc": {
    onActivated: () => {},
  },
  // Quiet Harvest
  "0dd": {
    onActivated: () => {},
  },
  // Funeral Dividend
  "0do": {
    onActivated: () => {},
  },
  // Dimming Vigil
  "0dp": {
    onActivated: () => {},
  },
  // Passing Strength
  "0dq": {
    onActivated: () => {},
  },
  // Unfinished Eulogy
  "0dr": {
    onActivated: () => {},
  },
  // Gravesoil Shroud
  "0de": {
    onBeforeDamage: () => {},
  },
  // Wakebound Rampart
  "0ds": {
    onCreatureDeath: () => {},
    onBeforeDamage: () => {},
  },
  // Epitaph Hook
  "0df": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof DEATH_CARDS>;
