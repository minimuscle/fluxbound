import { queryOptions } from "@tanstack/react-query";
import { user } from "api/user";

export const getUserDetailsOptions = queryOptions({
  queryKey: ["user"],
  queryFn: user.details.GET,
});
