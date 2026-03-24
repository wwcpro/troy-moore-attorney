"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import items from "@/data/staying-informed.json";
import type { PanelItem } from "@/components/SidePanel";

interface Props {
  onOpen?: (item: PanelItem) => void;
}

export default function StayingInformed({ onOpen }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll(".info-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      const dividers = sectionRef.current!.querySelectorAll(".divider-line");
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, sectionRef);

    // Proximity scale — rows grow toward cursor based on vertical distance
    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));

    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => {
      rowEls.forEach((row) => gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }));
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="staying-informed" ref={sectionRef} className="" style={{ paddingTop: "5vw", paddingBottom: "5vw", minHeight: "75vh", backgroundColor: "#f9f9f9" }}>
      <div style={{ paddingLeft: "10vw", paddingRight: "10vw" }}>
        {/* Section title */}
        <div style={{ marginBottom: "3vw" }}>
          <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
            CORE PRACTICE
          </p>
          <h2>Areas</h2>
        </div>

        {/* Rows */}
        <style>{`
          .info-row .cta-circle {
            width: 4.4em; height: 4.4em; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; position: relative; overflow: hidden;
            color: rgba(11,55,93,0.35);
            transition: color 0.6s ease;
          }
          .info-row:hover .cta-circle { color: var(--gold); }
          .info-row .cta-circle svg .CircleIcon_circle__vewPw {
            stroke: rgba(11,55,93,0.2); stroke-width: 1.5; fill: none;
            stroke-dasharray: 100; stroke-dashoffset: 0;
            transition: stroke-dashoffset 1s ease, stroke 0.6s ease;
          }
          .info-row .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
            stroke: var(--gold); stroke-width: 1.5; fill: none;
            stroke-dasharray: 100; stroke-dashoffset: 100;
            transition: stroke-dashoffset 1s ease;
          }
          .info-row:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
            stroke-dashoffset: 0;
          }
          .info-row .cta-circle svg .CircleIcon_icon__n80xg {
            stroke: currentColor; fill: none;
            transition: stroke 0.6s ease;
          }
        `}</style>
        <div className="section-stack">
          {items.map((item, i) => (
            <div key={i}>
              <div className="divider-line" />
              <Link
                href={item.href}
                className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
                style={{ padding: "clamp(1.25rem, 3vw, 3rem) 0", opacity: 0 }}
                onClick={(e) => {
                  if (item.panel && onOpen) {
                    e.preventDefault();
                    onOpen(item as PanelItem);
                  }
                }}
              >
                {/* Left label */}
                <span
                  className="eyebrow font-semibold"
                  style={{ color: "var(--gold)", flex: "0 0 auto", minWidth: 120, marginBottom: "0.5rem" }}
                >
                  {item.label}
                </span>
                {/* Title + Description */}
                <div className="min-w-0" style={{ flex: 9 }}>
                  <h3 className="transition-colors duration-300 group-hover:text-[var(--gold)]" style={{ color: "var(--navy)", marginBottom: "0.3vw" }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>
                    {item.description}
                  </p>
                </div>
                {/* Circle CTA */}
                <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
                  <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                    <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                    <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                    <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </div>
          ))}
          <div className="divider-line" />
        </div>
      </div>
    </section>
  );
}
