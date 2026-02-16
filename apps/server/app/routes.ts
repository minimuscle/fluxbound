import { user } from "./routes/user";

export const routes = {
  /***** PUBLIC ROUTES *****/
  "/": {
    GET: () => new Response("Connection Successful"),
  },

  /***** PRIVATE ROUTES *****/
  "/api/user": {
    GET: user.GET,
  },
  "/api/user/details": {
    GET: user.details.GET,
  },
  "/api/user/signup": {
    POST: user.signup.POST,
  },
  "/api/user/login": {
    POST: user.login.POST,
  },
} satisfies Bun.Serve.Options<undefined>["routes"];
