"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ContactHero() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [eyebrowRef.current, headingRef.current, descRef.current];
    gsap.set(els, { opacity: 0, x: -40 });
    gsap.to(els, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.58,
    });
  }, []);

  return (
    <>
      <p
        ref={eyebrowRef}
        className="eyebrow"
        style={{
          color: "var(--gold)",
          marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
          fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
        }}
      >
        Contact Us
      </p>
      <h1
        ref={headingRef}
        style={{
          color: "#ffffff",
          fontSize: "clamp(3.625rem, 14.5vw, 5.44rem)",
          marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
          maxWidth: "29ch",
        }}
      >
        24 hours a day, 7 days a week
      </h1>
      <p
        ref={descRef}
        style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(1rem, 1.3vw, 1.45rem)",
          fontStyle: "italic",
          fontFamily: "var(--font-heading)",
          fontWeight: 300,
          lineHeight: 1.55,
          maxWidth: "56%",
        }}
      >
        The Law Office of Troy M. Moore is available whenever you need us — serving Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas.
      </p>
    </>
  );
}
