import classNames from "classnames";
import { Button } from "components/Button";
import { useState } from "react";
import { WebSocketContext } from "routes/_app/game/-components/context";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./selection.module.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type SinglePlayerSelect = React.FC<{
  level: number;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const SinglePlayerSelection: SinglePlayerSelect = ({ level }) => {
  /***** STATE *****/
  const [isSelected, setIsSelected] = useState(false);

  /***** HOOKS *****/
  const { websocket: ws } = useInvariant(WebSocketContext);

  /***** RENDER *****/
  return (
    <>
      <button onClick={() => setIsSelected(true)} className={classNames(styles.container, { [styles.container__selected]: isSelected })}>
        AI Level {level}
      </button>
      <br />
      <Button className={styles.beginButton} disabled={!isSelected} onClick={() => ws?.send({ type: "game/startSolo" })}>
        Begin
      </Button>
    </>
  );
};
