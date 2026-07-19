import CardBack from "assets/images/ui/card_back.svg";
import classNames from "classnames";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoCardDeck = () => {
  const { stage, player } = useInvariant(PlayerContext);

  const deckCount = stage === "ENEMY" ? player.deckCount : player.deck.length;

  /***** RENDER *****/
  return (
    <div
      className={classNames(styles.playerDeck, {
        [styles.enemyDeck]: stage === "ENEMY",
      })}
    >
      <img src={CardBack} />
      <img src={CardBack} />
      <img src={CardBack} />
      <img src={CardBack} />
      <img src={CardBack} />
      <p>{deckCount}</p>
    </div>
  );
};
