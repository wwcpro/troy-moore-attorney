import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import practicesData from "@/data/practices.json";
import videosData from "@/data/videos.json";
import teamData from "@/data/team.json";
import geoSlugs from "@/data/geo-practice-areas.json";

export const metadata: Metadata = {
  title: "Sitemap | Law Office of Troy M. Moore, PLLC",
  description:
    "Full sitemap for the Law Office of Troy M. Moore, PLLC — Houston probate and estate planning attorney.",
  alternates: { canonical: "https://troymoorelaw.com/sitemap" },
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

const SECTION_STYLE: React.CSSProperties = {
  marginBottom: "clamp(2.5rem, 4vw, 4rem)",
};

const HEADING_STYLE: React.CSSProperties = {
  color: "var(--navy)",
  fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
  fontWeight: 500,
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "2px solid var(--gold)",
  display: "inline-block",
};

const LIST_STYLE: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.45rem",
};

const LINK_STYLE: React.CSSProperties = {
  color: "var(--gold)",
  textDecoration: "none",
  fontSize: "clamp(0.85rem, 0.92vw, 1rem)",
  lineHeight: 1.6,
};

function slugToLabel(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bTx\b/, "TX")
    .replace(/\bTxdot\b/, "TxDOT");
}

export default function SitemapPage() {
  return (
    <>
      <Navbar />

      <main>
        <section
          style={{
            background: "var(--hero-gradient)",
            paddingTop: "calc(72px + clamp(3rem, 5vw, 6rem))",
            paddingBottom: "clamp(3rem, 5vw, 5rem)",
          }}
        >
          <div style={WRAP}>
            <p
              className="eyebrow"
              style={{
                color: "var(--gold)",
                marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
                fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
              }}
            >
              Navigation
            </p>
            <h1 style={{ color: "#ffffff", marginBottom: 0 }}>Sitemap</h1>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "clamp(2rem, 4vw, 4rem)",
                alignItems: "start",
              }}
            >
              {/* Main Pages */}
              <div style={SECTION_STYLE}>
                <h2 style={HEADING_STYLE}>Main Pages</h2>
                <ul style={LIST_STYLE}>
                  {[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: "/about" },
                    { label: "Probate", href: "/probate" },
                    { label: "Estate Planning", href: "/estate-planning" },
                    { label: "Practice Areas", href: "/practices" },
                    { label: "Blog", href: "/blog" },
                    { label: "Videos", href: "/videos" },
                    { label: "FAQ", href: "/faq" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((page) => (
                    <li key={page.href}>
                      <a href={page.href} style={LINK_STYLE}>{page.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Areas */}
              <div style={SECTION_STYLE}>
                <h2 style={HEADING_STYLE}>Practice Areas</h2>
                <ul style={LIST_STYLE}>
                  {(practicesData as { slug: string; title: string }[]).map((p) => (
                    <li key={p.slug}>
                      <a href={`/practices/${p.slug}`} style={LINK_STYLE}>{p.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Team */}
              <div style={SECTION_STYLE}>
                <h2 style={HEADING_STYLE}>Our Team</h2>
                <ul style={LIST_STYLE}>
                  <li><a href="/team-members" style={LINK_STYLE}>Meet the Team</a></li>
                  {(teamData as { slug: string; name: string }[]).map((m) => (
                    <li key={m.slug}>
                      <a href={`/team-members/${m.slug}`} style={LINK_STYLE}>{m.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Videos */}
              <div style={SECTION_STYLE}>
                <h2 style={HEADING_STYLE}>Videos</h2>
                <ul style={LIST_STYLE}>
                  <li><a href="/videos" style={LINK_STYLE}>All Videos</a></li>
                  {(videosData as { slug: string; title: string }[]).map((v) => (
                    <li key={v.slug}>
                      <a href={`/videos/${v.slug}`} style={LINK_STYLE}>{v.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Pages */}
              <div style={SECTION_STYLE}>
                <h2 style={HEADING_STYLE}>Legal</h2>
                <ul style={LIST_STYLE}>
                  {[
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Terms & Conditions", href: "/terms-and-conditions" },
                    { label: "Copyright Notice", href: "/copyright-notice" },
                    { label: "Anti-Spam Policy", href: "/anti-spam-policy" },
                    { label: "Helpful Links & Resources", href: "/helpful-links-resources" },
                  ].map((page) => (
                    <li key={page.href}>
                      <a href={page.href} style={LINK_STYLE}>{page.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Geo Practice Area Pages */}
              <div style={{ ...SECTION_STYLE, gridColumn: "1 / -1" }}>
                <h2 style={HEADING_STYLE}>Local Practice Area Pages</h2>
                <ul
                  style={{
                    ...LIST_STYLE,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "0.45rem clamp(1.5rem, 3vw, 3rem)",
                  }}
                >
                  {(geoSlugs as string[]).map((slug) => (
                    <li key={slug}>
                      <a href={`/practice-areas/${slug}`} style={LINK_STYLE}>
                        {slugToLabel(slug)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
