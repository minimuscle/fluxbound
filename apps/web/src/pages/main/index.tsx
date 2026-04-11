import { useQuery } from "@tanstack/react-query";
import { Button } from "components/Button";
import { use } from "react";
import { user } from "../../api/user";
import Logo from "../../assets/images/ui/logo.png";
import { GlobalContext } from "../../utils/context";
import { LoginForm } from "./login";
import "./mainpage.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const MainPage = () => {
  const { setActivePage } = use(GlobalContext)!;
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => user.details.GET(),
  });

  /***** RENDER *****/
  return (
    <div className="MainPage">
      <div className="MainPage__loginStatus">{userData && <p>Logged in as {userData.display_name}</p>}</div>
      <img src={Logo} alt="" height={300} />
      <Button onClick={() => setActivePage("SOLO_GAME")}>Start New Game (Local)</Button>
      {userData ? <Button onClick={() => setActivePage("GAME")}>Start New Game (Multiplayer)</Button> : <LoginForm />}
    </div>
  );
};
