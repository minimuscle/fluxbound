import { createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "api/user";
import { LoginForm } from "pages/main/login";

export const Route = createFileRoute("/_app/_home/login/")({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    await queryClient
      .fetchQuery({
        queryKey: ["user"],
        queryFn: () => user.details.GET(),
      })
      .catch();
    throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  return <LoginForm />;
}
