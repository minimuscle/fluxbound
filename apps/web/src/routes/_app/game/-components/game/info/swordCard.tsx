import { CARD_LIBRARY, type Game } from "@fluxbound/schema";
import { SwordIcon } from "@phosphor-icons/react";
import { CARD_IMAGE } from "routes/_app/game/-components/game/images";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type PlayerInfoSwordCard = React.FC<{
  field: Game.PlayerState["field"];
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoSwordCard: PlayerInfoSwordCard = ({ field }) => {
  const shieldCard = field.find(({ cardId }) => CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "WEAPON");
  if (!shieldCard)
    return (
      <div className={styles.shield}>
        <SwordIcon weight="fill" size={53} color="#FFFFFF20" />
      </div>
    );

  return <img src={CARD_IMAGE[shieldCard.cardId]} />;
};
