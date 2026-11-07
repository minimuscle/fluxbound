import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { z } from "zod";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CreateCreatureProps = {
  player: Game.PlayerState;
  cardId: Cards.CardId;
  cardOptions?: Game.GameCreatureCard;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const createCreature = ({
  player,
  cardId,
  cardOptions,
}: CreateCreatureProps) => {
  const card = CARD_LIBRARY[cardId];
  if (!card || card.type !== "CREATURE") {
    throw new Error(`Cannot create creature from card: ${cardId}`);
  }
  const creatureCard: Game.GameCard = {
    ...card,
    id: z
      .custom<Game.CardId>((value) => typeof value === "string")
      .parse(crypto.randomUUID()),
    cardId,
    ...cardOptions,
  };
  player.field.push(creatureCard);
};
