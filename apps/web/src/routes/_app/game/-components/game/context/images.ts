import { type CardLibraryKey, type Cards } from "@fluxbound/schema";
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
import CinderRat from "assets/images/cards/fire/cinder_rat.png";
import Ember from "assets/images/cards/fire/ember.jpeg";
import Fireball from "assets/images/cards/fire/fireball.png";
import RubyElemental from "assets/images/cards/fire/ruby_elemental.png";
import Rune from "assets/images/cards/fire/rune.png";
import WallOfFire from "assets/images/cards/fire/wall_of_fire.png";
import Wildfire from "assets/images/cards/fire/wildfire.png";
import CoralGuardian from "assets/images/cards/water/coral_guardian.png";
import FreezeRay from "assets/images/cards/water/freeze_ray.png";
import TidalWave from "assets/images/cards/water/tidal_wave.png";
import WaterRune from "assets/images/cards/water/water_rune.png";

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

const CARD_IMAGE_ENTRIES = {
  "0f0": Rune,
  "0f1": CinderRat,
  "0f2": Ember,
  "0f3": Ember,
  "0f4": Ember,
  "0f5": Ember,
  "0f6": Ember,
  "0f7": Ember,
  "0f8": RubyElemental,
  "0f9": Fireball,
  "0fa": Wildfire,
  "0fb": Ember,
  "0fc": Ember,
  "0fd": Ember,
  "0fe": WallOfFire,
  "0ff": Ember,
  "0fg": Ember,
  "0fh": Ember,
  "0w0": WaterRune,
  "0w1": Water,
  "0w2": CoralGuardian,
  "0w3": Water,
  "0w4": Water,
  "0w5": Water,
  "0w6": Water,
  "0w7": TidalWave,
  "0w8": FreezeRay,
  "0w9": Water,
} satisfies Record<CardLibraryKey, string>;

export const CARD_IMAGE: Record<Cards.CardId, string> = CARD_IMAGE_ENTRIES;
