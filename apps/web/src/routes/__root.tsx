import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { user } from "api/user";
import { audioManager } from "utils/audio";
import { useGameScale } from "utils/hooks/useGameScale";
import type { RouterContext } from "utils/types/router";
import "../App.scss";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: user.details.GET,
    });

    if (userData.status !== 200 && location.pathname !== "/login") {
      console.log("redirecting", userData);
      throw redirect({ to: "/login" });
    }
  },
});

function RootLayout() {
  /***** QUERIES *****/

  const scale = useGameScale();

  /***** RENDER *****/
  return (
    <>
      <div className="MainViewport">
        <div
          className="MainContainer"
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <button
            className="MainContainer__audio"
            onClick={() => audioManager.setMusicMuted(!audioManager.musicMuted)}
          >
            MUTE
          </button>
          <Outlet />
        </div>
      </div>
      <TanStackDevtools
        plugins={[
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Form",
            render: <FormDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
