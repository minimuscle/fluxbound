import classNames from "classnames";
import { audioManager } from "utils/audio";
import "./button.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Button = React.FC<
  {
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Button: Button = ({ children, className, ...restProps }) => {
  /***** RENDER *****/
  return (
    <button {...restProps} type="button" className={classNames("Button", className)} onMouseEnter={() => audioManager.playSoundEffect("buttonHover")}>
      {children}
    </button>
  );
};
