import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { user } from "api/user";
import Logo from "assets/images/logo.png";
import "./-components/home.scss";

export const Route = createFileRoute("/_app/_home/")({
  component: RouteComponent,
});

function RouteComponent() {
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
      <Link to="/game_old">Start New Game (Local)</Link>
      <Link to="/game/lobby">Start New Game (Multiplayer)</Link>
    </div>
  );
}
