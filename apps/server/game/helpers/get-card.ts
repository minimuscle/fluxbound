import type { Game } from "@fluxbound/schema";

export function getCard(state: Game.GameState, gameCardId: Game.Target[number]): Game.GameCard | undefined {
  if (
    gameCardId === "self" ||
    gameCardId === "opponent" ||
    gameCardId === "permanent" ||
    gameCardId === "all" ||
    gameCardId === "selfCreatures" ||
    gameCardId === "opponentCreatures"
  ) return undefined;
  return state.player1.field.find((card) => card.id === gameCardId) ?? state.player2.field.find((card) => card.id === gameCardId);
}
