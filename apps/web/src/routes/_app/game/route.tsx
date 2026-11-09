import type { ERROR_CODES, Game, ServerGame, ServerLobby } from "@fluxbound/schema";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { user } from "api/user";
import { useEffect, useRef, useState } from "react";
import { createTypedWebSocketSender } from "utils/functions";
import { GameContext, GameErrorContext, SpellContext, WebSocketContext } from "./-components/context";
import { EffectsContext, useGameEffects } from "./-components/game/effects/context";

export const Route = createFileRoute("/_app/game")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const [websocketState, setWebsocket] = useState<ReturnType<typeof createTypedWebSocketSender> | null>(null);
  const [gameState, setGameState] = useState<Game.GameStateView | null>(null);
  const [lobbyError, setLobbyError] = useState<string | null>(null);
  const [gameError, setGameError] = useState<(typeof ERROR_CODES)[number] | null>(null);
  const [ended, setEnded] = useState<false | Game.PlayerId>(false);
  const [connectionVersion, setConnectionVersion] = useState(0);
  const [lobby, setLobby] = useState<{
    player1: { name: Game.PlayerName; id: Game.PlayerId };
    player2?: { name: Game.PlayerName; id: Game.PlayerId };
  } | null>(null);
  const [spellTargets, setSpellTargets] = useState<SpellContext["spellTargets"]>(null);
  const [spellCardId, setSpellCardId] = useState<SpellContext["cardId"] | null>(null);
  const effects = useGameEffects();
  const { enqueueEffect, clearEffects, runAfterEffects } = effects;

  const [roomId, setRoomId] = useState<Game.RoomId | null>(null);
  const isIntentionalClose = useRef(false);
  const shouldStartSoloOnConnect = useRef(false);
  const navigate = Route.useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** EFFECTS *****/
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSpellTargets(null);
        setSpellCardId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    isIntentionalClose.current = false;
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Missing access token for websocket auth");
      return;
    }

    const websocketUrl = new URL(`${import.meta.env.VITE_BASE_URL.includes("localhost") ? "ws" : "wss"}://${import.meta.env.VITE_BASE_URL}/game`);

    websocketUrl.searchParams.set("access_token", accessToken);

    const websocket = new WebSocket(websocketUrl);

    const typedWebsocket = createTypedWebSocketSender(websocket);
    setWebsocket(typedWebsocket);
    websocket.onopen = () => {
      if (!shouldStartSoloOnConnect.current) return;
      shouldStartSoloOnConnect.current = false;
      typedWebsocket.send({ type: "game/startSolo" });
    };
    websocket.onmessage = (event) => {
      const parsed = JSON.parse(event.data) as ServerGame | ServerLobby;

      switch (parsed.type) {
        case "lobby/error":
          setLobbyError(parsed.error);
          break;
        case "lobby/created":
          setLobbyError(null);
          setGameError(null);
          setRoomId(parsed.roomId);
          setLobby({ player1: parsed.player1 });
          break;
        case "game/started":
          clearEffects();
          setLobbyError(null);
          setGameError(null);
          setGameState(parsed.state);
          return navigate({ to: "/game", replace: true });
        case "game/turnEnded":
          setSpellTargets(null);
          setSpellCardId(null);
          setGameError(null);
          runAfterEffects(() => setGameState(parsed.state));
          typedWebsocket.send({ type: "game/start-turn" });
          break;
        case "game/stateUpdated":
          setGameError(null);
          runAfterEffects(() => setGameState(parsed.state));
          break;
        case "game/gameEnded":
          setGameError(null);
          runAfterEffects(() => {
            setEnded(parsed.winner);
            setGameState(parsed.state);
          });
          break;
        case "game/effect": {
          enqueueEffect(parsed);
          break;
        }
        case "game/error":
          switch (parsed.code) {
            case "NOT_PLAYERS_TURN":
              console.log("Not players turn");
              break;
            case "CARD_NOT_FOUND":
              console.log("Card not found");
              break;
            case "INSUFFICIENT_FLUX":
              console.log("Insufficient flux");
              break;
            case "NO_ROOM_ID":
              console.log("No room id");
              break;
            case "TOO_MANY_CARDS_IN_HAND":
              setGameError(parsed.code);
              console.log("Too many cards in hand");
              break;
            default:
              console.log("Unknown error", parsed);
              break;
          }
          break;
        default:
          console.log("Received unknown message", parsed);
          break;
      }
    };
    websocket.onclose = () => {
      setRoomId(null);
      if (isIntentionalClose.current) return;
      // return navigate({ to: "/game/lobby" });
    };
    return () => {
      isIntentionalClose.current = true;
      websocket.close();
      setWebsocket(null);
      clearEffects();
    };
  }, [connectionVersion, navigate, enqueueEffect, clearEffects, runAfterEffects]);

  const restartSinglePlayer = () => {
    clearEffects();
    shouldStartSoloOnConnect.current = true;
    isIntentionalClose.current = true;
    websocketState?.close();
    setWebsocket(null);
    setGameError(null);
    setLobbyError(null);
    setGameState(null);
    setEnded(false);
    setRoomId(null);
    setConnectionVersion((version) => version + 1);
  };

  const context: WebSocketContext = {
    websocket: websocketState!,
    roomId: roomId!,
    restartSinglePlayer,
  };

  /***** RENDER *****/
  return (
    <GameErrorContext value={{ gameError, setGameError }}>
      <WebSocketContext value={context}>
        <GameContext value={gameState ? { state: gameState, playerId: userData?.data?.id, ended } : null}>
          <SpellContext
            value={{
              spellTargets,
              setSpellTargets,
              cardId: spellCardId,
              setSpellCardId,
            }}
          >
            {lobbyError && <div role="alert">{lobbyError}</div>}
            <EffectsContext value={effects}>
              <Outlet />
            </EffectsContext>
          </SpellContext>
        </GameContext>
      </WebSocketContext>
    </GameErrorContext>
  );
}
