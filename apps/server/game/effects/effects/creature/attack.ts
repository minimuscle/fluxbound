import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { resolveCardEffect } from "game/rules/resolve-triggers";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type AttackCreatureProps = {
  state: Game.GameState;
  attacker: Game.GameCard;
  gameCardId: Game.GameCard["id"];
  damage: number;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const attackCreature = ({ state, attacker, gameCardId, damage }: AttackCreatureProps) => {
  for (const player of [state.player1, state.player2]) {
    const selectedCard = player.field.find((fieldCard) => fieldCard.id === gameCardId);
    if (!selectedCard) continue;

    if (CARD_LIBRARY[selectedCard.cardId].type !== "CREATURE" || selectedCard.health === undefined) {
      throw new Error("No creature found to attack");
    }

    selectedCard.health = Math.max(0, selectedCard.health - damage);
    resolveCardEffect(state, selectedCard, "onDamaged", undefined, player.id, {
      attacker,
      damage,
    });

    if (selectedCard.health <= 0) {
      const currentCardIndex = player.field.findIndex((fieldCard) => fieldCard.id === gameCardId);
      if (currentCardIndex !== -1) player.field.splice(currentCardIndex, 1);
    }
    return;
  }

  throw new Error("No creature found to attack");
};
