import { use } from "react";
import type { Player } from "utils/types/game";
import { GameContext } from "../../../pages/SoloGame/utils/context";
import { CARD_LIBRARY } from "../library";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CardPermanents = React.FC<{
  player: Player;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardPermanents: CardPermanents = ({ player }) => {
  const {
    state: {
      [player.toLowerCase() as "player" | "enemy"]: { field },
    },
  } = use(GameContext)!;
  const runeCards = field.filter((card) => CARD_LIBRARY[card.id].type === "RUNE");

  return <div className="Runes"></div>;
};
