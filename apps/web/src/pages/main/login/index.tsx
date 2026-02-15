import { use } from "react";
import Logo from "../../assets/images/logo.png";
import { Button } from "../../components/Button";
import { GlobalContext } from "../../utils/context";
import "./mainpage.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const LoginForm = () => {
  const { setActivePage } = use(GlobalContext)!;
  /***** RENDER *****/
  return (
    <div className="MainPage">
      <img src={Logo} alt="" height={300} />
      <Button onClick={() => setActivePage("GAME")}>Start New Game</Button>
    </div>
  );
};
