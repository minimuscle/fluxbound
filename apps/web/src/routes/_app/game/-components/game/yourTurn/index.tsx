import { ClickAwayListener } from "@mui/material";
import { Button } from "components/Button";
import { useState } from "react";
import { useIsActivePlayer } from "utils/hooks/isActivePlayer";
import "./yourTurn.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const YourTurn = () => {
  /***** HOOKS *****/
  const isActivePlayer = useIsActivePlayer();
  const [dismissed, setDismissed] = useState(true);

  if (!isActivePlayer && dismissed) {
    setDismissed(false);
  }

  /***** RENDER *****/
  if (dismissed || !isActivePlayer) return null;
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
