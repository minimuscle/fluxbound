import { use } from "react";
import invariant from "tiny-invariant";

/**********************************************************************************************************
 *   HOOK START
 **********************************************************************************************************/
export const useInvariant = (context: React.Usable<unknown>) => {
  const myContext = use(context);
  invariant(myContext, "Context is not available");
  return myContext;
};
