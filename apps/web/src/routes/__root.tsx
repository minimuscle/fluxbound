import { Application, extend } from "@pixi/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { user } from "api/user";
import { AnimatedSprite, Container, Graphics, Sprite } from "pixi.js";
import { useRef } from "react";
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

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  AnimatedSprite,
});

function RootLayout() {
  /***** HOOKS *****/
  const scale = useGameScale();
  const containerRef = useRef(null);

  /***** RENDER *****/
  return (
    <>
      <div className="MainViewport">
        <div
          className="MainContainer"
          ref={containerRef}
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <Application
            autoStart
            sharedTicker
            // width={1920}
            // height={1080}
            // // style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}
          />
          <button className="MainContainer__audio" onClick={() => audioManager.setMusicMuted(!audioManager.musicMuted)}>
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
