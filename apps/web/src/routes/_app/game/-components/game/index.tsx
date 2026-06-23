import { use } from "react";
import { GameContext } from "routes/_app/game/-components/context";
import { getDomainIcon } from "routes/_app/game/-components/game/methods";
import styles from "./game.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  /***** HOOKS *****/
  const { state } = use(GameContext)!;

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.playerInfo}>
          <div className={styles.player}>
            <div className={styles.playerAttunement}>
              <img src={getDomainIcon(state.you.attunement)} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gameSection}></div>
      <div className={styles.rightSection}>
        <div className={styles.enemyInfo}></div>
        <button className={styles.nextTurnButton}>
          <p>{state.turn}</p>
          <h1>Next Turn</h1>
        </button>
      </div>
    </div>
  );
};
