import { defineCardDefinition } from "../../cards";

export const FORGED_FIRE_CARDS = defineCardDefinition({
  "1f0": {
    domain: "FIRE",
    type: "RUNE",
    name: "Tempered Fire Rune",
    description: "Gain 2 Fire Flux per turn.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [
        {
          id: "flux.generate",
          args: {
            domain: "FIRE",
            amount: 2,
          },
        },
      ],
    },
  },
  "1f1": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Sootfang Fox",
    description: "Astral-forged upgrade of Cinder Rat.",
    cost: 1,
    price: 60,
    damage: 2,
    health: 3,
    activations: 0,
    triggers: {},
  },
  "1f2": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Dawnfire Phoenix",
    description: "Turns to ash when killed",
    cost: 7,
    price: 100,
    damage: 1,
    health: 9,
    activations: 0,
    triggers: {
      onDeath: [
        {
          id: "creature.create",
          args: {
            cardId: "1f3",
          },
        },
      ],
    },
  },
  "1f3": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Everglow Ash",
    description: "1F - Rebirth - turn into a phoenix",
    cost: 7,
    price: 100,
    damage: 1,
    health: 4,
    activations: 1,
    triggers: {
      onActivated: [
        {
          id: "creature.swap",
          args: {
            cardId: "1f2",
          },
        },
      ],
    },
  },
  "1f4": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Furnacehorn Ram",
    description: "1F - Overheat - At the end of the turn, deal +1/-1",
    cost: 3,
    price: 50,
    damage: 4,
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
  "1f5": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Mistbrand Wyvern",
    description: "1W - Steam Burst - +2/0 for 1 turn",
    cost: 5,
    price: 75,
    damage: 4,
    health: 4,
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
  "1f7": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Heartflame",
    description: "1F - Ablaze - +2/0",
    cost: 2,
    price: 50,
    damage: 0,
    health: 4,
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
  "1f8": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Ascendant Ruby Elemental",
    description: "",
    cost: 10,
    price: 100,
    damage: 11,
    health: 7,
    activations: 0,
    triggers: {},
  },
  "1fi": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Hearthscale Salamander",
    description:
      "At the end of your turn, before attacks, if this has less than its starting HP, it gains +1 attack until the end of that turn.",
    cost: 1,
    price: 10,
    damage: 2,
    health: 3,
    activations: 0,
    triggers: {},
  },
  "1fj": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Forgeplate Pangolin",
    description:
      "The first time this survives damage from an enemy attack each turn, gain 1 Fire Flux.",
    cost: 4,
    price: 10,
    damage: 3,
    health: 5,
    activations: 0,
    triggers: {},
  },
  "1fl": {
    domain: "FIRE",
    type: "CREATURE",
    name: "Cinderprism Jackal",
    description:
      "1 Fire Flux, once per your turn: If you control another Fire creature, deal 2 damage to an enemy creature.",
    cost: 4,
    price: 10,
    damage: 3,
    health: 5,
    activations: 1,
    triggers: {},
  },
  "1f9": {
    domain: "FIRE",
    type: "SPELL",
    name: "Starfire Bolt",
    description: "3x3 damage",
    cost: 1,
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
  "1fa": {
    domain: "FIRE",
    type: "SPELL",
    name: "Crownfire",
    description: "3 Damage to all creatures",
    cost: 6,
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
  "1fb": {
    domain: "FIRE",
    type: "SPELL",
    name: "Crucible Fury",
    description: "gain +5/0 to the target creature",
    cost: 4,
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
  "1fc": {
    domain: "FIRE",
    type: "SPELL",
    name: "Solar Detonation",
    description: "Destroy the target permanent",
    cost: 2,
    price: 50,
    triggers: {},
  },
  "1fd": {
    domain: "FIRE",
    type: "SPELL",
    name: "Cinderbrand",
    description: "-2 health to the target per turn. Restore 1 HP to yourself.",
    cost: 1,
    price: 50,
    triggers: {},
  },
  "1fo": {
    domain: "FIRE",
    type: "SPELL",
    name: "Afterglow Reserve",
    description:
      "Choose an allied creature. It gains +1 attack permanently; at the start of your next turn, gain 2 Fire Flux.",
    cost: 1,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "1fp": {
    domain: "FIRE",
    type: "SPELL",
    name: "Inferno Pact",
    description:
      "Deal 3 damage to yourself. Deal 5 damage to an enemy creature.",
    cost: 2,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "1fq": {
    domain: "FIRE",
    type: "SPELL",
    name: "Crucible Exchange",
    description:
      "Deal 2 damage to an allied creature. If it survives, deal 4 damage to an enemy creature.",
    cost: 1,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "1fr": {
    domain: "FIRE",
    type: "SPELL",
    name: "Final Flare",
    description:
      "Deal 3 damage to an enemy creature. If you have no Fire Flux remaining after paying this spell's cost, deal 5 damage instead.",
    cost: 2,
    price: 10,
    activations: 0,
    targets: [],
    triggers: {},
  },
  "1fe": {
    domain: "FIRE",
    type: "SHIELD",
    name: "Crownfire Rampart",
    description: "Each attacking creature takes 1 damage",
    cost: 4,
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
  "1ff": {
    domain: "FIRE",
    type: "SHIELD",
    name: "Crucible Rampart",
    description: "Reduces enemies attacks by 1",
    cost: 2,
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
  "1fg": {
    domain: "FIRE",
    type: "WEAPON",
    name: "Solarbrand",
    description: "\\+1 damage for every 10F in the users pool",
    cost: 4,
    price: 60,
    damage: 5,
    triggers: {},
  },
});
