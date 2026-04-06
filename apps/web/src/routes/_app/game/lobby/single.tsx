import { createFileRoute } from "@tanstack/react-router";
import { GamePage } from "pages/SoloGame";

export const Route = createFileRoute("/_app/game/lobby/single")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamePage />;
}
