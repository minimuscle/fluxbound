import type { Cards } from "../../cards";
import { FORGED_AETHER_CARDS } from "./aether";
import { FORGED_AIR_CARDS } from "./air";
import { FORGED_DARK_CARDS } from "./dark";
import { FORGED_DEATH_CARDS } from "./death";
import { FORGED_EARTH_CARDS } from "./earth";
import { FORGED_FIRE_CARDS } from "./fire";
import { FORGED_LIFE_CARDS } from "./life";
import { FORGED_LIGHT_CARDS } from "./light";
import { FORGED_VOID_CARDS } from "./void";
import { FORGED_WATER_CARDS } from "./water";

export const FORGED_CARDS = {
  ...FORGED_FIRE_CARDS,
  ...FORGED_WATER_CARDS,
  ...FORGED_EARTH_CARDS,
  ...FORGED_AIR_CARDS,
  ...FORGED_LIFE_CARDS,
  ...FORGED_DEATH_CARDS,
  ...FORGED_LIGHT_CARDS,
  ...FORGED_DARK_CARDS,
  ...FORGED_VOID_CARDS,
  ...FORGED_AETHER_CARDS,
} as const satisfies Record<Cards.CardId, Cards.Card>;
