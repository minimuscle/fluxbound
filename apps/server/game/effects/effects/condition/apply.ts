import { type Game } from "@fluxbound/schema";
import type { CONDITIONS } from "@fluxbound/schema/src/conditions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type ApplyConditionProps = {
  player: Game.PlayerState;
  gameCardId: Game.GameCard["id"];
  condition: {
    id: (typeof CONDITIONS)[number];
    length: number;
  };
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const applyCondition = ({ player, gameCardId, condition }: ApplyConditionProps) => {
  const selectedCard = player.field.find((fieldCard) => fieldCard.id === gameCardId);

  if (!selectedCard) throw new Error("No Card found");

  selectedCard.conditions = [...(selectedCard.conditions ?? []), condition];
};
