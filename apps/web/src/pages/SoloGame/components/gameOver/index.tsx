import { Button } from "components/Button";
import { GameContext } from "pages/SoloGame/utils/context";
import { use } from "react";
import "./gameover.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const GameOver = () => {
  const { state, dispatch } = use(GameContext)!;
  /***** RENDER *****/
  return (
    <div className="gameOver">
      <h1>Game Over</h1>
      <h2>You {state.activePlayer === "PLAYER" ? "Lose" : "Win"}</h2>
      <Button onClick={() => dispatch({ phase: "RESTART_GAME" })} className="gameOver__button">
        Play Again
      </Button>
    </div>
  );
};
