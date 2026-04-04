import type { Tagged } from "type-fest";
import type { z } from "zod";
import type { Effects } from "./effects";

export namespace Cards {
  export type Domain = "FIRE" | "WATER" | "AIR" | "EARTH" | "LIGHT" | "DARK" | "LIFE" | "DEATH" | "AETHER" | "VOID";
  export type Expansion = "BASE" | "FORGED";
  export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
  export type CardKey = `${Expansion}_${Domain}_${CardType}_${string}`;
  export type CardId = Tagged<CardKey, "cardId">;

  export type TriggerTypes = "onTurnEnd" | "onActivated" | "onAttacked" | "onDeath";

  type SplitTriggerEffectIds<TName extends Effects.EffectNames> = TName extends `${infer TGroup}.${infer TName}` ? [TGroup, TName] : never;
  type EffectArgs<TEffectName extends Effects.EffectNames> =
    SplitTriggerEffectIds<TEffectName> extends [infer TGroup, infer TName]
      ? TGroup extends Effects.EffectGroups
        ? TName extends keyof Effects.Effect[TGroup]
          ? Effects.Effect[TGroup][TName] extends { args: infer TArguments extends z.ZodTypeAny }
            ? z.infer<TArguments>
            : never
          : never
        : never
      : never;
  export type Trigger = {
    [TName in Effects.EffectNames]: {
      id: TName;
      args: EffectArgs<TName>;
    };
  }[Effects.EffectNames];

  type Base = {
    domain: Domain;
    name: string;
    description: string;
    cost: number;
    price: number;
    triggers: Partial<Record<TriggerTypes, Trigger[]>>;
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
