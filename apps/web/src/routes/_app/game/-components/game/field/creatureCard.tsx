import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { HeartIcon, SwordIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import type React from "react";
import { DOMAIN_BACKGROUND_COLOR } from "routes/_app/game/-components/game/context/color";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import { SpellContext, WebSocketContext } from "../../context";
import { PlayerContext } from "../context";
import styles from "./play.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CreatureCard = React.FC<{
  cardId: Game.CardId;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CreatureCard: CreatureCard = ({ cardId }) => {
  /***** HOOKS *****/
  const { player, stage } = useInvariant(PlayerContext);
  const { websocket: ws } = useInvariant(WebSocketContext);
  const {
    spellTargets,
    cardId: spellCardId,
    setSpellTargets,
    setSpellCardId,
  } = useInvariant(SpellContext);

  const gameCardData = player.field.find((card) => card.id === cardId);
  if (!gameCardData) return null;

  const cardData = CARD_LIBRARY[gameCardData.cardId] as Cards.Creature;
  const isActivatable = (gameCardData.activations ?? cardData.activations) > 0;

  /***** FUNCTIONS *****/
  const handleClick = () => {
    if (spellTargets?.includes("creature") && !!spellCardId) {
      ws?.send({
        type: "game/play-card",
        cardId: spellCardId,
        target: [cardId],
      });
      setSpellTargets(null);
      setSpellCardId(null);
      return;
    }
    if (isActivatable && stage === "PLAYER") {
      ws?.send({ type: "game/activate-card", cardId });
    }
  };
  console.log("card conditions: ", gameCardData.conditions);

  /***** RENDER *****/
  if (!cardData) return null;
  return (
    <div
      className={classNames(styles.creatureCard, {
        [styles.isActivatable]: isActivatable && stage === "PLAYER",
        [styles.isTarget]: spellTargets?.includes("creature"),

        /***** CONDITIONS *****/
        [styles.burning]: gameCardData.conditions?.some(
          ({ id }) => id === "burning",
        ),
      })}
      style={
        {
          "--background-color": DOMAIN_BACKGROUND_COLOR[cardData.domain],
        } as React.CSSProperties
      }
      onClick={handleClick}
    >
      <img src={CARD_IMAGE[gameCardData.cardId]} />
      <p className={styles.name}>{cardData.name}</p>
      <p className={styles.damage}>
        <SwordIcon weight="fill" color="#666666" size="18px" />
        {gameCardData.damage ?? cardData.damage}
      </p>
      <p className={styles.health}>
        <HeartIcon weight="fill" color="#6D1414" size="18px" />
        {gameCardData.health ?? cardData.health}
      </p>
    </div>
  );
};
