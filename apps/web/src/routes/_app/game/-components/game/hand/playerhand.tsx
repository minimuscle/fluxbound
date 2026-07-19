import type { Game } from "@fluxbound/schema";
import classNames from "classnames";
import { Card } from "components/Card";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./hand.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerHand = React.FC<{
  player: Game.PlayerState;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerHand: PlayerHand = ({ player }) => {
  /***** HOOKS *****/
  const previousHandIds = useRef<Set<Game.CardId> | null>(null);
  const [enteringPlayerHandIds, setEnteringPlayerHandIds] = useState(
    () => new Set<Game.CardId>(),
  );

  /***** EFFECTS *****/
  useLayoutEffect(() => {
    const previousIds = previousHandIds.current;
    const currentIds = new Set(player.hand.map((card) => card.id));

    if (previousIds === null) {
      setEnteringPlayerHandIds(new Set<Game.CardId>());
      previousHandIds.current = currentIds;
      return;
    }

    setEnteringPlayerHandIds(
      new Set(
        player.hand
          .filter((card) => !previousIds.has(card.id))
          .map((card) => card.id),
      ),
    );
    previousHandIds.current = currentIds;
  }, [player.hand]);

  /***** DERIVED *****/
  const width = 1170;
  const card_width = 200;
  // Set the gap so that card are evenly spaced, and 5 fit within the width, but any more and they overlap
  const gap = (width - card_width * 4) / 10;

  /***** HOOKS *****/
  return (
    <div
      className={styles.container}
      style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}
    >
      {player.hand.map((card, index) => {
        return (
          <Card
            key={index}
            card={card}
            className={classNames({
              [styles.entering]: enteringPlayerHandIds.has(card.id),
            })}
          />
        );
      })}
    </div>
  );
};
