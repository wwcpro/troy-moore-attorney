import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Troy M. Moore | Probate, Estate Planning & Trusts Attorney",
  description:
    "For 15+ years, Troy Moore has been Houston's go-to probate expert — helping families navigate loss, inheritance disputes, and estate planning with care and clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/rje6zmg.css"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
