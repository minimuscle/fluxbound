import { CARD_LIBRARY } from "@fluxbound/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "components/Button";
import { saveDeckOptions } from "mutations/saveDeck";
import { getUserDeckOptions } from "queries/getDeck";
import { useMemo } from "react";
import styles from "./currentDeck.module.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CurrentDeck = React.FC<{
  deck: string[];
  setDeck: (deck: string[]) => void;
}>;
/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CurrentDeck: CurrentDeck = ({ deck, setDeck }) => {
  /***** HOOKS *****/
  const queryClient = useQueryClient();
  const {
    mutate: saveDeck,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    ...saveDeckOptions,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: getUserDeckOptions.queryKey }),
  });

  const sortedDeck = useMemo(() => {
    const groupedCards = new Map<string, { index: number; count: number }>();

    deck.forEach((cardId, index) => {
      const existing = groupedCards.get(cardId);
      groupedCards.set(cardId, {
        index: existing?.index ?? index,
        count: (existing?.count ?? 0) + 1,
      });
    });

    return Array.from(groupedCards, ([cardId, { index, count }]) => ({
      cardId,
      card: CARD_LIBRARY[cardId],
      index,
      count,
    })).sort(
      (a, b) =>
        (a.card?.domain ?? "").localeCompare(b.card?.domain ?? "") ||
        Number(b.card?.type === "RUNE") - Number(a.card?.type === "RUNE") ||
        (a.card?.name ?? "").localeCompare(b.card?.name ?? ""),
    );
  }, [deck]);

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      {sortedDeck.map(({ cardId, card, index, count }) => {
        return (
          <button
            className={styles.card}
            key={cardId}
            onClick={() =>
              setDeck(deck.filter((_, cardIndex) => cardIndex !== index))
            }
          >
            <span>{card?.name}</span>
            <span>{count}</span>
          </button>
        );
      })}
      <Button
        disabled={isPending || deck.length < 30 || deck.length > 120}
        onClick={() => saveDeck(deck)} //TODO: this is a put and needs the deck id
      >
        {isPending ? "Saving…" : "Save"}
      </Button>
      {error && <p role="alert">{error.message}</p>}
      {isSuccess && <p role="status">Deck saved</p>}
    </div>
  );
};
