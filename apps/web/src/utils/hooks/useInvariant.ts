import { use } from "react";
import invariant from "tiny-invariant";

/**********************************************************************************************************
 *   HOOK START
 **********************************************************************************************************/
export const useInvariant = <T>(context: React.Usable<T>): NonNullable<T> => {
  const myContext = use(context);
  invariant(myContext, "Context is not available");
  return myContext;
};
