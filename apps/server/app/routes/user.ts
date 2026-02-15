import { z } from "zod";
import { supabase } from "../../utils/database";
import { ErrorResponse, SuccessResponse, withAuth, withJsonBody } from "../../utils/functions";

const signupSchema = z.object({
  email: z.email("A valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const user = {
  GET: withAuth(async ({ supabase, userId }) => {
    const { data: existingUser, error: fetchError } = await supabase.from("users").select("*").maybeSingle();
    if (fetchError) {
      return ErrorResponse(fetchError.message, 500);
    }
    if (existingUser) {
      return SuccessResponse(existingUser);
    }

    const { data: newUser, error: insertError } = await supabase.from("users").insert({ id: userId, display_name: "Anon" }).select("*").single();
    if (insertError) {
      return ErrorResponse(insertError.message, 500);
    }

    return SuccessResponse(newUser);
  }),
  signup: {
    POST: withJsonBody(signupSchema, async ({ body }) => {
      const { email, password } = body;
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        return ErrorResponse(error.message);
      }
      return SuccessResponse("Sign Up Successful");
    }),
  },
  login: {
    POST: withJsonBody(signupSchema, async ({ body }) => {
      const { email, password } = body;
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return ErrorResponse(error.message);
      }

      const accessToken = data.session?.access_token;
      if (!accessToken) {
        return ErrorResponse("Login succeeded but no access token was returned", 500);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }),
  },
};
