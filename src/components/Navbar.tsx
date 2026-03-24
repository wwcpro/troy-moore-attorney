"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import navData from "@/data/navigation.json";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const logoRef = useRef<HTMLObjectElement>(null);

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

    // Recolor paths/ellipses inside #MARK (skip first child path)
    const mark = svg.getElementById("MARK");
    if (mark) {
      const els = Array.from(mark.querySelectorAll("path, ellipse"));
      els.slice(1).forEach((el) => {
        (el as SVGElement).style.transition = "fill 0.35s ease";
        (el as SVGElement).style.fill = scrolled ? "#0b375d" : "";
      });
    }
  }, [scrolled]);

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          #navbar-logo { transform: scale(0.8); transform-origin: left top; }
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
          style={{
            position: "absolute",
            top: scrolled ? -3 : 0,
            left: "3vw",
            transition: "all 0.35s ease",
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
                  (el as SVGElement).style.transition = "fill 0.35s ease";
                });
              }
            }}
            style={{
              height: scrolled ? 80 : 143,
              width: "auto",
              transition: "height 0.35s ease",
              filter: "drop-shadow(0 4px 8px rgba(11,55,93,0.1))",
              pointerEvents: "none",
            }}
          />
        </Link>

        {/* Left links — desktop only */}
        <div className="hidden lg:flex items-center gap-6" style={{ marginLeft: scrolled ? 136 : 179 }}>
          <div className="flex items-center" style={{ gap: "23px" }}>
            {navData.leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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

        {/* Mobile phone number — left of hamburger */}
        <a
          href={navData.phone.href}
          className="lg:hidden nav-link font-semibold"
          style={{ position: "absolute", right: "4rem", top: "50%", transform: "translateY(-50%)", color: "var(--navy)", fontSize: "16px" }}
        >
          {navData.phone.label}
        </a>

        {/* Mobile hamburger — 2 bars, blue square, right-aligned */}
        <button
          className="lg:hidden flex flex-col items-center justify-center gap-[5px]"
          style={{
            position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
            width: 38, height: 38, backgroundColor: "var(--navy)", borderRadius: 4,
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-[2px] transition-all duration-300"
            style={{
              width: 18, backgroundColor: "#ffffff",
              transform: mobileOpen ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[2px] transition-all duration-300"
            style={{
              width: 18, backgroundColor: "#ffffff",
              transform: mobileOpen ? "translateY(-3.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center transition-all duration-500"
        style={{
          backgroundColor: "#ffffff",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          paddingLeft: "10vw",
          gap: "1.25rem",
        }}
      >
        {/* Primary links — kepler-std italic */}
        {navData.leftLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: '"kepler-std", serif',
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(1.87rem, 8.5vw, 2.975rem)",
              color: "var(--navy)",
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Divider */}
        <div style={{ width: "40%", height: 1, backgroundColor: "rgba(11,55,93,0.15)" }} />

        {/* Secondary links — avenir-lt-pro, 20% smaller */}
        {navData.rightLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: '"avenir-lt-pro", sans-serif',
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 6.8vw, 2.38rem)",
              color: "var(--navy)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
