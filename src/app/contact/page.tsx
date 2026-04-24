import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "./ContactHero";

export const metadata: Metadata = {
  title: "Contact Us | Law Office of Troy M. Moore, PLLC",
  description:
    "Reach the Law Office of Troy M. Moore 24 hours a day, 7 days a week. Two Houston-area locations: Northwest Houston and The Heights.",
  alternates: { canonical: "https://troymoorelaw.com/contact" },
};

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

const OFFICES = [
  {
    name: "Northwest Houston",
    address: "20333 State Highway 249",
    suite: "Suite 140",
    city: "Houston, Texas 77070",
    phone: "+1 (281) 942-6907",
    tel: "12819426907",
    tagline: "We're Always Available",
    hours: "24 hours a day — 7 days a week",
  },
  {
    name: "The Heights",
    address: "190 T.C. Jester",
    suite: "Suite 100",
    city: "Houston, Texas 77007",
    phone: "+1 (281) 942-6907",
    tel: "12819426907",
    tagline: "We're Always Available",
    hours: "24 hours a day — 7 days a week",
  },
];

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.68) 0%,
            rgba(11,55,93,0.52) 45%,
            rgba(6,30,54,0.78) 100%
          );
        }

        .contact-offices-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        @media (max-width: 700px) {
          .contact-offices-grid { grid-template-columns: 1fr; }
        }

        .contact-office-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: clamp(2rem, 3.5vw, 3.5rem);
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .contact-divider {
          width: 40px;
          height: 2px;
          background: var(--gold);
          opacity: 0.8;
          margin: 1.25rem 0;
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            minHeight: "65vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundImage: "url(/contact.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="contact-hero-overlay" />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              ...WRAP,
              paddingTop: "calc(72px + clamp(4rem, 8vw, 9rem))",
              paddingBottom: "clamp(4rem, 7vw, 8rem)",
            }}
          >
            <ContactHero />
          </div>
        </section>

        {/* ── 2. OFFICES ───────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
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
              Our Locations
            </p>
            <h2
              style={{
                color: "var(--navy)",
                marginBottom: "clamp(2.5rem, 4vw, 4rem)",
                maxWidth: "28ch",
              }}
            >
              Two offices to serve you
            </h2>

            <div className="contact-offices-grid">
              {OFFICES.map((office) => (
                <div key={office.name} className="contact-office-card">
                  <p
                    className="eyebrow"
                    style={{
                      color: "var(--gold)",
                      fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {office.tagline}
                  </p>
                  <h3
                    style={{
                      color: "var(--navy)",
                      fontSize: "clamp(1.1rem, 1.4vw, 1.55rem)",
                      fontWeight: 500,
                      marginBottom: 0,
                    }}
                  >
                    {office.name}
                  </h3>

                  <div className="contact-divider" />

                  <p
                    style={{
                      color: "#5a6a7a",
                      lineHeight: 1.75,
                      fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {office.address}
                    <br />
                    {office.suite}
                    <br />
                    {office.city}
                  </p>

                  <p
                    style={{
                      color: "#8899a8",
                      fontSize: "clamp(0.8rem, 0.88vw, 0.9rem)",
                      marginTop: "0.75rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    {office.hours}
                  </p>

                  <a
                    href={`tel:${office.tel}`}
                    className="btn-cta"
                    style={{
                      textDecoration: "none",
                      alignSelf: "flex-start",
                    }}
                  >
                    {office.phone}
                    <span className="cta-circle">
                      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
