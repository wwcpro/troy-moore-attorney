import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQPreview from "@/components/FAQPreview";
import PageCTA from "@/components/PageCTA";
import HeroForm from "@/components/HeroForm";
import geoSlugs from "@/data/geo-practice-areas.json";
import geoLocationsData from "@/data/geo-locations.json";
import practicesData from "@/data/practices.json";
import { generateGeoTitle, generateGeoDescription, generateGeoContent, type GeoLocation } from "@/lib/geoContent";

export const revalidate = 3600;

/* ─── Types ──────────────────────────────────────────────────────── */
interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Helpers ────────────────────────────────────────────────────── */
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function inferFaqCategory(slug: string): "Probate" | "Estate Planning" | "Other Practices" {
  if (slug.includes("estate-planning")) return "Estate Planning";
  if (slug.includes("personal-injury") || slug.includes("insurance")) return "Other Practices";
  return "Probate";
}

function inferEyebrow(slug: string): string {
  if (slug.includes("estate-planning")) return "ESTATE PLANNING";
  if (slug.includes("personal-injury")) return "PERSONAL INJURY";
  if (slug.includes("life-insurance") || slug.includes("life-injury")) return "PROBATE";
  if (slug.includes("will-contest") || slug.includes("will-contests")) return "PROBATE";
  if (slug.includes("fiduciary")) return "PROBATE";
  return "PROBATE";
}

function getRelatedPractices(slug: string) {
  const practices = practicesData as { slug: string; title: string; label: string }[];
  if (slug.includes("estate-planning")) {
    return practices.filter((p) => p.label === "ESTATE PLANNING").slice(0, 5);
  }
  if (slug.includes("personal-injury")) {
    return practices.filter((p) => p.label === "PERSONAL INJURY").slice(0, 5);
  }
  return practices.filter((p) => p.label === "PROBATE").slice(0, 5);
}

function getHelpOptions(slug: string): string[] {
  if (slug.includes("estate-planning")) {
    return [
      "Last Will & Testament",
      "Living Trust",
      "Power of Attorney",
      "Advance Directive / Living Will",
      "Transfer on Death Deed",
      "Not Sure — I Need Guidance",
    ];
  }
  if (slug.includes("personal-injury") || slug.includes("life-insurance") || slug.includes("life-injury")) {
    return [
      "Life Insurance Dispute",
      "Beneficiary Claim",
      "Personal Injury",
      "Probate of a Will",
      "Heirship Proceeding — No Will",
      "Not Sure — I Need Guidance",
    ];
  }
  if (slug.includes("will-contest") || slug.includes("will-contests")) {
    return [
      "Will Contest",
      "Fiduciary Litigation",
      "Life Insurance Dispute",
      "Probate of a Will",
      "Not Sure — I Need Guidance",
    ];
  }
  return [
    "Probate of a Will",
    "Heirship Proceeding — No Will",
    "Estate Planning",
    "Life Insurance Dispute",
    "Will Contest",
    "Not Sure — I Need Guidance",
  ];
}

/* ─── Data fetcher ───────────────────────────────────────────────── */
async function getPage(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(
      `https://troymmoore.com/wp-json/wp/v2/pages?slug=${slug}&_fields=id,slug,title,content,excerpt`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const pages: WPPage[] = await res.json();
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

/* ─── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return (geoSlugs as string[]).map((slug) => ({ slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(geoSlugs as string[]).includes(slug)) return {};
  const page = await getPage(slug);
  if (page) {
    return {
      title: `${page.title.rendered} | Law Office of Troy M. Moore, PLLC`,
      description: stripHtml(page.excerpt.rendered).slice(0, 160),
    };
  }
  const geoLocation = (geoLocationsData as GeoLocation[]).find((l) => l.slug === slug);
  if (geoLocation) {
    return {
      title: `${generateGeoTitle(geoLocation)} | Law Office of Troy M. Moore, PLLC`,
      description: generateGeoDescription(geoLocation),
    };
  }
  return {};
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function GeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(geoSlugs as string[]).includes(slug)) notFound();

  const wpPage = await getPage(slug);

  let pageTitle: string;
  let pageContent: string;

  if (wpPage) {
    pageTitle = wpPage.title.rendered;
    pageContent = wpPage.content.rendered;
  } else {
    const geoLocation = (geoLocationsData as GeoLocation[]).find((l) => l.slug === slug);
    if (!geoLocation) notFound();
    pageTitle = generateGeoTitle(geoLocation);
    pageContent = generateGeoContent(geoLocation);
  }

  const eyebrow = inferEyebrow(slug);
  const faqCategory = inferFaqCategory(slug);
  const helpOptions = getHelpOptions(slug);
  const relatedPractices = getRelatedPractices(slug);

  return (
    <>
      <style>{`
        /* ── Hero two-column grid ─────────────────────────────── */
        .geo-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: start;
          padding-left: 10vw;
          padding-right: 10vw;
          padding-bottom: clamp(3rem, 4vw, 4.5rem);
        }
        @media (max-width: 960px) {
          .geo-hero-grid { grid-template-columns: 1fr; padding-right: 10vw; }
          .hero-form-card { order: -1; }
        }

        /* ── Form inputs ─────────────────────────────────────── */
        .hero-form-input {
          width: 100%;
          padding: 0.72em 1em;
          border: 1.5px solid #e0e4e8;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: clamp(0.82rem, 0.85vw, 0.92rem);
          color: var(--navy);
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }
        .hero-form-input:focus {
          border-color: var(--navy);
          box-shadow: 0 0 0 3px rgba(11,55,93,0.07);
        }
        .hero-form-input::placeholder { color: #9aabb8; }
        .hero-form-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          cursor: pointer;
          user-select: none;
        }
        .hero-form-checkbox {
          -webkit-appearance: none;
          appearance: none;
          width: 1em;
          height: 1em;
          border: 1.5px solid #c8d0d8;
          border-radius: 3px;
          background: #fff;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 0.18em;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
        }
        .hero-form-checkbox:checked {
          background: var(--navy);
          border-color: var(--navy);
        }
        .hero-form-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 2px;
          top: -1px;
          width: 5px;
          height: 9px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        /* ── Content + sidebar grid ──────────────────────────── */
        .geo-body-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: clamp(2.5rem, 4vw, 5rem);
          align-items: start;
        }
        @media (max-width: 1024px) {
          .geo-body-grid { grid-template-columns: 1fr 280px; }
        }
        @media (max-width: 860px) {
          .geo-body-grid { grid-template-columns: 1fr; }
          .geo-sidebar { order: -1; }
        }

        /* ── Sticky sidebar ──────────────────────────────────── */
        .geo-sidebar {
          position: sticky;
          top: calc(72px + 2rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── Prose content ───────────────────────────────────── */
        .geo-prose {
          color: #4a5a6a;
          line-height: 1.85;
          font-size: clamp(0.92rem, 1vw, 1.05rem);
        }
        .geo-prose p { margin-bottom: 1.4rem; }
        .geo-prose p:last-child { margin-bottom: 0; }
        .geo-prose h2 {
          color: var(--navy);
          font-size: clamp(1.2rem, 1.5vw, 1.65rem);
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 0.85rem;
          line-height: 1.25;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }
        .geo-prose h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
        .geo-prose h3 {
          color: var(--navy);
          font-size: clamp(1rem, 1.1vw, 1.2rem);
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.6rem;
        }
        .geo-prose ul, .geo-prose ol {
          margin-bottom: 1.4rem;
          padding-left: 1.5rem;
        }
        .geo-prose li { margin-bottom: 0.45rem; }
        .geo-prose a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .geo-prose a:hover { color: var(--navy); }
        .geo-prose strong { color: var(--navy); font-weight: 600; }
        .geo-prose blockquote {
          border-left: 3px solid var(--gold);
          padding-left: 1.25rem;
          margin: 1.75rem 0;
          font-style: italic;
          color: #6a7a8a;
        }

        /* ── Inline FAQ rows ─────────────────────────────────── */
        .faq-preview-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-preview-item:first-child { border-top: 1px solid #e5e7eb; }
        .faq-preview-row {
          display: flex;
          align-items: baseline;
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
          padding: clamp(1rem, 1.5vw, 1.4rem) 0;
        }
        .faq-preview-num {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 1.8vw, 2rem);
          font-weight: 300;
          font-style: italic;
          color: var(--gold);
          opacity: 0.4;
          min-width: 1.6ch;
          line-height: 1;
          flex-shrink: 0;
        }
        .faq-preview-q {
          font-family: var(--font-heading);
          font-size: clamp(0.92rem, 1.05vw, 1.15rem);
          font-weight: 300;
          font-style: italic;
          color: var(--navy);
          line-height: 1.3;
          flex: 1;
          transition: color 0.2s ease;
        }
        .faq-preview-arrow {
          flex-shrink: 0;
          color: var(--gold);
          opacity: 0.5;
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .faq-preview-item:hover .faq-preview-arrow { opacity: 1; transform: translateX(3px); }
        .faq-preview-item:hover .faq-preview-q { color: var(--gold); }

        /* ── Sidebar cards ───────────────────────────────────── */
        .sidebar-card {
          border-radius: 8px;
          overflow: hidden;
        }
        .sidebar-related-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s ease;
          gap: 0.5rem;
        }
        .sidebar-related-link:last-child { border-bottom: none; }
        .sidebar-related-link:hover { background: rgba(255,255,255,0.06); }
        .sidebar-practice-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 0;
          text-decoration: none;
          border-bottom: 1px solid #e5e7eb;
          transition: color 0.2s ease;
          gap: 0.5rem;
        }
        .sidebar-practice-link:last-child { border-bottom: none; }
        .sidebar-practice-link:hover span:first-child { color: var(--gold); }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--navy)",
            paddingTop: "calc(72px + clamp(3rem, 5vw, 6rem))",
            paddingBottom: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.07)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", top: "5%", right: "-5%", width: "42vw", height: "42vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.05)", pointerEvents: "none" }} />

          <div className="geo-hero-grid">
            <div>
              <p
                className="eyebrow"
                style={{ color: "var(--gold)", marginBottom: "clamp(0.75rem, 1.2vw, 1.2rem)", fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)" }}
              >
                {eyebrow}
              </p>
              <h1
                style={{ color: "#ffffff", marginBottom: "clamp(1.2rem, 2vw, 2rem)", maxWidth: "22ch" }}
                dangerouslySetInnerHTML={{ __html: pageTitle }}
              />
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)", fontSize: "clamp(0.92rem, 1vw, 1.1rem)" }}>
                The Law Office of Troy M. Moore, PLLC serves Houston and surrounding communities with over 25 years of Texas probate and estate planning experience. Contact us today for a free case review — no obligation required.
              </p>
              <a
                href="tel:2816090303"
                className="btn-cta-ghost"
                style={{ textDecoration: "none", marginBottom: "clamp(2rem, 3vw, 3rem)", display: "inline-flex" }}
              >
                Call (281) 609-0303
                <span className="cta-circle">
                  <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                    <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                    <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                    <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                </span>
              </a>
            </div>

            <HeroForm helpOptions={helpOptions} />
          </div>
        </section>

        {/* ── CONTENT + SIDEBAR ────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(3.5rem, 5vw, 6rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 6rem)",
          }}
        >
          <div style={WRAP}>
            <div className="geo-body-grid">

              {/* ── Main column ────────────────────────────────── */}
              <div>
                {/* Prose content */}
                <div
                  className="geo-prose"
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                />

                {/* Divider */}
                <div style={{ height: 1, background: "#e5e7eb", margin: "clamp(2.5rem, 4vw, 4rem) 0" }} />

                {/* FAQ section */}
                <div>
                  <p
                    className="eyebrow"
                    style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)", marginBottom: "0.6rem" }}
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
                      marginBottom: "clamp(1.25rem, 2vw, 2rem)",
                    }}
                  >
                    <h2
                      style={{
                        color: "var(--navy)",
                        fontSize: "clamp(1.2rem, 1.6vw, 1.85rem)",
                        margin: 0,
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <a
                      href="/faq"
                      style={{
                        color: "var(--gold)",
                        fontFamily: "var(--font-eyebrow)",
                        fontSize: "clamp(0.6rem, 0.68vw, 0.75rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View All FAQs →
                    </a>
                  </div>
                  <FAQPreview category={faqCategory} />
                </div>
              </div>

              {/* ── Sidebar ────────────────────────────────────── */}
              <aside className="geo-sidebar">

                {/* Contact CTA card */}
                <div
                  className="sidebar-card"
                  style={{ background: "var(--navy)" }}
                >
                  <div style={{ padding: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                    <p
                      className="eyebrow"
                      style={{ color: "var(--gold)", fontSize: "clamp(0.58rem, 0.65vw, 0.72rem)", marginBottom: "0.6rem" }}
                    >
                      Free Consultation
                    </p>
                    <h3
                      style={{
                        color: "#ffffff",
                        fontSize: "clamp(1rem, 1.2vw, 1.3rem)",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontFamily: "var(--font-heading)",
                        lineHeight: 1.3,
                        marginBottom: "0.75rem",
                      }}
                    >
                      Ready to discuss your case?
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.8rem, 0.85vw, 0.92rem)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                      Contact us today. We serve Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas.
                    </p>
                    <a
                      href="tel:2816090303"
                      className="btn-cta"
                      style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "0.75rem" }}
                    >
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
                      href="/contact"
                      style={{
                        display: "block",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "clamp(0.68rem, 0.72vw, 0.78rem)",
                        fontFamily: "var(--font-eyebrow)",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        textDecoration: "none",
                        paddingTop: "0.5rem",
                      }}
                    >
                      Send a Message →
                    </a>
                  </div>
                </div>

                {/* Firm credentials */}
                <div
                  className="sidebar-card"
                  style={{ background: "var(--light-gray)", border: "1px solid #e5e7eb", padding: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  <p
                    className="eyebrow"
                    style={{ color: "var(--gold)", fontSize: "clamp(0.58rem, 0.65vw, 0.72rem)", marginBottom: "1rem" }}
                  >
                    Why Choose Us
                  </p>
                  {[
                    { stat: "25+", label: "Years Licensed in Texas" },
                    { stat: "3,000+", label: "Clients Served" },
                    { stat: "100+", label: "Five-Star Reviews" },
                  ].map((item) => (
                    <div
                      key={item.stat}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.75rem",
                        paddingTop: "0.85rem",
                        paddingBottom: "0.85rem",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontStyle: "italic",
                          fontWeight: 300,
                          fontSize: "clamp(1.5rem, 2vw, 2.2rem)",
                          color: "var(--navy)",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {item.stat}
                      </span>
                      <span
                        style={{
                          color: "#6a7a8a",
                          fontSize: "clamp(0.78rem, 0.82vw, 0.9rem)",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                  <p
                    style={{
                      color: "#8899a8",
                      fontSize: "clamp(0.72rem, 0.78vw, 0.84rem)",
                      lineHeight: 1.6,
                      marginTop: "1rem",
                      marginBottom: 0,
                    }}
                  >
                    Serving Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas since 1999.
                  </p>
                </div>

                {/* Related practice areas */}
                {relatedPractices.length > 0 && (
                  <div
                    className="sidebar-card"
                    style={{ border: "1px solid #e5e7eb", background: "#fff" }}
                  >
                    <div style={{ padding: "clamp(1rem, 1.5vw, 1.4rem) clamp(1.25rem, 2vw, 1.75rem)", borderBottom: "1px solid #e5e7eb" }}>
                      <p
                        className="eyebrow"
                        style={{ color: "var(--gold)", fontSize: "clamp(0.58rem, 0.65vw, 0.72rem)", margin: 0 }}
                      >
                        Related Practice Areas
                      </p>
                    </div>
                    <div style={{ padding: "0 clamp(1.25rem, 2vw, 1.75rem)" }}>
                      {relatedPractices.map((practice) => (
                        <a
                          key={practice.slug}
                          href={`/practices/${practice.slug}`}
                          className="sidebar-practice-link"
                        >
                          <span
                            style={{
                              color: "var(--navy)",
                              fontSize: "clamp(0.8rem, 0.85vw, 0.92rem)",
                              lineHeight: 1.4,
                              fontWeight: 400,
                              transition: "color 0.2s ease",
                            }}
                          >
                            {practice.title}
                          </span>
                          <span style={{ color: "var(--gold)", fontSize: "0.7rem", flexShrink: 0 }}>→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attorney profile teaser */}
                <a
                  href="/team-members/troy-moore"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "clamp(1rem, 1.5vw, 1.4rem)",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    background: "#fff",
                    textDecoration: "none",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                  className="sidebar-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/troy-profile.webp"
                    alt="Troy M. Moore"
                    style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", objectPosition: "top center", flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "0.58rem", marginBottom: "0.2rem" }}>
                      ATTORNEY AT LAW
                    </p>
                    <p style={{ color: "var(--navy)", fontWeight: 500, fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)", marginBottom: "0.15rem" }}>
                      Troy M. Moore
                    </p>
                    <p style={{ color: "#8899a8", fontSize: "clamp(0.72rem, 0.76vw, 0.82rem)", lineHeight: 1.5, margin: 0 }}>
                      25+ years Texas probate &amp; estate planning
                    </p>
                  </div>
                </a>

              </aside>
            </div>
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
