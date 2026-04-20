import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Law Office of Troy M. Moore, PLLC",
  description:
    "Answers to common questions about probate, estate planning, and personal injury law in Texas from Houston attorney Troy M. Moore.",
  alternates: { canonical: "https://troymoorelaw.com/faq" },
};

export default function FaqPage() {
  const faqs = (faqData as { question: string; answer: string }[]);
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ])} />
      <Navbar />
      <main>
        <FaqClient />
      </main>
      <Footer />
    </>
  );
}
