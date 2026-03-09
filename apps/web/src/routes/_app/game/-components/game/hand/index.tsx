import classNames from "classnames";
import { Card } from "components/Card";
import { EmptyCard } from "components/Card/empty";
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

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })} style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}>
      {player.hand.map((card, index) => {
        if (!card) return <EmptyCard key={index} />;
        return <Card key={index} card={card} />;
      })}
    </div>
  );
};
