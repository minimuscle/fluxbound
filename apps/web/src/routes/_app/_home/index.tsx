import { createFileRoute } from "@tanstack/react-router";
import Logo from "assets/images/logo.png";
import { Button } from "components/Button";
import styles from "./-components/home.module.scss";

export const Route = createFileRoute("/_app/_home/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const navigate = Route.useNavigate();

  // @ts-expect-error This is defined in the build process
  const buildNumber = __APP_VERSION__;

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <div className={styles.circles} />
      <img src={Logo} alt="" height={300} className={styles.logo} />
      <Button onClick={() => navigate({ to: "/game/lobby/single" })}>New Game</Button>
      <Button disabled onClick={() => navigate({ to: "/game/lobby" })}>
        Multiplayer
      </Button>
      <Button disabled onClick={() => navigate({ to: "/game/lobby" })}>
        Cards
      </Button>
      <Button disabled onClick={() => navigate({ to: "/game/lobby" })}>
        Settings
      </Button>
      <Button disabled onClick={() => navigate({ to: "/game/lobby" })}>
        Quit
      </Button>
      <div className={styles.buildNumber}>{buildNumber}</div>
    </div>
  );
}
