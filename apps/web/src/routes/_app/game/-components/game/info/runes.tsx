import { CARD_LIBRARY, type Cards, type Game } from "@fluxbound/schema";
import { DOMAIN_COLOR } from "routes/_app/game/-components/game/context/color";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerInfoLargeRunes = React.FC<{
  field: Game.PlayerState["field"];
}>;

type GroupedRune = Game.GameCard & {
  amount: number;
  domain: Cards.Domain;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoLargeRunes: PlayerInfoLargeRunes = ({ field }) => {
  const groupedRunes = Array.from(
    field
      .reduce<Map<Cards.Domain, GroupedRune>>((groups, rune) => {
        const card = CARD_LIBRARY[rune.cardId as keyof typeof CARD_LIBRARY];
        if (card.type !== "RUNE") return groups;

        const groupedRune = groups.get(card.domain);
        if (groupedRune) {
          groupedRune.amount += 1;
          return groups;
        }

        groups.set(card.domain, { ...rune, amount: 1, domain: card.domain });
        return groups;
      }, new Map())
      .values(),
  );
  const runeSlotCount = Math.max(4, Math.ceil(groupedRunes.length / 4) * 4);
  const runeSlots = Array.from({ length: runeSlotCount }, (_, index) => groupedRunes[index]);

  /***** RENDER *****/
  return (
    <div className={styles.largeRunes}>
      {runeSlots.map((rune, index) => {
        return (
          <div key={rune?.domain ?? `empty-rune-${index}`} className={styles.rune}>
            {rune?.domain ? (
              <div className={styles.runeContent} style={{ "--backgroundColor": DOMAIN_COLOR[rune.domain] } as React.CSSProperties}>
                <img src={DOMAIN_ICON[rune.domain]} className={styles.runeImage} />
                <p className={styles.runeText}>{rune.amount}</p>
              </div>
            ) : (
              <div className={styles.runeEmpty} />
            )}
          </div>
        );
      })}
    </div>
  );
};
