"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import ScrollReveal from "./ScrollReveal";
import heroData from "@/data/hero.json";
import TestimonialCarousel from "./TestimonialCarousel";

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

  // Load Lottie signature via dynamic import to avoid SSR issues
  useEffect(() => {
    if (!loaderDone) return;
    const container = signatureRef.current;
    if (!container) return;
    let destroyed = false;
    (async () => {
      const [lottie, data] = await Promise.all([
        import("lottie-web").then((m) => m.default),
        fetch("/assets/signature.json").then((r) => r.json()),
      ]);
      if (destroyed) return;
      lottieInstance.current = lottie.loadAnimation({ container, renderer: "svg", loop: false, autoplay: false, animationData: data });
      setTimeout(() => lottieInstance.current?.play(), 1200);
    })();
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
          <div id="hero-img-wrap" ref={imageRef} className="lg:w-[48%] relative flex items-end justify-center" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
            <Image src={heroData.heroImage} alt="Troy M. Moore" width={540} height={720} className="w-full h-auto object-cover object-top" priority sizes="(max-width: 1023px) 100vw, 48vw" />
          </div>

          {/* Blue bar — mobile only */}
          <div className="lg:hidden" style={{ width: "100%", height: 15, backgroundColor: "var(--navy)", flexShrink: 0 }} />

          {/* Right: Content */}
          <div id="hero-text" className="lg:w-[52%] flex flex-col justify-start" style={{ paddingBottom: "2vw", paddingTop: "2vw", paddingRight: "4vw" }}>
            <p ref={eyebrowRef} className="eyebrow font-medium" style={{ color: "var(--gold)", marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.eyebrow}</p>
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
            <div className="stats-left" style={{ flex: "0 0 55%" }}>
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
