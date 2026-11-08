import { type Game } from "@fluxbound/schema";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type DestroyCardProps = {
  player: Game.PlayerState;
  gameCardId: Game.GameCard["id"];
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const destroyCard = ({ player, gameCardId }: DestroyCardProps) => {
  const selectedCardIndex = player.field.findIndex((fieldCard) => fieldCard.id === gameCardId);

  if (selectedCardIndex === -1) throw new Error("No Card found to destroy");

  player.field.splice(selectedCardIndex, 1);
};
