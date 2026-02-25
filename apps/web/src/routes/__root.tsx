import type { CardType } from "@fluxbound/schema";
import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { user } from "api/user";
import { LoginForm } from "pages/main/login";
import "../App.scss";

const RootLayout = () => {
  /***** QUERIES *****/
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  const de: CardType = "CREATURE";

  /***** RENDER *****/
  return (
    <div className="MainContainer">
      {userData ? <Outlet /> : <LoginForm />}
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout, beforeLoad: () => {} });
