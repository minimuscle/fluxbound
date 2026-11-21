import { CARD_LIBRARY, getCardTriggers, type EffectContext, type Game } from "@fluxbound/schema";
import { CARD_EFFECTS } from "game/effects";
import { attackPlayer } from "game/effects/effects/player/attack";
import { getOpponent } from "./get-opponent";
import { getPlayer } from "./get-player";

/**********************************************************************************************************
 *   FUNCTION START
 **********************************************************************************************************/
export const calculateDamage = (state: Game.GameState): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const opponent = getOpponent(state, state.activePlayer);

  // Get a list of cards in a players field that have the damage property and not conditions that prevent attacking
  const damageCards = player.field
    .filter((card) => card.damage !== undefined)
    .filter(({ conditions }) => !conditions?.some(({ id }) => ["frozen", "paralyzed", "sleeping", "stunned"].includes(id)));

  console.log("field: ", player.field, damageCards);
  for (const card of damageCards) {
    const context = {
      state,
      player,
      opponent,
      card,
      attacker: card,
      damage: card.damage ?? 0,
    } satisfies EffectContext;
    if (getCardTriggers(CARD_LIBRARY[card.cardId]).includes("onBeforeAttack")) {
      CARD_EFFECTS[card.cardId]?.onBeforeAttack?.(context);
    }
    console.log("context: ", context);
    attackPlayer({ state, player: opponent, attacker: card, damage: context.damage });
  }

  // Ensure you can't go below 0
  opponent.health = Math.max(0, opponent.health);

  return state;
};
