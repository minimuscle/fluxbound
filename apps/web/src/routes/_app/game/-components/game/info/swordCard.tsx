import { CARD_LIBRARY } from "@fluxbound/schema";
import { SwordIcon } from "@phosphor-icons/react";
import { CardHoverPreview } from "components/GameCard/cardHoverPreview";
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

  const swordCard = field.find(({ cardId }) => CARD_LIBRARY[cardId].type === "WEAPON");
  if (!swordCard)
    return (
      <div className={styles.playerShield}>
        <div className={styles.shield}>
          <SwordIcon weight="fill" size={53} color="#FFFFFF20" />
        </div>
      </div>
    );

  return (
    <CardHoverPreview card={swordCard}>
      <div className={styles.playerShield}>
        <img src={CARD_IMAGE[swordCard.cardId]} className={styles.infoCard} />
      </div>
    </CardHoverPreview>
  );
};
