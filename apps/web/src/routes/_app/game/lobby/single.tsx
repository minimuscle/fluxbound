import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./-components/main.module.css";
import { SinglePlayerSelection } from "./-components/singlePlayer/selection";

export const Route = createFileRoute("/_app/game/lobby/single")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const navigate = Route.useNavigate();

  /***** RENDER *****/
  return (
    <div>
      <Link to="/" className={styles.backBtn} />
      <SinglePlayerSelection />
    </div>
  );
}
