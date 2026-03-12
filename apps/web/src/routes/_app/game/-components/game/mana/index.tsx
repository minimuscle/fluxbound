import type { Cards } from "@fluxbound/schema";
import CardsIcon from "assets/images/cards.svg";
import AirIcon from "assets/images/domains/block_air_jelly.png";
import DarkIcon from "assets/images/domains/block_demon_jelly.png";
import EarthIcon from "assets/images/domains/block_earth_jelly.png";
import FireIcon from "assets/images/domains/block_fire_jelly.png";
import LightIcon from "assets/images/domains/block_flash_jelly.png";
import LifeIcon from "assets/images/domains/block_forest_jelly.png";
import AetherIcon from "assets/images/domains/block_ice_jelly.png";
import DeathIcon from "assets/images/domains/block_lindworm_jelly.png";
import VoidIcon from "assets/images/domains/block_spirit_jelly.png";
import WaterIcon from "assets/images/domains/block_water_jelly.png";
import classNames from "classnames";
import { use } from "react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import styles from "./mana.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Mana = () => {
  /***** HOOKS *****/
  const { stage, player } = use(PlayerContext);

  const Icons: Record<Cards.Domain, string> = {
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

  /***** RENDER *****/
  return (
    <div className={classNames(styles.container, { [styles.enemy]: stage === "ENEMY" })}>
      {Object.entries(player.mana).map(([domain, mana]) => (
        <div key={domain} className={styles.item}>
          <img src={Icons[domain as keyof typeof Icons]} alt={domain} width={30} /> {mana}
        </div>
      ))}
      <img src={CardsIcon} alt="Cards" width={30} /> {player.deck.length}
    </div>
  );
};
