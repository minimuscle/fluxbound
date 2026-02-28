import type { Game } from "@fluxbound/schema/src/game";
import type { Lobby } from "@fluxbound/schema/src/lobby";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createTypedWebSocketSender } from "utils/functions";
import { GameContext, WebSocketContext } from "./-components/context";
import { useQuery } from "@tanstack/react-query";
import { user } from "api/user";

export const Route = createFileRoute("/_app/game")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const [websocketState, setWebsocket] = useState<ReturnType<typeof createTypedWebSocketSender> | null>(null);
  const [gameState, setGameState] = useState<Game.GameState | null>(null);
  const [roomId, setRoomId] = useState<Lobby.RoomId | null>(null);
  const navigate = Route.useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** EFFECTS *****/
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Missing access token for websocket auth");
      return;
    }

    const websocketUrl = new URL("ws://localhost:3000/game");
    websocketUrl.searchParams.set("access_token", accessToken);

    const websocket = new WebSocket(websocketUrl);
    setWebsocket(createTypedWebSocketSender(websocket));
    // websocket.onopen = () => {
    //   console.log("WebSocket connected");
    // };
    websocket.onmessage = (event) => {
      console.log("message: ", event.data);
      const parsed = JSON.parse(event.data);

      switch (parsed.type) {
        case "lobby/created":
        case "lobby/joined":
          setRoomId(parsed.roomId);
          break;
        case "game/started":
          setGameState(parsed.state);
          return navigate({ to: "/game", replace: true });
        default:
          console.log("Received unknown message", parsed);
          break;
      }
    };
    websocket.onclose = () => {
      // return navigate({ to: "/", replace: true });
    };
    return () => {
      websocket.close();
      setWebsocket(null);
    };
  }, [navigate]);

  const context: WebSocketContext = {
    websocket: websocketState,
    roomId: roomId,
  };

  /***** RENDER *****/
  return (
    <WebSocketContext value={context}>
      <GameContext value={gameState ? { state: gameState, playerId: userData?.id } : null}>
        <Outlet />
      </GameContext>
    </WebSocketContext>
  );
}
