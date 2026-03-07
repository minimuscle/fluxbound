import classNames from "classnames";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./attunement.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const AttunementArea = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })}>
      <div className={styles.circles}>
        <div className={styles.attunement}>
          <p style={{ fontSize: "16px" }}>Attunement:</p>
          {player.attunement}
        </div>
        <div className={styles.permanent}>Sword</div>
        <div className={styles.permanent}>Shield</div>
        <div className={styles.permanent}>Potion</div>
      </div>
      <div className={styles.health}>
        {player.health} / {player.healthMax}
      </div>
    </div>
  );
};
