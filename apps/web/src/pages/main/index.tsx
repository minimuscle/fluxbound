import { use } from "react";
import Logo from "../../assets/images/logo.png";
import { GlobalContext } from "../../utils/context";
import { LoginForm } from "./login";
import "./mainpage.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const MainPage = () => {
  const { setActivePage } = use(GlobalContext)!;
  /***** RENDER *****/
  return (
    <div className="MainPage">
      <img src={Logo} alt="" height={300} />
      <LoginForm />
      {/* <Button onClick={() => setActivePage("GAME")}>Start New Game</Button> */}
    </div>
  );
};
