import { queryOptions } from "@tanstack/react-query";
import { user } from "api/user";

export const getUserDeckOptions = queryOptions({
  queryKey: ["deck"],
  queryFn: user.getDeck,
});
