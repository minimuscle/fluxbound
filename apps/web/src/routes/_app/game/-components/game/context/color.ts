import type { Cards } from "@fluxbound/schema";

export const DOMAIN_COLOR: Record<Cards.Domain, string> = {
  FIRE: "#AE0001",
  WATER: "#004298",
  AIR: "#86DCFF",
  EARTH: "#815A1F",
  LIGHT: "#FFF9DE",
  DARK: "#626262",
  LIFE: "#87B820",
  DEATH: "#6F1AE2",
  AETHER: "#EDE020",
  VOID: "#E82880",
};

export const DOMAIN_BACKGROUND_COLOR: Record<Cards.Domain, string> = {
  FIRE: "#692323",
  WATER: "#004298", //TODO: update the other colours to be backgrounds
  AIR: "#86DCFF",
  EARTH: "#815A1F",
  LIGHT: "#FFF9DE",
  DARK: "#626262",
  LIFE: "#87B820",
  DEATH: "#6F1AE2",
  AETHER: "#EDE020",
  VOID: "#E82880",
};
