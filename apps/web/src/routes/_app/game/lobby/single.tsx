import { createFileRoute } from "@tanstack/react-router";
import { SinglePlayerSelection } from "./-components/singlePlayer/selection";

export const Route = createFileRoute("/_app/game/lobby/single")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Single Player Game</h1>
      <SinglePlayerSelection />
    </div>
  );
}
