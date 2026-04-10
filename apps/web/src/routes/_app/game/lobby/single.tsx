import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "components/Button/back";
import { SinglePlayerSelection } from "./-components/singlePlayer/selection";

export const Route = createFileRoute("/_app/game/lobby/single")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BackButton to="/" />
      <SinglePlayerSelection />
    </div>
  );
}
