import type { Effects } from "@fluxbound/schema";
import { targetCondition } from "game/effects/target/condition";
import { targetDestroy } from "game/effects/target/destroy";
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
    destroy: targetDestroy,
    conditions: targetCondition,
  },
} as const;
