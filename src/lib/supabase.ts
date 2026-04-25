import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single shared client — safe to import from server components and API routes
export const supabase = createClient(url, key);

// ── Types ──────────────────────────────────────────────────────────────────

export interface Video {
  id: number;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  youtube_id: string;
  topics: string[];
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  body: string;
  author: string;
  sort_order: number;
}

export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface HomepagePost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
  overlay_color: string;
  overlay_text_color: string;
  sort_order: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  post_count: number;
}

export interface FeaturedArticle {
  id: number;
  eyebrow: string;
  headline: string;
  description: string;
  button_text: string;
  button_href: string;
  background_image: string;
  article_image: string;
}
