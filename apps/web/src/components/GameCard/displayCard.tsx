import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import Overlay from "assets/images/cards/fire/blank.svg";
import { CARD_IMAGE, DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import "./card.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type DisplayCard = React.FC<{
  card: Game.GameCard;
  className?: string;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const DisplayCard: DisplayCard = ({ card }) => {
  const cardInfo = CARD_LIBRARY[card.cardId];

  /***** RENDER *****/
  return (
    <div className="Card">
      <img className="Card__image" src={CARD_IMAGE[card.cardId]} alt={cardInfo.name} />
      <img className="Card__overlay" src={Overlay} alt="" />
      <div className="Card__cost">{cardInfo.cost}</div>
      <div className="Card__name">{cardInfo.name}</div>
      <div className="Card__domain">
        <img src={DOMAIN_ICON[cardInfo.domain]} alt={cardInfo.name} />
      </div>
      <div className="Card__type">{cardInfo.type}</div>
      <div className="Card__description">{cardInfo.description}</div>
      {"damage" in cardInfo && <div className="Card__attack">{card.damage ?? cardInfo.damage}</div>}
      {"health" in cardInfo && <div className="Card__health">{card.health ?? cardInfo.health}</div>}
    </div>
  );
};
