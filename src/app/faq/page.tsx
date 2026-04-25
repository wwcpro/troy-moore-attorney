import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema, speakableSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
import type { FaqItem } from "@/lib/supabase";
import faqFallback from "@/data/faq.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Law Office of Troy M. Moore, PLLC",
  description:
    "Answers to common questions about probate, estate planning, and personal injury law in Texas from Houston attorney Troy M. Moore.",
  alternates: { canonical: "https://troymoorelaw.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Law Office of Troy M. Moore, PLLC",
    description: "Answers to common questions about probate, estate planning, and personal injury law in Texas from Houston attorney Troy M. Moore.",
    url: "https://troymoorelaw.com/faq",
  },
};

export default async function FaqPage() {
  let faqData: FaqItem[] = faqFallback as FaqItem[];
  try {
    const { data } = await supabase.from("faq").select("*").order("sort_order");
    if (data && data.length > 0) faqData = data;
  } catch {
    // fall back to local JSON
  }

  return (
    <>
      <JsonLd data={faqSchema(faqData)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ])} />
      <JsonLd data={speakableSchema([".faq-q-text", ".faq-answer", "h1"])} />
      <Navbar />
      <main>
        <FaqClient faqData={faqData} />
      </main>
      <Footer />
    </>
  );
}
