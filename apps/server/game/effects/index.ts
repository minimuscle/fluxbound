import type { Effects } from "@fluxbound/schema";
import { generate } from "./flux/generate";
import { modify } from "./stats/modify";
import { reduceDamage } from "./stats/reduce-damage";

export const effects: Effects.EffectHandler = {
  flux: {
    generate,
  },
  stats: {
    modify,
    reduceDamage,
  },
} as const;
