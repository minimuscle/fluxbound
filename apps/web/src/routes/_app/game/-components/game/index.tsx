import { use } from "react";
import { GameContext } from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { Hand } from "routes/_app/game/-components/game/hand";
import { PlayerInfoDivider } from "routes/_app/game/-components/game/info/divider";
import { getDomainIcon } from "routes/_app/game/-components/game/methods";
import { truncate } from "utils/methods/truncate";
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
            <div className={styles.playerDetails}>
              <div className={styles.playerText}>{truncate(state.you.name, 25)}</div>
              <div className={styles.playerHealth}>
                <div className={styles.playerHealthBar} style={{ width: `${(state.you.health / state.you.healthMax) * 100}%` }} />
                <p>
                  {state.you.health}/{state.you.healthMax}
                </p>
              </div>
            </div>
          </div>
          <PlayerInfoDivider />
          <PlayerInfoDivider />
        </div>
      </div>
      <div className={styles.gameSection}>
        <PlayerContext value={{ stage: "ENEMY", player: state.opponent }}>
          <Hand />
        </PlayerContext>
        <PlayerContext value={{ stage: "PLAYER", player: state.you }}>
          <Hand />
        </PlayerContext>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.enemyInfo}>
          <div className={styles.player}>
            <div className={styles.playerAttunement}>
              <img src={getDomainIcon(state.opponent.attunement)} />
            </div>
            <div className={styles.playerDetails}>
              <div className={styles.playerText}>{truncate(state.opponent.name, 25)}</div>
              <div className={styles.playerHealth}>
                <div className={styles.playerHealthBar} style={{ width: `${(state.opponent.health / state.opponent.healthMax) * 100}%` }} />
                <p>
                  {state.opponent.health}/{state.opponent.healthMax}
                </p>
              </div>
            </div>
          </div>
          <PlayerInfoDivider />
          <PlayerInfoDivider />
        </div>
        <button className={styles.nextTurnButton}>
          <p>{state.turn}</p>
          <h1>Next Turn</h1>
        </button>
      </div>
    </div>
  );
};
