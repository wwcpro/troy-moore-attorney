"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import footerData from "@/data/footer.json";
import { getFooterNav } from "@/lib/footerNav";

function ArrowLeft() {
  return (
    <svg width="36" height="10" viewBox="0 0 36 10" fill="none" aria-hidden>
      <line x1="35" y1="5" x2="1" y2="5" stroke="currentColor" strokeWidth="0.75"/>
      <polyline points="6,1 1,5 6,9" stroke="currentColor" strokeWidth="0.75" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="36" height="10" viewBox="0 0 36 10" fill="none" aria-hidden>
      <line x1="1" y1="5" x2="35" y2="5" stroke="currentColor" strokeWidth="0.75"/>
      <polyline points="30,1 35,5 30,9" stroke="currentColor" strokeWidth="0.75" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

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
  const pathname = usePathname();
  const { prev, next } = getFooterNav(pathname);

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
      {/* Upper Footer — Prev / Next navigation */}
      <div style={{ backgroundColor: "var(--navy)" }}>
        <style>{`
          .footer-nav-panel {
            flex: 1;
            display: flex;
            align-items: center;
            padding: clamp(2.5rem, 4vw, 4.5rem) clamp(2rem, 5vw, 6rem);
            text-decoration: none;
            transition: background 0.3s ease;
            min-width: 0;
          }
          .footer-nav-panel:hover { background: rgba(255,255,255,0.04); }
          .footer-nav-panel:hover .footer-nav-arrow { color: var(--gold); }
          .footer-nav-panel:hover .footer-nav-label { color: var(--gold); }
          .footer-nav-arrow {
            color: rgba(255,255,255,0.3);
            flex-shrink: 0;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .footer-nav-panel.prev:hover .footer-nav-arrow { transform: translateX(-4px); }
          .footer-nav-panel.next:hover .footer-nav-arrow { transform: translateX(4px); }
          .footer-nav-eyebrow {
            font-family: var(--font-eyebrow);
            font-size: clamp(0.55rem, 0.6vw, 0.65rem);
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.35);
            margin-bottom: 0.4rem;
          }
          .footer-nav-label {
            font-family: var(--font-heading);
            font-style: italic;
            font-weight: 300;
            font-size: clamp(1.4rem, 2vw, 2.6rem);
            color: #ffffff;
            line-height: 1.15;
            white-space: nowrap;
            transition: color 0.3s ease;
          }
          .footer-nav-desc {
            font-size: clamp(0.72rem, 0.78vw, 0.85rem);
            color: rgba(255,255,255,0.4);
            margin-top: 0.35rem;
            line-height: 1.5;
            white-space: nowrap;
          }
          @media (max-width: 600px) {
            .footer-nav-label { white-space: normal; font-size: clamp(1.2rem, 5vw, 1.8rem); }
            .footer-nav-desc  { white-space: normal; }
          }
        `}</style>
        <div style={{ display: "flex", flexDirection: "row" }}>

          {/* Prev */}
          <TransitionLink href={prev.href} className="footer-nav-panel prev" style={{ gap: "clamp(1rem, 2vw, 1.75rem)" }}>
            <span className="footer-nav-arrow"><ArrowLeft /></span>
            <div style={{ minWidth: 0 }}>
              <p className="footer-nav-eyebrow">Previous</p>
              <p className="footer-nav-label">{prev.label}</p>
              <p className="footer-nav-desc">{prev.description}</p>
            </div>
          </TransitionLink>

          {/* Divider */}
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)", flexShrink: 0, margin: "clamp(1.5rem, 3vw, 3rem) 0" }} />

          {/* Next */}
          <TransitionLink href={next.href} className="footer-nav-panel next" style={{ justifyContent: "flex-end", gap: "clamp(1rem, 2vw, 1.75rem)" }}>
            <div style={{ minWidth: 0, textAlign: "right" }}>
              <p className="footer-nav-eyebrow">Next</p>
              <p className="footer-nav-label">{next.label}</p>
              <p className="footer-nav-desc">{next.description}</p>
            </div>
            <span className="footer-nav-arrow"><ArrowRight /></span>
          </TransitionLink>

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
                width={128}
                height={140}
                style={{ width: "8vw", minWidth: 80, marginBottom: "2vw" }}
              />
              {/* Badge logos */}
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {[
                  { src: "/assets/badge-htla.webp", alt: "HTLA" },
                  { src: "/assets/badge-reptl.webp", alt: "REPTL" },
                  { src: "/assets/badge-expertise.webp", alt: "Expertise" },
                  { src: "/assets/badge-ttla.webp", alt: "TTLA" },
                ].map((badge) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={badge.alt}
                    src={badge.src}
                    alt={badge.alt}
                    width={80}
                    height={36}
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
            <TransitionLink href="/sitemap" style={{ fontSize: "0.72rem", color: "var(--navy)", opacity: 0.5, transition: "opacity 0.2s" }} className="hover:opacity-100">
              Sitemap
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
