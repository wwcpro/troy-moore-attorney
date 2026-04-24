"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import navData from "@/data/navigation.json";
import { usePageTransition } from "@/context/TransitionContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLObjectElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (y > lastScrollY.current && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const svg = logoRef.current?.contentDocument;
    if (!svg) return;

    // Fade BADGE and TYPE in/out
    ["TYPE", "BADGE"].forEach((id) => {
      const el = svg.getElementById(id);
      if (!el) return;
      el.style.transition = "opacity 0.35s ease";
      el.style.opacity = scrolled ? "0" : "1";
    });

    // Recolor paths/ellipses inside #MARK (skip first child path and .gold elements)
    const mark = svg.getElementById("MARK");
    if (mark) {
      const els = Array.from(mark.querySelectorAll("path, ellipse"));
      els.slice(1).forEach((el) => {
        const svgEl = el as SVGElement;
        const isGold = svgEl.classList.contains("gold") || svgEl.getAttribute("fill") === "#ccaf6e";
        if (isGold) return;
        svgEl.style.transition = "fill 0.35s ease";
        svgEl.style.fill = scrolled ? "#0b375d" : "";
      });
    }
  }, [scrolled]);

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          #navbar-logo { transform: scale(0.8); transform-origin: left top; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
      <nav
        className="navbar fixed top-0 left-0 right-0 z-50 flex items-center justify-between overflow-visible"
        style={{
          height: scrolled ? 56 : 72,
          paddingLeft: "3vw",
          paddingRight: "3vw",
          backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "#ffffff",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled
            ? "0 2px 16px rgba(11,55,93,0.08)"
            : "0 1px 0 rgba(11,55,93,0.06)",
          transform: hidden && !mobileOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Logo — always visible */}
        <Link
          id="navbar-logo"
          href="/"
          className="flex-shrink-0"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          style={{
            position: "absolute",
            top: scrolled ? -3 : 0,
            left: "3vw",
            transition: "all 0.35s ease",
            display: "block",
          }}
        >
          <object
            ref={logoRef}
            data="/assets/logo.svg"
            type="image/svg+xml"
            aria-label="Troy M. Moore"
            onLoad={() => {
              const svg = logoRef.current?.contentDocument;
              if (!svg) return;
              ["TYPE", "BADGE"].forEach((id) => {
                const el = svg.getElementById(id);
                if (el) el.style.transition = "opacity 0.35s ease";
              });
              const mark = svg.getElementById("MARK");
              if (mark) {
                Array.from(mark.querySelectorAll("path, ellipse")).slice(1).forEach((el) => {
                  const svgEl = el as SVGElement;
                  const isGold = svgEl.classList.contains("gold") || svgEl.getAttribute("fill") === "#ccaf6e";
                  if (isGold) return;
                  svgEl.style.transition = "fill 0.35s ease";
                });
              }
            }}
            style={{
              height: scrolled ? 80 : 143,
              width: "auto",
              transition: "height 0.35s ease",
              filter: "drop-shadow(0 4px 8px rgba(11,55,93,0.1))",
              pointerEvents: "none",
              display: "block",
            }}
          />
          {/* Transparent overlay — captures clicks that <object> would otherwise absorb */}
          <div aria-hidden style={{ position: "absolute", inset: 0 }} />
        </Link>

        {/* Left links — desktop only */}
        <div className="hidden lg:flex items-center gap-6" style={{ marginLeft: scrolled ? 136 : 179 }}>
          <div className="flex items-center" style={{ gap: "23px" }}>
            {navData.leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="nav-link tracking-wide"
                style={{ color: "var(--navy)", fontSize: "19px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: right links + divider + phone CTA */}
        <div className="hidden lg:flex items-center gap-5">
          {navData.rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); navigate(link.href); }}
              className="nav-link text-[13px] tracking-wide"
              style={{ color: "var(--navy)" }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ width: 1, height: 18, backgroundColor: "rgba(11,55,93,0.2)" }} />
          <a
            href={navData.phone.href}
            className="nav-link tracking-wide font-semibold"
            style={{ color: "var(--gold)", fontSize: "19px" }}
          >
            {navData.phone.label}
          </a>
        </div>

        {/* Mobile hamburger — flush to right edge */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: scrolled ? 56 : 72,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            backgroundColor: "var(--navy)",
            border: "none",
            cursor: "pointer",
            zIndex: 60,
          }}
          className="mobile-hamburger"
        >
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#ffffff", transition: "transform 0.3s ease, opacity 0.3s ease", transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#ffffff", transition: "opacity 0.3s ease", opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, backgroundColor: "#ffffff", transition: "transform 0.3s ease, opacity 0.3s ease", transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } }}
            style={{
              position: "fixed",
              top: scrolled ? 56 : 72,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 49,
              backgroundColor: "#ffffff",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Nav links */}
            <div style={{ flex: 1, padding: "clamp(2rem, 8vw, 3rem) clamp(1.5rem, 8vw, 2.5rem)", display: "flex", flexDirection: "column" }}>
              {/* Primary links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "clamp(1.5rem, 5vw, 2rem)" }}>
                {navData.leftLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.08, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate(link.href); }}
                      style={{
                        display: "block",
                        fontFamily: '"kepler-std", serif',
                        fontWeight: 300,
                        fontStyle: "italic",
                        fontSize: "clamp(2rem, 9vw, 3rem)",
                        color: "var(--navy)",
                        lineHeight: 1.2,
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.24, duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left center", height: 1, backgroundColor: "rgba(11,55,93,0.1)", marginBottom: "clamp(1rem, 4vw, 1.5rem)" }}
              />

              {/* Secondary links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", marginBottom: "auto" }}>
                {navData.rightLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 + i * 0.05, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); setMobileOpen(false); navigate(link.href); }}
                      style={{
                        display: "block",
                        fontFamily: '"avenir-lt-pro", sans-serif',
                        fontWeight: 400,
                        fontSize: "clamp(1rem, 4.5vw, 1.4rem)",
                        color: "rgba(11,55,93,0.65)",
                        paddingTop: "0.45rem",
                        paddingBottom: "0.45rem",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.35 }}
              style={{
                padding: "1.25rem clamp(1.5rem, 8vw, 2.5rem)",
                borderTop: "1px solid rgba(11,55,93,0.08)",
                background: "#f9f9f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <a
                href={navData.phone.href}
                style={{ color: "var(--navy)", fontFamily: '"avenir-lt-pro", sans-serif', fontWeight: 600, fontSize: "clamp(0.95rem, 4vw, 1.1rem)" }}
              >
                {navData.phone.label}
              </a>
              <a
                href={navData.phone.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1.25rem",
                  backgroundColor: "var(--navy)",
                  color: "#ffffff",
                  borderRadius: 100,
                  fontFamily: '"avenir-lt-pro", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(0.78rem, 3.2vw, 0.9rem)",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                Call Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
