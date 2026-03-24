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
            padding-left: 20vw;
            align-items: center;
          }
          .latest-swiper .swiper-slide {
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        opacity 0.6s ease,
                        filter 0.6s ease;
            transform-origin: center center;
          }
          .latest-swiper .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.88);
            opacity: 0.6;
            filter: brightness(0.9);
          }
          .latest-swiper .swiper-slide-active {
            transform: scale(1);
            opacity: 1;
            filter: brightness(1);
            z-index: 2;
          }
          .latest-swiper .swiper-slide-next {
            transform: scale(0.93);
            opacity: 0.8;
            filter: brightness(0.95);
          }
          .latest-swiper .swiper-slide-prev {
            transform: scale(0.93);
            opacity: 0.8;
            filter: brightness(0.95);
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
                  <div className="relative" style={{ paddingTop: "4vw", paddingRight: "4vw", marginBottom: "2vw" }}>
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

                    {/* Overlay info card */}
                    <div
                      className="absolute top-0 right-0 flex flex-col justify-between transition-all duration-700 ease-out group-hover:translate-y-[-6px] group-hover:translate-x-[6px] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                      style={{
                        width: "48%",
                        height: "72%",
                        backgroundColor: isActive ? "#0c375d" : "#c3a05b",
                        color: "#ffffff",
                        padding: "2vw",
                        zIndex: 2,
                      }}
                    >
                      <div>
                        <h3 style={{ color: "#ffffff", fontSize: "1.3vw", lineHeight: 1.25, marginBottom: "0.8vw" }}>
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
                        style={{ color: "#ffffff", opacity: 0.8, fontSize: "0.65vw" }}
                      >
                        {post.category}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
          {/* Spacer slide so last real card can scroll to center */}
          <SwiperSlide style={{ width: "20vw", flexShrink: 0, pointerEvents: "none" }} />
        </Swiper>

        {/* Pagination */}
        <div className="flex items-center justify-between" style={{ marginTop: "2vw", paddingLeft: "10vw", paddingRight: "10vw" }}>
          <div className="flex items-center">
            {postsData.map((_, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => swiperInstance?.slideToLoop(i)}
                  className="font-bold rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "2vw",
                    height: "2vw",
                    fontSize: "0.7vw",
                    backgroundColor: activeIndex === i ? "var(--navy)" : "transparent",
                    color: activeIndex === i ? "#fff" : "var(--navy)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
                {i < postsData.length - 1 && (
                  <div
                    className="transition-all duration-500"
                    style={{
                      width: "1.5vw",
                      height: 2,
                      backgroundColor: i < activeIndex ? "var(--gold)" : "#ccc",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center" style={{ gap: "0.5vw" }}>
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white"
              style={{ width: "2.5vw", height: "2.5vw", borderColor: "#c0c0c0", color: "var(--navy)" }}
              aria-label="Previous"
            >
              <svg width="0.8vw" height="0.8vw" fill="none" viewBox="0 0 16 16">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white"
              style={{ width: "2.5vw", height: "2.5vw", borderColor: "#c0c0c0", color: "var(--navy)" }}
              aria-label="Next"
            >
              <svg width="0.8vw" height="0.8vw" fill="none" viewBox="0 0 16 16">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
