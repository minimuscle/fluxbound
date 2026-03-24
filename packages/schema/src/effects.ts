import { z } from "zod";
import type { Cards } from "./cards";

// oxlint-disable-next-line typescript/no-empty-object-type
export const defineEffect = <TArgumentSchema extends z.ZodTypeAny, TMetadata extends Record<string, unknown> = {}>(
  config: {
    arguments: TArgumentSchema;
  } & TMetadata,
) => config;

export const EFFECTS = {
  flux: {
    generate: defineEffect({
      arguments: z.object({
        domain: z.custom<Cards.Domain>(),
        amount: z.number(),
      }),
    }),
  },
  stats: {
    modify: defineEffect({
      arguments: z.object({
        stats: z.array(z.object({ stat: z.enum(["health", "damage"]), amount: z.number() })),
        cost: z.object({
          domain: z.custom<Cards.Domain>(),
          amount: z.number(),
        }),
      }),
    }),
  },
} as const;
