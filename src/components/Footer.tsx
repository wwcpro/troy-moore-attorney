"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import footerData from "@/data/footer.json";

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function Footer() {
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (iconsRef.current) {
        gsap.fromTo(
          iconsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: iconsRef.current, start: "top 92%", once: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer>
      {/* Upper Footer — Locations / People */}
      <div style={{ backgroundColor: "var(--navy)", paddingTop: "5vw", paddingBottom: "5vw" }}>
        <style>{`
          @media (max-width: 767px) {
            .footer-upper { padding-left: 1.5rem !important; padding-right: 1.5rem !important; gap: 1rem; }
            .footer-upper-link {
              border: 1px solid rgba(255,255,255,0.25) !important;
              border-right: 1px solid rgba(255,255,255,0.25) !important;
              padding: 2rem 1.5rem !important;
            }
          }
        `}</style>
        <div
          className="footer-upper flex flex-col md:flex-row items-stretch"
          style={{ paddingLeft: "5vw", paddingRight: "5vw" }}
        >
          {footerData.upperLinks.map((link, i) => (
            <TransitionLink
              key={i}
              href={link.href}
              className="footer-upper-link group flex-1 flex items-center justify-center"
              style={{
                borderRight: i < footerData.upperLinks.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                padding: "clamp(1.5rem, 2vw, 3rem) clamp(1rem, 4vw, 5rem)",
              }}
            >
              <h2 className="text-white transition-colors duration-300 group-hover:text-[var(--gold)] text-center" style={{ fontSize: "clamp(2.2rem, 3vw, 5rem)" }}>
                {link.label}
              </h2>
            </TransitionLink>
          ))}
        </div>
      </div>

      {/* Lower Footer */}
      <div style={{ backgroundColor: "#061e36", paddingTop: "clamp(2rem, 4vw, 5rem)", paddingBottom: "clamp(1rem, 2vw, 3rem)" }}>
        <div style={{ paddingLeft: "clamp(1.5rem, 3vw, 4rem)", paddingRight: "clamp(1.5rem, 3vw, 4rem)" }}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-6">
            {/* Left: Logo + Badges */}
            <div className="lg:w-[22%] flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/icon-white.svg"
                alt="Law Office of Troy M. Moore"
                style={{ width: "8vw", minWidth: 80, marginBottom: "2vw" }}
              />
              {/* Badge logos */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {[
                  { src: "/assets/badge-htla.png", alt: "HTLA" },
                  { src: "/assets/badge-reptl.png", alt: "REPTL" },
                  { src: "/assets/badge-expertise.png", alt: "Expertise" },
                  { src: "/assets/badge-ttla.png", alt: "TTLA" },
                ].map((badge) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={badge.alt}
                    src={badge.src}
                    alt={badge.alt}
                    style={{ height: 36, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.6 }}
                  />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:w-[22%] flex flex-col gap-2">
              <p className="eyebrow text-white/40 mb-2">Quick Links</p>
              {footerData.quickLinks.map((link, i) => (
                <TransitionLink
                  key={i}
                  href={link.href}
                  className="text-white/60 hover:text-[var(--gold)] transition-colors"
                  style={{ fontSize: "clamp(0.75rem, 0.75vw, 1rem)" }}
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>

            {/* Locations */}
            <div className="lg:w-[28%] flex flex-col gap-4">
              <p className="eyebrow text-white/40 mb-2">Locations</p>
              {footerData.locations.map((loc, i) => (
                <div key={i}>
                  <p className="text-white/80 font-semibold" style={{ fontSize: "clamp(0.75rem, 0.75vw, 1rem)" }}>{loc.name}</p>
                  <p className="text-white/45" style={{ fontSize: "clamp(0.7rem, 0.7vw, 0.9rem)", lineHeight: 1.7 }}>{loc.address}<br />{loc.city}</p>
                </div>
              ))}
              <TransitionLink
                href="/service-areas"
                className="text-[var(--gold)] hover:text-white transition-colors"
                style={{ fontSize: "clamp(0.72rem, 0.75vw, 0.9rem)", marginTop: "0.25rem" }}
              >
                View All Service Areas →
              </TransitionLink>
            </div>

            {/* Contact */}
            <div className="lg:w-[28%] flex flex-col gap-2">
              <p className="eyebrow text-white/40 mb-2">Contact</p>
              <p className="text-white/60" style={{ fontSize: "clamp(0.75rem, 0.75vw, 1rem)" }}>
                Call or Text: <a href={`tel:${footerData.contact.phone}`} className="text-[var(--gold)] hover:text-white transition-colors">{footerData.contact.phone}</a>
              </p>
              <p className="text-white/60" style={{ fontSize: "clamp(0.75rem, 0.75vw, 1rem)" }}>
                <a href={`mailto:${footerData.contact.email}`} className="text-[var(--gold)] hover:text-white transition-colors">{footerData.contact.email}</a>
              </p>
              <p className="text-white" style={{ fontSize: "clamp(0.8rem, 0.85vw, 1rem)", marginTop: "0.5vw" }}>{footerData.contact.hours}</p>
              {/* Social icons */}
              <p className="text-[12px] text-white/50 mt-4 mb-2">Stay Connected</p>
              <div ref={iconsRef} className="flex gap-2.5">
                {footerData.socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 transition-all duration-300 hover:text-white hover:bg-[var(--gold)]"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                    aria-label={social.label}
                  >
                    {socialIcons[social.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ backgroundColor: "#ffffff", paddingLeft: "3vw", paddingRight: "3vw", paddingTop: "1.25rem", paddingBottom: "8rem", borderTop: "1px solid rgba(11,55,93,0.08)" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3" style={{ color: "var(--navy)" }}>
          <p style={{ fontSize: "0.72rem", opacity: 0.5 }}>
            © {new Date().getFullYear()} Law Office of Troy M. Moore. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <TransitionLink href="/privacy-policy" style={{ fontSize: "0.72rem", color: "var(--navy)", opacity: 0.5, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Privacy Policy
            </TransitionLink>
            <TransitionLink href="/terms-and-conditions" style={{ fontSize: "0.72rem", color: "var(--navy)", opacity: 0.5, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Terms &amp; Conditions
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
