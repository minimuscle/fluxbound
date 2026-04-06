import classNames from "classnames";
import { Button } from "components/Button";
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
      <div className={styles.flex}>
        <button onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Novice
        </button>
        <button disabled onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Apprentice
        </button>
        <button disabled onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Adept
        </button>
        <button disabled onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Master
        </button>
        <button disabled onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          Grandmaster
        </button>
        <button disabled onClick={() => setIsSelected(1)} className={classNames(styles.container, { [styles.container__selected]: isSelected === 1 })}>
          THE OLD ONES
        </button>
      </div>
      <br />
      <Button className={styles.beginButton} disabled={!isSelected} onClick={() => ws?.send({ type: "game/startSolo" })}>
        Begin
      </Button>
    </>
  );
};
