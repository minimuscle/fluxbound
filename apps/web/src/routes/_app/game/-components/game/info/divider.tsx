import Divider from "assets/images/ui/menu/game/info_divider.svg";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoDivider = () => {
  return <img src={Divider} width={175} className={styles.infoDivider} />;
};
