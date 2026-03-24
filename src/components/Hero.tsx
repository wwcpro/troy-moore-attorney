"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import LetterAnimation from "./LetterAnimation";
import ScrollReveal from "./ScrollReveal";
import heroData from "@/data/hero.json";

export default function Hero({ loaderDone }: { loaderDone: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

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

  return (
    <>
      <section id="hero" className="relative" style={{ paddingTop: "calc(72px + 5vw)", backgroundColor: "#f9f9f9" }}>
        {/* Container with 15vw padding */}
        <div
          className="mx-auto flex flex-col lg:flex-row items-stretch"
          style={{ paddingLeft: "5vw", paddingRight: "10vw", maxWidth: 1800, minWidth: 0 }}
        >
          {/* Left: Hero Image */}
          <div
            ref={imageRef}
            className="lg:w-[48%] relative flex items-end justify-center"
            style={{ opacity: 0, paddingLeft: "5vw", paddingRight: "3vw" }}
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
            className="lg:w-[52%] flex flex-col justify-center"
            style={{ paddingTop: "2vw", paddingBottom: "2vw" }}
          >
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="eyebrow font-medium"
              style={{ color: "var(--gold)", opacity: 0, marginBottom: "1vw" }}
            >
              {heroData.eyebrow}
            </p>

            {/* Headline */}
            <h1 style={{ marginBottom: "1vw" }}>{heroData.headline}</h1>

            {/* Paragraph */}
            <ScrollReveal>
              <p style={{ color: "#5a6a7a", marginBottom: "1vw" }}>
                {heroData.paragraph}
              </p>
            </ScrollReveal>

            {/* Why Clients Choose Troy */}
            <ScrollReveal>
              <p className="font-bold" style={{ color: "var(--navy)", marginBottom: "1vw" }}>
                {heroData.bulletHeading}
              </p>
            </ScrollReveal>

            {/* Bullets */}
            <ScrollReveal stagger={0.1}>
              {heroData.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3" style={{ marginBottom: "1vw" }}>
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
            <ScrollReveal style={{ marginTop: "1vw" }}>
              <blockquote
                className="italic"
                style={{ color: "var(--navy)", marginBottom: "1vw", fontSize: "1.27vw", lineHeight: "1.7em", width: "92%" }}
              >
                &ldquo;{heroData.quote}&rdquo;
              </blockquote>
              <div style={{ width: "92%", display: "flex", justifyContent: "flex-end" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/signature.svg"
                  alt="Troy M. Moore Signature"
                  style={{ width: "10.6vw", minWidth: 133, opacity: 0.7 }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blue bar below hero */}
      <div
        style={{
          width: "100%",
          height: 60,
          backgroundImage: "url(/assets/blue.png)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
    </>
  );
}
