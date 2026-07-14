import { GameContext } from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import { Hand } from "routes/_app/game/-components/game/hand";
import { PlayerInfoDivider } from "routes/_app/game/-components/game/info/divider";
import { PlayerInfoResources } from "routes/_app/game/-components/game/info/resources";
import { PlayerInfoShieldCard } from "routes/_app/game/-components/game/info/shieldCard";
import { PlayerInfoSwordCard } from "routes/_app/game/-components/game/info/swordCard";
import { NextTurnButton } from "routes/_app/game/-components/game/nextTurnButton";
import { useInvariant } from "utils/hooks/useInvariant";
import { truncate } from "utils/methods/truncate";
import styles from "./game.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  /***** HOOKS *****/
  const { state } = useInvariant(GameContext);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.playerInfo}>
          <div className={styles.player}>
            <div className={styles.playerAttunement}>
              <img src={DOMAIN_ICON[state.you.attunement]} />
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
          <div className={styles.playerShields}>
            <div className={styles.playerShield}>
              <PlayerInfoSwordCard field={state.you.field} />
            </div>
            <div className={styles.playerShield}>
              <PlayerInfoShieldCard field={state.you.field} />
            </div>
            <div className={styles.playerShield}>
              <PlayerInfoShieldCard field={state.you.field} />
            </div>
          </div>
          <PlayerInfoDivider />
          <PlayerInfoResources flux={state.you.flux} />
          <h1 className={styles.heading}>Resources</h1>
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
              <img src={DOMAIN_ICON[state.opponent.attunement]} />
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
          <div className={styles.playerShields}>
            <div className={styles.playerShield}>
              <PlayerInfoSwordCard field={state.opponent.field} />
            </div>
            <div className={styles.playerShield}>
              <PlayerInfoShieldCard field={state.opponent.field} />
            </div>
            <div className={styles.playerShield}>
              <PlayerInfoShieldCard field={state.opponent.field} />
            </div>
          </div>
          <PlayerInfoDivider />
          <h1 className={styles.heading}>Resources</h1>
          <PlayerInfoResources flux={state.you.flux} />
          <PlayerInfoDivider />
        </div>
        <NextTurnButton />
      </div>
    </div>
  );
};
