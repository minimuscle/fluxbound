import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { user } from "api/user";
import menuMusic from "assets/audio/menu.ogg";
import { LoginForm } from "pages/main/login";
import { useEffect } from "react";
import { audioManager } from "utils/audio";
import "../App.scss";

const RootLayout = () => {
  /***** QUERIES *****/
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** EFFECTS *****/
  useEffect(() => {
    audioManager.playBackgroundMusic(menuMusic);
    return () => {
      // only stop here if this screen truly owns the music
      audioManager.stopBackgroundMusic();
    };
  }, []);

  /***** RENDER *****/
  return (
    <div className="MainContainer">
      {userData ? <Outlet /> : <LoginForm />}
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout, beforeLoad: () => {} });
