import { z } from "zod";
import type { Cards } from "./cards";
import type { Game } from "./game";

export const defineEffect = <TArgumentSchema extends z.ZodTypeAny, TMetadata extends Record<string, unknown>>(
  config: {
    args: TArgumentSchema;
  } & TMetadata,
) => config;

export namespace Effects {
  export type Effect = typeof EFFECTS;
  export type EffectGroups = keyof Effect;
  export type EffectNames = {
    [TGroup in EffectGroups]: `${TGroup}.${keyof Effect[TGroup] & string}`;
  }[keyof Effect];

  export type EffectHandler = {
    [TGroup in EffectGroups]: {
      [TName in keyof Effect[TGroup] & string]: (
        context: {
          state: Game.GameState;
          cardId: Game.CardId;
          target?: Game.CardId;
          playerId?: Game.PlayerId;
        },
        args: Effect[TGroup][TName] extends { args: infer TArgs extends z.ZodTypeAny } ? z.infer<TArgs> : never,
      ) => Game.GameState;
    };
  };

  export type EffectArgumentsByParts<TGroup extends EffectGroups, TName extends keyof Effect[TGroup] & string> = Effect[TGroup][TName] extends {
    args: infer TArgs extends z.ZodTypeAny;
  }
    ? z.infer<TArgs>
    : never;
}

export const EFFECTS = {
  flux: {
    generate: defineEffect({
      args: z.object({
        domain: z.custom<Cards.Domain>(),
        amount: z.number(),
      }),
    }),
  },
  stats: {
    modify: {
      args: z.object({
        stats: z.array(z.object({ stat: z.enum(["health", "damage"]), amount: z.number() })),
        cost: z.object({
          domain: z.custom<Cards.Domain>(),
          amount: z.number(),
        }),
      }),
    },
    reduceDamage: defineEffect({
      args: z.object({
        amount: z.number(),
      }),
    }),
  },
} as const;
