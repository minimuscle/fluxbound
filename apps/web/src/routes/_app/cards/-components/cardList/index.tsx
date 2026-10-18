import { BASE_CARDS, CARD_LIBRARY } from "@fluxbound/schema";
import type { Dispatch, SetStateAction } from "react";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { typedEntries } from "utils/functions/typedObject";
import styles from "./cardList.module.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardList = ({
  setDeck,
}: {
  setDeck: Dispatch<SetStateAction<string[]>>;
}) => {
  /***** HOOKS *****/
  const cards = typedEntries(BASE_CARDS);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {cards.map(([cardId, card], index) => {
        return (
          <button
            key={index}
            className={styles.card}
            onClick={() =>
              setDeck((deck) => {
                if (
                  card.type !== "RUNE" &&
                  deck.filter((id) => CARD_LIBRARY[id]?.name === card.name)
                    .length >= 6
                ) {
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
