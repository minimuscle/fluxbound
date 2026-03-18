import { ClickAwayListener } from "@mui/material";
import { Button } from "components/Button";
import { use, useEffect, useState } from "react";
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
  } = use(GameContext)!;
  const [showYourTurn, setShowYourTurn] = useState(activePlayer === playerId && turn.split("-")[0] !== "1");

  useEffect(() => {
    if (activePlayer === playerId && turn.split("-")[0] !== "1") setShowYourTurn(true);
  }, [activePlayer, turn, playerId]);

  /***** RENDER *****/
  if (!showYourTurn) return null;
  return (
    <ClickAwayListener onClickAway={() => setShowYourTurn(false)}>
      <div className="yourTurn">
        <p className="yourTurnText">It is your turn</p>
        <Button onClick={() => setShowYourTurn(false)} className="yourTurnClose">
          Start Turn
        </Button>
      </div>
    </ClickAwayListener>
  );
};
