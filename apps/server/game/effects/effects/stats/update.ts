import { type Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type UpdateStatsProps = {
  player: Game.PlayerState;
  gameCardId: Game.GameCard["id"];
  statOptions: Pick<Game.GameCard, "health" | "maxHealth" | "damage">;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const updateStats = ({ player, gameCardId, statOptions }: UpdateStatsProps) => {
  const selectedCard = player.field.find((fieldCard) => fieldCard.id === gameCardId);

  if (!selectedCard) throw new Error("No Card found");

  Object.assign(selectedCard, statOptions);
};
