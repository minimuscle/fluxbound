import { queryOptions } from "@tanstack/react-query";
import { user } from "api/user";

export const userDetailsStaleTimeMs = 1000 * 60 * 5;

export const getUserDetailsOptions = queryOptions({
  queryKey: ["user"],
  queryFn: user.details.GET,
  staleTime: userDetailsStaleTimeMs,
});
