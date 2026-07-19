import { PlayerContext } from "routes/_app/game/-components/game/context";
import { DOMAIN_COLOR } from "routes/_app/game/-components/game/context/color";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/context/images";
import { typedEntries } from "utils/functions/typedObject";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoResources = () => {
  const {
    player: { flux },
  } = useInvariant(PlayerContext);

  /***** RENDER *****/
  return (
    <div className={styles.resourcesFlex}>
      {typedEntries(flux).map(([domain, amount]) => {
        return (
          <div key={domain} className={styles.resource}>
            <div className={styles.resourceIcon}>
              <img src={DOMAIN_ICON[domain]} width={25} height={25} />
            </div>
            <div className={styles.resouceSection}>
              <div className={styles.resourceText}>
                <p className={styles.resourceAmount}>{amount}</p>
                <p className={styles.resourceMax}>/ 100</p>
              </div>
              <div className={styles.resourceBar}>
                <div
                  className={styles.resourceBarFill}
                  style={{
                    width: `${Math.min(amount, 100)}%`,
                    backgroundColor: DOMAIN_COLOR[domain],
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
