import { FireSimpleIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { checkIsActionable } from "pages/SoloGame/utils/functions";
import { use } from "react";
import type { Player } from "utils/types/game";
import { GameContext } from "../../pages/SoloGame/utils/context";
import "./cards.scss";
import { CARD_LIBRARY } from "./library";
import { CardTooltip } from "./tooltip";
import type { GameCard } from "./types";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  card: GameCard;
  isActive?: boolean;
  index?: number;
  player: Player;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({ card, isActive, player }) => {
  const { gameCardId, id, damage, health } = card;
  const cardData = CARD_LIBRARY[id];
  const { state, dispatch } = use(GameContext)!;

  const isActivatable = checkIsActionable(card, state) && player === "PLAYER";

  /***** RENDER *****/
  return (
    <CardTooltip card={card}>
      {isActive ? (
        <button
          onClick={() =>
            state.activePlayer === "PLAYER" ? dispatch({ phase: "ACTIVATE_CARD", card: gameCardId }) : dispatch({ phase: "PLAY_CARD", card: gameCardId })
          }
          className={classNames("Card--active", { "Card--active--activatable": isActivatable })}
        >
          <p className="Card--active__name">{cardData.name}</p>
          {cardData.type === "CREATURE" && (
            <p className="Card--active__stats">
              {damage ?? cardData.damage} / {health ?? cardData.health}
            </p>
          )}
        </button>
      ) : player === "ENEMY" && import.meta.env.VITE_DEBUG === "false" ? (
        <div className="Card Card--hidden" />
      ) : (
        <button onClick={() => dispatch({ phase: "PLAY_CARD", card: gameCardId })} className="Card">
          <p>{cardData.name}</p>
          <div className="Card__cost">
            {cardData.cost === 0 ? (
              ""
            ) : (
              <>
                <FireSimpleIcon weight="fill" /> {cardData.cost}
              </>
            )}
          </div>
        </button>
      )}
    </CardTooltip>
  );
};
