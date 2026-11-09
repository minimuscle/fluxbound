import { Application, extend } from "@pixi/react";
import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import { useCallback, useEffect } from "react";
import { GameContext } from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { EndGameOverlay } from "routes/_app/game/-components/game/endGameOverlay";
import { PlayerInfoField } from "routes/_app/game/-components/game/field";
import { Hand } from "routes/_app/game/-components/game/hand";
import { PlayerInfoAttunement } from "routes/_app/game/-components/game/info/attunement";
import { PlayerInfoCardDeck } from "routes/_app/game/-components/game/info/cards";
import { PlayerInfoDivider } from "routes/_app/game/-components/game/info/divider";
import { PlayerInfoPermanents } from "routes/_app/game/-components/game/info/permanents";
import { PlayerInfoResources } from "routes/_app/game/-components/game/info/resources";
import { PlayerInfoLargeRunes } from "routes/_app/game/-components/game/info/runes";
import { PlayerInfoShieldCard } from "routes/_app/game/-components/game/info/shieldCard";
import { PlayerShields } from "routes/_app/game/-components/game/info/shields";
import { PlayerInfoSwordCard } from "routes/_app/game/-components/game/info/swordCard";
import { NextTurnButton } from "routes/_app/game/-components/game/nextTurnButton";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./game.module.css";
import { EffectsLayer } from "./effects";
import { EffectsContext } from "./effects/context";

extend({ Container, Graphics, Sprite, AnimatedSprite });

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Game = () => {
  /***** HOOKS *****/
  const { state } = useInvariant(GameContext);
  const { registerTarget, clearEffects } = useInvariant(EffectsContext);
  const playerTargetRef = useCallback((element: HTMLDivElement | null) => {
    if (element) return registerTarget("player", element);
  }, [registerTarget]);
  const opponentTargetRef = useCallback((element: HTMLDivElement | null) => {
    if (element) return registerTarget("opponent", element);
  }, [registerTarget]);

  useEffect(() => () => clearEffects(), [clearEffects]);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <Application autoStart width={1920} height={1080} backgroundAlpha={0} className={styles.effectsCanvas}>
        <EffectsLayer />
      </Application>
      <EndGameOverlay />
      <div className={styles.leftSection}>
        <PlayerContext value={{ stage: "PLAYER", player: state.you }}>
          <div className={styles.playerInfo} ref={playerTargetRef}>
            <PlayerInfoAttunement />
            <PlayerShields>
              <PlayerInfoSwordCard />
              <PlayerInfoSwordCard />
              <PlayerInfoShieldCard />
            </PlayerShields>
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
          <div className={styles.enemyInfo} ref={opponentTargetRef}>
            <PlayerInfoAttunement />
            <PlayerShields>
              <PlayerInfoSwordCard />
              <PlayerInfoSwordCard />
              <PlayerInfoShieldCard />
            </PlayerShields>
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
