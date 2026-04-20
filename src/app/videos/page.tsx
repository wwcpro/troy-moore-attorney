import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import videosData from "@/data/videos.json";

export const metadata: Metadata = {
  title: "Videos | Law Office of Troy M. Moore, PLLC",
  description:
    "Watch estate planning workshops and guides from Houston attorney Troy M. Moore — covering probate avoidance, wills, trusts, and Texas estate planning strategies.",
  alternates: { canonical: "https://troymoorelaw.com/videos" },
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

export default function VideosPage() {
  return (
    <>
      <style>{`
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }
        @media (max-width: 1024px) {
          .videos-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .videos-grid { grid-template-columns: 1fr; }
        }

        .video-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .video-card:hover {
          box-shadow: 0 12px 40px rgba(11,55,93,0.12);
          transform: translateY(-3px);
          border-color: var(--gold);
        }

        .video-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--navy);
          overflow: hidden;
        }
        .video-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .video-card:hover .video-thumb img {
          transform: scale(1.05);
        }
        .video-thumb-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6,30,54,0.35);
          transition: background 0.3s ease;
        }
        .video-card:hover .video-thumb-play {
          background: rgba(6,30,54,0.5);
        }
        .video-thumb-play svg {
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
          transition: transform 0.3s ease;
        }
        .video-card:hover .video-thumb-play svg {
          transform: scale(1.1);
        }

        .video-card-body {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .video-card-title {
          color: var(--navy);
          font-size: clamp(0.95rem, 1.1vw, 1.2rem);
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 0.65rem;
          font-family: var(--font-heading);
          transition: color 0.25s ease;
        }
        .video-card:hover .video-card-title { color: var(--gold); }

        .video-card-desc {
          color: #6a7a8a;
          font-size: clamp(0.82rem, 0.9vw, 0.92rem);
          line-height: 1.7;
          flex: 1;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .video-card-link {
          font-family: var(--font-eyebrow);
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: auto;
          transition: gap 0.25s ease;
        }
        .video-card:hover .video-card-link { gap: 0.65rem; }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--hero-gradient)",
            paddingTop: "calc(72px + clamp(4rem, 7vw, 8rem))",
            paddingBottom: "clamp(4rem, 6vw, 6rem)",
          }}
        >
          <div style={WRAP}>
            <p
              className="eyebrow"
              style={{
                color: "var(--gold)",
                marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
                fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
              }}
            >
              Law Office of Troy M. Moore, PLLC
            </p>
            <h1 style={{ color: "#ffffff", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)", maxWidth: "20ch" }}>
              Videos
            </h1>
            <div style={{ width: 48, height: 2, background: "var(--gold)", opacity: 0.8 }} />
          </div>
        </section>

        {/* ── GRID ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            <div className="videos-grid">
              {videosData.map((video) => (
                <a
                  key={video.slug}
                  href={`/videos/${video.slug}`}
                  className="video-card"
                >
                  <div className="video-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                    />
                    <div className="video-thumb-play">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.95)" />
                        <path d="M23 20L38 28L23 36V20Z" fill="var(--navy)" />
                      </svg>
                    </div>
                  </div>

                  <div className="video-card-body">
                    <p
                      className="eyebrow"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.55rem, 0.62vw, 0.68rem)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      {video.eyebrow}
                    </p>
                    <p className="video-card-title">{video.title}</p>
                    <p className="video-card-desc">{video.description}</p>
                    <span className="video-card-link">
                      Watch Video
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
