import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { ZodType } from "zod";
import type { AuthedRouteHandler, RouteHandler } from "./types";

function getBearerToken(request: Request): string | null {
  const authorizationHeader = request.headers.get("authorization");
  if (!authorizationHeader) return null;
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

const requireUser = async (request: Request): Promise<{ ok: true; supabase: SupabaseClient; userId: string } | { ok: false; response: Response }> => {
  const accessToken = getBearerToken(request);
  if (!accessToken) return { ok: false, response: new Response("Unauthorized", { status: 401 }) };

  const supabase = createClient(process.env.DATABASE_URL!, process.env.DATABASE_SECRET_KEY!, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) return { ok: false, response: new Response("Unauthorized", { status: 401 }) };

  return { ok: true, supabase, userId: data.user.id };
};

export const withAuth = (handler: AuthedRouteHandler): RouteHandler => {
  return async (request: Request) => {
    const authResult = await requireUser(request);
    if (!authResult.ok) return authResult.response;

    return handler({
      request,
      supabase: authResult.supabase,
      userId: authResult.userId,
    });
  };
};

export const ErrorResponse = (message: string, status?: number): Response => {
  return new Response(message, { status: status ?? 403 });
};

export const SuccessResponse = (message: string | object, status?: number): Response => {
  return new Response(JSON.stringify(message), { status: status ?? 200 });
};

type JsonRouteHandler<TSchema extends ZodType> = (context: { request: Request; body: TSchema["_output"] }) => Response | Promise<Response>;

type JsonParseResult<TSchema extends ZodType> = { ok: true; body: TSchema["_output"] } | { ok: false; response: Response };

export const parseJsonBody = async <TSchema extends ZodType>(request: Request, schema: TSchema): Promise<JsonParseResult<TSchema>> => {
  try {
    const json = await request.json();
    const result = await schema.safeParseAsync(json);
    if (!result.success) {
      const issue = result.error.issues[0];
      const message = issue?.message ?? "Invalid request body";
      return { ok: false, response: ErrorResponse(message, 400) };
    }
    return { ok: true, body: result.data };
  } catch {
    return { ok: false, response: ErrorResponse("Invalid JSON body", 400) };
  }
};

export const withJsonBody = <TSchema extends ZodType>(schema: TSchema, handler: JsonRouteHandler<TSchema>): RouteHandler => {
  return async (request: Request) => {
    const parsedBody = await parseJsonBody(request, schema);
    if (!parsedBody.ok) return parsedBody.response;
    return handler({ request, body: parsedBody.body });
  };
};
