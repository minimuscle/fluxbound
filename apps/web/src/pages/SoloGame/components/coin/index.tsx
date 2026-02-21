import { CrownSimpleIcon, SkullIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { Button } from "components/Button";
import { GameContext } from "pages/SoloGame/utils/context";
import React, { use } from "react";
import "./coin.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CoinToss = React.FC<{
  startGame: () => void;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CoinToss: CoinToss = ({ startGame }) => {
  /***** HOOKS *****/
  const {
    state: { activePlayer },
  } = use(GameContext)!;

  /***** RENDER *****/
  return (
    <div className="coinTossWrapper">
      <div className="coinToss__main">
        <div className="coinToss">
          <div
            className={classNames("coinToss--heads", {
              "coinToss--heads--selected": activePlayer === "PLAYER",
              "coinToss--heads--notSelected": activePlayer === "ENEMY",
            })}
          >
            <CrownSimpleIcon weight="bold" size={64} />
          </div>
          <div
            className={classNames("coinToss--tails", {
              "coinToss--heads--selected": activePlayer === "ENEMY",
              "coinToss--heads--notSelected": activePlayer === "PLAYER",
            })}
          >
            <SkullIcon weight="bold" size={64} />
          </div>
        </div>
        <div className="coinToss__button">
          <p className="coinTossText">{activePlayer === "PLAYER" ? "You have" : "The Enemy has"} won the coin toss</p>
          <Button onClick={startGame} className="coinTossClose">
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};
