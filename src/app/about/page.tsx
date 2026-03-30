"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import { gsap } from "@/lib/gsap";

/* ─── Layout constants ───────────────────────────────────────────── */
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Team panel data ────────────────────────────────────────────── */
const TROY: PanelItem & { title: string; photo: string; bio: string } = {
  label: "ATTORNEY AT LAW",
  title: "Troy M. Moore",
  href: "#troy",
  photo: "/assets/troy-profile.webp",
  bio: "25+ years of Texas probate & estate planning.",
  panel: {
    headline: "Troy M. Moore",
    sections: [
      {
        heading: "About Troy",
        body: "Troy is licensed to practice in all courts in the State of Texas, as well as the Texas Southern District Court of the United States.\n\nMr. Moore was raised locally in Cypress, Texas. He is a proud father of two young college students. Since beginning his career, he has focused on probate, estate planning, life insurance litigation, and trust property matters. Clients enjoy dynamic and effective legal services with a client first attitude — always.\n\n\"Remember, an ounce of legal prevention is worth far more than a pound of cure.\"",
      },
      {
        heading: "Academic Achievements",
        body: "Mr. Moore was an accomplished student while at South Texas College of Law. He received the highest grade award in Texas Pretrial Procedure, made the Dean's List in 2001, and served as Editor in Chief and Associate Editor of the Corporate Counsel Review, a publication from South Texas College of Law.",
      },
      {
        heading: "Professional Credentials",
        body: "Mr. Moore's professional experience speaks for itself:",
        list: [
          "25 Years Licensed in Texas",
          "Former Primary Candidate for Judge of Harris County Probate Court No. 5",
          "Solo practitioner for 18 years",
          "Member of American Inns of Court – Texas Probate Section",
          "Member of REPTL (Real Estate, Probate & Trust Lawyer) Section of the State Bar of Texas",
          "Member of Texas Trial Lawyers Association",
          "Member of Houston Trial Lawyers Association",
          "Admitted to practice before US Federal Court, Southern District",
          "Admitted to the State Bar of New Mexico",
          "Author of Legal Articles on Probate Matters and Personal Injury",
        ],
      },
      {
        heading: "Practice Areas",
        body: "",
        list: [
          "Probate Law",
          "Estate Planning",
          "Life Insurance Litigation",
          "Trusts & Estates",
          "Personal Injury",
        ],
      },
      {
        heading: "Education",
        body: "Bachelor of Arts in Biology, Texas A&M, 1998.\n\nDoctor of Jurisprudence, South Texas College of Law, 2001.\n\nGood standing with the State Bar of Texas, active since 2001.",
      },
      {
        heading: "Contact",
        body: "Email: t.moore@troymoorelaw.com\nPhone: (281) 942-6907",
      },
    ],
  },
};

const TIFFANY: PanelItem & { title: string; photo: string; bio: string } = {
  label: "PARALEGAL",
  title: "Tiffany Bell",
  href: "#tiffany",
  photo: "/assets/tiffany-profile.webp",
  bio: "Nearly 8 years of experience in probate, estate planning & personal injury.",
  panel: {
    headline: "Tiffany Bell",
    sections: [
      {
        heading: "About Tiffany",
        body: "Tiffany Bell is an experienced paralegal with nearly 8 years of dedicated service in the legal field. Motivated by a genuine desire to understand legal processes and assist others, she has established herself as an indispensable asset in the areas of probate, estate planning, and personal injury.\n\nTiffany holds an Associates of Applied Science and an Advanced Technical Certificate, both in Paralegal Studies, which have honed her expertise and understanding of the intricacies of the legal system.",
      },
      {
        heading: "Dedication to Every Case",
        body: "Tiffany's commitment to her work shines through as she takes on files from start to finish, ensuring no detail goes unnoticed. Her dedication to the success of each case and her ability to work closely with the attorney make her an invaluable asset to the legal team.",
      },
    ],
  },
};

const TEAM = [TROY, TIFFANY];

/* ─── Shared circle SVG ──────────────────────────────────────────── */
function CircleSVG() {
  return (
    <span className="cta-circle">
      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, [mounted]);

  const openPanel = useCallback((item: PanelItem) => {
    setPanelItem(item);
    document.body.style.overflow = "hidden";
    gsap.timeline()
      .to(contentRef.current, { x: 18, duration: 0.13, ease: "power2.out" })
      .to(contentRef.current, { x: "-85vw", duration: 0.85, ease: "expo.inOut" });
    gsap.to(panelRef.current, { x: 0, duration: 0.85, ease: "expo.inOut", delay: 0.06 });
  }, []);

  const closePanel = useCallback(() => {
    gsap.to(panelRef.current, { x: "100%", duration: 0.55, ease: "power4.in" });
    gsap.to(contentRef.current, {
      x: 0, duration: 0.72, ease: "expo.out", delay: 0.08,
      onComplete: () => { setPanelItem(null); document.body.style.overflow = ""; },
    });
  }, []);

  return (
    <>
      <style>{`
        /* ── Hero overlay ── */
        .about-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.72) 0%,
            rgba(11,55,93,0.55) 50%,
            rgba(6,30,54,0.82) 100%
          );
        }

        /* ── Stat bar grid ── */
        .about-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 767px) {
          .about-stat-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── Intro grid ── */
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 5vw, 6rem);
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-intro-grid { grid-template-columns: 1fr; }
        }

        /* ── Team grid ── */
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
          max-width: 860px;
        }
        @media (max-width: 640px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }

        /* ── Team card ── */
        .about-team-card {
          display: block;
          width: 100%;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          text-align: left;
        }
        .about-team-card:hover {
          border-color: var(--gold);
          box-shadow: 0 20px 50px rgba(11,55,93,0.12);
          transform: translateY(-4px);
        }
        .about-team-card .card-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-team-card:hover .card-photo { transform: scale(1.03); }
        .about-team-card .card-body {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          border-top: 1px solid #f0f0f0;
        }

        /* ── Circle CTA on info-row cards (reuse probate style) ── */
        .about-team-card .cta-circle {
          width: 3em; height: 3em; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          color: rgba(11,55,93,0.3);
          transition: color 0.4s ease;
        }
        .about-team-card:hover .cta-circle { color: var(--gold); }
        .about-team-card .cta-circle svg .CircleIcon_circle__vewPw {
          stroke: rgba(11,55,93,0.18); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.8s ease, stroke 0.4s ease;
        }
        .about-team-card .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke: var(--gold); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 100;
          transition: stroke-dashoffset 0.8s ease;
        }
        .about-team-card:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz { stroke-dashoffset: 0; }
        .about-team-card .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none; transition: stroke 0.4s ease;
        }

        /* ── Side panel width ── */
        .side-panel { width: 85vw; }
        @media (max-width: 640px) { .side-panel { width: 100vw; } }

        /* ── Mobile padding ── */
        @media (max-width: 640px) {
          main { padding-bottom: 76px; }
        }

        /* ── Mobile sticky CTA ── */
        .about-mobile-cta { display: none; }
        @media (max-width: 640px) { .about-mobile-cta { display: flex; } }
      `}</style>

      <div
        ref={contentRef}
        style={{ cursor: panelItem ? "pointer" : "auto" }}
        onClick={panelItem ? closePanel : undefined}
      >
        <Navbar />

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────── */}
          <section
            style={{
              position: "relative",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundImage: "url(/assets/about.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            <div className="about-hero-overlay" />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                ...WRAP,
                paddingTop: "calc(72px + clamp(4rem, 8vw, 9rem))",
                paddingBottom: "clamp(4rem, 7vw, 8rem)",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
                  fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
                }}
              >
                Houston Probate &amp; Estate Planning
              </p>
              <h1
                style={{
                  color: "#ffffff",
                  marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
                  maxWidth: "18ch",
                }}
              >
                About Us
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "clamp(1rem, 1.4vw, 1.55rem)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  maxWidth: "44ch",
                  marginBottom: "clamp(2rem, 3vw, 3rem)",
                }}
              >
                Compassion for clients&rsquo; needs and attention to detail.
              </p>

              {/* Stat badges */}
              <div style={{ display: "flex", gap: "clamp(0.75rem, 1.5vw, 1.5rem)", flexWrap: "wrap", marginBottom: "clamp(2rem, 3vw, 3.5rem)" }}>
                {[
                  { value: "3,000+", label: "Clients Served" },
                  { value: "100+", label: "5-Star Reviews" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 1.25rem",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.4rem, 2.2vw, 2.5rem)", color: "var(--gold)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {badge.value}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.72rem, 0.82vw, 0.9rem)", fontFamily: "var(--font-eyebrow)", textTransform: "uppercase", letterSpacing: "0.14em", lineHeight: 1.3 }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              <a href="tel:2816090303" className="btn-cta-ghost" style={{ textDecoration: "none" }}>
                Schedule a Consultation
                <CircleSVG />
              </a>
            </div>
          </section>

          {/* ── 2. STAT BAR ──────────────────────────────────────── */}
          <section style={{ background: "var(--navy)" }}>
            <div style={{ ...WRAP, paddingTop: "clamp(2.5rem, 4vw, 4rem)", paddingBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
              <div className="about-stat-grid">
                {[
                  { stat: "25+", label: "Years Licensed in Texas" },
                  { stat: "3,000+", label: "Clients Served" },
                  { stat: "100+", label: "5-Star Reviews" },
                  { stat: "All Texas", label: "Statewide Service" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "clamp(1.5rem, 2.5vw, 2.5rem) clamp(1rem, 1.5vw, 1.5rem)",
                      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", color: "#ffffff", fontSize: "clamp(2.5rem, 5vw, 6rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                      {item.stat}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.62rem, 0.78vw, 0.88rem)", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.5 }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. INTRO ─────────────────────────────────────────── */}
          <section style={{ background: "#fff", ...PAD }}>
            <div style={WRAP}>
              <div className="about-intro-grid">
                {/* Left: copy */}
                <div>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                    Our Firm
                  </p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
                    Welcome to Law Office of Troy M. Moore, PLLC
                  </h2>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                    Your leading Houston, Texas-based law firm specializing in probate and estate planning. With more than 25 years of experience, we have cemented our reputation as industry leaders, offering unrivaled legal services to clients throughout Houston, The Woodlands, Spring, Cypress, Tomball, Magnolia, and all of Texas.
                  </p>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                    Our primary practice areas are probate and estate planning — fields where we have garnered immense experience and achieved remarkable results. We help families navigate through the probate process after the loss of a loved one and work to minimize disputes. For estate planning, we take a comprehensive approach, ensuring your assets and legacy are secure, thereby providing peace of mind to you and your loved ones.
                  </p>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                    Located in the heart of Houston, Texas, we are ready to assist you with all your probate and estate planning needs. To learn more about how we can help you create a strategic and comprehensive plan for the present or the future, please contact our law firm today.
                  </p>
                  <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                    Call (281) 609-0303
                    <CircleSVG />
                  </a>
                </div>

                {/* Right: credential badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                  {/* Badges */}
                  <div>
                    <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.52rem, 0.6vw, 0.7rem)", marginBottom: "1.25rem" }}>
                      Professional Memberships
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                      {[
                        { src: "/assets/badge-htla.png", alt: "Houston Trial Lawyers Association" },
                        { src: "/assets/badge-reptl.png", alt: "REPTL" },
                        { src: "/assets/badge-expertise.png", alt: "Expertise" },
                        { src: "/assets/badge-ttla.png", alt: "Texas Trial Lawyers Association" },
                      ].map((badge) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={badge.alt}
                          src={badge.src}
                          alt={badge.alt}
                          style={{ height: "clamp(48px, 5vw, 64px)", width: "auto", objectFit: "contain" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Highlight cards */}
                  {[
                    {
                      icon: "⚖",
                      title: "Probate Specialists",
                      body: "Houston's go-to firm for guiding families through the Texas probate process — efficiently and with care.",
                    },
                    {
                      icon: "📄",
                      title: "Comprehensive Estate Planning",
                      body: "From simple wills to full revocable living trusts, we build plans tailored to your family's specific needs.",
                    },
                    {
                      icon: "🤝",
                      title: "Client-First Attitude — Always",
                      body: "Every client receives direct attorney attention and a responsive, personal approach throughout their matter.",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        padding: "clamp(1rem, 1.5vw, 1.5rem)",
                        background: "var(--light-gray)",
                        borderRadius: 6,
                        borderLeft: "3px solid var(--gold)",
                      }}
                    >
                      <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0, marginTop: "0.1rem" }}>{card.icon}</span>
                      <div>
                        <p style={{ color: "var(--navy)", fontWeight: 500, fontSize: "clamp(0.85rem, 0.9vw, 1rem)", marginBottom: "0.35rem" }}>{card.title}</p>
                        <p style={{ color: "#6a7a8a", fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)", lineHeight: 1.65 }}>{card.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. OUR TEAM ──────────────────────────────────────── */}
          <section style={{ background: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                Our People
              </p>
              <h2 style={{ color: "var(--navy)", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                Meet the Team
              </h2>

              <div className="about-team-grid">
                {TEAM.map((member) => (
                  <button
                    key={member.href}
                    className="about-team-card"
                    onClick={() => openPanel(member)}
                    style={{ padding: 0, font: "inherit" }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.photo}
                        alt={member.title}
                        className="card-photo"
                      />
                    </div>
                    <div className="card-body" style={{ background: "#fff" }}>
                      <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.5rem, 0.58vw, 0.66rem)", marginBottom: "0.4rem" }}>
                        {member.label}
                      </p>
                      <h3 style={{ color: "var(--navy)", fontSize: "clamp(1rem, 1.2vw, 1.4rem)", fontWeight: 500, marginBottom: "0.4rem" }}>
                        {member.title}
                      </h3>
                      <p style={{ color: "#8899a8", fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {member.bio}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--navy)", fontSize: "clamp(0.78rem, 0.82vw, 0.9rem)", fontWeight: 500 }}>
                          View Profile
                        </span>
                        <CircleSVG />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. FINAL CTA ─────────────────────────────────────── */}
          <section style={{ background: "var(--navy)", ...PAD }}>
            <div style={{ ...WRAP, textAlign: "center", maxWidth: "60ch", margin: "0 auto" }}>
              <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                Ready to Get Started
              </p>
              <h2 style={{ color: "#ffffff", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
                Experience the difference of a firm that puts clients first.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                With over 25 years of Texas probate and estate planning experience, the Law Office of Troy M. Moore, PLLC is ready to guide your family through whatever comes next. Contact us today for a consultation.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:2816090303" className="btn-cta-ghost" style={{ textDecoration: "none" }}>
                  Call (281) 609-0303 <CircleSVG />
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* ── Mobile sticky CTA ──────────────────────────────────── */}
      <div
        className="about-mobile-cta"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400,
          padding: "0.85rem 1.25rem",
          background: "var(--navy)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          gap: "0.75rem", alignItems: "center", justifyContent: "center",
        }}
      >
        <a href="tel:2816090303" className="btn-cta" style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>
          Call (281) 609-0303
        </a>
      </div>

      {/* ── Portal: close button + SidePanel ─────────────────────── */}
      {mounted && createPortal(
        <>
          {panelItem && (
            <div
              style={{
                position: "fixed", top: "1.5rem", left: "7.5vw",
                transform: "translateX(-50%)", zIndex: 600, padding: 8,
                borderRadius: "50%", background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <button
                onClick={closePanel}
                aria-label="Close panel"
                style={{
                  width: 54, height: 54, borderRadius: "50%",
                  border: "none", background: "var(--navy)", color: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", lineHeight: 1, cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(11,55,93,0.4)",
                }}
              >
                ✕
              </button>
            </div>
          )}
          <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />
        </>,
        document.body
      )}

      <FixedCTA show={!panelItem} />
    </>
  );
}
