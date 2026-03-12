import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { use } from "react";
import { WebSocketContext } from "routes/_app/game/-components/context";
import { useIsActivePlayer } from "utils/hooks/isActivePlayer";
import "./card.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  card: Game.GameCard;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({ card }) => {
  const cardInfo = CARD_LIBRARY[card.cardId];

  /***** HOOKS *****/
  const isActivePlayer = useIsActivePlayer();
  console.log(isActivePlayer);
  const context = use(WebSocketContext);
  const ws = context?.websocket;

  /***** RENDER *****/
  return (
    <button disabled={!isActivePlayer} className="Card" onClick={() => ws?.send({ type: "game/play-card", cardId: card.id })}>
      {!!cardInfo.cost && <div className="Card__cost">{cardInfo.cost}</div>}
      {/* <div className="Card__image"></div> */}
      <div className="Card__name">{cardInfo.name}</div>
    </button>
  );
};
