import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Firm | Law Office of Troy M. Moore, PLLC",
  description:
    "For 25+ years, the Law Office of Troy M. Moore, PLLC has guided Houston families through probate, estate planning, and will disputes with experience and compassion.",
  alternates: { canonical: "https://troymoorelaw.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
