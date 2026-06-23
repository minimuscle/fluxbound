import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import gameMusic from "assets/audio/game_track_1.mp3";
import menuMusic from "assets/audio/menu.ogg";
import Movie from "assets/images/ui/menu/main/background_movie.mp4";
import Sigil from "assets/images/ui/menu/main/sigil.svg";
import Sigil2 from "assets/images/ui/menu/main/sigil2.svg";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { audioManager } from "utils/audio";
import styles from "./_home/-components/home.module.css";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

const menuRoutes = new Set(["/", "/game/lobby", "/game/lobby/single", "/login/", "/signup/"]);
const positionOneRoutes = new Set(["/", "/login/", "/signup/"]);

function RouteComponent() {
  const pathname = useMatches({ select: (matches) => matches.at(-1)!.pathname });
  const isSigilPositionTwo = !positionOneRoutes.has(pathname);
  const isInitialSigilPositionTwo = useRef(isSigilPositionTwo).current;

  useEffect(() => {
    if (menuRoutes.has(pathname)) {
      audioManager.setMusicVolume(0.5);
      audioManager.playBackgroundMusic(menuMusic);
      return;
    }

    //Play in game music
    if (pathname === "/game/") {
      //TODO: add more game music sounds and switch between them.
      audioManager.stopBackgroundMusic();
      setTimeout(() => {
        audioManager.setMusicVolume(0.25);
        audioManager.playBackgroundMusic(gameMusic);
      }, 2000);
      return;
    }

    audioManager.stopBackgroundMusic();
  }, [pathname]);

  // @ts-expect-error This is defined in the build process
  const buildNumber = __APP_VERSION__;

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      {menuRoutes.has(pathname) && (
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
      )}
      <div className={styles.overlay} />
      <div
        className={classNames(styles.sigil, {
          [styles.sigilPositionTwo]: isSigilPositionTwo,
          [styles.sigilInitialPositionTwo]: isInitialSigilPositionTwo,
        })}
      >
        <img src={Sigil} alt="" className={styles.sigilImage} />
      </div>
      <div
        className={classNames(styles.sigil2, {
          [styles.sigil2PositionTwo]: isSigilPositionTwo,
          [styles.sigil2InitialPositionTwo]: isInitialSigilPositionTwo,
        })}
      >
        <img src={Sigil2} alt="" className={styles.sigil2Image} />
      </div>
      <div
        className={classNames(styles.sigil3, {
          [styles.sigil3PositionTwo]: isSigilPositionTwo,
          [styles.sigil3InitialPositionTwo]: isInitialSigilPositionTwo,
        })}
      >
        <img src={Sigil} alt="" className={styles.sigil3Image} />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.buildNumber}>{buildNumber}</div>
    </div>
  );
}
