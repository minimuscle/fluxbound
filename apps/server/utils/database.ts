import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.DATABASE_URL!, process.env.DATABASE_SECRET_KEY!);
 