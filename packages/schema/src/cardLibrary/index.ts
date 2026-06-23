import type { Cards } from "../cards";
import { FIRE_CARDS } from "./fire";

export const CARD_LIBRARY = {
  ...FIRE_CARDS,
} satisfies Record<Cards.CardId, Cards.Card>;
