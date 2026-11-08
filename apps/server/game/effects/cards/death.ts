import type { CardEffectRegistry, DEATH_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const DEATH_EFFECTS = {
  // Death Rune
  "0d0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "DEATH", quantity: 1 });
    },
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
    onPlayed: () => {},
  },
  // Measured Passing
  "0da": {
    onPlayed: () => {},
  },
  // Toll of the Fallen
  "0db": {
    onPlayed: () => {},
  },
  // Borrowed Hours
  "0dc": {
    onPlayed: () => {},
  },
  // Quiet Harvest
  "0dd": {
    onPlayed: () => {},
  },
  // Funeral Dividend
  "0do": {
    onPlayed: () => {},
  },
  // Dimming Vigil
  "0dp": {
    onPlayed: () => {},
  },
  // Passing Strength
  "0dq": {
    onPlayed: () => {},
  },
  // Unfinished Eulogy
  "0dr": {
    onPlayed: () => {},
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
