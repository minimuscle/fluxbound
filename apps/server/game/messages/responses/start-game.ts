import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import type { GameSocketData } from "app/routes";
import { createInitialState } from "game/actions/create-initial-state";
import { GameEngine } from "game/engine";
import { enginesByRoomId } from "game/messages";
import { publishGameStarted } from "game/messages/gameResponses/game-started";
import { gameStatesByRoomId } from "game/messages/responses";
import { checkForRoom } from "game/messages/utils/checkForRoom";
import { GameResponse } from "utils/responses";

export const startGame = async (server: Bun.Server<GameSocketData>, ws: Bun.ServerWebSocket<GameSocketData>) => {
  const room = checkForRoom(ws);
  if (!room) return;

  const { supabase } = ws.data;
  const loadPlayerDeck = async (playerId: Game.PlayerId) => {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("active_deck")
      .eq("id", playerId)
      .maybeSingle<{ active_deck: string | null }>();

    const { data: users } = await supabase.from("users").select("*");
    console.log("user: ", playerId, user, users);
    if (userError || user?.active_deck == null) {
      return { error: userError?.message ?? "No active deck found" };
    }

    const { data: activeDeck, error: deckError } = await supabase.from("decks").select("deck").eq("id", user.active_deck).maybeSingle<{ deck: string }>();
    if (deckError || !activeDeck) {
      return { error: deckError?.message ?? "Deck not found" };
    }

    const deck = activeDeck.deck.split(" ");
    if (!deck.every((cardId): cardId is Cards.CardId => Object.hasOwn(CARD_LIBRARY, cardId))) {
      return { error: "Invalid card in active deck" };
    }
    return { deck };
  };

  const [player1Deck, player2Deck] = await Promise.all([loadPlayerDeck(room.player1.id), loadPlayerDeck(room.player2.id)]);
  if (!player1Deck.deck || !player2Deck.deck) {
    ws.send(
      GameResponse({
        type: "lobby/error",
        error: player1Deck.error ?? player2Deck.error ?? "Deck not found",
      }),
    );
    return;
  }

  const basePlayerStats = {
    hand: [],
    field: [],
    health: 100,
    healthMax: 100,
    attunement: "FIRE",
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
  } satisfies Omit<Game.InitialPlayerState, "id" | "name" | "deck">;

  const player1: Game.InitialPlayerState = {
    ...basePlayerStats,
    deck: player1Deck.deck,
    id: room.player1.id,
    name: room.player1.name,
  };

  const player2: Game.InitialPlayerState = {
    ...basePlayerStats,
    deck: player2Deck.deck,
    id: room.player2.id,
    name: room.player2.name,
  };

  const initialGameState = createInitialState(player1, player2, room.roomId);
  const engine = new GameEngine(initialGameState, ws.data.userId);
  enginesByRoomId.set(room.roomId, engine);
  gameStatesByRoomId.set(room.roomId, engine.gameState);

  publishGameStarted(server, engine, room.roomId);
};
