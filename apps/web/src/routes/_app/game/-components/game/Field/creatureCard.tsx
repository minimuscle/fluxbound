import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import type React from "react";
import { useInvariant } from "utils/hooks/useInvariant";
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
  const gameCardData = player.field.find((card) => card.id === cardId) as Game.GameCreatureCard;

  const cardData = CARD_LIBRARY[gameCardData.cardId] as Cards.Creature;

  /***** RENDER *****/
  if (!gameCardData || !cardData) return null;
  return (
    <div className={styles.creatureCard}>
      <p className={styles.name}>{cardData.name}</p>
      <p className={styles.health}>
        {gameCardData.damage ?? cardData.damage} | {gameCardData.health ?? cardData.health}
      </p>
    </div>
  );
};
