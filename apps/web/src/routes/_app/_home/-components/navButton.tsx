import type { Icon } from "@phosphor-icons/react";
import { Link, type ToOptions } from "@tanstack/react-router";
import { audioManager } from "utils/audio";
import styles from "./home.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type NavButton = React.FC<{
  to: ToOptions["to"];
  icon: Icon;
  children: React.ReactNode;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const NavButton: NavButton = ({ to, icon: Icon, children }) => {
  return (
    <Link to={to} className={styles.navButton} onMouseEnter={() => audioManager.playSoundEffect("buttonHover")}>
      <div className={styles.icon}>{<Icon weight="fill" size={48} color="#d5b864" />}</div>
      <div className={styles.text}>{children}</div>
    </Link>
  );
};
