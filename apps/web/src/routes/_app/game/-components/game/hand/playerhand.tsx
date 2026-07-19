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

type HandStyle = CSSProperties & {
  "--dynamic-gap": string;
};

type EnteringCardStyle = CSSProperties & {
  "--entering-center-x": string;
};

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
  const cardWidth = 180;
  const card_width = 200;
  // Set the gap so that card are evenly spaced, and 5 fit within the width, but any more and they overlap
  const gap = (width - card_width * 4) / 10;
  const handGap = player.hand.length >= 6 ? -15 : 5;
  const cardStep = cardWidth + handGap;
  const handCenter = (player.hand.length * cardStep) / 2;
  const containerStyle: HandStyle = { "--dynamic-gap": `${gap}px` };

  /***** FUNCTIONS *****/
  const clearEnteringCard = (cardId: Game.CardId) => {
    setEnteringPlayerHandIds((previousIds) => {
      if (!previousIds.has(cardId)) return previousIds;

      const nextIds = new Set(previousIds);
      nextIds.delete(cardId);
      return nextIds;
    });
  };

  /***** HOOKS *****/
  return (
    <div
      className={styles.container}
      style={containerStyle}
    >
      {player.hand.map((card, index) => {
        const cardCenter = index * cardStep + cardWidth / 2;
        const enteringCardStyle: EnteringCardStyle = {
          "--entering-center-x": `${handCenter - cardCenter}px`,
        };

        return (
          <Card
            key={card.id}
            card={card}
            style={enteringCardStyle}
            className={classNames({
              [styles.entering]: enteringPlayerHandIds.has(card.id),
            })}
            onAnimationEnd={() => clearEnteringCard(card.id)}
          />
        );
      })}
    </div>
  );
};
