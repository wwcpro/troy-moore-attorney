import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning Attorney Houston, TX | Law Office of Troy M. Moore, PLLC",
  description:
    "Protect your family's future with wills, trusts, powers of attorney, and transfer-on-death deeds from Houston estate planning attorney Troy M. Moore.",
  alternates: { canonical: "https://troymoorelaw.com/estate-planning" },
};

export default function EstatePlanningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
