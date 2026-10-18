import {
  ErrorResponse,
  SuccessResponse,
  parseJsonBody,
  withAuth,
} from "utils/functions";
import { z } from "zod";

const saveDeckSchema = z.object({ deck: z.string() });

export const deck = {
  GET: withAuth(async ({ supabase, userId }) => {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("active_deck")
      .eq("id", userId)
      .single();
    if (userError) {
      return ErrorResponse(userError.message, 500);
    }
    if (!user || user.active_deck == null) {
      return ErrorResponse("No active deck found", 404);
    }

    const { data, error } = await supabase
      .from("decks")
      .select("*")
      .eq("id", user.active_deck)
      .single();
    if (error) {
      return ErrorResponse(error.message, 500);
    }
    if (!data) {
      return ErrorResponse("Deck not found", 404);
    }
    return SuccessResponse(data);
  }),

  PUT: withAuth(async ({ request, supabase, userId }) => {
    const parsedBody = await parseJsonBody(request, saveDeckSchema);
    if (!parsedBody.ok) return parsedBody.response;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("active_deck")
      .eq("id", userId)
      .single();
    if (userError) return ErrorResponse(userError.message, 500);
    if (!user || user.active_deck == null) {
      return ErrorResponse("No active deck found", 404);
    }

    const { data, error } = await supabase
      .from("decks")
      .update({ deck: parsedBody.body.deck })
      .eq("id", user.active_deck)
      .select("*")
      .maybeSingle();

    console.log(data, parsedBody);

    if (error) return ErrorResponse(error.message, 500);
    if (!data) return ErrorResponse("Deck not found", 404);
    return SuccessResponse(data);
  }),
};
