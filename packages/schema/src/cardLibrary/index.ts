import type { Cards } from "../cards";
import { FIRE_CARDS } from "./fire";

export const CARD_LIBRARY: Record<Cards.CardId, Cards.Card> = {
  ...FIRE_CARDS,
};
