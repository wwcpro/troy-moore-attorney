"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import ScrollReveal from "./ScrollReveal";
import heroData from "@/data/hero.json";
import testimonialsData from "@/data/testimonials.json";

const STATS = [
  { value: 24, suffix: "+", label: "Years of Experience" },
  { value: 1700, suffix: "+", label: "Complex Cases Handled" },
  { value: 3000, suffix: "+", label: "Clients Served" },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: numRef.current, start: "top 80%", once: true },
      onUpdate() {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val).toLocaleString();
      },
    });
  }, [value]);

  return (
    <div className="stat-row" style={{ paddingTop: "1.2vw", paddingBottom: "1.2vw", borderTop: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", gap: "2vw" }}>
      {/* Large number */}
      <div style={{ minWidth: "45%", lineHeight: 1 }}>
        <span
          ref={numRef}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3.2rem, 7vw, 8rem)", color: "#ffffff", letterSpacing: "-0.02em" }}
        >
          0
        </span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3.2rem, 7vw, 8rem)", color: "#ffffff", letterSpacing: "-0.02em" }}>
          {suffix}
        </span>
      </div>
      {/* Label */}
      <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.7rem, 1vw, 1rem)", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.5 }}>
        {label}
      </p>
    </div>
  );
}

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const attrRef  = useRef<HTMLSpanElement>(null);
  const isFirst  = useRef(true);

  const navigate = (dir: 1 | -1) => {
    if (busy) return;
    setBusy(true);
    gsap.to([quoteRef.current, attrRef.current], {
      opacity: 0, y: -14, duration: 0.22, ease: "power2.in",
      onComplete: () => setIdx(i => (i + dir + testimonialsData.length) % testimonialsData.length),
    });
  };

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    gsap.fromTo(
      [quoteRef.current, attrRef.current],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", onComplete: () => setBusy(false) }
    );
  }, [idx]);

  const t = testimonialsData[idx];

  return (
    <div style={{
      background: "var(--navy)",
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "clamp(2rem, 3.5vw, 3.5rem)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Stars + quote */}
      <div ref={quoteRef} style={{ flex: 1 }}>
        {/* 5 stars */}
        <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1.1rem" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={18} height={18} style={{ fill: "var(--gold)", flexShrink: 0 }}>
              <path d="M320.2 11.2L227.6 192.6L26.5 224.6L170.4 368.7L138.7 569.9L320.2 477.6L501.7 569.9L470 368.7L613.9 224.6L412.8 192.6L320.2 11.2z"/>
            </svg>
          ))}
        </div>
        <blockquote style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.55vw, 1.7rem)",
          lineHeight: 1.6,
          color: "#ffffff",
          margin: 0,
        }}>
          &ldquo;{t.body}&rdquo;
        </blockquote>
      </div>

      {/* Accent quote — large decorative mark, 2vw from right edge */}
      <div aria-hidden="true" style={{ textAlign: "right", paddingRight: "2vw", lineHeight: 0.8, fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "clamp(15rem, 25vw, 27.5rem)", color: "#098afc", opacity: 0.21, userSelect: "none", pointerEvents: "none", overflow: "hidden", marginBottom: "-0.15em" }}>
        &rdquo;
      </div>

      {/* Byline — just above footer line */}
      <span ref={attrRef} style={{ display: "block", marginBottom: "0.85rem", fontFamily: "avenir-lt-pro, sans-serif", fontStyle: "normal", fontSize: "clamp(1rem, 1.2vw, 1.25rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "0.02em" }}>
        — {t.author}
      </span>

      {/* Footer: arrows only */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {([[-1, "M15 18l-6-6 6-6"], [1, "M9 6l6 6-6 6"]] as const).map(([dir, d]) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.22)",
                background: "transparent", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffffff", flexShrink: 0,
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({ loaderDone }: { loaderDone: boolean }) {
  const imageRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieInstance = useRef<any>(null);

  useEffect(() => {
    if (!loaderDone) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { x: -80, opacity: 0, scale: 0.97 }, { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.1 });
      gsap.fromTo(eyebrowRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.25 });
    });
    return () => ctx.revert();
  }, [loaderDone]);

  // Stats: scroll entrance + proximity hover (no scrub)
  useEffect(() => {
    if (!statsBarRef.current) return;
    const section = statsBarRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-row",
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.13, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true } }
      );
    }, statsBarRef);

    // Proximity hover — same mechanic as StayingInformed
    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".stat-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.06;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => rowEls.forEach((row) => gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }));

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Load Lottie signature via CDN to avoid SSR/bundler issues
  useEffect(() => {
    if (!loaderDone) return;
    const container = signatureRef.current;
    if (!container) return;
    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const init = (data: unknown) => {
      if (destroyed || !win.lottie) return;
      lottieInstance.current = win.lottie.loadAnimation({ container, renderer: "svg", loop: false, autoplay: false, animationData: data });
      setTimeout(() => lottieInstance.current?.play(), 1200);
    };
    const loadData = () => fetch("/assets/signature.json").then((r) => r.json());
    if (win.lottie) {
      loadData().then(init);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
      script.onload = () => loadData().then(init);
      document.head.appendChild(script);
    }
    return () => { destroyed = true; lottieInstance.current?.destroy(); };
  }, [loaderDone]);

  return (
    <>
      <style>{`
        #hero { padding-top: calc(72px + 3.5vw); }
        @media (max-width: 1023px) {
          #hero { padding-top: 0 !important; }
          #hero-inner { padding-left: 0 !important; padding-right: 0 !important; }
          #hero-img-wrap { height: 71svh; padding: 0 !important; }
          #hero-img-wrap img { object-position: right top !important; max-width: 80%; }
          #hero-text { padding: 1.5rem; margin-top: 2rem; }
          .stats-columns { flex-direction: column !important; }
          .stats-left { min-width: 100% !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="hero" className="relative" style={{ backgroundColor: "#f9f9f9" }}>
        <div id="hero-inner" className="mx-auto flex flex-col lg:flex-row items-stretch" style={{ paddingLeft: "5vw", paddingRight: "5vw", minWidth: 0 }}>
          {/* Left: Hero Image */}
          <div id="hero-img-wrap" ref={imageRef} className="lg:w-[48%] relative flex items-end justify-center" style={{ opacity: 0, paddingLeft: "2vw", paddingRight: "2vw" }}>
            <Image src={heroData.heroImage} alt="Troy M. Moore" width={540} height={720} className="w-full h-auto object-cover object-top" priority />
          </div>

          {/* Blue bar — mobile only */}
          <div className="lg:hidden" style={{ width: "100%", height: 15, backgroundColor: "var(--navy)", flexShrink: 0 }} />

          {/* Right: Content */}
          <div id="hero-text" className="lg:w-[52%] flex flex-col justify-start" style={{ paddingBottom: "2vw", paddingTop: "2vw", paddingRight: "4vw" }}>
            <p ref={eyebrowRef} className="eyebrow font-medium" style={{ color: "var(--gold)", opacity: 0, marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.eyebrow}</p>
            <h1 style={{ marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.headline}</h1>
            <ScrollReveal>
              <p style={{ color: "#5a6a7a", marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.paragraph}</p>
            </ScrollReveal>
            <ScrollReveal>
              <p className="font-bold" style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.bulletHeading}</p>
            </ScrollReveal>
            <ScrollReveal stagger={0.1}>
              {heroData.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3" style={{ marginBottom: "clamp(1rem, 1vw, 2rem)" }}>
                  <div className="flex-shrink-0 w-[1.4vw] h-[1.4vw] rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--gold)", marginTop: "0.2vw", minWidth: 18, minHeight: 18 }}>
                    <svg width="60%" height="60%" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8L6.5 11L12.5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p><span className="font-bold" style={{ color: "var(--navy)" }}>{bullet.label}</span><span style={{ color: "#5a6a7a" }}> — {bullet.description}</span></p>
                </div>
              ))}
            </ScrollReveal>
            <ScrollReveal style={{ marginTop: "clamp(1rem, 1vw, 2rem)" }}>
              <blockquote className="italic" style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1vw, 2rem)", fontSize: "clamp(0.9rem, 1.27vw, 1.4rem)", lineHeight: "1.7em", width: "92%" }}>
                &ldquo;{heroData.quote}&rdquo;
              </blockquote>
              <div style={{ width: "92%", display: "flex", justifyContent: "flex-end" }}>
                <div ref={signatureRef} style={{ width: "14.1vw", minWidth: 177, opacity: 0.7 }} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Stats + Testimonials ──────────────────────────────────────── */}
      <div ref={statsBarRef} style={{ width: "100%", backgroundImage: "url(/assets/blue-bg2.png)", backgroundSize: "cover", backgroundPosition: "center", paddingTop: "3vw", paddingBottom: "3vw" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto", paddingLeft: "5vw", paddingRight: "5vw" }}>

          {/* Section eyebrow */}
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "3vw", letterSpacing: "0.25em", opacity: 0.8 }}>THE FIRM</p>

          <div className="stats-columns" style={{ display: "flex", gap: "5vw", alignItems: "stretch" }}>

            {/* Left: Stats */}
            <div className="stats-left" style={{ flex: "0 0 42%" }}>
              {STATS.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
              {/* Bottom border */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }} />
            </div>

            {/* Right: Testimonial carousel */}
            <div style={{ flex: 1, minHeight: 320 }}>
              <TestimonialCarousel />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
