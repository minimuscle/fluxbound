import type { Game } from "@fluxbound/schema";
import { ClickAwayListener } from "@mui/material";
import classNames from "classnames";
import { Card } from "components/Card";
import { EmptyCard } from "components/Card/empty";
import { use, type CSSProperties } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { useInvariant } from "utils/hooks/useInvariant";
import { GameErrorContext } from "../../context";
import styles from "./hand.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Hand = () => {
  /***** HOOKS *****/
  const { gameError, setGameError } = useInvariant(GameErrorContext);
  const { stage, player } = use(PlayerContext);

  const width = 1170;
  const card_width = 200;
  // Set the gap so that card are evenly spaced, and 5 fit within the width, but any more and they overlap
  const gap = (width - card_width * 4) / 10;

  /***** RENDER HELPERS *****/
  const renderCards = () => {
    if (stage === "ENEMY") {
      if (import.meta.env.VITE_DEBUG === "true") {
        // This should only be possible in debug mode, otherwise it will crash
        const enemy = player as unknown as Game.PlayerState;
        return enemy.hand.map((card, index) => {
          return <Card key={index} card={card} />;
        });
      }
      return Array.from({ length: player.handCount }).map((_, id) => (
        <EmptyCard key={id} />
      ));
    }
    return player.hand.map((card, index) => {
      return <Card key={index} card={card} />;
    });
  };

  //TODO: handle when a new card is drawn, which should be added into the hand. New cards that appear should slide in from the left of the screen

  /***** RENDER *****/
  if (gameError === "TOO_MANY_CARDS_IN_HAND" && stage === "PLAYER")
    return (
      <ClickAwayListener onClickAway={() => setGameError(null)}>
        <div>
          <div className={styles.modal}>
            Too many cards, select one to discard
          </div>
          <div
            className={styles.container}
            style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}
          >
            {player.hand.map((card, index) => {
              return <Card key={index} card={card} action="discard" />;
            })}
          </div>
        </div>
      </ClickAwayListener>
    );
  return (
    <div
      className={classNames(styles.container, {
        [styles.enemy]: stage === "ENEMY",
      })}
      style={{ "--dynamic-gap": `${gap}px` } as CSSProperties}
    >
      {renderCards()}
    </div>
  );
};
