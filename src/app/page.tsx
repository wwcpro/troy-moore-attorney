"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestCarousel from "@/components/LatestCarousel";
import StayingInformed from "@/components/StayingInformed";
import FeaturedArticle from "@/components/FeaturedArticle";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      {/* Page content — hidden until loader finishes */}
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero loaderDone={loaderDone} />
          <LatestCarousel />
          <StayingInformed />
          <FeaturedArticle />
        </main>
        <Footer />
      </div>
    </>
  );
}
