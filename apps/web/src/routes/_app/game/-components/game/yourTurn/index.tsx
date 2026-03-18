import { ClickAwayListener } from "@mui/material";
import { Button } from "components/Button";
import { useState } from "react";
import { useInvariant } from "utils/hooks/useInvariant";
import { GameContext } from "../../context";
import "./yourTurn.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const YourTurn = () => {
  /***** HOOKS *****/
  const {
    state: { activePlayer, turn },
    playerId,
  } = useInvariant(GameContext);
  const [dismissed, setDismissed] = useState(false);

  const isYourTurn = activePlayer === playerId && turn.split("-")[0] !== "1";
  const showYourTurn = isYourTurn && !dismissed;

  console.log("isYourTurn", isYourTurn);

  /***** RENDER *****/
  if (!showYourTurn) return null;
  return (
    <ClickAwayListener onClickAway={() => setDismissed(true)}>
      <div className="yourTurn">
        <p className="yourTurnText">It is your turn</p>
        <Button onClick={() => setDismissed(true)} className="yourTurnClose">
          Start Turn
        </Button>
      </div>
    </ClickAwayListener>
  );
};
