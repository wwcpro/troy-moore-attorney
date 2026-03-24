"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import ScrollReveal from "./ScrollReveal";
import heroData from "@/data/hero.json";

const STATS = [
  { value: 24, suffix: "+", label: "Years Experience" },
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
      scrollTrigger: { trigger: numRef.current, start: "top 85%", once: true },
      onUpdate() {
        if (numRef.current) numRef.current.textContent = Math.round(obj.val).toLocaleString();
      },
    });
  }, [value]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ lineHeight: 1, marginBottom: "0.5vw" }}>
        <span
          ref={numRef}
          style={{ color: "#ffffff", fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3.3rem, 6.6vw, 6.6rem)" }}
        >
          0
        </span>
        <span style={{ color: "#ffffff", fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3.3rem, 6.6vw, 6.6rem)" }}>
          {suffix}
        </span>
      </div>
      <p style={{ color: "var(--gold)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.6rem, 1vw, 1rem)", letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

export default function Hero({ loaderDone }: { loaderDone: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieInstance = useRef<any>(null);

  useEffect(() => {
    if (!loaderDone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.25 }
      );
    });

    return () => ctx.revert();
  }, [loaderDone]);

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
      lottieInstance.current = win.lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: data,
      });
      // Play after hero content has animated in
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

    return () => {
      destroyed = true;
      lottieInstance.current?.destroy();
    };
  }, [loaderDone]);

  return (
    <>
      <style>{`
        #hero { padding-top: calc(72px + 3.5vw); }
        @media (max-width: 1023px) {
          #hero { padding-top: 0 !important; }
          #hero-inner { padding-left: 0 !important; padding-right: 0 !important; }
          #hero-img-wrap { height: 100svh; padding: 0 !important; }
          #hero-img-wrap img { object-position: right top !important; }
        }
      `}</style>
      <section id="hero" className="relative" style={{ backgroundColor: "#f9f9f9" }}>
        {/* Container */}
        <div
          id="hero-inner"
          className="mx-auto flex flex-col lg:flex-row items-stretch"
          style={{ paddingLeft: "5vw", paddingRight: "5vw", minWidth: 0 }}
        >
          {/* Left: Hero Image */}
          <div
            id="hero-img-wrap"
            ref={imageRef}
            className="lg:w-[48%] relative flex items-end justify-center"
            style={{ opacity: 0, paddingLeft: "2vw", paddingRight: "2vw" }}
          >
            <Image
              src={heroData.heroImage}
              alt="Troy M. Moore"
              width={540}
              height={720}
              className="w-full h-auto object-cover object-top"
              priority
            />
          </div>

          {/* Right: Content */}
          <div
            className="lg:w-[52%] flex flex-col justify-start"
            style={{ paddingBottom: "2vw", paddingTop: "2vw", paddingRight: "4vw" }}
          >
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="eyebrow font-medium"
              style={{ color: "var(--gold)", opacity: 0, marginBottom: "clamp(1rem, 1vw, 2rem)" }}
            >
              {heroData.eyebrow}
            </p>

            {/* Headline */}
            <h1 style={{ marginBottom: "clamp(1rem, 1vw, 2rem)" }}>{heroData.headline}</h1>

            {/* Paragraph */}
            <ScrollReveal>
              <p style={{ color: "#5a6a7a", marginBottom: "clamp(1rem, 1vw, 2rem)" }}>
                {heroData.paragraph}
              </p>
            </ScrollReveal>

            {/* Why Clients Choose Troy */}
            <ScrollReveal>
              <p className="font-bold" style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1vw, 2rem)" }}>
                {heroData.bulletHeading}
              </p>
            </ScrollReveal>

            {/* Bullets */}
            <ScrollReveal stagger={0.1}>
              {heroData.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3" style={{ marginBottom: "clamp(1rem, 1vw, 2rem)" }}>
                  <div
                    className="flex-shrink-0 w-[1.4vw] h-[1.4vw] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--gold)", marginTop: "0.2vw", minWidth: 18, minHeight: 18 }}
                  >
                    <svg width="60%" height="60%" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8L6.5 11L12.5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p>
                    <span className="font-bold" style={{ color: "var(--navy)" }}>
                      {bullet.label}
                    </span>
                    <span style={{ color: "#5a6a7a" }}> — {bullet.description}</span>
                  </p>
                </div>
              ))}
            </ScrollReveal>

            {/* Quote */}
            <ScrollReveal style={{ marginTop: "clamp(1rem, 1vw, 2rem)" }}>
              <blockquote
                className="italic"
                style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1vw, 2rem)", fontSize: "clamp(0.9rem, 1.27vw, 1.4rem)", lineHeight: "1.7em", width: "92%" }}
              >
                &ldquo;{heroData.quote}&rdquo;
              </blockquote>
              <div style={{ width: "92%", display: "flex", justifyContent: "flex-end" }}>
                <div
                  ref={signatureRef}
                  style={{ width: "14.1vw", minWidth: 177, opacity: 0.7 }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blue bar with stats */}
      <div
        style={{
          width: "100%",
          backgroundImage: "url(/assets/blue-bg2.png)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          paddingTop: "5vw",
          paddingBottom: "5vw",
        }}
      >
        <div style={{ maxWidth: 1600, margin: "0 auto", paddingLeft: "5vw", paddingRight: "5vw" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "clamp(1.5rem, 3vw, 4rem)" }}>
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
