import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type ArticleCategory =
  | "El Primer Crack"
  | "Segundo Crack"
  | "Desarrollo"
  | "Origen"
  | "Radar de Impacto";

export type SiteStats = {
  // Manually maintained via the Supabase Table Editor. Single row, id = 1.
  read_rate_percent: number;
  countries_reached: number;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  slug: string;
  category: ArticleCategory;
  issue_number: number;
  notified: boolean;
};
