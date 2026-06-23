import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { ShieldCheckeredIcon } from "@phosphor-icons/react";
import { CARD_IMAGE } from "routes/_app/game/-components/game/images";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerInfoShieldCard = React.FC<{
  field: Game.PlayerState["field"];
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoShieldCard: PlayerInfoShieldCard = ({ field }) => {
  const shieldCard = field.find(({ cardId }) => CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "SHIELD");
  if (!shieldCard)
    return (
      <div className={styles.shield}>
        <ShieldCheckeredIcon weight="fill" size={53} color="#FFFFFF20" />
      </div>
    );

  return <img src={CARD_IMAGE[shieldCard.cardId]} />;
};
