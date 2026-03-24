import type { Game } from "@fluxbound/schema";
import { generate } from "./flux/generate";
import { modify } from "./stats/modify";

export const effects: Game.EffectHandlers = {
  flux: {
    generate,
  },
  stats: {
    modify,
  },
} as const;
