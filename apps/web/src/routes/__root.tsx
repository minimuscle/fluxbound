import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";
import { user } from "api/user";
import { audioManager } from "utils/audio";
import { useGameScale } from "utils/hooks/useGameScale";
import type { RouterContext } from "utils/types/router";
import "../App.scss";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  beforeLoad: async ({ context: { queryClient }, matches, location }) => {
    await queryClient
      .fetchQuery({
        queryKey: ["user"],
        queryFn: () => user.details.GET(),
      })
      .catch(() => {
        if (location.pathname !== "/login") throw redirect({ to: "/login" });
      });
  },
});

function RootLayout() {
  /***** QUERIES *****/

  const scale = useGameScale();

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
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </div>
    </div>
  );
}
