import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "components/BackButton";

export const Route = createFileRoute("/_app/cards/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BackButton to="/" />
    </div>
  );
}
