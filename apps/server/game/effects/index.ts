import type { Effects } from "@fluxbound/schema";
import { generate } from "./flux/generate";
import { modify } from "./stats/modify";

export const effects: Effects.EffectHandler = {
  flux: {
    generate,
  },
  stats: {
    modify,
    // reduceDamage,
  },
} as const;
