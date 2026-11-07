import type { CardEffectRegistry, FORGED_LIGHT_CARDS } from "@fluxbound/schema";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_LIGHT_EFFECTS = {
  // Tempered Light Rune
  "1li0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "LIGHT", quantity: 2 });
    },
  },
  // Dawnglass Tortoise
  "1li2": {
    onBeforeDamage: () => {},
  },
  // Beaconmask Coati
  "1li4": {
    onActivated: () => {},
  },
  // Solarcrest Stag
  "1li5": {
    onActivated: () => {},
  },
  // Ascendant Citrine Elemental
  "1li8": {},
  // Sunward Sentry
  "1lig": {
    onBeforeDamage: () => {},
  },
  // Aurora Chronicler
  "1lih": {
    onActivated: () => {},
  },
  // Twilight Herald
  "1lii": {
    onActivated: () => {},
  },
  // Prismatic Witness
  "1lik": {
    onActivated: () => {},
  },
  // Radiant Arbiter
  "1lim": {
    onActivated: () => {},
  },
  // Crown of the Zenith
  "1lin": {
    onEndTurn: () => {},
  },
  // Guiding Star
  "1li9": {
    onActivated: () => {},
  },
  // Unclouded Horizon
  "1lia": {
    onActivated: () => {},
  },
  // Mirrorbright Reversal
  "1lib": {
    onActivated: () => {},
  },
  // Radiant Verdict
  "1lic": {
    onActivated: () => {},
  },
  // Vigil of Dawn
  "1lid": {
    onActivated: () => {},
  },
  // Certain Sunrise
  "1lio": {
    onActivated: () => {},
  },
  // Daybreak Sanctuary
  "1lip": {
    onActivated: () => {},
  },
  // Read the Radiance
  "1liq": {
    onActivated: () => {},
  },
  // Unbroken Radiance
  "1lir": {
    onActivated: () => {},
  },
  // Zenith Aegis
  "1lie": {
    onStartTurn: () => {},
    onBeforeDamage: () => {},
  },
  // Dawnglass Bastion
  "1lis": {
    onBeforeDamage: () => {},
  },
  // Zenith Needle
  "1lif": {
    onBeforeAttack: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_LIGHT_CARDS>;
