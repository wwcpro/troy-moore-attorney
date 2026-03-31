"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import { gsap } from "@/lib/gsap";
import practicesData from "@/data/practices.json";

/* ─── Types ──────────────────────────────────────────────────────── */
interface PracticeItem extends PanelItem {
  description: string;
  slug: string;
}

const PRACTICES = practicesData as PracticeItem[];

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};

/* ─── Info-row list section ──────────────────────────────────────── */
function PracticesList({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".info-row");
      const dividers = section.querySelectorAll(".divider-line");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );
    }, section);

    // Proximity scale — rows grow toward cursor based on vertical distance (same as home page)
    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () =>
      rowEls.forEach((row) =>
        gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
      );
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {PRACTICES.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{
              width: "100%",
              padding: "clamp(1.25rem, 2.5vw, 2.5rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0,
            }}
            onClick={() => onOpen(item)}
          >
            <span
              className="eyebrow font-semibold"
              style={{ color: "var(--gold)", marginBottom: "0.5rem" }}
            >
              {item.label}
            </span>
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3
                className="transition-colors duration-300 group-hover:text-[var(--gold)]"
                style={{ color: "var(--navy)", marginBottom: "clamp(0.2rem, 0.3vw, 0.4rem)" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed md:w-[85%]" style={{ color: "#8899a8" }}>
                {item.description}
              </p>
            </div>
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path
                  className="CircleIcon_circle__vewPw"
                  d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0"
                />
                <path
                  className="CircleIcon_circle-overlay__lg7sz"
                  d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5"
                />
                <path
                  className="CircleIcon_icon__n80xg"
                  d="M12.5 11L16 14.5L12.5 18"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function PracticesPage() {
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
        .info-row .eyebrow {
          flex: 2;
          font-size: clamp(0.52rem, 0.62vw, 0.72rem);
          letter-spacing: 0.22em;
        }
        @media (min-width: 768px) {
          .info-row .eyebrow { margin-bottom: 0; }
        }
        .info-row .cta-circle {
          width: 58px; height: 58px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          color: rgba(11,55,93,0.3);
          transition: color 0.4s ease;
        }
        .info-row:hover .cta-circle { color: var(--gold); }
        .info-row .cta-circle svg .CircleIcon_circle__vewPw {
          stroke: rgba(11,55,93,0.18); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.8s ease, stroke 0.4s ease;
        }
        .info-row .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke: var(--gold); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 100;
          transition: stroke-dashoffset 0.8s ease;
        }
        .info-row:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz { stroke-dashoffset: 0; }
        .info-row .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none; transition: stroke 0.4s ease;
        }
        .side-panel { width: 85vw; }
        @media (max-width: 640px) {
          .side-panel { width: 100vw; }
          main { padding-bottom: 76px; }
        }
        .practices-mobile-cta { display: none; }
        @media (max-width: 640px) { .practices-mobile-cta { display: flex; } }
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
              background: "#ffffff",
              paddingTop: "calc(72px + clamp(4rem, 7vw, 8rem))",
              paddingBottom: "clamp(3rem, 5vw, 5rem)",
              borderBottom: "1px solid #f0f0f0",
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
                Law Office of Troy M. Moore, PLLC
              </p>
              <h1
                style={{
                  color: "var(--navy)",
                  fontSize: "clamp(4rem, 12vw, 14.4rem)",
                  lineHeight: 0.9,
                  marginBottom: 0,
                }}
              >
                Practices
              </h1>
              <p
                style={{
                  color: "#6a7a8a",
                  fontSize: "clamp(1rem, 1.3vw, 1.45rem)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  maxWidth: "96ch",
                }}
              >
                Probate, estate planning, and personal injury services for Houston families — with over 25 years of dedicated Texas legal experience.
              </p>
            </div>
          </section>

          {/* ── 2. PRACTICES LIST ────────────────────────────────── */}
          <section style={{ background: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <PracticesList onOpen={openPanel} />
            </div>
          </section>

          {/* ── 3. FINAL CTA ─────────────────────────────────────── */}
          <section style={{ background: "var(--navy)", ...PAD }}>
            <div style={WRAP}>
              <div style={{ maxWidth: "56ch" }}>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                  Ready to Get Started
                </p>
                <h2 style={{ color: "#ffffff", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
                  Not sure where to start? We can help.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                  Whether you need to navigate the Texas probate process, protect your family with an estate plan, or pursue a personal injury claim — the Law Office of Troy M. Moore is ready to guide you.
                </p>
                <a href="tel:2816090303" className="btn-cta-ghost" style={{ textDecoration: "none" }}>
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
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* ── Mobile sticky CTA ──────────────────────────────────── */}
      <div
        className="practices-mobile-cta"
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
