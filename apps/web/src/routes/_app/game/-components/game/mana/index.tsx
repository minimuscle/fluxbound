import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./mana.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Mana = () => {
  /***** HOOKS *****/
  const { player } = use(PlayerContext);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {Object.entries(player.mana).map(([domain, mana]) => (
        <div key={domain} className={styles.item}>
          {domain}: {mana}
        </div>
      ))}
    </div>
  );
};
