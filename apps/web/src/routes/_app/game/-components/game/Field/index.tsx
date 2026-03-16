import { CARD_LIBRARY } from "@fluxbound/schema";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
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
        if (!card) return null;
        return <div key={card.id}>{CARD_LIBRARY[card.cardId].name}</div>;
      })}
    </div>
  );
};
