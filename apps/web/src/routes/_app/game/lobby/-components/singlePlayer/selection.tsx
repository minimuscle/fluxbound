import HeadingBase from "assets/images/ui/menu/singlePlayerOpponent/headingBase.svg";
import HeadingSide from "assets/images/ui/menu/singlePlayerOpponent/headingSide.svg";
import { useState } from "react";
import { WebSocketContext } from "routes/_app/game/-components/context";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./selection.module.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const SinglePlayerSelection = () => {
  /***** STATE *****/
  const [isSelected, setIsSelected] = useState<number | null>(null);

  /***** HOOKS *****/
  const { websocket: ws } = useInvariant(WebSocketContext);

  /***** RENDER *****/
  return (
    <>
      <div className={styles.heading}>
        <img src={HeadingSide} alt="" className={styles.headingSide} />
        <h1 className={styles.text}>Select Opponent</h1>
        <img src={HeadingSide} alt="" className={styles.headingSide2} />
      </div>
      <img src={HeadingBase} alt="" className={styles.headingBase} />
    </>
    // <div className={styles.flexCol}>
    /* <h1>Single Player Game</h1>
      <div className={styles.flex}>
        <button onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Novice
        </button>
        <button disabled onClick={() => setIsSelected(2)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 2 })}>
          Apprentice
        </button>
        <button disabled onClick={() => setIsSelected(3)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 3 })}>
          Adept
        </button>
        <button disabled onClick={() => setIsSelected(4)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 4 })}>
          Master
        </button>
        <button disabled onClick={() => setIsSelected(5)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 5 })}>
          Grandmaster
        </button>
        <button disabled onClick={() => setIsSelected(6)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 6 })}>
          THE OLD ONES
        </button>
      </div>
      <br />
      <Button className={styles.beginButton} disabled={!isSelected} onClick={() => ws?.send({ type: "game/startSolo" })}>
        Begin
      </Button> */
    // </div>
  );
};
