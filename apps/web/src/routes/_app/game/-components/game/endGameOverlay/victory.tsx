import { WebSocketContext } from "routes/_app/game/-components/context";
import { useInvariant } from "utils/hooks/useInvariant";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Victory = () => {
  /***** HOOKS *****/
  const { restartSinglePlayer } = useInvariant(WebSocketContext);
  /***** RENDER *****/
  return (
    <div>
      <h1>VICTORY</h1>
      <button onClick={restartSinglePlayer}>Restart</button>
    </div>
  );
};
