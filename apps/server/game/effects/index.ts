import type { Game } from "@fluxbound/schema";
import { generate } from "./flux/generate";

export const effects: Game.EffectHandlers = {
  flux: {
    generate,
  },
};
