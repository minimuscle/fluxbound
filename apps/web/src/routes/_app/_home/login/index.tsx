import { createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "api/user";
import { LoginForm } from "pages/main/login";

export const Route = createFileRoute("/_app/_home/login/")({
  component: RouteComponent,
  beforeLoad: async ({ context: { queryClient } }) => {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: user.details.GET,
    });

    if (userData.status === 200) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <LoginForm />;
}
