"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import items from "@/data/staying-informed.json";

export default function StayingInformed() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

    return () => ctx.revert();
  }, []);

  return (
    <section id="staying-informed" ref={sectionRef} className="" style={{ paddingTop: "5vw", paddingBottom: "5vw", minHeight: "75vh", backgroundColor: "#f9f9f9" }}>
      <div className="mx-auto" style={{ paddingLeft: "10vw", paddingRight: "10vw", maxWidth: 1800 }}>
        {/* Section title */}
        <div style={{ marginBottom: "3vw" }}>
          <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
            STAYING
          </p>
          <h2>Informed</h2>
        </div>

        {/* Rows */}
        <div>
          {items.map((item, i) => (
            <div key={i}>
              <div className="divider-line" />
              <Link
                href={item.href}
                className="info-row group flex flex-col md:flex-row md:items-center transition-all duration-300 hover:pl-3"
                style={{ padding: "3vw 0", opacity: 0 }}
              >
                {/* Left label */}
                <span
                  className="eyebrow font-semibold"
                  style={{ color: "var(--gold)", flex: 2 }}
                >
                  {item.label}
                </span>
                {/* Title + Description */}
                <div className="min-w-0" style={{ flex: 9 }}>
                  <h3 className="transition-colors duration-300 group-hover:text-[var(--gold)]" style={{ color: "var(--navy)", marginBottom: "0.3vw" }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#8899a8" }}>
                    {item.description}
                  </p>
                </div>
                {/* Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: "var(--gold)", flex: 1, fill: "currentColor" }}
                >
                  <path d="M320 80C452.5 80 560 187.5 560 320C560 452.5 452.5 560 320 560C187.5 560 80 452.5 80 320C80 187.5 187.5 80 320 80zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM413.7 325.7L419.4 320L413.7 314.3L341.7 242.3L336 236.6L324.7 247.9L330.4 253.6L388.7 311.9L224 311.9L224 327.9L388.7 327.9L324.7 391.9L336 403.2L413.7 325.5z" />
                </svg>
              </Link>
            </div>
          ))}
          <div className="divider-line" />
        </div>
      </div>
    </section>
  );
}
