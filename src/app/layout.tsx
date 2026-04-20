import type { Metadata } from "next";
import "./globals.css";
import TransitionManager from "@/components/TransitionManager";
import FixedCTA from "@/components/FixedCTA";
import JsonLd from "@/components/JsonLd";
import { orgSchema, websiteSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  metadataBase: new URL("https://troymoorelaw.com"),
  title: {
    default: "Troy M. Moore | Probate, Estate Planning & Trusts Attorney",
    template: "%s | Law Office of Troy M. Moore, PLLC",
  },
  description:
    "For 25+ years, Troy Moore has been Houston's trusted probate attorney — helping families navigate loss, inheritance disputes, and estate planning with care and clarity.",
  openGraph: {
    type: "website",
    siteName: "Law Office of Troy M. Moore, PLLC",
    images: [{ url: "/assets/about.webp", width: 1200, height: 630, alt: "Law Office of Troy M. Moore, PLLC" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/about.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
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
