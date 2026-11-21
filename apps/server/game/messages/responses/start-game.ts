import type { Cards, Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { createInitialState } from "game/actions/create-initial-state";
import { GameEngine } from "game/engine";
import { enginesByRoomId } from "game/messages";
import { publishGameStarted } from "game/messages/gameResponses/game-started";
import { gameStatesByRoomId } from "game/messages/responses";
import { checkForRoom } from "game/messages/utils/checkForRoom";
import { supabase } from "utils/database";
import { GameResponse } from "utils/responses";

export const startGame = async (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
  const room = checkForRoom(ws);
  if (!room) return;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("active_deck")
    .eq("id", ws.data.userId)
    .maybeSingle<{ active_deck: string | null }>();
  if (userError || user?.active_deck == null) {
    ws.send(
      GameResponse({
        type: "lobby/error",
        error: userError?.message ?? "No active deck found",
      }),
    );
    return;
  }

  const { data: activeDeck, error: deckError } = await supabase.from("decks").select("deck").eq("id", user.active_deck).maybeSingle<{ deck: string }>();
  if (deckError || !activeDeck) {
    ws.send(
      GameResponse({
        type: "lobby/error",
        error: deckError?.message ?? "Deck not found",
      }),
    );
    return;
  }

  const basePlayerStats = {
    // deck: playerStarterTestDeck,
    deck: activeDeck.deck.split(" ") as Cards.CardId[],
    hand: [],
    field: [],
    health: 100,
    healthMax: 100,
    attunement: "FIRE" as const,
    flux: {
      FIRE: 0,
      WATER: 0,
      EARTH: 0,
      AIR: 0,
      LIGHT: 0,
      DARK: 0,
      LIFE: 0,
      DEATH: 0,
      AETHER: 0,
      VOID: 0,
    },
  };

  const player1: Game.InitialPlayerState = {
    ...basePlayerStats,
    id: room.player1.id,
    name: room.player1.name,
  };

  const player2: Game.InitialPlayerState = {
    ...basePlayerStats,
    id: room.player2.id,
    name: room.player2.name,
  };

  const initialGameState = createInitialState(player1, player2, room.roomId);
  const engine = new GameEngine(initialGameState, ws.data.userId);
  enginesByRoomId.set(room.roomId, engine);
  gameStatesByRoomId.set(room.roomId, engine.gameState);

  publishGameStarted(server, engine, room.roomId);
};
