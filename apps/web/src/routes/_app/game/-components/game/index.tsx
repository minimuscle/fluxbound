import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserDetailsOptions } from "queries/getUserDetails";
import { use } from "react";
import { GameContext } from "routes/_app/game/-components/context";
import { AttunementArea } from "./attunement";
import { PlayerContext } from "./context";
import { Field } from "./Field";
import styles from "./game.module.css";
import { Hand } from "./hand";
import { Mana } from "./mana";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  const { state } = use(GameContext)!;
  const { data: userId } = useSuspenseQuery({ ...getUserDetailsOptions, select: (data) => data.id });

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {/* <CoinToss startGame={() => {}} /> */}
      <PlayerContext value={{ stage: "ENEMY", player: state.opponent }}>
        <div className={styles.enemySection}>
          <AttunementArea />

          <div className={styles.middleSection}>
            <Hand />
            <Field />
          </div>
          <Mana />
        </div>
      </PlayerContext>
      <hr className={styles.divider} />
      <PlayerContext value={{ stage: "PLAYER", player: state.you }}>
        <div className={styles.playerSection}>
          <Mana />

          <div className={styles.middleSection}>
            <Field />
            <Hand />
          </div>

          <AttunementArea />
        </div>
      </PlayerContext>
    </div>
  );
};
