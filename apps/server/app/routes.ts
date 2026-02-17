import type { Server } from "bun";
import { user } from "./routes/user";

export const routes = {
  /***** PUBLIC ROUTES *****/
  "/": {
    GET: () => new Response("Connection Successful"),
  },

  /***** WEBSOCKETS *****/
  "/game": {
    GET: (request: Request, server: Server<any>) => {
      const upgraded = server.upgrade(request);
      if (upgraded) return; // Bun takes over
      return new Response("Expected WebSocket upgrade", { status: 426 });
    },
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
