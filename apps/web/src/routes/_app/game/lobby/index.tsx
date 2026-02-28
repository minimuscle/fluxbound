import { createFileRoute } from "@tanstack/react-router";
import { Button } from "components/Button";
import { useContext } from "react";
import { WebSocketContext } from "../-components/context";

export const Route = createFileRoute("/_app/game/lobby/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const context = useContext(WebSocketContext);
  const ws = context?.websocket;
  const roomId = context?.roomId;

  /***** RENDER *****/
  if (!ws) return null;
  return (
    <div>
      <h1>Lobby</h1>
      <h2>Room ID: {roomId}</h2>
      <Button onClick={() => ws.send({ type: "lobby/create" })}>Create Lobby</Button>
    </div>
  );
}
