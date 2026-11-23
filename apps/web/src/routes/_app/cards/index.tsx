import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BackButton } from "components/BackButton";
import { getUserDeckOptions } from "queries/getDeck";
import { getUserStatsOptions } from "queries/getUserStats";
import { useState } from "react";
import { CardList } from "routes/_app/cards/-components/cardList";
import { CurrentDeck } from "routes/_app/cards/-components/currentDeck";
import { convertDecktoArray } from "utils/functions/deck";
import styles from "./-components/_card.module.scss";

export const Route = createFileRoute("/_app/cards/")({
  component: CardsPage,
});

function CardsPage() {
  /***** HOOKS *****/
  const { data: gold } = useSuspenseQuery({
    ...getUserStatsOptions,
    select: ({ data }) => data.gold ?? 0,
  });
  const { data } = useSuspenseQuery({
    ...getUserDeckOptions,
    select: ({ data }) => {
      return convertDecktoArray(data.deck);
    },
  });

  const [deck, setDeck] = useState(data);

  /***** RENDER *****/
  return (
    <>
      <BackButton to="/" />
      <Link to="/cards/bazaar" className={styles.navigationButton}>
        Bazaar
      </Link>
      <span className={styles.goldBalance}>Gold: {gold.toLocaleString()}</span>
      <div className={styles.container}>
        <CardList setDeck={setDeck} />
        <CurrentDeck deck={deck} setDeck={setDeck} />
      </div>
    </>
  );
}
