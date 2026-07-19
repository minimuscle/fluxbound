import { CARD_LIBRARY } from "@fluxbound/schema";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoPermanents = () => {
  const {
    player: { field },
  } = useInvariant(PlayerContext);

  const permanents = field.filter(
    ({ cardId }) => CARD_LIBRARY[cardId].type === "PERMANENT",
  );

  const permanentSlotsCount = Math.max(5, Math.ceil(permanents.length / 5) * 5);
  const permanentSlots = Array.from(
    { length: permanentSlotsCount },
    (_, index) => permanents[index],
  );

  /***** RENDER *****/
  return (
    <div className={styles.permanents}>
      {permanentSlots.map((permanent, index) => {
        return (
          <div
            key={permanent?.cardId ?? `empty-permanent-${index}`}
            className={styles.permanent}
          >
            {permanent?.cardId ? (
              <img
                src={CARD_IMAGE[permanent.cardId]}
                className={styles.permanentImage}
              />
            ) : (
              <div className={styles.permanentEmpty} />
            )}
          </div>
        );
      })}
      {/* {runeSlots.map((rune, index) => {
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
      })} */}
    </div>
  );
};
