import type { Tagged } from "type-fest";

export namespace Cards {
  export type Domain = "FIRE" | "WATER" | "AIR" | "EARTH" | "LIGHT" | "DARK" | "LIFE" | "DEATH" | "AETHER" | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
  export type CardKey = `${Expansion}_${Domain}_${CardType}_${string}`;
  export type CardId = Tagged<CardKey, "cardId">;

  export type Card = {
    domain: Domain;
    type: CardType;
    name: string;
    description: string;
    cost: number;
    price: number;
    triggers: object;
  };
  export type DomainList = Record<CardKey, Card>;
}
