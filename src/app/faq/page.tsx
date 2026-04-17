import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Law Office of Troy M. Moore, PLLC",
  description:
    "Answers to common questions about probate, estate planning, and personal injury law in Texas from Houston attorney Troy M. Moore.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <FaqClient />
      </main>
      <Footer />
    </>
  );
}
