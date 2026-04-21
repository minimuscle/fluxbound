import type { Cards } from "@fluxbound/schema";
import AirIcon from "assets/images/domains/air.png";
import DarkIcon from "assets/images/domains/dark.png";
import EarthIcon from "assets/images/domains/earth.png";
import FireIcon from "assets/images/domains/fire.png";
import LightIcon from "assets/images/domains/light.png";
import LifeIcon from "assets/images/domains/life.png";
import AetherIcon from "assets/images/domains/aether.png";
import DeathIcon from "assets/images/domains/death.png";
import VoidIcon from "assets/images/domains/void.png";
import WaterIcon from "assets/images/domains/water.png";
import CardsIcon from "assets/images/ui/cards.svg";
import classNames from "classnames";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./flux.module.css";

const DOMAIN_ICONS: Record<Cards.Domain, string> = {
  FIRE: FireIcon,
  WATER: WaterIcon,
  EARTH: EarthIcon,
  AIR: AirIcon,
  LIGHT: LightIcon,
  DARK: DarkIcon,
  LIFE: LifeIcon,
  DEATH: DeathIcon,
  AETHER: AetherIcon,
  VOID: VoidIcon,
};

const DOMAINS: Cards.Domain[] = ["FIRE", "WATER", "EARTH", "AIR", "LIGHT", "DARK", "LIFE", "DEATH", "AETHER", "VOID"];

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Flux = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })}>
      {DOMAINS.map((domain) => (
        <div key={domain} className={styles.item}>
          <img src={DOMAIN_ICONS[domain]} alt={domain} width={30} /> {player.flux[domain]}
        </div>
      ))}
      <img src={CardsIcon} alt="Cards" width={30} /> {stage === "PLAYER" ? player.deck.length : player.deckCount}
    </div>
  );
};
