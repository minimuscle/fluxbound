import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerInfoLargeRunes = React.FC<{
  field: Game.PlayerState["field"];
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoLargeRunes: PlayerInfoLargeRunes = ({ field }) => {
  const runes = field.filter(({ cardId }) => CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "RUNE");

  // TODO: create a new variable called groupedRunes that groups the runes by domain, and adds a field "amount" to each group so that I can show how many of each rune there are in the map

  /***** RENDER *****/
  return (
    <div className={styles.LargeRunes}>
      {runes.map(({ cardId }) => {
        return <div key={rune} className={styles.rune}></div>;
      })}
    </div>
  );
};
