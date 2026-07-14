import { CARD_LIBRARY, type Cards } from "@fluxbound/schema";
import Aether from "assets/images/domains/aether.webp";
import Air from "assets/images/domains/air.webp";
import Dark from "assets/images/domains/dark.webp";
import Death from "assets/images/domains/death.webp";
import Earth from "assets/images/domains/earth.webp";
import Fire from "assets/images/domains/fire.webp";
import Life from "assets/images/domains/life.webp";
import Light from "assets/images/domains/light.webp";
import Void from "assets/images/domains/void.webp";
import Water from "assets/images/domains/water.webp";

/** Card Imports */
import Ember from "assets/images/cards/fire/ember.jpeg";

export const DOMAIN_ICON: Record<Cards.Domain, string> = {
  FIRE: Fire,
  WATER: Water,
  AIR: Air,
  EARTH: Earth,
  LIGHT: Light,
  DARK: Dark,
  LIFE: Life,
  DEATH: Death,
  AETHER: Aether,
  VOID: Void,
};

export const CARD_IMAGE: Record<keyof typeof CARD_LIBRARY, string> = {
  "0f0": Ember,
  "0f1": Ember,
  "0f2": Ember,
  "0f3": Ember,
  "0f4": Ember,
  "0f5": Ember,
  "0f6": Ember,
  "0f7": Ember,
  "0f8": Ember,
  "0fe": Ember,
};
