import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import Overlay from "assets/images/cards/fire/blank.svg";
import classNames from "classnames";
import { use, type AnimationEventHandler, type CSSProperties } from "react";
import {
  SpellContext,
  WebSocketContext,
} from "routes/_app/game/-components/context";
import {
  CARD_IMAGE,
  DOMAIN_ICON,
} from "routes/_app/game/-components/game/context/images";
import { useIsActivePlayer } from "utils/hooks/isActivePlayer";
import "./card.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  card: Game.GameCard;
  action?: "play" | "discard";
  className?: string;
  onAnimationEnd?: AnimationEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({
  card,
  action = "play",
  className,
  onAnimationEnd,
  style,
}) => {
  const cardInfo = CARD_LIBRARY[card.cardId];

  /***** HOOKS *****/
  const isActivePlayer = useIsActivePlayer();

  const context = use(WebSocketContext);
  const spellContext = use(SpellContext);
  const ws = context?.websocket;

  /***** FUNCTIONS *****/
  const handleClick = () => {
    if (action === "play" && cardInfo.type !== "SPELL") {
      ws?.send({ type: "game/play-card", cardId: card.id });
    }
    if (action === "discard") {
      ws?.send({ type: "game/discard-card", cardId: card.id });
    }
    if (action === "play" && cardInfo.type === "SPELL" && !!spellContext) {
      spellContext.setSpellTargets((cardInfo as Cards.Spell).targets);
      spellContext.setSpellCardId(card.id);
    }
  };

  /***** RENDER *****/
  return (
    <button
      disabled={!isActivePlayer}
      className={classNames("Card", className, {
        Card__disband: action === "discard",
      })}
      onClick={handleClick}
      onAnimationEnd={onAnimationEnd}
      style={style}
    >
      <img
        className="Card__image"
        src={CARD_IMAGE[card.cardId]}
        alt={cardInfo.name}
      />
      <img className="Card__overlay" src={Overlay} alt="" />
      <div className="Card__cost">{cardInfo.cost}</div>
      <div className="Card__name">{cardInfo.name}</div>
      <div className="Card__domain">
        <img src={DOMAIN_ICON[cardInfo.domain]} alt={cardInfo.name} />
      </div>
      <div className="Card__type">{cardInfo.type}</div>
      <div className="Card__description">{cardInfo.description}</div>
      {"damage" in cardInfo && (
        <div className="Card__attack">{cardInfo.damage}</div>
      )}
      {"health" in cardInfo && (
        <div className="Card__health">{cardInfo.health}</div>
      )}
    </button>
  );
};
