import { createFileRoute, useLocation } from "@tanstack/react-router";
import { use, useEffect } from "react";
import { WebSocketContext } from "../-components/context";

export const Route = createFileRoute("/_app/game/lobby/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const hash = useLocation({ select: ({ hash }) => hash });
  const ws = use(WebSocketContext);

  /***** EFFECTS *****/
  useEffect(() => {
    //Create a room if hash does not exist.
    if (hash || !ws?.current) return;
    console.log("Creating room");
    ws.current.send(JSON.stringify("CREATE_ROOM"));
  }, [hash, ws, ws?.current?.readyState]);

  /***** RENDER *****/
  return <div>Hello "/_app/lobby/"!</div>;
}
