import { CARD_LIBRARY, getCardActivationCost, getCardTriggers, type Game } from "@fluxbound/schema";
import { HeartIcon, SwordIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import type React from "react";
import { useCallback } from "react";
import { DOMAIN_BACKGROUND_COLOR } from "routes/_app/game/-components/game/context/color";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import { GameContext, SpellContext, WebSocketContext } from "../../context";
import { PlayerContext } from "../context";
import { EffectsContext } from "../effects/context";
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
  const { state } = useInvariant(GameContext);
  const { spellTargets, cardId: spellCardId, setSpellTargets, setSpellCardId } = useInvariant(SpellContext);
  const { registerTarget } = useInvariant(EffectsContext);
  const targetRef = useCallback((element: HTMLDivElement | null) => {
    if (element) return registerTarget(cardId, element);
  }, [cardId, registerTarget]);

  const gameCardData = player.field.find((card) => card.id === cardId);
  if (!gameCardData) return null;

  const cardData = CARD_LIBRARY[gameCardData.cardId];
  if (!cardData || cardData.type !== "CREATURE") return null;
  const activationCost = getCardActivationCost(cardData);
  const isActivatable =
    getCardTriggers(cardData).includes("onActivated") &&
    (gameCardData.activations ?? ("activations" in cardData ? cardData.activations : 0)) > 0 &&
    !!activationCost &&
    player.flux[activationCost.domain] >= activationCost.amount;

  /***** FUNCTIONS *****/
  const handleClick = () => {
    if (spellTargets?.includes("creature") && !!spellCardId) {
      const sourceCard = [...state.you.hand, ...state.you.field].find((card) => card.id === spellCardId);
      if (!sourceCard) return;
      ws?.send({
        type: CARD_LIBRARY[sourceCard.cardId]?.type === "SPELL" ? "game/play-card" : "game/activate-card",
        cardId: spellCardId,
        target: [cardId],
      });
      setSpellTargets(null);
      setSpellCardId(null);
      return;
    }
    if (isActivatable && stage === "PLAYER") {
      if (!("targets" in cardData)) {
        ws?.send({ type: "game/activate-card", cardId });
      } else {
        setSpellTargets(cardData.targets);
        setSpellCardId(cardId);
      }
    }
  };

  /***** RENDER *****/
  if (!cardData) return null;
  return (
    <div
      ref={targetRef}
      title={activationCost ? `Activate: ${activationCost.amount} ${activationCost.domain} Flux` : undefined}
      className={classNames(styles.creatureCard, {
        [styles.isActivatable]: isActivatable && stage === "PLAYER",
        [styles.isTarget]: spellTargets?.includes("creature") && spellCardId !== cardId,

        /***** CONDITIONS *****/
        [styles.burning]: gameCardData.conditions?.some(({ id }) => id === "burning"),
        [styles.frozen]: gameCardData.conditions?.some(({ id }) => id === "frozen"),
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
