import { defineCardDefinition } from "../../cards";

export const FORGED_WATER_CARDS = defineCardDefinition({
  "1w0": {
    "domain": "WATER",
    "type": "RUNE",
    "name": "Tempered Water Rune",
    "description": "Gain 2 Water Flux per turn.",
    "cost": 0,
    "price": 10,
    "triggers": {
      "onTurnEnd": [
        {
          "id": "flux.generate",
          "args": {
            "domain": "WATER",
            "amount": 2
          }
        }
      ]
    }
  },
  "1w1": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Riversong Sprite",
    "description": "Astral-forged upgrade of River Sprite.",
    "cost": 1,
    "price": 10,
    "damage": 2,
    "health": 2,
    "activations": 0,
    "triggers": {}
  },
  "1w2": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Reefwarden Crab",
    "description": "Astral-forged upgrade of Coral Guardian.",
    "cost": 3,
    "price": 10,
    "damage": 2,
    "health": 8,
    "activations": 0,
    "triggers": {}
  },
  "1w3": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Rimecrest Serpent",
    "description": "2W - Freeze - target creature cannot attack this turn",
    "cost": 4,
    "price": 10,
    "damage": 4,
    "health": 4,
    "activations": 0,
    "triggers": {}
  },
  "1w4": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Springtide Naiad",
    "description": "1 Life - Renewal - Restore 3HP to the target",
    "cost": 4,
    "price": 10,
    "damage": 2,
    "health": 4,
    "activations": 0,
    "triggers": {}
  },
  "1w6": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Ascendant Sapphire Elemental",
    "description": "",
    "cost": 10,
    "price": 10,
    "damage": 10,
    "health": 8,
    "activations": 0,
    "triggers": {}
  },
  "1wg": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Moonpool Otter",
    "description": "1 Water Flux, once per your turn: Move up to 2 current HP from another allied creature to this. The donor must retain at least 1 HP; this cannot exceed its maximum HP.",
    "cost": 2,
    "price": 10,
    "damage": 2,
    "health": 6,
    "activations": 1,
    "triggers": {}
  },
  "1wh": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Pearlcrown Nudibranch",
    "description": "At the end of your turn, if you restored HP to an allied creature this turn, gain 1 Water Flux.",
    "cost": 3,
    "price": 10,
    "damage": 2,
    "health": 5,
    "activations": 0,
    "triggers": {}
  },
  "1wi": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Glassreef Cuttle",
    "description": "1 Water Flux, once per your turn: This gains attack equal to its current HP, up to +4, until the end of your turn. Then it loses 2 HP. Requires at least 3 current HP.",
    "cost": 4,
    "price": 10,
    "damage": 3,
    "health": 6,
    "activations": 1,
    "triggers": {}
  },
  "1wk": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Moonclock Nautilus",
    "description": "At the end of your turn, before attacks, this gains +2 attack for that turn if your Water Flux pool is even; otherwise, restore 2 HP to this.",
    "cost": 6,
    "price": 10,
    "damage": 4,
    "health": 6,
    "activations": 0,
    "triggers": {}
  },
  "1ws": {
    "domain": "WATER",
    "type": "CREATURE",
    "name": "Greatlake Colossus",
    "description": "1 Water Flux, once per your turn: Restore 2 HP to another allied creature.",
    "cost": 7,
    "price": 10,
    "damage": 4,
    "health": 10,
    "activations": 1,
    "triggers": {}
  },
  "1w7": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Undertow Surge",
    "description": "Destroy any non-water creatures with 2 or less hp",
    "cost": 4,
    "price": 10,
    "activations": 0,
    "targets": [
      "selfCreatures",
      "opponentCreatures"
    ],
    "triggers": {
      "onActivated": [
        {
          "id": "target.destroy",
          "args": {
            "condition": {
              "field": "health",
              "modififer": "lessThan",
              "value": 3
            }
          }
        }
      ]
    }
  },
  "1w8": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Deepfreeze Ray",
    "description": "Freeze the target creature for 4 turns.",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "targets": [
      "creature"
    ],
    "triggers": {
      "onActivated": [
        {
          "id": "target.conditions",
          "args": {
            "conditions": [
              "frozen"
            ],
            "chance": 1,
            "length": 4
          }
        }
      ]
    }
  },
  "1w9": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Silver Rain",
    "description": "up to 3 random creatures are healed 2 HP",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "triggers": {}
  },
  "1wa": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Spiral Current",
    "description": "Returns the targets permanent to their deck",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wb": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Glacial Javelin",
    "description": "Deal 3 damage to the target. Target may freeze 25% chance",
    "cost": 3,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wm": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Kindred Current",
    "description": "Move up to 4 current HP from one allied creature to another. The donor must retain at least 1 HP; the recipient cannot exceed its maximum HP. Restore 1 HP to yourself.",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wn": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Brineheart Bargain",
    "description": "An allied creature permanently loses up to 3 attack, to a minimum of 0. Restore 2 HP to yourself for each attack lost.",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wo": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Crushing Equilibrium",
    "description": "Choose an enemy creature. If its current attack exceeds its current HP, deal damage to it equal to the difference, up to 5.",
    "cost": 2,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wp": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Returning Undertow",
    "description": "An enemy creature loses 3 attack until the start of your next turn. At the start of your next turn, gain 1 Water Flux.",
    "cost": 1,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wt": {
    "domain": "WATER",
    "type": "SPELL",
    "name": "Mirrorlake Reflection",
    "description": "Choose two allied creatures. Until the end of your turn, the one with lower attack gains attack equal to the difference between them, up to +4. If tied, neither gains attack.",
    "cost": 2,
    "price": 10,
    "activations": 0,
    "targets": [],
    "triggers": {}
  },
  "1wc": {
    "domain": "WATER",
    "type": "SHIELD",
    "name": "Glacier Wall",
    "description": "Reduces damage by 2",
    "cost": 4,
    "price": 10,
    "triggers": {}
  },
  "1wq": {
    "domain": "WATER",
    "type": "SHIELD",
    "name": "Frostglass Bastion",
    "description": "Reduce each attack against you by 1. The first attack dealing exactly 1 damage to you each turn also restores 1 HP to one allied creature of your choice.",
    "cost": 3,
    "price": 10,
    "triggers": {}
  },
  "1wr": {
    "domain": "WATER",
    "type": "WEAPON",
    "name": "Tideglass Fork",
    "description": "Before this attacks on your turn, if you restored HP to an allied creature this turn, it gains +2 attack until the end of the turn.",
    "cost": 5,
    "price": 10,
    "damage": 4,
    "triggers": {}
  }
});
