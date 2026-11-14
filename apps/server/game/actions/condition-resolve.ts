import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { getPlayer } from "game/helpers/get-player";
import { sendToRoom } from "utils/messaging";

export const conditionResolve = (state: Game.GameState, cardId?: Game.CardId): Game.GameState => {
  const player = getPlayer(state, state.activePlayer);
  const card = cardId === undefined ? player : player.field.find(({ id }) => id === cardId);
  if (!card) return state;

  const cardData = "cardId" in card ? CARD_LIBRARY[card.cardId] : undefined;

  for (const condition of card.conditions ?? []) {
    switch (condition.id) {
      case "burning":
        if (card.health) {
          card.health--;

          if (card.health <= 0) {
            player.field = player.field.filter(({ id }) => id !== cardId);
          }
        }
        break;
      case "generating":
        if (!cardData) break;
        player.flux[cardData.domain]++;
        break;
    }
    sendToRoom(state.roomId, { type: "game/effect", effect: "fireball", target: card.id });
    condition.length--;
  }
  card.conditions = card.conditions?.filter((condition) => condition.length > 0);
  return state;
};
