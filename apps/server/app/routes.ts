import type { Game } from "@fluxbound/schema";
import { createClient } from "@supabase/supabase-js";
import type { Server } from "bun";
import { corsPreflight, withCors } from "../utils/cors";
import { user } from "./routes/user";

export type GameSocketData = { userId: Game.PlayerId; name: Game.PlayerName; roomId?: Game.RoomId };

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

      console.log("logging");
      if (!accessToken) return new Response("Unauthorized", { status: 401 });

      const supabase = createClient(process.env.DATABASE_URL!, process.env.DATABASE_SECRET_KEY!, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });

      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return new Response("Unauthorized", { status: 401 });

      const { data: playerDetails, error: detailsError } = await supabase.from("users").select("display_name").eq("id", data.user.id).maybeSingle();
      if (detailsError) return new Response(detailsError.message, { status: 500 });

      const playerName = playerDetails?.display_name ?? "Anon";

      const upgraded = server.upgrade(request, { data: { userId: data.user.id as Game.PlayerId, name: playerName as Game.PlayerName } });
      if (upgraded) return; // Bun takes over
      return new Response("Expected WebSocket upgrade", { status: 426 });
    },
  },

  /***** PRIVATE ROUTES *****/
  "/api/user": {
    GET: withCors(user.GET),
    OPTIONS: corsPreflight,
  },
  "/api/user/details": {
    GET: withCors(user.details.GET),
    OPTIONS: corsPreflight,
  },
  "/api/user/signup": {
    POST: withCors(user.signup.POST),
    OPTIONS: corsPreflight,
  },
  "/api/user/login": {
    POST: withCors(user.login.POST),
    OPTIONS: corsPreflight,
  },
  "/api/user/logout": {
    POST: withCors(user.logout.POST),
    OPTIONS: corsPreflight,
  },
} satisfies Bun.Serve.Options<GameSocketData>["routes"];
