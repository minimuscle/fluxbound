import { CARD_LIBRARY, type CardEffectRegistry, type FIRE_CARDS } from "@fluxbound/schema";
import { applyCondition } from "game/effects/effects/condition/apply";
import { removeCondition } from "game/effects/effects/condition/remove";
import { attackCreature } from "game/effects/effects/creature/attack";
import { createCreature } from "game/effects/effects/creature/create";
import { destroyCard } from "game/effects/effects/creature/destroy";
import { generateFlux } from "game/effects/effects/flux/generate";
import { attackPlayer } from "game/effects/effects/player/attack";
import { updateStats } from "game/effects/effects/stats/update";

export const FIRE_EFFECTS = {
  // Fire Rune
  "0f0": {
    onEndTurn: ({ player }) => {
      generateFlux({ player, domain: "FIRE", quantity: 1 });
    },
  },
  // Cinder Rat
  "0f1": {},
  // Phoenix
  "0f2": {
    onDeath: ({ player }) => {
      createCreature({ player, cardId: "0f3" });
    },
  },
  // Ash
  "0f3": {
    onActivated: ({ player, card }) => {
      destroyCard({ player, gameCardId: card.id });
      createCreature({ player, cardId: "0f2" });
    },
  },
  // Blazehorn Ram
  "0f4": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 1,
          health: (card.health ?? 1) - 1,
        },
      });
      if ((card.health ?? 1) <= 0) {
        destroyCard({ player, gameCardId: card.id });
      }
    },
  },
  // Steamforged Drake
  "0f5": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 2,
        },
      });
      applyCondition({
        player,
        gameCardId: card.id,
        condition: {
          id: "enhanced",
          length: 0,
        },
      });
    },
    onEndTurn: ({ player, card }) => {
      if (card.conditions?.some((condition) => condition.id === "enhanced" && condition.length === 0)) {
        updateStats({
          player,
          gameCardId: card.id,
          statOptions: {
            damage: (card.damage ?? 0) - 2,
          },
        });
      }
    },
  },
  // Ember
  "0f7": {
    onActivated: ({ player, card }) => {
      updateStats({
        player,
        gameCardId: card.id,
        statOptions: {
          damage: (card.damage ?? 0) + 2,
        },
      });
    },
  },
  // Ruby Elemental
  "0f8": {},
  // Kilnback Skink
  "0fi": {
    onEndTurn: ({ player, card }) => {
      console.log(card);
      if ((card.health ?? 0) < (card.maxHealth ?? 0) && !card.conditions?.some((condition) => condition.id === "enhanced")) {
        updateStats({
          player,
          gameCardId: card.id,
          statOptions: {
            damage: (card.damage ?? 0) + 2,
          },
        });
        applyCondition({
          player,
          gameCardId: card.id,
          condition: {
            id: "enhanced",
            length: 999,
          },
        });
      }

      // Remove bonus at end of condition
      if ((card.health ?? 0) >= (card.maxHealth ?? 0) && card.conditions?.some((condition) => condition.id === "enhanced")) {
        updateStats({
          player,
          gameCardId: card.id,
          statOptions: {
            damage: Math.max((card.damage ?? 0) - 2, 0),
          },
        });
        removeCondition({ player, gameCardId: card.id, conditionId: "enhanced" });
      }
    },
  },
  // Coalcoil Pangolin
  "0fj": {
    onDamaged: ({ player, damage }) => {
      if (damage) {
        generateFlux({ player, domain: "FIRE", quantity: damage });
      }
    },
  },
  // Glassmane Jackal
  "0fl": {
    onActivated: ({ state, player, card, target }) => {
      target?.forEach((attack) => {
        if (attack === "opponent") return;
        const numberOfFireCreatures = player.field.filter(
          (creatures) => CARD_LIBRARY[creatures.cardId].type === "CREATURE" && CARD_LIBRARY[creatures.cardId].domain === "FIRE",
        ).length;
        const creature = state.player1.field.find(({ id }) => id === attack) ?? state.player2.field.find(({ id }) => id === attack);
        if (creature) {
          console.log("number of fire creatures: ", numberOfFireCreatures);
          attackCreature({ state, attacker: card, gameCardId: creature.id, damage: numberOfFireCreatures });
        }
      });
    },
  },
  // Fireball
  "0f9": {
    onPlayed: ({ state, card, target, opponent }) => {
      target?.forEach((attack) => {
        if (attack === "opponent") {
          attackPlayer({ state, player: opponent, attacker: card, damage: 3 });
          attackPlayer({ state, player: opponent, attacker: card, damage: 3 });
          attackPlayer({ state, player: opponent, attacker: card, damage: 3 });
        } else if (typeof attack === "string") {
          for (const _hit of [1, 2, 3]) {
            const creature = [...state.player1.field, ...state.player2.field].find(({ id }) => id === attack);
            if (!creature) break;
            attackCreature({ state, gameCardId: creature.id, attacker: card, damage: 3 });
          }
        }
      });
    },
  },
  // Wildfire
  "0fa": {
    onPlayed: ({ state, card, opponent }) => {
      const creatures = opponent.field.filter((creature) => CARD_LIBRARY[creature.cardId].type === "CREATURE");
      for (const creature of creatures) {
        attackCreature({ state, gameCardId: creature.id, attacker: card, damage: 3 });
      }
    },
  },
  // Molten Rage
  "0fb": {
    onPlayed: ({ player, opponent, target }) => {
      for (const owner of [player, opponent]) {
        for (const creature of owner.field.filter((candidate) => target?.includes(candidate.id))) {
          if (CARD_LIBRARY[creature.cardId].type !== "CREATURE") continue;
          updateStats({ player: owner, gameCardId: creature.id, statOptions: { damage: (creature.damage ?? 0) + 5 } });
        }
      }
    },
  },
  // Flash Ignition
  "0fc": {
    onPlayed: ({ player, opponent, target }) => {
      target?.forEach((cardTarget) => {
        if (typeof cardTarget !== "string" || cardTarget === "opponent") return;
        for (const owner of [player, opponent]) {
          const permanent = owner.field.find(
            (candidate) => candidate.id === cardTarget && ["PERMANENT", "WEAPON", "SHIELD", "RUNE"].includes(CARD_LIBRARY[candidate.cardId].type),
          );
          if (permanent) {
            destroyCard({ player: owner, gameCardId: permanent.id });
            break;
          }
        }
      });
    },
  },
  // Burn
  // Skipped: The existing burning condition deals 1 damage per turn, rather than 2.
  "0fd": {
    onPlayed: () => {},
  },
  // Banked Embers
  // Skipped: Needs a delayed next-turn flux effect.
  "0fo": {
    onPlayed: () => {},
  },
  // Flashover Pact
  "0fp": {
    onPlayed: ({ state, player, opponent, card, target }) => {
      const creature = opponent.field.find((candidate) => target?.includes(candidate.id) && CARD_LIBRARY[candidate.cardId].type === "CREATURE");
      if (!creature) return;
      attackPlayer({ state, player, attacker: card, damage: 3 });
      attackCreature({ state, attacker: card, gameCardId: creature.id, damage: 5 });
    },
  },
  // Heat Exchange
  // Skipped: Needs selection of an allied creature and an enemy creature in one cast.
  "0fq": {
    onPlayed: () => {},
  },
  // Last Spark
  "0fr": {
    onPlayed: ({ state, player, opponent, card, target }) => {
      const creature = opponent.field.find((candidate) => target?.includes(candidate.id) && CARD_LIBRARY[candidate.cardId].type === "CREATURE");
      if (!creature) return;
      attackCreature({ state, attacker: card, gameCardId: creature.id, damage: player.flux.FIRE === 0 ? 5 : 3 });
    },
  },
  // Wall of Fire
  // Skipped: Needs normal combat to dispatch attacks through shield effects.
  "0fe": {
    onDamaged: () => {},
    onBeforeDamage: () => {},
  },
  // Heat Shield
  // Skipped: Needs an attack reduction effect and shield integration in normal combat.
  "0ff": {
    onBeforeDamage: () => {},
  },
  // Flametongue Blade
  // Skipped: Needs continuous-state trigger dispatch for its flux-dependent bonus.
  "0fg": {
    onStateChanged: () => {},
  },
  "0fh": {},
} satisfies CardEffectRegistry<typeof FIRE_CARDS>;
