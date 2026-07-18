import { CARD_LIBRARY } from "@fluxbound/schema";
import classNames from "classnames";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { CreatureCard } from "routes/_app/game/-components/game/field/creatureCard";
import styles from "./play.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoField = () => {
  const { player, stage } = use(PlayerContext);

  /***** RENDER *****/
  return (
    <div
      className={classNames(styles.container, {
        [styles.enemy]: stage === "ENEMY",
      })}
    >
      {player.field
        .filter(({ cardId }) => CARD_LIBRARY[cardId].type === "CREATURE")
        .map(({ id }) => (
          <CreatureCard cardId={id} />
        ))}
    </div>
  );
};
