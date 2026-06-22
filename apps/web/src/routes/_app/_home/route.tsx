import { createFileRoute, Outlet } from "@tanstack/react-router";
import Movie from "assets/images/ui/menu/main/background_movie.mp4";
import Sigil from "assets/images/ui/menu/main/sigil.svg";
import Sigil2 from "assets/images/ui/menu/main/sigil2.svg";
import styles from "./-components/home.module.css";

export const Route = createFileRoute("/_app/_home")({
  component: RouteComponent,
});

function RouteComponent() {
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
      <img src={Sigil2} alt="" className={styles.sigil2} />
      <img src={Sigil} alt="" className={styles.sigil3} />
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.buildNumber}>{buildNumber}</div>
    </div>
  );
}
