import type { Cards } from "../cards";
import { FIRE_CARDS } from "./fire";
import { WATER_CARDS } from "./water";

const CARD_LIBRARY_ENTRIES = {
  ...FIRE_CARDS,
  ...WATER_CARDS,
} as const satisfies Record<Cards.CardId, Cards.Card>;

export type CardLibraryKey = keyof typeof CARD_LIBRARY_ENTRIES;
export const CARD_LIBRARY: Record<Cards.CardId, Cards.Card> =
  CARD_LIBRARY_ENTRIES;
