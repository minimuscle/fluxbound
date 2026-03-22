import { CARD_LIBRARY } from "@fluxbound/schema";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { CreatureCard } from "./creatureCard";
import styles from "./play.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Field = () => {
  const { player } = use(PlayerContext);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {player.field?.map((card) => {
        const cardData = CARD_LIBRARY[card.cardId];
        if (!card || !cardData || cardData.type !== "CREATURE") return null;
        return <CreatureCard key={card.id} cardId={card.id} />;
      })}
    </div>
  );
};
