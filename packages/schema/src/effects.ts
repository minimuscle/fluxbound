import type { Cards } from "./cards";
import type { Game } from "./game";

export type EffectContext = {
  state: Game.GameState;
  card: Game.GameCard;
  player: Game.PlayerState;
  opponent: Game.PlayerState;
  target?: Game.Target;
  attacker?: Game.GameCard;
  damage?: number;
};

export type CardEffect = (context: EffectContext) => void;
export type CardEffects = Partial<Record<Cards.Trigger, CardEffect>>;

type CardTriggers<TCard extends Cards.Card> = TCard extends Cards.Spell
  ? "onPlayed"
  : TCard extends {
        triggers: readonly (infer TTrigger extends Cards.Trigger)[];
      }
    ? TTrigger
    : never;

// Every card and every declared trigger must have an entry.
export type CardEffectRegistry<TCards extends Cards.CardDefinition> = {
  [TId in keyof TCards]: Record<CardTriggers<TCards[TId]>, CardEffect> & Partial<Record<Exclude<Cards.Trigger, CardTriggers<TCards[TId]>>, never>>;
};
