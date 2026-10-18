import { defineCardDefinition } from "../cards";

export const FIRE_CARDS = defineCardDefinition({
  "0f0": {
    domain: "FIRE",
    type: "RUNE",
    name: "Fire Rune",
    description: "Plus 1 Fire Flux per turn",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [
        {
          id: "flux.generate",
          args: {
            domain: "FIRE",
            amount: 1,
          },
        },
      ],
    },
  },
  "0f1": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Cinder Rat",
    description: "",
    cost: 1,
    price: 60,
    damage: 2,
    health: 1,
    activations: 0,
    triggers: {},
  },
  "0f2": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Phoenix",
    description: "Turns to ash when killed",
    cost: 7,
    price: 100,
    damage: 1,
    health: 7,
    activations: 0,
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
    description: "1F - Rebirth - turn into a phoenix",
    cost: 7,
    price: 100,
    damage: 0,
    health: 4,
    activations: 1,
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
    description: "1F - Overheat - At the end of the turn, deal +1/-1",
    cost: 3,
    price: 50,
    damage: 3,
    health: 4,
    activations: 0,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              {
                stat: "damage",
                amount: 1,
              },
              {
                stat: "health",
                amount: -1,
              },
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
    activations: 1,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              {
                stat: "damage",
                amount: 2,
              },
            ],
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
            stats: [
              {
                stat: "damage",
                amount: -2,
              },
            ],
            conditionType: "enhanced",
          },
        },
      ],
    },
  },
  "0f7": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ember",
    description: "1F - Ablaze - +2/0",
    cost: 2,
    price: 50,
    damage: 0,
    health: 2,
    activations: 1,
    triggers: {
      onActivated: [
        {
          id: "stats.modify",
          args: {
            stats: [
              {
                stat: "damage",
                amount: 2,
              },
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
    description: "",
    cost: 10,
    price: 100,
    damage: 11,
    health: 5,
    activations: 0,
    triggers: {},
  },
  "0fi": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Kilnback Skink",
    description:
      "At the end of your turn, before attacks, if this has less than its starting HP, it gains +1 attack until the end of that turn.",
    cost: 2,
    price: 10,
    damage: 2,
    health: 3,
    activations: 0,
    triggers: {},
  },
  "0fj": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Coalcoil Pangolin",
    description:
      "The first time this survives damage from an enemy attack each turn, gain 1 Fire Flux.",
    cost: 4,
    price: 10,
    damage: 2,
    health: 5,
    activations: 0,
    triggers: {},
  },
  "0fl": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Glassmane Jackal",
    description:
      "1 Fire Flux, once per your turn: If you control another Fire creature, deal 2 damage to an enemy creature.",
    cost: 4,
    price: 10,
    damage: 3,
    health: 3,
    activations: 1,
    triggers: {},
  },
  "0f9": {
    domain: "FIRE",
    type: "SPELL",
    name: "Fireball",
    description: "3x3 damage",
    cost: 2,
    price: 50,
    targets: ["creature", "opponent"],
    triggers: {
      onActivated: [
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "health",
                amount: -3,
              },
            ],
          },
        },
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "health",
                amount: -3,
              },
            ],
          },
        },
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "health",
                amount: -3,
              },
            ],
          },
        },
      ],
    },
  },
  "0fa": {
    domain: "FIRE",
    type: "SPELL",
    name: "Wildfire",
    description: "3 Damage to all creatures",
    cost: 7,
    price: 50,
    targets: ["opponentCreatures"],
    triggers: {
      onActivated: [
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "health",
                amount: -3,
              },
            ],
          },
        },
      ],
    },
  },
  "0fb": {
    domain: "FIRE",
    type: "SPELL",
    name: "Molten Rage",
    description: "gain +5/0 to the target creature",
    cost: 5,
    price: 50,
    targets: ["creature"],
    triggers: {
      onActivated: [
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "damage",
                amount: 5,
              },
            ],
          },
        },
      ],
    },
  },
  "0fc": {
    domain: "FIRE",
    type: "SPELL",
    name: "Flash Ignition",
    description: "Destroy the target permanent",
    cost: 3,
    price: 50,
    triggers: {},
  },
  "0fd": {
    domain: "FIRE",
    type: "SPELL",
    name: "Burn",
    description: "-2 health to the target per turn",
    cost: 1,
    price: 50,
    triggers: {},
  },
  "0fo": {
    domain: "FIRE",
    type: "SPELL",
    name: "Banked Embers",
    description:
      "Choose an allied creature. It gains +1 attack permanently; at the start of your next turn, gain 2 Fire Flux.",
    cost: 2,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "0fp": {
    domain: "FIRE",
    type: "SPELL",
    name: "Flashover Pact",
    description:
      "Deal 3 damage to yourself. Deal 5 damage to an enemy creature.",
    cost: 3,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "0fq": {
    domain: "FIRE",
    type: "SPELL",
    name: "Heat Exchange",
    description:
      "Deal 2 damage to an allied creature. If it survives, deal 4 damage to an enemy creature.",
    cost: 2,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "0fr": {
    domain: "FIRE",
    type: "SPELL",
    name: "Last Spark",
    description:
      "Deal 3 damage to an enemy creature. If you have no Fire Flux remaining after paying this spell's cost, deal 5 damage instead.",
    cost: 3,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "0fe": {
    domain: "FIRE",
    type: "SHIELD",
    name: "Wall of Fire",
    description: "Each attacking creature takes 1 damage",
    cost: 5,
    price: 60,
    triggers: {
      onAttacked: [
        {
          id: "target.modify",
          args: {
            stats: [
              {
                stat: "health",
                amount: -1,
              },
            ],
          },
        },
        {
          id: "target.conditions",
          args: {
            conditions: ["burning"],
            chance: 0.5,
            length: 2,
          },
        },
      ],
    },
  },
  "0ff": {
    domain: "FIRE",
    type: "SHIELD",
    name: "Heat Shield",
    description: "Reduces enemies attacks by 1",
    cost: 3,
    price: 60,
    triggers: {
      onAttacked: [
        {
          id: "stats.reduceDamage",
          args: {
            amount: 1,
          },
        },
      ],
    },
  },
  "0fg": {
    domain: "FIRE",
    type: "WEAPON",
    name: "Flametongue Blade",
    description: "\\+1 damage for every 10F in the users pool",
    cost: 4,
    price: 60,
    damage: 4,
    triggers: {},
  },
});
