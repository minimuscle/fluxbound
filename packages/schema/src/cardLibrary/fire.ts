import type { Cards } from "../cards";

export const FIRE_CARDS: Cards.CardDefinition = {
  /***** RUNE - 1 *****/
  BASE_FIRE_PERMANENT_RUNE: {
    domain: "FIRE",
    type: "RUNE",
    name: "Fire Rune",
    description: "At the start of your turn, generate 1 Fire.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "flux.generate", args: { element: "FIRE", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_FIRE_CREATURE_RUBY_ELEMENTAL: {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ruby Elemental",
    description: "A living inferno bound in molten crystal.",
    cost: 10,
    price: 100,
    damage: 10,
    health: 6,
    triggers: {},
  },
  BASE_FIRE_CREATURE_EMBER: {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ember",
    description: "A wisp of flame",
    cost: 2,
    price: 50,
    damage: 1,
    health: 1,
    activations: 1,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              { stat: "damage", amount: 1 },
              { stat: "health", amount: 1 },
            ],
            cost: {
              element: "FIRE",
              amount: 2,
            },
          },
        },
      ],
    },
  },
  BASE_FIRE_CREATURE_PHOENIX: {
    domain: "FIRE",
    type: "CREATURE",
    name: "Phoenix",
    description: "Can be reborn from the ash",
    cost: 7,
    price: 69,
    damage: 6,
    health: 1,
    triggers: {},
  },

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/
  BASE_FIRE_SHIELD_HEAT_SHIELD: {
    domain: "FIRE",
    type: "SHIELD",
    name: "Heat Shield",
    description: "Reduces enemies attacks by 1",
    cost: 5,
    price: 60,
    triggers: {},
  },

  /***** WEAPON - 1 *****/
  // BASE_FIRE_WEAPON_FLAMING_SWORD: {
  //   element: "FIRE",
  //   type: "WEAPON",
  //   name: "Flaming Sword",
  //   description: "Its a sword, on fire",
  //   cost: 6,
  //   effect: "ATTACK",
  //   damage: 3,
  // },
};
