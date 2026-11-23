import { queryOptions } from "@tanstack/react-query";
import { user } from "api/user";

export const getUserStatsOptions = queryOptions({
  queryKey: ["user", "stats"],
  queryFn: user.stats.GET,
});
