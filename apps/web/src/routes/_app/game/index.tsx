import { createFileRoute } from "@tanstack/react-router";
import { use, useContext } from "react";
import { GameContext, WebSocketContext } from "./-components/context";
import { Game } from "./-components/game";

export const Route = createFileRoute("/_app/game/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const context = useContext(WebSocketContext);
  const ws = context?.websocket;
  const gamecontext = use(GameContext);

  /***** RENDER *****/
  if (!ws || !gamecontext) return <h1>Loading...</h1>;
  return <Game />;
}
