import { CARD_LIBRARY } from "@fluxbound/schema";
import { SwordIcon } from "@phosphor-icons/react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoSwordCard = () => {
  const {
    player: { field },
  } = useInvariant(PlayerContext);

  const shieldCard = field.find(
    ({ cardId }) =>
      CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "WEAPON",
  );
  if (!shieldCard)
    return (
      <div className={styles.playerShield}>
        <div className={styles.shield}>
          <SwordIcon weight="fill" size={53} color="#FFFFFF20" />
        </div>
      </div>
    );

  return (
    <div className={styles.playerShield}>
      <img src={CARD_IMAGE[shieldCard.cardId]} />
    </div>
  );
};
