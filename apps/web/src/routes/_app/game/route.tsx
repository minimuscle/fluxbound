import type { Lobby } from "@fluxbound/schema/src/lobby";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createTypedWebSocketSender } from "utils/functions";
import { WebSocketContext } from "./-components/context";

export const Route = createFileRoute("/_app/game")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const [websocketState, setWebsocket] = useState<ReturnType<typeof createTypedWebSocketSender> | null>(null);
  const [roomId, setRoomId] = useState<Lobby.RoomId | null>(null);

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
      const parsed = JSON.parse(event.data);

      switch (parsed.type) {
        case "lobby/created":
        case "lobby/joined":
          setRoomId(parsed.roomId);
          break;
        default:
          console.log("Received unknown message", parsed);
          break;
      }
    };
    // websocket.onclose = () => {
    //   console.log("WebSocket connection closed");
    // };
    return () => {
      websocket.close();
      setWebsocket(null);
    };
  }, []);

  const context: WebSocketContext = {
    websocket: websocketState,
    roomId: roomId,
  };

  /***** RENDER *****/
  return (
    <WebSocketContext value={context}>
      <Outlet />
    </WebSocketContext>
  );
}
