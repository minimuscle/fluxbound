import type { ServerGame } from "./messages";

export type GameEffect = {
  id: string;
  message: Extract<ServerGame, { type: "game/effect" }>;
};

export const EFFECTS = ["fireball"] as const;
