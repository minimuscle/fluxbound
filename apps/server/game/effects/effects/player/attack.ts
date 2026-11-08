import { CARD_LIBRARY, getCardTriggers, type EffectContext, type Game } from "@fluxbound/schema";
import { CARD_EFFECTS } from "game/effects";
import { getOpponent } from "game/helpers/get-opponent";
import { resolveCardEffect } from "game/rules/resolve-triggers";

type AttackPlayerProps = {
  state: Game.GameState;
  player: Game.PlayerState;
  attacker: Game.GameCard;
  damage: number;
};

export const attackPlayer = ({ state, player, attacker, damage }: AttackPlayerProps) => {
  const opponent = getOpponent(state, player.id);
  const shields = player.field.filter((card) => CARD_LIBRARY[card.cardId].type === "SHIELD");
  const damageContext = shields.reduce(
    (context, card) => {
      context.card = card;
      if (getCardTriggers(CARD_LIBRARY[card.cardId]).includes("onBeforeDamage")) {
        CARD_EFFECTS[card.cardId]?.onBeforeDamage?.(context);
      }
      context.damage = Math.max(0, context.damage ?? 0);
      return context;
    },
    {
      state,
      player,
      opponent,
      card: attacker,
      attacker,
      damage: Math.max(0, damage),
    } satisfies EffectContext,
  );

  player.health = Math.max(0, player.health - damageContext.damage);

  if (damageContext.damage > 0) {
    for (const shield of shields) {
      resolveCardEffect(state, shield, "onDamaged", undefined, player.id, {
        attacker,
        damage: damageContext.damage,
      });
    }
  }
};
