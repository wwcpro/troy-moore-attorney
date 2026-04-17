import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import teamData from "@/data/team.json";

export const metadata: Metadata = {
  title: "Our Team | Law Office of Troy M. Moore, PLLC",
  description:
    "Meet the legal team at the Law Office of Troy M. Moore, PLLC — experienced Houston probate and estate planning professionals dedicated to serving clients across Texas.",
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

export default function TeamPage() {
  return (
    <>
      <style>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }
        @media (max-width: 900px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .team-grid { grid-template-columns: 1fr; } }

        .team-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .team-card:hover {
          border-color: var(--gold);
          box-shadow: 0 16px 48px rgba(11,55,93,0.1);
          transform: translateY(-4px);
        }
        .team-card img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.4s ease;
        }
        .team-card:hover img { transform: scale(1.03); }
        .team-card-body {
          padding: clamp(1.25rem, 1.75vw, 1.75rem);
          border-top: 1px solid #f0f0f0;
          flex: 1;
          display: flex;
          flex-direction: column;
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
              Our People
            </p>
            <h1 style={{ color: "#ffffff", marginBottom: 0, maxWidth: "20ch" }}>
              Meet the Team
            </h1>
          </div>
        </section>

        {/* ── TEAM GRID ────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            <div className="team-grid">
              {teamData.map((member) => (
                <a
                  key={member.slug}
                  href={`/team-members/${member.slug}`}
                  className="team-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.photo} alt={member.name} />
                  <div className="team-card-body">
                    <p
                      className="eyebrow"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.5rem, 0.58vw, 0.66rem)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {member.eyebrow}
                    </p>
                    <h2
                      style={{
                        color: "var(--navy)",
                        fontSize: "clamp(1rem, 1.2vw, 1.35rem)",
                        fontWeight: 500,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {member.name}
                    </h2>
                    <p
                      style={{
                        color: "#8899a8",
                        fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)",
                        lineHeight: 1.65,
                        flex: 1,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {member.bio}
                    </p>
                    <span
                      style={{
                        color: "var(--gold)",
                        fontFamily: "var(--font-eyebrow)",
                        fontSize: "clamp(0.6rem, 0.68vw, 0.75rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                      }}
                    >
                      View Profile →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <PageCTA
          eyebrow="Law Office of Troy M. Moore, PLLC"
          heading="Ready to work with our team?"
          description="Contact us today to schedule a consultation. We serve Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas."
        >
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
        </PageCTA>
      </main>

      <Footer />
    </>
  );
}
