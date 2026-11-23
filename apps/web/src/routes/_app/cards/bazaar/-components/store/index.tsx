import { BASE_CARDS, CARD_LIBRARY } from "@fluxbound/schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserStatsOptions } from "queries/getUserStats";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { convertDecktoArray } from "utils/functions/deck";
import { typedEntries } from "utils/functions/typedObject";
import styles from "./store.module.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardStore = () => {
  /***** HOOKS *****/
  const { data: owned_cards } = useSuspenseQuery({ ...getUserStatsOptions, select: ({ data }) => convertDecktoArray(data.owned_cards) });

  const cards = typedEntries(BASE_CARDS).filter(([_, { purchasable }]) => purchasable);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {cards?.map(([cardId, card], index) => {
        return (
          <button
            key={index}
            className={styles.card}
            onClick={() =>
              setDeck((deck) => {
                if (card.type !== "RUNE" && deck.filter((id) => CARD_LIBRARY[id]?.name === card.name).length >= 6) {
                  return deck;
                }

                return [...deck, cardId];
              })
            }
          >
            <img src={CARD_IMAGE[cardId]} className={styles.card__image} />
            <div className={styles.card__name}>{card.name}</div>
          </button>
        );
      })}
    </div>
  );
};
