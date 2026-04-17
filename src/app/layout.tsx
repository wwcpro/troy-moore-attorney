import type { Metadata } from "next";
import "./globals.css";
import TransitionManager from "@/components/TransitionManager";
import FixedCTA from "@/components/FixedCTA";
import JsonLd from "@/components/JsonLd";
import { orgSchema, websiteSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Troy M. Moore | Probate, Estate Planning & Trusts Attorney",
  description:
    "For 15+ years, Troy Moore has been Houston's go-to probate expert — helping families navigate loss, inheritance disputes, and estate planning with care and clarity.",
  openGraph: {
    images: [{ url: "/assets/about.webp", width: 1200, height: 630, alt: "Law Office of Troy M. Moore, PLLC" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/about.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rje6zmg.css" />
        <JsonLd data={[orgSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen">
        <TransitionManager>{children}</TransitionManager>
        <FixedCTA show={true} />
      </body>
    </html>
  );
}
