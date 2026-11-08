import { CARD_LIBRARY, getCardTriggers, type Cards, type EffectContext, type Game } from "@fluxbound/schema";
import { CARD_EFFECTS } from "game/effects";
import { getPlayer } from "game/helpers/get-player";
import { getOpponent } from "game/helpers/get-opponent";

export const resolveCardEffect = (
  state: Game.GameState,
  card: Game.GameCard,
  trigger: Cards.Trigger,
  target?: Game.Target,
  playerId: Game.PlayerId = state.activePlayer,
  damageContext: Pick<EffectContext, "attacker" | "damage"> = {},
): Game.GameState => {
  const definition = CARD_LIBRARY[card.cardId];
  if (!definition || !getCardTriggers(definition).includes(trigger)) return state;
  CARD_EFFECTS[card.cardId]?.[trigger]?.({
    state,
    card,
    player: getPlayer(state, playerId),
    opponent: getOpponent(state, playerId),
    target,
    ...damageContext,
  });
  return state;
};

export const resolveTriggers = (state: Game.GameState, trigger: Cards.Trigger): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  return [...player.field].reduce((currentState, card) => resolveCardEffect(currentState, card, trigger), state);
};
