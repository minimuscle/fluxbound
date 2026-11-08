import { type Game } from "@fluxbound/schema";
import type { CONDITIONS } from "@fluxbound/schema/src/conditions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type RemoveConditionProps = {
  player: Game.PlayerState;
  gameCardId: Game.GameCard["id"];
  conditionId: (typeof CONDITIONS)[number];
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const removeCondition = ({ player, gameCardId, conditionId }: RemoveConditionProps) => {
  const selectedCard = player.field.find((fieldCard) => fieldCard.id === gameCardId);

  if (!selectedCard) throw new Error("No Card found");

  selectedCard.conditions = selectedCard.conditions?.filter((condition) => condition.id !== conditionId);
};
