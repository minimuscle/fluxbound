import type { RouteHandler } from "./types";

const frontendUrl = Bun.env.FRONTEND_URL;

if (!frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}

const corsHeaders = {
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Origin": frontendUrl,
  Vary: "Origin",
};

const addCorsHeaders = (response: Response): Response => {
  Object.entries(corsHeaders).forEach(([name, value]) =>
    response.headers.set(name, value),
  );
  return response;
};

export const withCors = (handler: RouteHandler): RouteHandler => {
  return async (request: Request) => addCorsHeaders(await handler(request));
};

export const corsPreflight = (): Response => {
  return new Response(null, { status: 204, headers: corsHeaders });
};
