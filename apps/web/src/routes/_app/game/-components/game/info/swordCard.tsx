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

  const shieldCard = field.find(({ cardId }) => CARD_LIBRARY[cardId as keyof typeof CARD_LIBRARY].type === "WEAPON");
  if (!shieldCard)
    return (
      <div className={styles.playerShield}>
        <div className={styles.shield}>
          <SwordIcon weight="fill" size={53} color="#FFFFFF20" />
        </div>
      </div>
    );

  return (
    <div
      className={styles.playerShield}
      // TODO: implement a hover state for when you hover for 2s it will show the DisplayCard component and ensure that it does not go off the screen (so will go to the top-left or botom-right or whatever) the card component should show about 20px away from wherre its hovered. Make it dynamic to handle this use for other locations.
    >
      <img src={CARD_IMAGE[shieldCard.cardId]} className={styles.infoCard} />
    </div>
  );
};
