import type { Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { createInitialState } from "game/actions/create-initial-state";
import { GameEngine } from "game/engine";
import { enginesByRoomId } from "game/messages";
import { publishGameStarted } from "game/messages/gameResponses/game-started";
import { lobby, rooms } from "game/messages/lobby";
import { gameStatesByRoomId } from "game/messages/responses";
import { checkForRoom } from "game/messages/utils/checkForRoom";
import { playerStarterTestDeck } from "game/testData/playerDeck";
import { GameResponse } from "utils/responses";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Level = 0 | 1 | 2 | 3 | 4 | 5;

/**********************************************************************************************************
 *   CONSTS
 **********************************************************************************************************/
const lookupAIName: Record<Level, string> = {
  "0": "Novice",
  "1": "Apprentice",
  "2": "Adept",
  "3": "Master",
  "4": "Grandmaster",
  "5": "The Old Ones",
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const startGameSingleplayer = async (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>, level: Level) => {
  const { supabase } = ws.data;
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

  await lobby.create(ws);
  const room = checkForRoom(ws, "singleplayer");
  if (!room) return;

  rooms.set(room.roomId, {
    ...room,
    player2: {
      id: `AI_${level}` as Game.PlayerId,
      name: lookupAIName[level] as Game.PlayerName,
    },
  });

  const basePlayerStats = {
    // deck: activeDeck.deck.split(" "),
    deck: playerStarterTestDeck,
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
    deck: playerStarterTestDeck,
    id: `AI_${level}` as Game.PlayerId,
    name: lookupAIName[level] as Game.PlayerName,
    health: level === 0 ? 50 : 100,
    healthMax: level === 0 ? 50 : 100,
  };

  const initialGameState = createInitialState(player1, player2);
  const engine = new GameEngine(initialGameState, ws.data.userId);

  enginesByRoomId.set(room.roomId, engine);
  gameStatesByRoomId.set(room.roomId, engine.gameState); // TODO: remove the need for this
  publishGameStarted(server, engine, room.roomId);
};
