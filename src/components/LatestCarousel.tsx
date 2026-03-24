"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { gsap } from "@/lib/gsap";
import postsData from "@/data/latest-posts.json";

export default function LatestCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="latest"
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: "var(--light-gray)", paddingTop: "5vw", paddingBottom: "5vw", minHeight: "75vh" }}
    >
      {/* Title */}
      <div style={{ paddingLeft: "10vw" }}>
        <div style={{ marginBottom: "3vw" }}>
          <h2>Trusted</h2>
          <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginTop: "0.5vw" }}>
            To Help You
          </p>
        </div>
      </div>

      {/* Carousel — full window width, first card offset 10vw */}
      <div ref={carouselRef} style={{ opacity: 0 }}>
        <style>{`
          .latest-swiper .swiper-wrapper {
            padding-left: 5vw;
            align-items: center;
          }
          @media (min-width: 768px) {
            .latest-swiper .swiper-wrapper {
              padding-left: 20vw;
            }
          }
          .latest-swiper .swiper-slide {
            transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.7s ease,
                        filter 0.7s ease;
            transform-origin: center center;
          }
          .latest-swiper .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.75);
            opacity: 0.45;
            filter: brightness(0.8) blur(3px);
          }
          .latest-swiper .swiper-slide-active {
            transform: scale(1);
            opacity: 1;
            filter: brightness(1) blur(0px);
            z-index: 2;
          }
          .latest-swiper .swiper-slide-next {
            transform: scale(0.82);
            opacity: 0.6;
            filter: brightness(0.85) blur(2px);
          }
          .latest-swiper .swiper-slide-prev {
            transform: scale(0.82);
            opacity: 0.6;
            filter: brightness(0.85) blur(2px);
          }
          @media (min-width: 768px) {
            .carousel-card-wrap { position: relative; padding-top: 4vw; padding-right: 4vw; }
          }
          @media (max-width: 767px) {
            .latest-spacer { width: 0 !important; min-width: 0 !important; overflow: hidden; }
            .latest-card-title { font-size: 1.6rem !important; margin-bottom: 1rem !important; }
            .latest-pagination-btn { width: 36px !important; height: 36px !important; font-size: 0.8rem !important; }
            .latest-pagination-line { width: 16px !important; }
          }
        `}</style>
        <Swiper
          className="latest-swiper"
          modules={[Navigation]}
          slidesPerView={1.1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1.35, spaceBetween: 35 },
            768: { slidesPerView: 1.7, spaceBetween: 45 },
            1200: { slidesPerView: 2.3, spaceBetween: 50 },
          }}
          speed={900}
          onSwiper={setSwiperInstance}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
        >
          {postsData.map((post) => (
            <SwiperSlide key={post.id}>
              {({ isActive }) => (
                <Link href={post.href} className="block group">
                  <div className="carousel-card-wrap" style={{ marginBottom: "2vw" }}>
                    {/* Background image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 55vw, 42vw"
                      />
                    </div>

                    {/* Info card — stacked below on mobile, overlaid top-right on desktop */}
                    <div
                      className="flex flex-col justify-between transition-all duration-700 ease-out md:absolute md:top-0 md:right-0 md:w-[48%] md:h-[52%] md:group-hover:translate-y-[-6px] md:group-hover:translate-x-[6px] md:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                      style={{
                        backgroundColor: isActive ? "#0c375d" : "#c3a05b",
                        color: "#ffffff",
                        padding: "clamp(0.75rem, 2vw, 2rem)",
                        zIndex: 2,
                      }}
                    >
                      <div>
                        <h3 className="latest-card-title" style={{ color: "#ffffff", fontSize: "clamp(0.8rem, 1.3vw, 1.5rem)", lineHeight: 1.25, marginBottom: "0.8vw" }}>
                          {post.title}
                        </h3>
                        {post.description && (
                          <p style={{ opacity: 0.75, color: "#ffffff", lineHeight: 1.5 }}>
                            {post.description}
                          </p>
                        )}
                      </div>
                      <p
                        className="eyebrow"
                        style={{ color: "#ffffff", opacity: 0.8, fontSize: "clamp(0.55rem, 0.65vw, 0.8rem)" }}
                      >
                        {post.category}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
          {/* Spacer slide so last real card can scroll to center — hidden on mobile */}
          <SwiperSlide className="latest-spacer" style={{ width: "20vw", flexShrink: 0, pointerEvents: "none" }} />
        </Swiper>

        {/* Pagination */}
        <div className="flex items-center justify-between" style={{ marginTop: "2vw", paddingLeft: "5vw", paddingRight: "5vw" }}>
          <div className="flex items-center">
            {postsData.map((_, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => swiperInstance?.slideToLoop(i)}
                  className="latest-pagination-btn font-bold rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "clamp(22px, 2vw, 36px)",
                    height: "clamp(22px, 2vw, 36px)",
                    fontSize: "clamp(0.5rem, 0.7vw, 0.85rem)",
                    backgroundColor: activeIndex === i ? "var(--navy)" : "transparent",
                    color: activeIndex === i ? "#fff" : "var(--navy)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
                {i < postsData.length - 1 && (
                  <div
                    className="latest-pagination-line transition-all duration-500"
                    style={{
                      width: "clamp(8px, 1.5vw, 24px)",
                      height: 2,
                      backgroundColor: i < activeIndex ? "var(--gold)" : "#ccc",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Arrow buttons — hidden on mobile */}
          <div className="hidden md:flex items-center" style={{ gap: "0.5rem" }}>
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white"
              style={{ width: "clamp(32px, 2.5vw, 44px)", height: "clamp(32px, 2.5vw, 44px)", borderColor: "#c0c0c0", color: "var(--navy)" }}
              aria-label="Previous"
            >
              <svg width="10" height="10" fill="none" viewBox="0 0 16 16">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white"
              style={{ width: "clamp(32px, 2.5vw, 44px)", height: "clamp(32px, 2.5vw, 44px)", borderColor: "#c0c0c0", color: "var(--navy)" }}
              aria-label="Next"
            >
              <svg width="10" height="10" fill="none" viewBox="0 0 16 16">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
