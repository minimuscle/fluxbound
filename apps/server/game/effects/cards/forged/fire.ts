import { CARD_LIBRARY, type CardEffectRegistry, type FORGED_FIRE_CARDS } from "@fluxbound/schema";
import { FIRE_EFFECTS } from "../fire";
import { attackCreature } from "game/effects/effects/creature/attack";
import { createCreature } from "game/effects/effects/creature/create";
import { destroyCreature } from "game/effects/effects/creature/destroy";
import { generateFlux } from "game/effects/effects/flux/generate";

export const FORGED_FIRE_EFFECTS = {
  // Tempered Fire Rune
  "1f0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "FIRE", quantity: 2 });
    },
  },
  // Sootfang Fox
  "1f1": {},
  // Dawnfire Phoenix
  "1f2": {
    onDeath: ({ player }) => {
      createCreature({ player, cardId: "1f3" });
    },
  },
  // Everglow Ash
  "1f3": {
    onActivated: ({ player, card }) => {
      destroyCreature({ player, gameCardId: card.id });
      createCreature({ player, cardId: "1f2" });
    },
  },
  // Furnacehorn Ram
  // Skipped: Needs a delayed end-of-turn stat change after activation.
  "1f4": {
    onActivated: () => {},
  },
  // Mistbrand Wyvern
  // Skipped: Needs reliable expiry of a temporary attack bonus.
  "1f5": {
    onActivated: () => {},
  },
  // Heartflame
  "1f7": FIRE_EFFECTS["0f7"],
  // Ascendant Ruby Elemental
  "1f8": {},
  // Hearthscale Salamander
  // Skipped: Needs an after-combat step to remove its temporary attack bonus.
  "1fi": {
    onEndTurn: () => {},
  },
  // Forgeplate Pangolin
  // Skipped: Needs once-per-turn tracking of surviving an enemy attack.
  "1fj": {
    onDamaged: () => {},
  },
  // Cinderprism Jackal
  "1fl": {
    onActivated: ({ state, player, opponent, card, target }) => {
      const hasAnotherFireCreature = player.field.some(
        (candidate) => candidate.id !== card.id && CARD_LIBRARY[candidate.cardId].type === "CREATURE" && CARD_LIBRARY[candidate.cardId].domain === "FIRE",
      );
      if (!hasAnotherFireCreature) return;
      const creature = opponent.field.find((candidate) => target?.includes(candidate.id) && CARD_LIBRARY[candidate.cardId].type === "CREATURE");
      if (!creature) return;
      attackCreature({ state, attacker: card, gameCardId: creature.id, damage: 2 });
    },
  },
  // Starfire Bolt
  "1f9": FIRE_EFFECTS["0f9"],
  // Crownfire
  "1fa": {
    onPlayed: ({ state, card }) => {
      const creatures = [...state.player1.field, ...state.player2.field].filter((creature) => CARD_LIBRARY[creature.cardId].type === "CREATURE");
      for (const creature of creatures) {
        attackCreature({ state, attacker: card, gameCardId: creature.id, damage: 3 });
      }
    },
  },
  // Crucible Fury
  "1fb": FIRE_EFFECTS["0fb"],
  // Solar Detonation
  // Skipped: Needs permanent targeting and a permanent destruction effect.
  "1fc": {
    onPlayed: () => {},
  },
  // Cinderbrand
  // Skipped: Needs a 2-damage recurring effect and a player healing effect.
  "1fd": {
    onPlayed: () => {},
  },
  // Afterglow Reserve
  // Skipped: Needs a delayed next-turn flux effect.
  "1fo": {
    onPlayed: () => {},
  },
  // Inferno Pact
  "1fp": FIRE_EFFECTS["0fp"],
  // Crucible Exchange
  // Skipped: Needs selection of an allied creature and an enemy creature in one cast.
  "1fq": {
    onPlayed: () => {},
  },
  // Final Flare
  "1fr": FIRE_EFFECTS["0fr"],
  // Crownfire Rampart
  // Skipped: Needs normal combat to dispatch attacks through shield effects.
  "1fe": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Crucible Rampart
  // Skipped: Needs an attack reduction effect and shield integration in normal combat.
  "1ff": {
    onBeforeDamage: () => {},
  },
  // Solarbrand
  // Skipped: Needs continuous-state trigger dispatch for its flux-dependent bonus.
  "1fg": {
    onStateChanged: () => {},
  },
} satisfies CardEffectRegistry<typeof FORGED_FIRE_CARDS>;
