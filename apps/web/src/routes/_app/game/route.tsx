import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "components/Button";
import { useEffect, useRef } from "react";
import { WebSocketContext } from "./-components/context";

export const Route = createFileRoute("/_app/game")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const websocketRef = useRef<WebSocket | null>(null);

  const handleSendMessage = () => {
    websocketRef.current?.send("Hello!");
  };

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
    websocketRef.current = websocket;
    websocket.onopen = () => {
      console.log("WebSocket connected");
    };
    websocket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
    };
    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      websocket.close();
      websocketRef.current = null;
    };
  }, []);

  /***** RENDER *****/
  return (
    <WebSocketContext value={websocketRef}>
      <div>
        <Button onClick={handleSendMessage}>Send Message Test</Button>
        <Outlet />
      </div>
    </WebSocketContext>
  );
}
