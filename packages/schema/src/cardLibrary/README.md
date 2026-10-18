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

Spreadsheet names, costs, damage, health, and ability descriptions are authoritative. Prices and activation settings are preserved from the previous files. Existing targets and all 14 non-empty base trigger definitions are preserved. Retained cards are updated; cards removed from the spreadsheet are omitted without reusing their IDs.

Forged cards inherit existing implemented triggers where their effect is unchanged. Existing Fire/Water rune generation is increased to 2. Freeze Ray's existing frozen duration increases from 3 to 4. Forged Phoenix and Ash reference one another's forged IDs. Empty triggers remain empty for unimplemented effects, including rune generation in the eight elements where it was previously unimplemented. Ability text is a specification, not an effect implementation.

Recipes have fee: null until you choose a monetary price. Treat null as unconfigured, never as free. Forge execution, discovery persistence, currency charging, inventory consumption, and transaction handling are not implemented by these definition files.

New card-schema properties are not introduced. Validate the definitions against your real card schema after copying them into the project. Syntax, ID correspondence, reference integrity, recipe uniqueness, inventory ingredient restrictions, and retained trigger preservation are checked during generation.

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
