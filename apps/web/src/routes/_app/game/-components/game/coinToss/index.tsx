import { CrownSimpleIcon, SkullIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { Button } from "components/Button";
import { use, useState } from "react";
import { GameContext } from "../../context";
import "./coin.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CoinToss = () => {
  /***** HOOKS *****/
  const {
    state: { activePlayer },
    playerId,
  } = use(GameContext)!;
  const [showCoinToss, setShowCoinToss] = useState(true);

  /***** RENDER *****/
  if (!showCoinToss) return null;
  return (
    <div className="coinTossWrapper">
      <div className="coinToss__main">
        <div className="coinToss">
          <div
            className={classNames("coinToss--heads", {
              "coinToss--heads--selected": activePlayer === playerId,
              "coinToss--heads--notSelected": activePlayer !== playerId,
            })}
          >
            <CrownSimpleIcon weight="bold" size={64} />
          </div>
          <div
            className={classNames("coinToss--tails", {
              "coinToss--heads--selected": activePlayer !== playerId,
              "coinToss--heads--notSelected": activePlayer === playerId,
            })}
          >
            <SkullIcon weight="bold" size={64} />
          </div>
        </div>
        <div className="coinToss__button">
          <p className="coinTossText">{activePlayer === playerId ? "You have" : "The Enemy has"} won the coin toss</p>
          <Button onClick={() => setShowCoinToss(false)} className="coinTossClose">
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};
