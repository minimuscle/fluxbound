import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import styles from "./-components/main.module.css";
import { SinglePlayerSelection } from "./-components/singlePlayer/selection";

export const Route = createFileRoute("/_app/game/lobby/single")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const [isLocked, toggleLocked] = useState(true);

  console.log("isLocked: ", isLocked);

  /***** RENDER *****/
  return (
    <div>
      <Link to="/" className={styles.backBtn} />
      <SinglePlayerSelection isLocked={isLocked} />
      <button style={{ position: "absolute", top: "0", right: 0 }} onClick={() => toggleLocked((prev) => !prev)}>
        Unlock ALL
      </button>
    </div>
  );
}
