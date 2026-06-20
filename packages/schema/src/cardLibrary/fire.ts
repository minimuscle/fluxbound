import { defineCardDefinition } from "../cards";

export const FIRE_CARDS = defineCardDefinition({
  /***** RUNE - 1 *****/
  "0f0": {
    domain: "FIRE",
    type: "RUNE",
    name: "Fire Rune",
    description: "At the start of your turn, generate 1 Fire.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "flux.generate", args: { domain: "FIRE", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  "0f1": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Cinder Rat",
    description: "",
    cost: 1,
    price: 60,
    damage: 2,
    health: 1,
    triggers: {},
  },
  "0f2": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Phoenix",
    description: "Can be reborn from the ash",
    cost: 7,
    price: 100,
    damage: 7,
    health: 1,
    triggers: {
      onDeath: [
        {
          id: "creature.create",
          args: {
            cardId: "0f3",
          },
        },
      ],
    },
  },
  "0f3": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ash",
    description: "1F - Rebirth - Turn into a phoenix",
    cost: 7,
    price: 100,
    damage: 0,
    health: 4,
    triggers: {
      onActivated: [
        {
          id: "creature.swap",
          args: {
            cardId: "0f2",
          },
        },
      ],
    },
  },
  "0f4": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Blazehorn Ram",
    description: "1F - Overheat: At the end of the turn, deal +1/-1",
    cost: 3,
    price: 50,
    damage: 3,
    health: 4,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              { stat: "damage", amount: 1 },
              { stat: "health", amount: -1 },
            ],
            cost: {
              domain: "FIRE",
              amount: 1,
            },
          },
        },
      ],
    },
  },
  "0f5": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Steamforged Drake",
    description: "1W - Steam Burst - +2/0 for 1 turn",
    cost: 5,
    price: 75,
    damage: 4,
    health: 2,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [{ stat: "damage", amount: 2 }],
            cost: {
              domain: "WATER",
              amount: 1,
            },
          },
        },
      ],
      onTurnEnd: [
        {
          id: "stats.modify",
          args: {
            stats: [{ stat: "damage", amount: -2 }],
            conditionType: "enhanced",
          },
        },
      ],
    },
  },
  "0f6": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Lavablood Golem",
    description: "1E - Moltern Core - +2/+2",
    cost: 5,
    price: 90,
    damage: 5,
    health: 1,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              { stat: "damage", amount: 2 },
              { stat: "health", amount: 2 },
            ],
            cost: {
              domain: "EARTH",
              amount: 1,
            },
          },
        },
      ],
    },
  },
  "0f7": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ember",
    description: "1F - Ablaze: Ember gains +2/0",
    cost: 2,
    price: 50,
    damage: 0,
    health: 2,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              { stat: "damage", amount: 2 },
              { stat: "health", amount: 2 },
            ],
            cost: {
              domain: "FIRE",
              amount: 1,
            },
          },
        },
      ],
    },
  },
  "0f8": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ruby Elemental",
    description: "A living inferno bound in molten crystal.",
    cost: 10,
    price: 100,
    damage: 11,
    health: 5,
    triggers: {},
  },

  /***** SPELLS - 5 *****/
  // "0f9": {
  //   domain: "FIRE",
  //   type: "SPELL",
  //   name: "Fireball",
  //   description: "1F - Deal +1/-1 to target",
  //   cost: 3,
  //   price: 50,

  // },

  /***** SHIELD - 1 *****/
  "0fe": {
    domain: "FIRE",
    type: "SHIELD",
    name: "Heat Shield",
    description: "Reduces enemies attacks by 1",
    cost: 5,
    price: 60,
    triggers: {
      onAttacked: [
        {
          id: "stats.reduceDamage",
          args: {
            amount: 1, // Reduces damage by 1
          },
        },
      ],
    },
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
});
