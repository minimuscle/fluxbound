import type { Element, GameCard, GameCardId } from "components/Cards/types";

export type Player = "PLAYER" | "ENEMY";
export type Page = "GAME" | "MAIN" | "SOLO_GAME";

type GameInfo = {
  deck: GameCard[];
  hand: GameCard[];
  field: GameCard[];
  health: number;
  healthMax: number;
  attunement: Element;
  flux: Record<Element, number>;
};

export type State = {
  gameStarted: boolean;
  showCoinToss: boolean;
  nextPhase: Phase;
  turn: number;
  activePlayer: Player;
  player: GameInfo;
  enemy: GameInfo;
};

export type Action = {
  phase: Exclude<Phase, ["TURN_START", "GAME_OVER"]>;
  card?: GameCardId;
};

export type Phase = "START_GAME" | "END_TURN" | "START_TURN" | "ENEMY_TURN" | "TURN_START" | "PLAY_CARD" | "ACTIVATE_CARD" | "GAME_OVER" | "RESTART_GAME";

export type Phases = (state: State, action: Action) => State;
