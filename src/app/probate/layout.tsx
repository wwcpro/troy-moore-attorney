import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Probate Attorney Houston, TX | Law Office of Troy M. Moore, PLLC",
  description:
    "Houston probate attorney Troy M. Moore guides families through the Texas probate process — from simple estates to complex will contests and fiduciary litigation.",
  alternates: { canonical: "https://troymoorelaw.com/probate" },
};

export default function ProbateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
