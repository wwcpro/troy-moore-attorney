"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const stableOnComplete = useCallback(onComplete, []);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (overlayRef.current) overlayRef.current.style.display = "none";
        stableOnComplete();
      },
    });

    tl.fromTo(
      iconRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" }
    )
      .to(iconRef.current, {
        scale: 1.08,
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      .to(iconRef.current, { duration: 0.15 })
      .to(iconRef.current, {
        scale: 1.3,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
      }, "-=0.3");
  }, [stableOnComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        willChange: "transform",
      }}
    >
      <div ref={iconRef} style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/icon.svg" alt="Loading" width={90} height={90} />
      </div>
    </div>
  );
}
