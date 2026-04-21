import { GearSixIcon, PlayIcon, SignOutIcon, StackIcon, UsersIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "assets/images/ui/logo.png";
import Movie from "assets/images/ui/menu/main/background_movie.mp4";
import Sigil from "assets/images/ui/menu/main/sigil.svg";
import { NavButton } from "routes/_app/_home/-components/navButton";
import styles from "./-components/home.module.css";

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
      <div className={styles.background} />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={styles.backgroundVideo}
        ref={(videoElement) => {
          if (videoElement) {
            videoElement.playbackRate = 1;
          }
        }}
      >
        <source src={Movie} type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <img src={Sigil} alt="" className={styles.sigil} />
      <img src={Sigil} alt="" className={styles.sigil2} />
      <img src={Sigil} alt="" className={styles.sigil3} />
      <img src={Logo} alt="" className={styles.logo} />
      <NavButton to="/game/lobby/single" icon={PlayIcon}>
        New Game
      </NavButton>
      <NavButton to="/game/lobby/single" icon={UsersIcon}>
        Multiplayer
      </NavButton>
      <NavButton to="/game/lobby/single" icon={StackIcon}>
        Cards
      </NavButton>
      <NavButton to="/game/lobby/single" icon={GearSixIcon}>
        Settings
      </NavButton>
      <NavButton to="/game/lobby/single" icon={SignOutIcon}>
        Quit
      </NavButton>
      <div className={styles.buildNumber}>{buildNumber}</div>
    </div>
  );
}
