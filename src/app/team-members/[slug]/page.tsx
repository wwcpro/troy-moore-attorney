import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQPreview from "@/components/FAQPreview";
import PageCTA from "@/components/PageCTA";
import teamData from "@/data/team.json";
import JsonLd from "@/components/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/schemas";

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

export function generateStaticParams() {
  return teamData.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamData.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.name} | Law Office of Troy M. Moore, PLLC`,
    description: member.intro,
    alternates: { canonical: `https://troymoorelaw.com/team-members/${slug}` },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamData.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <>
      <JsonLd data={personSchema({
        name: member.name,
        role: member.role,
        slug: member.slug,
        bio: member.bio,
        photo: member.photo,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Our Team", url: "/team-members" },
        { name: member.name, url: `/team-members/${member.slug}` },
      ])} />
      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: clamp(3rem, 5vw, 6rem);
          align-items: start;
        }
        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr; }
        }
        .credential-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .credential-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #4a5a6a;
          font-size: clamp(0.85rem, 0.92vw, 1rem);
          line-height: 1.6;
        }
        .credential-list li::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          margin-top: 0.55em;
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
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
              {member.eyebrow}
            </p>
            <h1 style={{ color: "#ffffff", marginBottom: 0, maxWidth: "20ch" }}>
              {member.name}
            </h1>
          </div>
        </section>

        {/* ── PROFILE ──────────────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            <div className="profile-grid">
              {/* Left: photo + contact card */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    objectFit: "cover",
                    objectPosition: "top center",
                    aspectRatio: "1 / 1",
                    display: "block",
                  }}
                />

                {/* Quote */}
                <blockquote
                  style={{
                    borderLeft: "3px solid var(--gold)",
                    paddingLeft: "1.25rem",
                    margin: 0,
                    fontFamily: "var(--font-heading)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--navy)",
                    fontSize: "clamp(1rem, 1.1vw, 1.2rem)",
                    lineHeight: 1.65,
                  }}
                >
                  &ldquo;{member.quote}&rdquo;
                  <footer
                    style={{
                      fontFamily: "var(--font-eyebrow)",
                      fontStyle: "normal",
                      fontSize: "clamp(0.58rem, 0.65vw, 0.72rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "var(--gold)",
                      marginTop: "0.75rem",
                    }}
                  >
                    — {member.name}
                  </footer>
                </blockquote>

                {/* Contact */}
                <div
                  style={{
                    background: "var(--navy)",
                    borderRadius: 8,
                    padding: "clamp(1.25rem, 2vw, 1.75rem)",
                  }}
                >
                  <p
                    className="eyebrow"
                    style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.68vw, 0.75rem)", marginBottom: "1rem" }}
                  >
                    Contact
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.82rem, 0.9vw, 0.95rem)", marginBottom: "0.5rem" }}>
                    {member.email}
                  </p>
                  <a
                    href="tel:2816090303"
                    className="btn-cta"
                    style={{ textDecoration: "none", display: "inline-flex", marginTop: "0.75rem" }}
                  >
                    Call {member.phone}
                    <span className="cta-circle">
                      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* Practice areas */}
                <div
                  style={{
                    background: "var(--light-gray)",
                    borderRadius: 8,
                    padding: "clamp(1.25rem, 2vw, 1.75rem)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    className="eyebrow"
                    style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.68vw, 0.75rem)", marginBottom: "1rem" }}
                  >
                    Practice Areas
                  </p>
                  <ul className="credential-list">
                    {member.practiceAreas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: bio + sections + credentials */}
              <div>
                <p
                  style={{
                    color: "#4a5a6a",
                    lineHeight: 1.85,
                    fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)",
                    marginBottom: "clamp(2.5rem, 4vw, 4rem)",
                    fontStyle: "italic",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 300,
                  }}
                >
                  {member.headline}
                </p>

                <p
                  style={{
                    color: "#4a5a6a",
                    lineHeight: 1.85,
                    fontSize: "clamp(0.92rem, 1vw, 1.05rem)",
                    marginBottom: "clamp(2rem, 3vw, 3rem)",
                  }}
                >
                  {member.intro}
                </p>

                {/* Content sections */}
                {member.sections.map((section, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "clamp(2rem, 3vw, 3rem)",
                      paddingBottom: "clamp(2rem, 3vw, 3rem)",
                      borderBottom: i < member.sections.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--navy)",
                        fontSize: "clamp(1rem, 1.15vw, 1.3rem)",
                        fontWeight: 500,
                        marginBottom: "0.85rem",
                      }}
                    >
                      {section.heading}
                    </h3>
                    <p style={{ color: "#6a7a8a", lineHeight: 1.85, fontSize: "clamp(0.88rem, 0.95vw, 1rem)" }}>
                      {section.body}
                    </p>
                  </div>
                ))}

                {/* Credentials */}
                {member.credentials.length > 0 && (
                  <div
                    style={{
                      background: "var(--light-gray)",
                      borderRadius: 8,
                      padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <p
                      className="eyebrow"
                      style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.68vw, 0.75rem)", marginBottom: "1.25rem" }}
                    >
                      Professional Credentials
                    </p>
                    <ul className="credential-list">
                      {member.credentials.map((cred) => (
                        <li key={cred}>{cred}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
                marginBottom: "clamp(1.5rem, 2vw, 2rem)",
              }}
            >
              <h2 style={{ color: "var(--navy)", fontSize: "clamp(1.2rem, 1.8vw, 2rem)", margin: 0 }}>
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
            <FAQPreview category="Probate" />
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
              href="/team-members"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)",
                textDecoration: "none",
                fontFamily: "var(--font-eyebrow)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              ← Meet the Team
            </a>
          </div>
        </PageCTA>
      </main>

      <Footer />
    </>
  );
}
