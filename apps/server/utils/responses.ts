import type { ServerGame, ServerLobby } from "@fluxbound/schema";

export const GameResponse = (options: ServerLobby | ServerGame): string => {
  return JSON.stringify(options);
};
