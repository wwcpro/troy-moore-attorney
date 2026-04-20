import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Areas | Law Office of Troy M. Moore, PLLC",
  description:
    "The Law Office of Troy M. Moore, PLLC handles probate, estate planning, will contests, life insurance disputes, and fiduciary litigation throughout Houston and Texas.",
  alternates: { canonical: "https://troymoorelaw.com/practices" },
};

export default function PracticesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
