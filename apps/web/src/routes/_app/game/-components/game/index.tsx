import { GameContext } from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import { EndGameOverlay } from "routes/_app/game/-components/game/endGameOverlay";
import { PlayerInfoField } from "routes/_app/game/-components/game/field";
import { Hand } from "routes/_app/game/-components/game/hand";
import { PlayerInfoCardDeck } from "routes/_app/game/-components/game/info/cards";
import { PlayerInfoDivider } from "routes/_app/game/-components/game/info/divider";
import { PlayerInfoPermanents } from "routes/_app/game/-components/game/info/permanents";
import { PlayerInfoResources } from "routes/_app/game/-components/game/info/resources";
import { PlayerInfoLargeRunes } from "routes/_app/game/-components/game/info/runes";
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

  console.log(state);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <EndGameOverlay />
      <div className={styles.leftSection}>
        <PlayerContext value={{ stage: "PLAYER", player: state.you }}>
          <div className={styles.playerInfo}>
            <div className={styles.player}>
              <div className={styles.playerAttunement}>
                <img src={DOMAIN_ICON[state.you.attunement]} />
              </div>
              <div className={styles.playerDetails}>
                <div className={styles.playerText}>
                  {truncate(state.you.name, 25)}
                </div>
                <div className={styles.playerHealth}>
                  <div
                    className={styles.playerHealthBar}
                    style={{
                      width: `${(state.you.health / state.you.healthMax) * 100}%`,
                    }}
                  />
                  <p>
                    {state.you.health}/{state.you.healthMax}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.playerShields}>
              <div className={styles.playerShield}>
                <PlayerInfoSwordCard />
              </div>
              <div className={styles.playerShield}>
                <PlayerInfoShieldCard />
              </div>
              <div className={styles.playerShield}>
                <PlayerInfoShieldCard />
              </div>
            </div>
            <PlayerInfoDivider />
            <PlayerInfoResources />
            <h1 className={styles.heading}>Resources</h1>
            <PlayerInfoDivider />
            <PlayerInfoPermanents />
            <PlayerInfoLargeRunes />

            <h1 className={styles.heading}>Runes</h1>
          </div>
        </PlayerContext>
      </div>
      <div className={styles.gameSection}>
        <PlayerContext value={{ stage: "ENEMY", player: state.opponent }}>
          <PlayerInfoCardDeck />
          <Hand />
          <PlayerInfoField />
        </PlayerContext>
        <PlayerContext value={{ stage: "PLAYER", player: state.you }}>
          <PlayerInfoField />
          <Hand />
          <PlayerInfoCardDeck />
        </PlayerContext>
      </div>
      <div className={styles.rightSection}>
        <PlayerContext value={{ stage: "ENEMY", player: state.opponent }}>
          <div className={styles.enemyInfo}>
            <div className={styles.player}>
              <div className={styles.playerAttunement}>
                <img src={DOMAIN_ICON[state.opponent.attunement]} />
              </div>
              <div className={styles.playerDetails}>
                <div className={styles.playerText}>
                  {truncate(state.opponent.name, 25)}
                </div>
                <div className={styles.playerHealth}>
                  <div
                    className={styles.playerHealthBar}
                    style={{
                      width: `${(state.opponent.health / state.opponent.healthMax) * 100}%`,
                    }}
                  />
                  <p>
                    {state.opponent.health}/{state.opponent.healthMax}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.playerShields}>
              <div className={styles.playerShield}>
                <PlayerInfoSwordCard />
              </div>
              <div className={styles.playerShield}>
                <PlayerInfoShieldCard />
              </div>
              <div className={styles.playerShield}>
                <PlayerInfoShieldCard />
              </div>
            </div>
            <PlayerInfoDivider />
            <h1 className={styles.heading}>Resources</h1>
            <PlayerInfoResources />
            <PlayerInfoDivider />
            <h1 className={styles.heading}>Runes</h1>
            <PlayerInfoLargeRunes />

            <PlayerInfoPermanents />
          </div>
        </PlayerContext>
        <NextTurnButton />
      </div>
    </div>
  );
};
