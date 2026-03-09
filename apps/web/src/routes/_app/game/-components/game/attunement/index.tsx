import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { getUserDetailsOptions } from "queries/getUserDetails";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./attunement.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const AttunementArea = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);
  const { data: user_name } = useSuspenseQuery({ ...getUserDetailsOptions, select: (data) => (data.id === player.id ? "You" : "Enemy") });

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })}>
      <div className={styles.circles}>
        {stage === "PLAYER" && <div className={styles.endTurn}>End Turn</div>}
        <div className={styles.attunement}>{player.attunement}</div>
        <div className={styles.permanent}>Sword</div>
        <div className={styles.permanent}>Shield</div>
        <div className={styles.permanent}>Potion</div>
        <div>{user_name}</div>
      </div>
      <div className={styles.health}>
        {player.health} / {player.healthMax}
      </div>
    </div>
  );
};
