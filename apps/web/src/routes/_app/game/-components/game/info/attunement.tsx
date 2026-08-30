import classNames from "classnames";
import {
  GameContext,
  SpellContext,
  WebSocketContext,
} from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import { truncate } from "utils/methods/truncate";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoAttunement = () => {
  const { player } = useInvariant(PlayerContext);
  const { state } = useInvariant(GameContext);
  const { websocket: ws } = useInvariant(WebSocketContext);
  const { spellTargets, cardId, setSpellCardId, setSpellTargets } =
    useInvariant(SpellContext);

  /***** FUNCTIONS *****/
  const handleClick = () => {
    if (
      (spellTargets?.includes("self") || spellTargets?.includes("opponent")) &&
      !!cardId
    ) {
      ws?.send({
        type: "game/play-card",
        cardId,
        target: [state.you.id === player.id ? "self" : "opponent"],
      });
      setSpellTargets(null);
      setSpellCardId(null);
      return;
    }
  };

  /***** RENDER *****/
  return (
    <div
      className={classNames(styles.player, {
        [styles.isPlayerTarget]: spellTargets?.includes(
          state.you.id === player.id ? "self" : "opponent",
        ),
      })}
      onClick={handleClick}
    >
      <div className={styles.playerAttunement}>
        <img src={DOMAIN_ICON[player.attunement]} />
      </div>
      <div className={styles.playerDetails}>
        <div className={styles.playerText}>{truncate(player.name, 25)}</div>
        <div className={styles.playerHealth}>
          <div
            className={styles.playerHealthBar}
            style={{
              width: `${(player.health / player.healthMax) * 100}%`,
            }}
          />
          <p>
            {player.health}/{player.healthMax}
          </p>
        </div>
      </div>
    </div>
  );
};
