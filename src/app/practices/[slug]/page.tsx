import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQPreview from "@/components/FAQPreview";
import PageCTA from "@/components/PageCTA";
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
    alternates: { canonical: `https://troymoorelaw.com/practices/${slug}` },
  };
}

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

function getFaqCategory(label: string): "Probate" | "Estate Planning" | "Other Practices" {
  const up = label.toUpperCase();
  if (up.includes("ESTATE")) return "Estate Planning";
  if (up.includes("PERSONAL INJURY")) return "Other Practices";
  return "Probate";
}

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
            background: "var(--hero-gradient)",
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

        {/* ── FAQ PREVIEW ──────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(3.5rem, 5vw, 5rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
          }}
        >
          <div style={WRAP}>
            <p
              className="eyebrow"
              style={{
                color: "var(--gold)",
                fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                marginBottom: "0.6rem",
              }}
            >
              Common Questions
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "clamp(1.5rem, 2vw, 2rem)",
              }}
            >
              <h2
                style={{
                  color: "var(--navy)",
                  fontSize: "clamp(1.2rem, 1.8vw, 2rem)",
                  margin: 0,
                }}
              >
                Frequently Asked Questions
              </h2>
              <a
                href="/faq"
                style={{
                  color: "var(--gold)",
                  fontFamily: "var(--font-eyebrow)",
                  fontSize: "clamp(0.62rem, 0.72vw, 0.78rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                View All FAQs →
              </a>
            </div>
            <FAQPreview category={getFaqCategory(practice.label)} />
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <PageCTA
          eyebrow="Law Office of Troy M. Moore, PLLC"
          heading="Ready to discuss your case?"
          description="Contact us today for a consultation. The firm serves Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas."
        >
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
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)",
                textDecoration: "none",
                fontFamily: "var(--font-eyebrow)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              ← All Practice Areas
            </a>
          </div>
        </PageCTA>
      </main>

      <Footer />
    </>
  );
}
