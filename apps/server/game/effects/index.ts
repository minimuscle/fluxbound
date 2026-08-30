import type { Effects } from "@fluxbound/schema";
import { generate } from "./flux/generate";
import { modify } from "./stats/modify";
import { reduceDamage } from "./stats/reduce-damage";
import { modify as targetModify } from "./target/modify";

export const effects: Effects.EffectHandler = {
  flux: {
    generate,
  },
  stats: {
    modify,
    reduceDamage,
  },
  target: {
    modify: targetModify,
  },
} as const;
