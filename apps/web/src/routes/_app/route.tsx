import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import menuMusic from "assets/audio/menu.ogg";
import { useEffect } from "react";
import { audioManager } from "utils/audio";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

const menuRoutes = new Set(["/", "/game/lobby", "/game/lobby/single"]);

const normalizePathname = (pathname: string) => {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => normalizePathname(state.location.pathname),
  });

  useEffect(() => {
    if (menuRoutes.has(pathname)) {
      audioManager.playBackgroundMusic(menuMusic);
      return;
    }

    audioManager.stopBackgroundMusic();
  }, [pathname]);

  return <Outlet />;
}
