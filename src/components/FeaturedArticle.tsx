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
          { opacity: 0, x: -140, scale: 0.92 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 10%",
              scrub: 1.4,
            },
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
    <>
    <style>{`
      @media (max-width: 1023px) {
        #featured-card { padding: 1.5rem !important; }
        #featured-card h3 { margin-bottom: 1rem !important; }
        #featured-card p { margin-bottom: 1rem !important; }
        #featured-card p.desc { margin-bottom: 1.5rem !important; }
      }
    `}</style>
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
        <div
          ref={imageRef}
          className="lg:w-[50%] relative"
          style={{ opacity: 0, padding: "15px", borderTop: "1px solid var(--navy)", borderRight: "1px solid var(--navy)", borderBottom: "1px solid var(--navy)" }}
        >
          <div
            style={{
              boxShadow: "inset -8px 0 24px rgba(0,0,0,0.18), inset 0 -12px 32px rgba(0,0,0,0.22), inset 0 8px 20px rgba(0,0,0,0.12), inset 8px 0 16px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src={data.articleImage}
              alt={data.headline}
              width={900}
              height={540}
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>

        {/* Right: Content card */}
        <div
          id="featured-card"
          ref={cardRef}
          className="lg:w-[50%]"
          style={{ opacity: 0, paddingLeft: "clamp(1.5rem, 3vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}
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
            className="leading-[1.8] desc"
            style={{ color: "#5a6a7a", marginBottom: "2vw" }}
          >
            {data.description}
          </p>
          <Link href={data.buttonHref} className="btn-cta">
            {data.buttonText}
            <span className="cta-circle">
              <svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.625em", height: "1.625em" }}>
                <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
