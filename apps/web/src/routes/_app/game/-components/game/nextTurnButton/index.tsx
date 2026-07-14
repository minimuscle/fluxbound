import { useHotkey } from "@tanstack/react-hotkeys";
import classNames from "classnames";
import { GameContext, WebSocketContext } from "routes/_app/game/-components/context";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./nextTurnButton.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const NextTurnButton = () => {
  /***** HOOKS *****/
  const { state } = useInvariant(GameContext);
  const { websocket } = useInvariant(WebSocketContext);
  useHotkey("Space", endTurn);

  /***** FUNCTIONS *****/
  function endTurn() {
    websocket.send({ type: "game/end-turn" });
  }

  const isActivePlayer = state.activePlayer === state.you.id;

  /***** RENDER *****/
  return (
    <button className={styles.button} onClick={endTurn} disabled={!isActivePlayer}>
      <p className={styles.Turn}>Turn {state.turn.split("-")[0]}</p>
      <p className={classNames(styles.Text, { [styles.EnemyText]: !isActivePlayer })}>{isActivePlayer ? "Next Turn" : "Opponent's Turn"}</p>
    </button>
  );
};
