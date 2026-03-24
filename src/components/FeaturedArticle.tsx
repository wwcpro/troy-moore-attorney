"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import data from "@/data/featured-article.json";

export default function FeaturedArticle() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          }
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured-article"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#f9f9f9",
        paddingTop: "5vw",
        paddingBottom: "5vw",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left: Image — touches left edge of window */}
        <div ref={imageRef} className="lg:w-[50%]" style={{ opacity: 0 }}>
          <Image
            src={data.articleImage}
            alt={data.headline}
            width={900}
            height={540}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right: Content card */}
        <div
          ref={cardRef}
          className="lg:w-[50%]"
          style={{ opacity: 0, paddingLeft: "3vw", paddingRight: "5vw" }}
        >
          <p
            className="eyebrow font-semibold"
            style={{ color: "var(--gold)", marginBottom: "1vw" }}
          >
            {data.eyebrow}
          </p>
          <h3
            style={{ color: "var(--navy)", marginBottom: "1vw" }}
          >
            {data.headline}
          </h3>
          <p
            className="leading-[1.8]"
            style={{ color: "#5a6a7a", marginBottom: "2vw" }}
          >
            {data.description}
          </p>
          <Link
            href={data.buttonHref}
            className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(195,160,91,0.35)] hover:scale-[1.03]"
            style={{ backgroundColor: "var(--gold)", color: "#fff" }}
          >
            {data.buttonText}
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
