import type { Tagged } from "type-fest";
import type { CONDITIONS } from "./conditions";

export namespace Cards {
  export type Domain = "FIRE" | "WATER" | "AIR" | "EARTH" | "LIGHT" | "DARK" | "LIFE" | "DEATH" | "AETHER" | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
  export type CardKey = string;
  export type CardId<TCardKey extends CardKey = CardKey> = Tagged<TCardKey, "cardId"> | TCardKey;

  export type Targets = "self" | "creature" | "opponent" | "permanent" | "all" | "selfCreatures" | "opponentCreatures";

  export type Conditions = (typeof CONDITIONS)[number];

  export type Trigger =
    | "onActivated"
    | "onPlayed"
    | "onStartTurn"
    | "onEndTurn"
    | "onDeath"
    | "onCreatureDeath"
    | "onBeforeAttack"
    | "onBeforeDamage"
    | "onDamaged"
    | "onStateChanged";

  type Base = {
    domain: Domain;
    name: string;
    description: string;
    cost: number;
    price: number;
  };

  type Triggered = {
    triggers?: readonly Trigger[];
    activations?: number;
    targets?: Targets[];
  };

  export type Creature = Base &
    Triggered & {
      type: "CREATURE";
      damage: number;
      health: number;
      conditions?: Conditions[];
    };

  export type Weapon = Base &
    Triggered & {
      type: "WEAPON";
      damage: number;
    };

  export type Spell = Base & {
    type: "SPELL";
    triggers?: never;
    activations?: never;
    targets: Targets[];
  };

  export type Others = Base &
    Triggered & {
      type: Exclude<CardType, "CREATURE" | "WEAPON" | "SPELL">;
    };

  export type Card = Creature | Weapon | Spell | Others;

  export type CardDefinition = Record<string, Card>;
}

export const defineCardDefinition = <const TCards extends Cards.CardDefinition>(cards: TCards) => cards;

export const getCardTriggers = (card: Cards.Card): readonly Cards.Trigger[] => (card.type === "SPELL" ? ["onActivated"] : (card.triggers ?? []));
