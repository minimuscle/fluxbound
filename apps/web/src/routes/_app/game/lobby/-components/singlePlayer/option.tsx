import Locked from "assets/images/ui/menu/singlePlayerOpponent/locked.svg";
import classNames from "classnames";
import { useContext, useState } from "react";
import { SelectedOpponentContext } from "routes/_app/game/lobby/-components/singlePlayer/context";
import { getOptionImage } from "routes/_app/game/lobby/-components/singlePlayer/methods";
import type { Opponents } from "routes/_app/game/lobby/-components/singlePlayer/selection";
import styles from "./selection.module.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type OpponentOption = React.FC<{
  id: Opponents;
  isLocked: boolean;
  name: string;
  description: string;
  cost: number;
  payout: number;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const OpponentOption: OpponentOption = ({ id, isLocked, name, description, cost, payout }) => {
  /***** HOOKS *****/
  const [isHovered, setIsHovered] = useState(false);
  const { selectedOpponent, setSelectedOpponent } = useContext(SelectedOpponentContext);
  const isSelected = selectedOpponent === id;

  /***** RENDER *****/
  return (
    <button
      className={classNames(styles.opponentOption, {
        [styles.opponentOptionLocked]: isLocked,
        [styles.opponentOptionHovered]: (isHovered || isSelected) && !isLocked,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLocked}
      onClick={() => !isLocked && setSelectedOpponent(id)}
    >
      {isLocked ? (
        <img src={Locked} alt="" className={styles.locked} height="100%" />
      ) : (
        <div className={styles.optionContent}>
          <img src={getOptionImage(id, "base")} alt="" className={classNames(styles.image, styles.baseImage)} />
          <img src={getOptionImage(id, "hover")} alt="" className={classNames(styles.image, styles.hoverImage)} />
          {/* <div className={styles.details}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Cost: {cost}</p>
            <p>Payout: {payout}</p>
          </div> */}
        </div>
      )}
    </button>
  );
};
