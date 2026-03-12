import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { user } from "api/user";
import Logo from "assets/images/logo.png";
import { Button } from "components/Button";
import "./-components/home.scss";

export const Route = createFileRoute("/_app/_home/")({
  component: RouteComponent,
});

function RouteComponent() {
  /***** HOOKS *****/
  const navigate = Route.useNavigate();

  /***** QUERIES *****/
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** RENDER *****/
  return (
    <div className="MainPage">
      <div className="MainPage__loginStatus">{userData && <p>Logged in as {userData.display_name}</p>}</div>
      <img src={Logo} alt="" height={300} />
      <Button onClick={() => navigate({ to: "/game/lobby" })}>Start New Game</Button>
    </div>
  );
}
