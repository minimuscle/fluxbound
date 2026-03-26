import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import classNames from "classnames";
import type React from "react";
import { useInvariant } from "utils/hooks/useInvariant";
import { WebSocketContext } from "../../context";
import { PlayerContext } from "../context";
import styles from "./play.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CreatureCard = React.FC<{
  cardId: Game.CardId;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CreatureCard: CreatureCard = ({ cardId }) => {
  /***** HOOKS *****/
  const { player } = useInvariant(PlayerContext);
  const { websocket: ws } = useInvariant(WebSocketContext);
  const gameCardData = player.field.find((card) => card.id === cardId);
  if (!gameCardData) return null;

  const cardData = CARD_LIBRARY[gameCardData.cardId] as Cards.Creature;
  const isActivatable = (gameCardData.activations ?? cardData.activations) > 0;

  /***** RENDER *****/
  if (!cardData) return null;
  return (
    <div
      className={classNames(styles.creatureCard, { [styles.isActivatable]: isActivatable })}
      onClick={() => ws?.send({ type: "game/activate-card", cardId })}
    >
      <p className={styles.name}>{cardData.name}</p>
      <p className={styles.health}>
        {gameCardData.damage ?? cardData.damage} | {gameCardData.health ?? cardData.health}
      </p>
    </div>
  );
};
