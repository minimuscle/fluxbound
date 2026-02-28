import { createFileRoute } from "@tanstack/react-router";
import { CoinToss } from "pages/SoloGame/components/coin";
import { use, useContext, useState } from "react";
import { GameContext, WebSocketContext } from "./-components/context";

export const Route = createFileRoute("/_app/game/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const [showCoinToss, setShowCoinToss] = useState(true);
  const context = useContext(WebSocketContext);
  const ws = context?.websocket;
  const gamecontext = use(GameContext);

  /***** RENDER *****/
  if (!ws || !gamecontext) return <h1>Loading...</h1>;
  return (
    <div>
      <CoinToss startGame={() => {}} />
    </div>
  );
}
