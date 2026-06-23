import HeadingBase from "assets/images/ui/menu/singlePlayerOpponent/headingBase.svg";
import HeadingSide from "assets/images/ui/menu/singlePlayerOpponent/headingSide.svg";
import { useState } from "react";
import { WebSocketContext } from "routes/_app/game/-components/context";
import { SelectedOpponentContext } from "routes/_app/game/lobby/-components/singlePlayer/context";
import { OpponentOption } from "routes/_app/game/lobby/-components/singlePlayer/option";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./selection.module.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
export type Opponents = "novice" | "apprentice" | "adept" | "master" | "grandmaster" | "theOldOnes";
type SinglePlayerSelection = React.FC<{
  isLocked: boolean;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const SinglePlayerSelection: SinglePlayerSelection = ({ isLocked }) => {
  /***** STATE *****/
  const [selectedOpponent, setSelectedOpponent] = useState<Opponents | null>(null);

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
      <SelectedOpponentContext value={{ selectedOpponent, setSelectedOpponent }}>
        <div className={styles.flex}>
          <OpponentOption
            id="novice"
            isLocked={false}
            name="Novice"
            description="Has only just begun their journey, possessing little knowledge and relying heavily on guidance and basic instinct."
            cost={0}
            payout={5}
          />
          <OpponentOption
            id="apprentice"
            isLocked={isLocked}
            name="Apprentice"
            description="Understands foundational concepts and can perform simple tasks independently, though still learning through practice and mentorship."
            cost={5}
            payout={10}
          />
          <OpponentOption
            id="adept"
            isLocked={isLocked}
            name="Adept"
            description="Demonstrates solid competence and consistency, able to apply skills effectively in most situations without supervision."
            cost={10}
            payout={20}
          />
          <OpponentOption
            id="master"
            isLocked={isLocked}
            name="Master"
            description="Exhibits deep expertise and refined technique, capable of solving complex problems and teaching others with authority."
            cost={20}
            payout={40}
          />
          <OpponentOption
            id="grandmaster"
            isLocked={isLocked}
            name="Novice"
            description="Operates at the pinnacle of the discipline, innovating, redefining standards, and influencing the direction of the field itself."
            cost={30}
            payout={60}
          />
          {/* <OpponentOption
            id="theOldOnes"
            isLocked={isLocked}
            name="The Old Ones"
            description="Transcends conventional mastery, embodying ancient or near-mythical knowledge that shapes reality, perception, or the very nature of the craft."
            cost={50}
            payout={100}
          /> */}
        </div>
      </SelectedOpponentContext>
      <div className={styles.startButton}>
        <button disabled={!selectedOpponent} onClick={() => ws?.send({ type: "game/startSolo" })} className={styles.button}>
          Start Game
        </button>
      </div>
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
