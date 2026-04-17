import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Practice detail pages: /sub-practices/[slug]/ → /practices/[slug] ──
      {
        source: "/sub-practices/:slug/",
        destination: "/practices/:slug",
        permanent: true,
      },
      {
        source: "/sub-practices/:slug",
        destination: "/practices/:slug",
        permanent: true,
      },
      // ── Section indexes ──────────────────────────────────────────────────────
      {
        source: "/sub-practices/",
        destination: "/practices",
        permanent: true,
      },
      {
        source: "/sub-practices",
        destination: "/practices",
        permanent: true,
      },
      {
        source: "/practice-areas/",
        destination: "/practices",
        permanent: true,
      },
      // ── General pages ────────────────────────────────────────────────────────
      { source: "/about-us/",   destination: "/about",              permanent: true },
      { source: "/about-us",    destination: "/about",              permanent: true },
      { source: "/contact-us/", destination: "/contact",            permanent: true },
      { source: "/contact-us",  destination: "/contact",            permanent: true },
      { source: "/terms-of-use/",  destination: "/terms-and-conditions", permanent: true },
      { source: "/terms-of-use",   destination: "/terms-and-conditions", permanent: true },
      // ── Team ─────────────────────────────────────────────────────────────────
      { source: "/team-members/troy-moore/",    destination: "/team-members/troy-moore",    permanent: false },
      { source: "/team-members/tiffany-bell/",  destination: "/team-members/tiffany-bell",  permanent: false },
      { source: "/team-members/andrea-patino/", destination: "/team-members/andrea-patino", permanent: false },
      { source: "/team-members/",               destination: "/team-members",               permanent: false },
      // ── Standalone practice pages → nearest equivalent ───────────────────────
      {
        source: "/texas-transfer-on-death-deed/",
        destination: "/practices/houston-transfer-on-death-deed-attorney",
        permanent: true,
      },
      {
        source: "/texas-transfer-on-death-deed",
        destination: "/practices/houston-transfer-on-death-deed-attorney",
        permanent: true,
      },
      {
        source: "/medical-power-of-attorney/",
        destination: "/practices/living-wills",
        permanent: true,
      },
      {
        source: "/medical-power-of-attorney",
        destination: "/practices/living-wills",
        permanent: true,
      },
      {
        source: "/houston-financial-power-of-attorney-lawyer/",
        destination: "/practices/probate-avoidance-package",
        permanent: true,
      },
      {
        source: "/houston-financial-power-of-attorney-lawyer",
        destination: "/practices/probate-avoidance-package",
        permanent: true,
      },
      {
        source: "/houston-probate-alternatives-attorney/",
        destination: "/probate",
        permanent: true,
      },
      {
        source: "/houston-probate-alternatives-attorney",
        destination: "/probate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
