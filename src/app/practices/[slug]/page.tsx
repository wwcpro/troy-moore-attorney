import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import practicesData from "@/data/practices.json";

/* ─── Types ──────────────────────────────────────────────────────── */
interface PracticeSection {
  heading: string;
  body: string;
}

interface PracticeItem {
  slug: string;
  label: string;
  title: string;
  description: string;
  href: string;
  panel: {
    headline: string;
    sections: PracticeSection[];
  };
}

const PRACTICES = practicesData as PracticeItem[];

/* ─── Static params for pre-rendering ───────────────────────────── */
export async function generateStaticParams() {
  return PRACTICES.map((p) => ({ slug: p.slug }));
}

/* ─── Per-page metadata ──────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = PRACTICES.find((p) => p.slug === slug);
  if (!practice) return {};
  return {
    title: `${practice.title} | Law Office of Troy M. Moore, PLLC`,
    description: practice.description,
  };
}

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = PRACTICES.find((p) => p.slug === slug);
  if (!practice) notFound();

  return (
    <>
      <style>{`
        .practice-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
        }
        @media (max-width: 768px) {
          .practice-section-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--navy)",
            paddingTop: "calc(72px + clamp(4rem, 7vw, 8rem))",
            paddingBottom: "clamp(4rem, 6vw, 6rem)",
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
              {practice.label}
            </p>
            <h1
              style={{
                color: "#ffffff",
                marginBottom: "clamp(1.25rem, 2vw, 2rem)",
                maxWidth: "22ch",
              }}
            >
              {practice.title}
            </h1>
            <div style={{ width: 48, height: 2, backgroundColor: "var(--gold)", opacity: 0.8, marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }} />
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "clamp(1rem, 1.3vw, 1.45rem)",
                fontStyle: "italic",
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                lineHeight: 1.55,
                maxWidth: "52ch",
              }}
            >
              {practice.description}
            </p>
          </div>
        </section>

        {/* ── CONTENT SECTIONS ─────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            <div className="practice-section-grid">
              {practice.panel.sections.map((section, i) => (
                <div
                  key={i}
                  style={{
                    padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
                    background: i % 2 === 0 ? "var(--light-gray)" : "#ffffff",
                    borderRadius: 6,
                    borderLeft: "3px solid var(--gold)",
                  }}
                >
                  <h3
                    style={{
                      color: "var(--navy)",
                      fontSize: "clamp(1rem, 1.2vw, 1.35rem)",
                      fontWeight: 500,
                      marginBottom: "0.85rem",
                    }}
                  >
                    {section.heading}
                  </h3>
                  <p
                    style={{
                      color: "#6a7a8a",
                      lineHeight: 1.85,
                      fontSize: "clamp(0.85rem, 0.9vw, 1rem)",
                    }}
                  >
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BACK LINK + CTA ──────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "clamp(3rem, 5vw, 5rem)",
            paddingBottom: "clamp(3rem, 5vw, 5rem)",
          }}
        >
          <div style={{ ...WRAP, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
            <div>
              <p
                className="eyebrow"
                style={{ color: "var(--gold)", marginBottom: "0.5rem" }}
              >
                Law Office of Troy M. Moore, PLLC
              </p>
              <h2
                style={{
                  color: "var(--navy)",
                  marginBottom: "clamp(0.75rem, 1vw, 1rem)",
                  maxWidth: "36ch",
                }}
              >
                Ready to discuss your case?
              </h2>
              <p style={{ color: "#6a7a8a", lineHeight: 1.75, maxWidth: "44ch" }}>
                Contact us today for a consultation. The firm serves Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
              <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                Call (281) 609-0303
                <span className="cta-circle">
                  <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                    <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                    <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                    <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                </span>
              </a>
              <a
                href="/practices"
                style={{
                  color: "var(--navy)",
                  fontSize: "clamp(0.78rem, 0.85vw, 0.95rem)",
                  textDecoration: "none",
                  fontFamily: "var(--font-eyebrow)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  opacity: 0.65,
                }}
              >
                ← All Practice Areas
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
