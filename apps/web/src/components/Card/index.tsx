import { CARD_LIBRARY, type Cards } from "@fluxbound/schema";
import "./card.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  cardId: Cards.CardId;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({ cardId }) => {
  const cardInfo = CARD_LIBRARY[cardId];
  console.log(cardInfo);

  /***** RENDER *****/
  return (
    <div className="Card">
      <div className="Card__cost">{cardInfo.cost}</div>
      <div className="Card__image"></div>
      <div className="Card__name">{cardInfo.name}</div>
      <div className="Card__description">{cardInfo.description}</div>
      <div className="Card__type">{cardInfo.type}</div>
    </div>
  );
};
