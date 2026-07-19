import type { Game } from "@fluxbound/schema";
import classNames from "classnames";
import { Card } from "components/Card";
import { EmptyCard } from "components/Card/empty";
import type { CSSProperties } from "react";
import styles from "./hand.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type OpponentHand = React.FC<{
  player: Game.PublicPlayerStateView;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const OpponentHand: OpponentHand = ({ player }) => {
  const width = 1170;
  const card_width = 200;
  const gap = (width - card_width * 4) / 10;

  const isDebug = import.meta.env.VITE_DEBUG === "true";

  /***** RENDER HELPERS *****/
  const renderCards = () => {
    if (isDebug) {
      // This should only be possible in debug mode, otherwise it will crash
      const enemy = player as unknown as Game.PlayerState;
      return enemy.hand.map((card, index) => {
        return <Card key={index} card={card} />;
      });
    }
    return Array.from({ length: player.handCount }).map((_, id) => (
      <EmptyCard key={id} />
    ));
  };

  /***** RENDER *****/
  return (
    <div
      className={classNames(styles.container, styles.enemy, {
        [styles.enemyDebug]: isDebug,
      })}
      style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}
    >
      {renderCards()}
    </div>
  );
};
