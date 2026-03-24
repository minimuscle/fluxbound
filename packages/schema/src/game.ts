import type { Tagged } from "type-fest";
import type { z } from "zod";
import type { Cards } from "./cards";

export namespace Game {
  export type RoomId = Tagged<string, "roomId">;
  export type PlayerId = Tagged<string, "playerId">;
  export type CardId = Tagged<string, "gameCardId">;

  export type GameCard = {
    id: CardId;
    cardId: Cards.CardId; // The non-unique id of the card to match to the library
  } & GameCreatureCard;

  export type EffectHandlers = {
    [TGroup in keyof Cards.EffectsTree]: {
      [TName in keyof Cards.EffectsTree[TGroup]]: (
        context: {
          state: GameState;
          cardId: CardId;
        },
        args: Cards.EffectsTree[TGroup][TName] extends {
          arguments: infer TArgs extends z.ZodTypeAny;
        }
          ? z.infer<TArgs>
          : never,
      ) => GameState | Promise<GameState>;
    };
  };

  export type GameCreatureCard = Partial<{
    damage: number;
    health: number;
    maxHealth: number;
    activations: number;
  }>;

  export type PlayerState = {
    id: PlayerId;
    deck: GameCard[];
    hand: GameCard[];
    field: GameCard[];
    health: number;
    healthMax: number;
    attunement: string;
    flux: Record<Cards.Domain, number>;
  };

  export type InitialPlayerState = Omit<PlayerState, "deck" | "hand" | "field"> & {
    deck: Cards.CardId[];
    hand: never[];
    field: never[];
  };

  export type GameState = {
    activePlayer: PlayerId;
    player1: PlayerState;
    player2: PlayerState;
    turn: `${number}-${1 | 2}`;
  };

  export type PublicPlayerStateView = Omit<PlayerState, "deck" | "hand"> & {
    deckCount: number;
    handCount: number;
  };

  export type GameStateView = {
    activePlayer: PlayerId;
    you: PlayerState;
    opponent: PublicPlayerStateView;
    turn: `${number}-${1 | 2}`;
  };
}
