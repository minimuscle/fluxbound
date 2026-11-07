# Base and forged card definitions

231 base cards and 231 forged cards across ten elements. Each retained base card has exactly one upgrade.

## Layout

- Root element files: base definitions, importing your existing ../cards helper.
- forged/: one upgraded element file per element, importing ../../cards.
- index.ts: BASE_CARDS, FORGED_CARDS and ALL_CARDS exports.
- server/forge-recipes.ts: secret recipe registry, deliberately excluded from the public index.

## IDs and recipes

Original base IDs are preserved, including gaps and two-letter domain prefixes. A forged ID replaces only the first character: 0we -> 1we, 0aeh -> 1aeh. Replaced gemstone Elementals retain the ID of the creature they replaced.

Every recipe consumes its base card and one catalyst. Only runes use the same card twice. All unordered ingredient pairs are unique. One rune upgrade per element generates 2 Flux of that element; the previous mixed-rune variants are removed to keep the one-to-one ID mapping.

Keep the recipe registry on the server. Do not include it in client bundles, public API responses, card tooltips, or discovery responses before the player has unlocked a recipe. The spreadsheet remains the private authoring source.

## Implementation status

Spreadsheet names, costs, damage, health, and ability descriptions are authoritative. Prices and activation settings are preserved from the previous files. Existing targets are preserved. Retained cards are updated; cards removed from the spreadsheet are omitted without reusing their IDs.

Non-spells declare a `triggers` array using the shared `Cards.Trigger` type. Only cards with `onActivated` have an `activations` count. Spells implicitly use `onActivated` and omit both fields; use `getCardTriggers(card)` on either the frontend or backend to include this default. Existing nonzero activation settings are retained, and explicitly described activated abilities previously set to zero now have one activation.

Server effect placeholders mirror these files in `apps/server/game/effects/cards`, including `forged/`. Every card has an entry, including `{}` for cards without effects. Each declared trigger has an empty inline arrow function. `CardEffectRegistry` checks card coverage and requires the handlers to match each card's trigger metadata. Fill in these functions manually; the card descriptions remain the specification.

Handlers receive `{ state, card, player, opponent, target }` and can modify the state. The shared library contains metadata only. The server dispatcher currently connects spells and activated abilities to `onActivated`, played field cards to `onPlayed`, and turn ending to `onEndTurn`. Other event types are declared for manual integration with combat, death, turn start, and continuous-state updates.

Recipes have fee: null until you choose a monetary price. Treat null as unconfigured, never as free. Forge execution, discovery persistence, currency charging, inventory consumption, and transaction handling are not implemented by these definition files.

Trigger timing names distinguish `onBeforeAttack`, `onBeforeDamage`, and `onDamaged`; `onDeath` applies to the source card, while `onCreatureDeath` observes creature deaths. Conditions such as ownership, survival, and once-per-turn limits belong in the effect implementations. `onStateChanged` is reserved for recalculating continuous bonuses.

## Counts

- Fire: 23 base + 23 forged
- Water: 24 base + 24 forged
- Earth: 24 base + 24 forged
- Air: 24 base + 24 forged
- Life: 22 base + 22 forged
- Death: 23 base + 23 forged
- Light: 23 base + 23 forged
- Dark: 23 base + 23 forged
- Void: 23 base + 23 forged
- Aether: 22 base + 22 forged
