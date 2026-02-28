import { createFileRoute } from "@tanstack/react-router";
import { Button } from "components/Button";
import { useContext, useState } from "react";
import { WebSocketContext } from "../-components/context";

export const Route = createFileRoute("/_app/game/lobby/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** STATE *****/
  const [joinRoomId, setJoinRoomId] = useState("");

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
      <div>
        <input type="text" placeholder="Room ID" value={joinRoomId} onChange={(e) => setJoinRoomId(e.target.value)} />
        <Button onClick={() => ws.send({ type: "lobby/join", roomId: joinRoomId })} disabled={!joinRoomId}>
          Join Lobby
        </Button>
      </div>
      <Button onClick={() => ws.send({ type: "game/start" })}>Start Game</Button>
    </div>
  );
}
