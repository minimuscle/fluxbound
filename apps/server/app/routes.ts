import type { Server } from "bun";
import { supabase } from "../utils/database";
import { user } from "./routes/user";

export type GameSocketData = { userId: string; roomId?: string };

export const routes = {
  /***** PUBLIC ROUTES *****/
  "/": {
    GET: () => new Response("Connection Successful"),
  },

  /***** WEBSOCKETS *****/
  "/game": {
    GET: async (request: Request, server: Server<GameSocketData>) => {
      const authorizationHeader = request.headers.get("authorization");
      const match = authorizationHeader?.match(/^Bearer\s+(.+)$/i);
      const accessToken = match?.[1] ?? new URL(request.url).searchParams.get("access_token");
      if (!accessToken) return new Response("Unauthorized", { status: 401 });

      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error || !data.user) return new Response("Unauthorized", { status: 401 });

      const upgraded = server.upgrade(request, { data: { userId: data.user.id } });
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
} satisfies Bun.Serve.Options<GameSocketData>["routes"];
