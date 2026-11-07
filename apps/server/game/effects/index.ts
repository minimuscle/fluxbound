import type {
  BASE_CARDS,
  CardEffectRegistry,
  CardEffects,
  Cards,
  FORGED_CARDS,
} from "@fluxbound/schema";
import { AETHER_EFFECTS } from "./cards/aether";
import { AIR_EFFECTS } from "./cards/air";
import { DARK_EFFECTS } from "./cards/dark";
import { DEATH_EFFECTS } from "./cards/death";
import { EARTH_EFFECTS } from "./cards/earth";
import { FIRE_EFFECTS } from "./cards/fire";
import { FORGED_AETHER_EFFECTS } from "./cards/forged/aether";
import { FORGED_AIR_EFFECTS } from "./cards/forged/air";
import { FORGED_DARK_EFFECTS } from "./cards/forged/dark";
import { FORGED_DEATH_EFFECTS } from "./cards/forged/death";
import { FORGED_EARTH_EFFECTS } from "./cards/forged/earth";
import { FORGED_FIRE_EFFECTS } from "./cards/forged/fire";
import { FORGED_LIFE_EFFECTS } from "./cards/forged/life";
import { FORGED_LIGHT_EFFECTS } from "./cards/forged/light";
import { FORGED_VOID_EFFECTS } from "./cards/forged/void";
import { FORGED_WATER_EFFECTS } from "./cards/forged/water";
import { LIFE_EFFECTS } from "./cards/life";
import { LIGHT_EFFECTS } from "./cards/light";
import { VOID_EFFECTS } from "./cards/void";
import { WATER_EFFECTS } from "./cards/water";

export const CARD_EFFECTS: Readonly<Record<Cards.CardId, CardEffects>> = {
  ...FIRE_EFFECTS,
  ...WATER_EFFECTS,
  ...EARTH_EFFECTS,
  ...AIR_EFFECTS,
  ...LIFE_EFFECTS,
  ...DEATH_EFFECTS,
  ...LIGHT_EFFECTS,
  ...DARK_EFFECTS,
  ...VOID_EFFECTS,
  ...AETHER_EFFECTS,
  ...FORGED_FIRE_EFFECTS,
  ...FORGED_WATER_EFFECTS,
  ...FORGED_EARTH_EFFECTS,
  ...FORGED_AIR_EFFECTS,
  ...FORGED_LIFE_EFFECTS,
  ...FORGED_DEATH_EFFECTS,
  ...FORGED_LIGHT_EFFECTS,
  ...FORGED_DARK_EFFECTS,
  ...FORGED_VOID_EFFECTS,
  ...FORGED_AETHER_EFFECTS,
} satisfies CardEffectRegistry<typeof BASE_CARDS & typeof FORGED_CARDS>;
