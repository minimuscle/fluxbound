import {
  GearSixIcon,
  PlayIcon,
  SignOutIcon,
  StackIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import Logo from "assets/images/ui/menu/main/logo.svg";
import MenuHolder from "assets/images/ui/menu/main/menuHolder.svg";
import MenuSpacer from "assets/images/ui/menu/main/menuSpacer.svg";
import { getUserStatsOptions } from "queries/getUserStats";
import { NavButton } from "routes/_app/_home/-components/navButton";
import styles from "./-components/home.module.css";

export const Route = createFileRoute("/_app/_home/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: gold } = useSuspenseQuery({
    ...getUserStatsOptions,
    select: ({ data }) => data.gold ?? 0,
  });

  /***** RENDER *****/
  return (
    <div className={styles.menu}>
      <img src={Logo} alt="" className={styles.logo} />
      <img src={MenuHolder} alt="" className={styles.menuHolder} />
      <NavButton options={{ to: "/game/lobby/single" }} icon={PlayIcon}>
        New Game
      </NavButton>
      <img src={MenuSpacer} alt="" className={styles.menuSpacer} />
      <NavButton options={{ to: "/game/lobby" }} icon={UsersIcon}>
        Multiplayer
      </NavButton>
      <img src={MenuSpacer} alt="" className={styles.menuSpacer} />
      <NavButton options={{ to: "/cards" }} icon={StackIcon}>
        Cards <small>({gold.toLocaleString()} gold)</small>
      </NavButton>
      <img src={MenuSpacer} alt="" className={styles.menuSpacer} />
      <NavButton options={{ to: "/game/lobby/single" }} icon={GearSixIcon}>
        Settings
      </NavButton>
      <img src={MenuSpacer} alt="" className={styles.menuSpacer} />
      <NavButton options={{ to: "/logout" }} icon={SignOutIcon}>
        Quit
      </NavButton>
      <img src={MenuHolder} alt="" className={styles.menuHolderBottom} />
    </div>
  );
}
