import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { user } from "api/user";
import Logo from "assets/images/logo.png";
import { Button } from "components/Button";
import styles from "./-components/home.module.scss";

export const Route = createFileRoute("/_app/_home/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const navigate = Route.useNavigate();
  const buildNumber = __APP_VERSION__;

  /***** QUERIES *****/
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <div className={styles.circles} />
      <img src={Logo} alt="" height={300} className={styles.logo} />
      <Button onClick={() => navigate({ to: "/game/lobby" })}>New Game</Button>
      <Button onClick={() => navigate({ to: "/game/lobby" })}>Multiplayer</Button>
      <Button onClick={() => navigate({ to: "/game/lobby" })}>Cards</Button>
      <Button onClick={() => navigate({ to: "/game/lobby" })}>Settings</Button>
      <Button onClick={() => navigate({ to: "/game/lobby" })}>Quit</Button>
      <div className={styles.buildNumber}>{buildNumber}</div>
    </div>
  );
}
