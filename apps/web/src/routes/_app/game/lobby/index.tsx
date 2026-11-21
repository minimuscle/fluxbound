import type { Game } from "@fluxbound/schema";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { user } from "api/user";
import { Button } from "components/Button";
import { useContext, useState } from "react";
import { WebSocketContext } from "../-components/context";

export const Route = createFileRoute("/_app/game/lobby/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** STATE *****/
  const [joinRoomId, setJoinRoomId] = useState<Game.RoomId>("" as Game.RoomId);

  /***** HOOKS *****/
  const context = useContext(WebSocketContext);
  const ws = context?.websocket;
  const roomId = context?.roomId;
  const lobby = context?.lobby;
  const navigate = Route.useNavigate();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** RENDER *****/
  if (!ws) return null;
  return (
    <div>
      <Button
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      >
        Back to Main Menu
      </Button>
      <Button onClick={() => ws.send({ type: "game/startSolo" })}>Start Solo Game</Button>
      <h1>Lobby</h1>
      <h2>Room ID: {roomId}</h2>
      <Button onClick={() => ws.send({ type: "lobby/create" })}>Create Lobby</Button>
      <div>
        <input type="text" placeholder="Room ID" value={joinRoomId} onChange={(e) => setJoinRoomId(e.target.value as Game.RoomId)} />
        <Button onClick={() => ws.send({ type: "lobby/join", roomId: joinRoomId })} disabled={!joinRoomId}>
          Join Lobby
        </Button>
      </div>
      <div>
        {lobby && lobby.player1.id === userData?.data?.id && (
          <Button disabled={!lobby.player2} onClick={() => ws.send({ type: "game/start" })}>
            Start Game
          </Button>
        )}
      </div>
      <div>
        <h1>Players in lobby:</h1>
        <ul>
          {lobby && <li key={lobby.player1.id}>{lobby.player1.name}</li>}
          {lobby?.player2 && <li key={lobby.player2.id}>{lobby.player2.name}</li>}
        </ul>
      </div>
    </div>
  );
}
