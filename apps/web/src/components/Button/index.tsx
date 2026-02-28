import classNames from "classnames";
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
  return (
    <button {...restProps} type="button" className={classNames("Button", className)}>
      {children}
    </button>
  );
};
