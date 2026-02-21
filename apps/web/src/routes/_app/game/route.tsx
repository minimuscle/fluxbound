import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "components/Button";
import { useEffect, useRef } from "react";

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
    const websocket = new WebSocket("ws://localhost:3000/game");
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
    <div>
      <Button onClick={handleSendMessage}>Send Message Test</Button>
      <Outlet />
    </div>
  );
}
