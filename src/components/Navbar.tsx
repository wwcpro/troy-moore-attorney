"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import navData from "@/data/navigation.json";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

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

  return (
    <>
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
        {/* Left: Logo + left links */}
        <div className="flex items-center gap-6" style={{ marginLeft: scrolled ? 120 : 160 }}>
          <Link
            href="/"
            className="flex-shrink-0"
            style={{
              /* logo top edge at top of viewport, hangs below navbar */
              position: "absolute",
              top: 0,
              left: "3vw",
              transition: "all 0.35s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.svg"
              alt="Troy M. Moore"
              style={{
                height: scrolled ? 108 : 143,
                width: "auto",
                transition: "height 0.35s ease",
                filter: "drop-shadow(0 4px 8px rgba(11,55,93,0.1))",
              }}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-5">
            {navData.leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[13px] tracking-wide"
                style={{ color: "var(--navy)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: right links + phone CTA */}
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
          <a
            href={navData.phone.href}
            className="ml-1 px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(195,160,91,0.35)] hover:scale-[1.03]"
            style={{ backgroundColor: "var(--gold)", color: "#fff" }}
          >
            {navData.phone.label}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: "var(--navy)",
              transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: "var(--navy)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              backgroundColor: "var(--navy)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500"
        style={{
          backgroundColor: "var(--navy)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {[...navData.leftLinks, ...navData.rightLinks].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-white text-2xl tracking-wide hover:text-[var(--gold)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={navData.phone.href}
          className="mt-4 px-8 py-3 rounded-full text-lg font-semibold"
          style={{ backgroundColor: "var(--gold)", color: "#fff" }}
        >
          {navData.phone.label}
        </a>
      </div>
    </>
  );
}
