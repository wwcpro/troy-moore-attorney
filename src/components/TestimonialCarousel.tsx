"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import testimonialsData from "@/data/testimonials.json";

export default function TestimonialCarousel() {
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
      <div ref={quoteRef} style={{ flex: 1 }}>
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
        <span ref={attrRef} style={{ display: "block", marginTop: "1.1rem", fontFamily: "avenir-lt-pro, sans-serif", fontStyle: "normal", fontSize: "clamp(1rem, 1.2vw, 1.25rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "0.02em" }}>
          — {t.author}
        </span>
      </div>

      <div aria-hidden="true" style={{ position: "absolute", bottom: "calc(200px + 4.5rem - 19vw)", right: "4.5vw", lineHeight: 1, fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "clamp(15rem, 25vw, 27.5rem)", color: "#098afc", opacity: 0.21, userSelect: "none", pointerEvents: "none" }}>
        &rdquo;
      </div>

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
