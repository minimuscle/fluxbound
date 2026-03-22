import type { Tagged } from "type-fest";
import type { z } from "zod";
import { EFFECTS } from "./effects";

export namespace Cards {
  export type Domain = "FIRE" | "WATER" | "AIR" | "EARTH" | "LIGHT" | "DARK" | "LIFE" | "DEATH" | "AETHER" | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
  export type CardKey = `${Expansion}_${Domain}_${CardType}_${string}`;
  export type CardId = Tagged<CardKey, "cardId">;

  export type TriggerTypes = "onTurnEnd" | "onActivated" | "onAttacked" | "onDeath";
  export type EffectsTree = typeof EFFECTS;
  type TriggerEffectId = {
    [TGroup in keyof EffectsTree & string]: {
      [TName in keyof (typeof EFFECTS)[TGroup] & string]: `${TGroup}.${TName}`;
    }[keyof (typeof EFFECTS)[TGroup] & string];
  }[keyof EffectsTree];

  type SplitTriggerEffectId<TId extends string> = TId extends `${infer TGroup}.${infer TName}` ? [TGroup, TName] : never;
  type TriggerEffectArgs<TId extends TriggerEffectId> =
    SplitTriggerEffectId<TId> extends [infer TGroup, infer TName]
      ? TGroup extends keyof EffectsTree
        ? TName extends keyof EffectsTree[TGroup]
          ? EffectsTree[TGroup][TName] extends { arguments: infer TArguments extends z.ZodTypeAny }
            ? z.infer<TArguments>
            : never
          : never
        : never
      : never;

  export type Trigger<TId extends TriggerEffectId = TriggerEffectId> = {
    id: TId;
    args: TriggerEffectArgs<TId>;
  };

  export type AnyTrigger = {
    [TId in TriggerEffectId]: Trigger<TId>;
  }[TriggerEffectId];

  export type Triggers = Partial<Record<TriggerTypes, AnyTrigger[]>>;

  type Base = {
    domain: Domain;
    name: string;
    description: string;
    cost: number;
    price: number;
    triggers: Triggers;
  };

  export type Creature = Base & {
    type: "CREATURE";
    damage: number;
    health: number;
    activations: number;
  };

  export type Weapon = Base & {
    type: "WEAPON";
    damage: number;
  };

  export type Others = Base & {
    type: Omit<CardType, "CREATURE" | "WEAPON">;
  };

  export type Card = Creature | Weapon | Others;

  export type CardDefinition = Record<CardKey, Card>;
}
