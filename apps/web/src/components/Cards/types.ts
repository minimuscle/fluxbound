import type { EFFECTS } from "components/Cards/effects";
import type { Tagged } from "type-fest";
import type { CARD_LIBRARY } from "./library";

export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
export type GameCardId = Tagged<"GameCardId", number>;

export type CardTrigger = "onPlay" | "onTurnStart" | "onTurnEnd" | "onDeath" | "onActivated" | "onAttack";

type DottedIds<T, Prefix extends string = ""> = T extends { run: (...args: any[]) => any }
  ? Prefix
  : {
      [K in keyof T & string]: DottedIds<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>;
    }[keyof T & string];

type EffectId = DottedIds<typeof EFFECTS>;

type GetByPath<T, P extends string> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? GetByPath<T[Head], Tail>
    : never
  : P extends keyof T
    ? T[P]
    : never;

type EffectArgs<Id extends EffectId> = GetByPath<typeof EFFECTS, Id> extends { run: (ctx: any, args: infer A) => any } ? A : never;

export type EffectRef = {
  [Id in EffectId]: EffectArgs<Id> extends never ? { id: Id } : { id: Id; args: EffectArgs<Id> };
}[EffectId];

export type TriggeredEffects = Partial<Record<CardTrigger, EffectRef[]>>;

export type CardDefinition = {
  element: Element;
  type: CardType;
  name: string;
  description: string;
  cost: number;
  price: number;
  triggers: TriggeredEffects;
  damage?: number;
  health?: number;
  target?: "CREATURE" | "PLAYER" | "ALIVE" | "PERMANENT";
  activations?: number;
};

// & (
//   | {
//       type: "CREATURE";
//       health: number;
//       damage: number;
//     }
//   | {
//       type: "SPELL";
//       target: "CREATURE" | "PLAYER" | "ALIVE" | "PERMANENT";
//       damage: number;
//     }
//   | {
//       type: "RUNE";
//       flux: {
//         amount: number;
//         element: Element;
//       };
//     }
//   | {
//       type: "WEAPON";
//       damage: number;
//     }
//   | {
//       type: "SHIELD";
//       shield_effect: {
//         type: "DAMAGE_REDUCTION";
//         amount: number;
//       };
//     }
// );

export type GameCard = {
  id: CardNames;
  gameCardId: GameCardId;
  damage?: number;
  health?: number;
  activations?: number;
};

export type CardNames = keyof typeof CARD_LIBRARY;
export const ELEMENTS = ["FIRE", "EARTH", "WATER", "AIR", "LIGHT", "DARK", "LIFE", "DEATH", "AETHER", "VOID"] as const;
export type Element = (typeof ELEMENTS)[number];
export type Expansion = "BASE";
export type CardKey = `${Expansion}_${Element}_${CardType}_${string}`;
