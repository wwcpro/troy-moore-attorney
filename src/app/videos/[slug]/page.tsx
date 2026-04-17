import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import videosData from "@/data/videos.json";

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

export function generateStaticParams() {
  return videosData.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = videosData.find((v) => v.slug === slug);
  if (!video) return {};
  return {
    title: `${video.title} | Law Office of Troy M. Moore, PLLC`,
    description: video.description,
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = videosData.find((v) => v.slug === slug);
  if (!video) notFound();

  const others = videosData.filter((v) => v.slug !== slug);

  return (
    <>
      <style>{`
        .video-embed-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        .video-embed-wrap iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .video-topics {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .video-topics li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #4a5a6a;
          font-size: clamp(0.88rem, 0.95vw, 1rem);
          line-height: 1.6;
        }
        .video-topics li::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          margin-top: 0.55em;
        }

        .related-card {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          text-decoration: none;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .related-card:hover {
          border-color: var(--gold);
          box-shadow: 0 4px 20px rgba(11,55,93,0.08);
        }
        .related-thumb {
          position: relative;
          width: 120px;
          flex-shrink: 0;
          aspect-ratio: 16/9;
          border-radius: 4px;
          overflow: hidden;
          background: var(--navy);
        }
        .related-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .related-thumb-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6,30,54,0.4);
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── NAVY HERO ────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--navy)",
            paddingTop: "calc(72px + clamp(3rem, 5vw, 6rem))",
            paddingBottom: "clamp(3rem, 5vw, 5rem)",
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
              {video.eyebrow}
            </p>
            <h1
              style={{
                color: "#ffffff",
                marginBottom: 0,
                maxWidth: "28ch",
              }}
            >
              {video.title}
            </h1>
          </div>
        </section>

        {/* ── VIDEO + CONTENT ──────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(3.5rem, 5vw, 6rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 6rem)",
          }}
        >
          <div style={WRAP}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 340px",
                gap: "clamp(2.5rem, 4vw, 5rem)",
                alignItems: "start",
              }}
            >
              {/* Left: embed + description */}
              <div>
                <div className="video-embed-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p
                  style={{
                    color: "#4a5a6a",
                    lineHeight: 1.85,
                    fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)",
                    marginTop: "clamp(2rem, 3vw, 3rem)",
                    marginBottom: 0,
                    maxWidth: "68ch",
                  }}
                >
                  {video.description}
                </p>
              </div>

              {/* Right: topics + CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div
                  style={{
                    background: "var(--light-gray)",
                    borderRadius: 8,
                    padding: "clamp(1.5rem, 2.5vw, 2rem)",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    className="eyebrow"
                    style={{
                      color: "var(--gold)",
                      fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                      marginBottom: "1rem",
                    }}
                  >
                    What You'll Learn
                  </p>
                  <ul className="video-topics">
                    {video.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    background: "var(--navy)",
                    borderRadius: 8,
                    padding: "clamp(1.5rem, 2.5vw, 2rem)",
                  }}
                >
                  <p
                    className="eyebrow"
                    style={{
                      color: "var(--gold)",
                      fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Ready to Get Started?
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Contact the Law Office of Troy M. Moore for a consultation — we serve Houston, Cypress, Tomball, The Woodlands, and all of Texas.
                  </p>
                  <a
                    href="tel:2816090303"
                    className="btn-cta"
                    style={{ textDecoration: "none", display: "inline-flex" }}
                  >
                    Call (281) 609-0303
                    <span className="cta-circle">
                      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MORE VIDEOS ──────────────────────────────────────── */}
        {others.length > 0 && (
          <section
            style={{
              background: "var(--light-gray)",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "clamp(3rem, 5vw, 5rem)",
              paddingBottom: "clamp(3rem, 5vw, 5rem)",
            }}
          >
            <div style={WRAP}>
              <p
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
                  marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)",
                }}
              >
                More Videos
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "640px" }}>
                {others.map((v) => (
                  <a key={v.slug} href={`/videos/${v.slug}`} className="related-card">
                    <div className="related-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                      />
                      <div className="related-thumb-play">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="14" fill="rgba(255,255,255,0.9)" />
                          <path d="M11.5 10L18.5 14L11.5 18V10Z" fill="var(--navy)" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p
                        className="eyebrow"
                        style={{ color: "var(--gold)", fontSize: "0.6rem", marginBottom: "0.4rem" }}
                      >
                        {v.eyebrow}
                      </p>
                      <p
                        style={{
                          color: "var(--navy)",
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {v.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="/videos"
                style={{
                  display: "inline-block",
                  marginTop: "2rem",
                  color: "var(--navy)",
                  fontFamily: "var(--font-eyebrow)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  opacity: 0.6,
                }}
              >
                ← All Videos
              </a>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
