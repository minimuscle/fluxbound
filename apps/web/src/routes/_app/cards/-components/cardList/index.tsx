import { CARD_LIBRARY, type Cards } from "@fluxbound/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserStatsOptions } from "queries/getUserStats";
import type { Dispatch, SetStateAction } from "react";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import styles from "./cardList.module.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardList = ({ setDeck }: { setDeck: Dispatch<SetStateAction<Cards.CardId[]>> }) => {
  /***** HOOKS *****/
  const { data: owned_cards } = useSuspenseQuery({ ...getUserStatsOptions, select: ({ data }) => data.owned_cards?.split(" ") as Cards.CardId[] });
  const cardCounts = new Map<Cards.CardId, number>();
  for (const cardId of owned_cards ?? []) {
    cardCounts.set(cardId, (cardCounts.get(cardId) ?? 0) + 1);
  }

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {Array.from(cardCounts, ([cardId, count]) => {
        return (
          <button
            key={cardId}
            className={styles.card}
            onClick={() =>
              setDeck((deck) => {
                const limit = CARD_LIBRARY[cardId].type === "RUNE" ? count : Math.min(count, 6);
                if (deck.filter((id) => id === cardId).length >= limit) {
                  return deck;
                }

                return [...deck, cardId];
              })
            }
          >
            <img src={CARD_IMAGE[cardId]} className={styles.card__image} />
            <div className={styles.card__name}>{CARD_LIBRARY[cardId].name} ({count})</div>
          </button>
        );
      })}
    </div>
  );
};
