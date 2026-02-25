import { createFileRoute, useLocation } from "@tanstack/react-router";
import { use, useEffect } from "react";
import { WebSocketContext } from "../-components/context";

export const Route = createFileRoute("/_app/game/lobby/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const hash = useLocation({ select: ({ hash }) => hash });
  const ws = use(WebSocketContext)?.current;

  /***** EFFECTS *****/
  useEffect(() => {
    //Create a room if hash does not exist.
    if (hash || !ws) return;
    console.log("Creating room");
    ws.send(JSON.stringify("CREATE_ROOM"));
  }, [hash, ws, ws?.readyState]);

  /***** RENDER *****/
  return <div>Hello "/_app/lobby/"!</div>;
}
