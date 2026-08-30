import { CARD_LIBRARY } from "@fluxbound/schema";
import { ShieldCheckeredIcon } from "@phosphor-icons/react";
import { PlayerContext } from "routes/_app/game/-components/game/context";
import { CARD_IMAGE } from "routes/_app/game/-components/game/context/images";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./info.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const PlayerInfoShieldCard = () => {
  const {
    player: { field },
  } = useInvariant(PlayerContext);

  const shieldCard = field.find(
    ({ cardId }) =>
      CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "SHIELD",
  );
  if (!shieldCard)
    return (
      <div className={styles.shield}>
        <ShieldCheckeredIcon weight="fill" size={53} color="#FFFFFF20" />
      </div>
    );

  return (
    <img src={CARD_IMAGE[shieldCard.cardId]} className={styles.infoCard} />
  );
};
