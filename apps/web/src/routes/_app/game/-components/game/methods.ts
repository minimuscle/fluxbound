import type { Cards } from "@fluxbound/schema";
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

export const getDomainIcon = (domain: Cards.Domain) => {
  switch (domain) {
    case "FIRE":
      return Fire;
    case "WATER":
      return Water;
    case "AIR":
      return Air;
    case "EARTH":
      return Earth;
    case "LIGHT":
      return Light;
    case "DARK":
      return Dark;
    case "LIFE":
      return Life;
    case "DEATH":
      return Death;
    case "AETHER":
      return Aether;
    case "VOID":
      return Void;
    default:
      return Void;
  }
};
