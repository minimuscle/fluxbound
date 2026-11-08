import type { CARD_LIBRARY } from "./cardLibrary";
import type { CONDITIONS } from "./conditions";

export namespace Cards {
  export type Domain =
    | "FIRE"
    | "WATER"
    | "AIR"
    | "EARTH"
    | "LIGHT"
    | "DARK"
    | "LIFE"
    | "DEATH"
    | "AETHER"
    | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType =
    | "CREATURE"
    | "SPELL"
    | "PERMANENT"
    | "WEAPON"
    | "SHIELD"
    | "RUNE";
  export type CardKey = string;

  export type CardId = keyof typeof CARD_LIBRARY;

  export type Targets =
    | "self"
    | "creature"
    | "opponent"
    | "permanent"
    | "all"
    | "selfCreatures"
    | "opponentCreatures";

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

  export type FluxCost = {
    domain: Domain;
    amount: number;
  };

  type Triggered = {
    targets?: Targets[];
  } & (
    | { triggers: readonly Trigger[]; activations: number; activationCost: FluxCost }
    | { triggers?: readonly Exclude<Trigger, "onActivated">[]; activations?: never; activationCost?: never }
  );

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
    activationCost?: never;
    targets: Targets[];
  };

  export type Others = Base &
    Triggered & {
      type: Exclude<CardType, "CREATURE" | "WEAPON" | "SPELL">;
    };

  export type Card = Creature | Weapon | Spell | Others;

  export type CardDefinition = Record<string, Card>;
}

export const defineCardDefinition = <const TCards extends Cards.CardDefinition>(
  cards: TCards,
) => {
  for (const card of Object.values<Cards.Card>(cards)) {
    if (card.type === "SPELL") {
      if (!Number.isFinite(card.cost) || card.cost <= 0) {
        throw new Error(`${card.name} must have a positive spell flux cost`);
      }
    } else if (card.triggers?.some((trigger) => trigger === "onActivated")) {
      if (!card.activationCost || !Number.isFinite(card.activationCost.amount) || card.activationCost.amount <= 0) {
        throw new Error(`${card.name} must have a positive activation flux cost`);
      }
    }
  }
  return cards;
};

export const getCardActivationCost = (card: Cards.Card): Cards.FluxCost | undefined =>
  card.type === "SPELL" ? { domain: card.domain, amount: card.cost } : card.activationCost;

export const getCardTriggers = (card: Cards.Card): readonly Cards.Trigger[] =>
  card.type === "SPELL" ? ["onActivated"] : (card.triggers ?? []);
