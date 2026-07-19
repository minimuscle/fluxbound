import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { OpponentHand } from "routes/_app/game/-components/game/hand/opponentHand";
import { PlayerHand } from "routes/_app/game/-components/game/hand/playerhand";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Hand = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);

  /***** RENDER *****/
  if (stage === "ENEMY") return <OpponentHand player={player} />;
  return <PlayerHand player={player} />;
};
