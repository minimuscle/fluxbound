import styles from "./game.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <div className={styles.enemySection}></div>
      <hr className={styles.divider} />
      <div className={styles.playerSection}></div>
    </div>
  );
};
