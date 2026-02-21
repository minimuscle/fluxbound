import { EFFECTS } from "components/Cards/effects";
import { CARD_LIBRARY } from "components/Cards/library";
import type { CardNames, CardTrigger, EffectRef, GameCard, GameCardId, TriggeredEffects } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

/**
 * Shuffles the deck and returns the shuffled deck
 */
export function shuffle(deck: CardNames[]) {
  const nextDeck = [...deck];

  // Fisher–Yates shuffle
  for (let index = nextDeck.length - 1; index > 0; index--) {
    const j = Math.floor(Math.random() * (index + 1));
    [nextDeck[index], nextDeck[j]] = [nextDeck[j], nextDeck[index]];
  }
  return nextDeck.map((id, gameCardId) => ({
    id,
    gameCardId: (gameCardId + 1) as unknown as GameCardId,
  }));
}

/**
 * Draws a card from the deck, defaults to 1
 */
export function drawCard(deck: GameCard[], numberOfCards = 1) {
  const cards = deck.slice(0, numberOfCards);
  const rest = deck.slice(numberOfCards);

  return { deck: rest, cards };
}

/**
 * Generates a random player
 */
export const generateRandomPlayer = () => (Math.random() < 0.5 ? "PLAYER" : "ENEMY");

const runEffect = (state: State, ctx: { owner: Player; gameCardId: GameCardId }, eff: EffectRef): State => {
  const [group, name] = eff.id.split(".") as [string, string];

  const runner = (
    (EFFECTS as unknown as Record<string, Record<string, { run: (ctx: unknown, args: unknown) => State } | undefined>>)[group]?.[name]?.run
  );

  if (!runner) {
    console.warn(`Unknown effect id: ${eff.id}`);
    return state;
  }

  return runner({ state, ...ctx }, eff.args);
};

export const runCardTrigger = (state: State, owner: Player, gameCardId: GameCardId, trigger: CardTrigger): State => {
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const card = state[sideKey].field.find((c) => c.gameCardId === gameCardId);
  if (!card) return state;

  const def = CARD_LIBRARY[card.id];
  const effects = (def.triggers as TriggeredEffects | undefined)?.[trigger] ?? [];
  if (effects.length === 0) return state;

  return effects.reduce((next: State, eff: EffectRef) => runEffect(next, { owner, gameCardId }, eff), state);
};

/**
 * Checks if a card is actionable by the player
 */
export const checkIsActionable = (card: GameCard, state: State) => {
  const cardData = CARD_LIBRARY[card.id];
  const triggers = cardData.triggers;
  if (!triggers || !("onActivated" in triggers) || !triggers.onActivated.length || !("args" in triggers.onActivated[0]) || !("activations" in cardData)) {
    return false;
  }

  const hasActivationsLeft = (card.activations ?? 0) < cardData.activations;
  if (!hasActivationsLeft) return false;
  if (!("cost" in triggers.onActivated[0].args)) return true;

  return state.player.flux[triggers.onActivated[0].args.cost?.element] >= triggers.onActivated[0].args.cost?.amount;
};
