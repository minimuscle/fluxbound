import type { Cards } from "@fluxbound/schema";
import { DOMAIN_ICON } from "routes/_app/game/-components/game/images";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerInfoResources = React.FC<{
  flux: Record<Cards.Domain, number>;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoResources: PlayerInfoResources = ({ flux }) => {
  //FIXME: this needs to be typed
  return (
    <div className={styles.resourcesFlex}>
      {Object.entries(flux).map(([domain, amount]: [Cards.Domain, number]) => {
        return (
          <div key={domain} className={styles.resource}>
            <div className={styles.resourceIcon}>
              <img src={DOMAIN_ICON[domain]} width={25} height={25} />
            </div>
            <div className={styles.resouceSection}>
              <div className={styles.resourceText}>
                <p className={styles.resourceAmount}>{amount === 0 ? "" : amount}100</p>
                <p className={styles.resourceMax}>/ 100</p>
              </div>
              <div className={styles.resourceBar}>
                <div className={styles.resourceBarFill} style={{ width: `${amount / 100}px` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
