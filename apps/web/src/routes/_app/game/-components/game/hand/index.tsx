import { Card } from "components/Card";
import { use, type CSSProperties } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./hand.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Hand = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);

  const width = 1170;
  const card_width = 200;
  // Set the gap so that card are evenly spaced, and 5 fit within the width, but any more and they overlap
  const gap = (width - card_width * 4) / 10;
  console.log(gap);

  /***** RENDER *****/
  return (
    <div className={styles.container} style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}>
      {player.hand.map((cardId, index) => {
        return <Card key={index} cardId={cardId} style={{ zIndex: index + 1 }} />;
      })}
    </div>
  );
};
