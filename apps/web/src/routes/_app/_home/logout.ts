import { createFileRoute, redirect } from "@tanstack/react-router";
import { user } from "api/user";

export const Route = createFileRoute("/_app/_home/logout")({
  loader: ({ context: { queryClient }, preload }) => {
    if (preload) return;
    queryClient.fetchQuery({
      queryKey: ["logout"],
      queryFn: user.logout,
    });
    localStorage.removeItem("access_token");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    throw redirect({ to: "/login" });
  },
});
