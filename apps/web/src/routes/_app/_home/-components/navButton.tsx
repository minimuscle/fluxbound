import type { Icon } from "@phosphor-icons/react";
import { Link, type ToOptions } from "@tanstack/react-router";
import { audioManager } from "utils/audio";
import styles from "./home.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type NavOptions =
  | {
      options: ToOptions;
      onClick?: never;
    }
  | {
      options?: never;
      onClick: () => void;
    };
type NavButton = React.FC<
  NavOptions & {
    icon: Icon;
    children: React.ReactNode;
  }
>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const NavButton: NavButton = ({ options, onClick, icon: Icon, children }) => {
  const Component = onClick ? "button" : Link;

  /***** RENDER *****/
  return (
    <Component {...options} onClick={onClick} className={styles.navButton} onMouseEnter={() => audioManager.playSoundEffect("buttonHover")}>
      <div className={styles.icon}>{<Icon weight="fill" size={48} color="#d5b864" />}</div>
      <div className={styles.text}>{children}</div>
    </Component>
  );
};
