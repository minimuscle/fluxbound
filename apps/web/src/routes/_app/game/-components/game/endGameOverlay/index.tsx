import { useSuspenseQuery } from "@tanstack/react-query";
import { user } from "api/user";
import { GameContext } from "routes/_app/game/-components/context";
import { Defeat } from "routes/_app/game/-components/game/endGameOverlay/defeat";
import { Victory } from "routes/_app/game/-components/game/endGameOverlay/victory";
import { useInvariant } from "utils/hooks/useInvariant";
import styles from "./overlay.module.css";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const EndGameOverlay = () => {
  /***** HOOKS *****/
  const { ended } = useInvariant(GameContext);
  const { data: userData } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(), //TODO: exteact these into queryOptions
  });

  /***** RENDER *****/
  if (!ended) return null;
  return (
    <div className={styles.endScreen}>
      {ended === userData?.data?.id ? <Victory /> : <Defeat />}
    </div>
  );
};
