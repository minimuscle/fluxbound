import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserDetailsOptions } from "queries/getUserDetails";
import { use } from "react";
import { GameContext } from "routes/_app/game/-components/context";
import { AttunementArea } from "./attunement";
import { PlayerContext } from "./context";
import styles from "./game.module.css";
import { Hand } from "./hand";
import { Mana } from "./mana";
import { Play } from "./play";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  const { state } = use(GameContext)!;
  const { data: userId } = useSuspenseQuery({ ...getUserDetailsOptions, select: (data) => data.id });
  const player = userId === state.player1.id ? state.player1 : state.player2;
  const enemy = userId === state.player1.id ? state.player2 : state.player1;

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {/* <CoinToss startGame={() => {}} /> */}
      <PlayerContext value={{ stage: "ENEMY", player: enemy }}>
        <div className={styles.enemySection}>
          <AttunementArea />

          <div className={styles.middleSection}>
            <Hand />
            <Play />
          </div>
          <Mana />
        </div>
      </PlayerContext>
      <hr className={styles.divider} />
      <PlayerContext value={{ stage: "PLAYER", player }}>
        <div className={styles.playerSection}>
          <Mana />

          <div className={styles.middleSection}>
            <Play />
            <Hand />
          </div>

          <AttunementArea />
        </div>
      </PlayerContext>
    </div>
  );
};
