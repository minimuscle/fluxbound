import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { user } from "api/user";
import { LoginForm } from "pages/main/login";
import { audioManager } from "utils/audio";
import { useGameScale } from "utils/hooks/useGameScale";
import "../App.scss";

const RootLayout = () => {
  /***** QUERIES *****/
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });
  const scale = useGameScale();

  console.log("scale", scale);

  /***** RENDER *****/
  return (
    <div className="MainViewport">
      <div
        className="MainContainer"
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <button className="MainContainer__audio" onClick={() => audioManager.setMusicMuted(!audioManager.musicMuted)}>
          MUTE
        </button>
        {userData ? <Outlet /> : <LoginForm />}
        {/* <TanStackRouterDevtools /> */}
      </div>
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout, beforeLoad: () => {} });
