import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BackButton } from "components/BackButton";
import { getUserDeckOptions } from "queries/getDeck";
import { useState } from "react";
import { CurrentDeck } from "routes/_app/cards/-components/currentDeck";
import { CardStore } from "routes/_app/cards/bazaar/-components/store";
import { convertDecktoArray } from "utils/functions/deck";
import styles from "./-components/_bazaar.module.scss";
import { getUserStatsOptions } from "queries/getUserStats";

export const Route = createFileRoute("/_app/cards/bazaar/")({
  component: BazaarPage,
});

function BazaarPage() {
  /***** HOOKS *****/
  const { data: gold } = useSuspenseQuery({ ...getUserStatsOptions, select: ({ data }) => data.gold ?? 0 });
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
      <Link to="/cards" className={styles.navigationButton}>
        Cards
      </Link>
      <span className={styles.goldBalance}>Gold: {gold.toLocaleString()}</span>
      <div className={styles.container}>
        <CardStore />
        <CurrentDeck deck={deck} setDeck={setDeck} />
      </div>
    </>
  );
}
