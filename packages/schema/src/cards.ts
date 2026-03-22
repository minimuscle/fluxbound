import type { Tagged } from "type-fest";

export namespace Cards {
  export type Domain = "FIRE" | "WATER" | "AIR" | "EARTH" | "LIGHT" | "DARK" | "LIFE" | "DEATH" | "AETHER" | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
  export type CardKey = `${Expansion}_${Domain}_${CardType}_${string}`;
  export type CardId = Tagged<CardKey, "cardId">;

   type Base = {
    domain: Domain;
    name: string;
    description: string;
    cost: number;
    price: number;
    triggers: object;
  };

  type Creature = Base & {
    type: "CREATURE";
    damage: number;
    health: number;
    activations: number;
  } 

  type Weapon = Base & {
    type: "WEAPON";
    damage: number;
  }

  type Others = Base & {
    type: Omit<CardType, 'CREATURE' | 'WEAPON'>;
  }



  export type CardDefinition = Record<CardKey, Creature | Weapon | Others>;
}
