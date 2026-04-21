import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import classNames from "classnames";
import { use } from "react";
import { WebSocketContext } from "routes/_app/game/-components/context";
import { useIsActivePlayer } from "utils/hooks/isActivePlayer";
import "./card.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  card: Game.GameCard;
  action?: "play" | "discard";
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({ card, action = "play" }) => {
  const cardInfo = CARD_LIBRARY[card.cardId];

  /***** HOOKS *****/
  const isActivePlayer = useIsActivePlayer();

  const context = use(WebSocketContext);
  const ws = context?.websocket;

  /***** FUNCTIONS *****/
  const handleClick = () => {
    if (action === "play") {
      ws?.send({ type: "game/play-card", cardId: card.id });
    }
    if (action === "discard") {
      ws?.send({ type: "game/discard-card", cardId: card.id });
    }
  };

  /***** RENDER *****/
  return (
    <button disabled={!isActivePlayer} className={classNames("Card", { Card__disband: action === "discard" })} onClick={handleClick}>
      {!!cardInfo.cost && (
        <div className="Card__cost">
          {cardInfo.cost}
          <div className="Card__domain">{cardInfo.domain}</div>
        </div>
      )}
      <div className="Card__name">{cardInfo.name}</div>
      <div className="Card__info">{cardInfo.description}</div>
      {"damage" in cardInfo && <div className="Card__damage">{cardInfo.damage}</div>}
      {"health" in cardInfo && <div className="Card__health">{cardInfo.health}</div>} d
    </button>
  );
};
