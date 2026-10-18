import type { Cards } from "../cards";
import { AETHER_CARDS } from "./aether";
import { AIR_CARDS } from "./air";
import { DARK_CARDS } from "./dark";
import { DEATH_CARDS } from "./death";
import { EARTH_CARDS } from "./earth";
import { FIRE_CARDS } from "./fire";
import { FORGED_CARDS } from "./forged";
import { LIFE_CARDS } from "./life";
import { LIGHT_CARDS } from "./light";
import { VOID_CARDS } from "./void";
import { WATER_CARDS } from "./water";

export { FORGED_CARDS };

export const BASE_CARDS = {
  ...FIRE_CARDS,
  ...WATER_CARDS,
  ...EARTH_CARDS,
  ...AIR_CARDS,
  ...LIFE_CARDS,
  ...DEATH_CARDS,
  ...LIGHT_CARDS,
  ...DARK_CARDS,
  ...VOID_CARDS,
  ...AETHER_CARDS,
} as const satisfies Record<Cards.CardId, Cards.Card>;

export const CARD_LIBRARY = { ...BASE_CARDS, ...FORGED_CARDS };
