import { ShieldStarIcon } from "@phosphor-icons/react";
import { use } from "react";
import type { Player } from "utils/types/game";
import { GameContext } from "../../../pages/SoloGame/utils/context";
import { CARD_LIBRARY } from "../library";
import { CardTooltip } from "../tooltip";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CardShield = React.FC<{
  player: Player;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardShield: CardShield = ({ player }) => {
  const {
    state: {
      [player.toLowerCase() as "player" | "enemy"]: { field },
    },
  } = use(GameContext)!;
  const shieldCard = field.filter((card) => CARD_LIBRARY[card.id].type === "SHIELD")[0];

  return (
    <div className="Shield">
      {shieldCard ? (
        <CardTooltip card={shieldCard}>
          <div className="Shield--active">{CARD_LIBRARY[shieldCard.id].name}</div>
        </CardTooltip>
      ) : (
        <ShieldStarIcon weight="bold" size={64} />
      )}
    </div>
  );
};
