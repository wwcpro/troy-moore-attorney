"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { usePageTransition } from "@/context/TransitionContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestCarousel from "@/components/LatestCarousel";
import StayingInformed from "@/components/StayingInformed";
import FeaturedArticle from "@/components/FeaturedArticle";
import Footer from "@/components/Footer";
import SidePanel, { type PanelItem } from "@/components/SidePanel";

export default function Home() {
  const { loaderDone } = usePageTransition();
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // After portal mounts, push panel offscreen
  useEffect(() => {
    if (mounted && panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, [mounted]);

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

      {/* Close button and SidePanel are portaled to document.body to escape
          TransitionManager's pageRef (will-change: transform breaks position: fixed) */}
      {mounted && createPortal(
        <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />,
        document.body
      )}

    </>
  );
}
