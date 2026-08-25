import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Article = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  slug: string;
  edition: string;
};
