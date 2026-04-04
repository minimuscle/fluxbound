import { CARD_LIBRARY } from "@fluxbound/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { getUserDetailsOptions } from "queries/getUserDetails";
import { use } from "react";
import { GameContext, WebSocketContext } from "routes/_app/game/-components/context";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./attunement.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const AttunementArea = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);
  const {
    state: { activePlayer },
  } = useInvariant(GameContext);
  const { websocket: ws } = useInvariant(WebSocketContext);
  const { data: user_name } = useSuspenseQuery({ ...getUserDetailsOptions, select: (data) => (data.id === player.id ? "You" : "Enemy") });

  /***** RENDER HELPERS *****/
  const shieldCard = player.field.find((card) => CARD_LIBRARY[card.cardId].type === "SHIELD")?.cardId;

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })}>
      <div className={styles.circles}>
        {stage === "PLAYER" && (
          <button
            disabled={activePlayer !== player.id}
            onClick={() => {
              ws?.send({ type: "game/end-turn" });
            }}
            className={styles.endTurn}
          >
            End Turn
          </button>
        )}
        <div className={styles.attunement}>{player.attunement}</div>
        <div className={styles.permanent}>Sword</div>
        <div className={styles.permanent}>{shieldCard ? CARD_LIBRARY[shieldCard].name : "Shield"}</div>
        <div className={styles.permanent}>Potion</div>
        <div>{user_name}</div>
        <div className={styles.runes}>
          Runes:
          {Array.from(
            player.field.reduce((runes, { cardId }) => {
              const card = CARD_LIBRARY[cardId];

              if (card.type !== "RUNE") {
                return runes;
              }

              runes.set(card.name, (runes.get(card.name) ?? 0) + 1);

              return runes;
            }, new Map<string, number>()),
          ).map(([name, count]) => (
            <div key={name}>
              {name} x{count}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.health}>
        {player.health} / {player.healthMax}
      </div>
    </div>
  );
};
