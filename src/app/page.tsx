"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestCarousel from "@/components/LatestCarousel";
import StayingInformed from "@/components/StayingInformed";
import FeaturedArticle from "@/components/FeaturedArticle";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import SidePanel, { type PanelItem } from "@/components/SidePanel";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Set initial states on mount
  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, []);

  const openPanel = useCallback((item: PanelItem) => {
    setPanelItem(item);
    document.body.style.overflow = "hidden";

    // Content: brief push right → slide left
    gsap.timeline()
      .to(contentRef.current, { x: 18, duration: 0.13, ease: "power2.out" })
      .to(contentRef.current, { x: "-85vw", duration: 0.85, ease: "expo.inOut" });

    // Panel: slide in from right simultaneously
    gsap.to(panelRef.current, { x: 0, duration: 0.85, ease: "expo.inOut", delay: 0.06 });
  }, []);

  const closePanel = useCallback(() => {
    // Panel exits right
    gsap.to(panelRef.current, { x: "100%", duration: 0.55, ease: "power4.in" });

    // Content slides back
    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.72,
      ease: "expo.out",
      delay: 0.08,
      onComplete: () => {
        setPanelItem(null);
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      {/* Main content — slides left when panel opens */}
      <div
        ref={contentRef}
        style={{
          opacity: loaderDone ? 1 : 0,
          cursor: panelItem ? "pointer" : "auto",
        }}
        onClick={panelItem ? closePanel : undefined}
      >
        <Navbar />
        <main>
          <Hero loaderDone={loaderDone} />
          <LatestCarousel />
          <StayingInformed onOpen={openPanel} />
          <FeaturedArticle />
        </main>
        <Footer />
      </div>

      {/* Close button — fixed, centered in the 15vw exposed strip */}
      {panelItem && (
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "7.5vw",
            transform: "translateX(-50%)",
            zIndex: 600,
            padding: 8,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <button
            onClick={closePanel}
            aria-label="Close panel"
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              border: "none",
              background: "var(--navy)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              lineHeight: 1,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(11,55,93,0.4)",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Side panel — always mounted, GSAP controls position */}
      <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />

      <FixedCTA show={loaderDone && !panelItem} />
    </>
  );
}
