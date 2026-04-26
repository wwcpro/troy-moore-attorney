import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Law Blog | Law Office of Troy M. Moore, PLLC",
  description:
    "Legal insights on probate, estate planning, and personal injury in Texas from the Law Office of Troy M. Moore.",
  alternates: { canonical: "https://troymoorelaw.com/blog" },
  openGraph: {
    title: "Law Blog | Law Office of Troy M. Moore, PLLC",
    description: "Legal insights on probate, estate planning, and personal injury in Texas from the Law Office of Troy M. Moore.",
    url: "https://troymoorelaw.com/blog",
  },
};

/* ─── Revalidate every hour ──────────────────────────────────────── */
export const revalidate = 3600;

/* ─── Types ──────────────────────────────────────────────────────── */
interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

/* ─── Category map (display names, keyed by WP category ID) ─────── */
const CATEGORIES: Record<number, string> = {
  32: "Auto Accident",
  29: "Beneficiary Litigation",
  30: "Estate Planning",
  28: "Estates",
  1:  "General",
  26: "Mental Health",
  31: "Personal Injury",
  27: "Probate",
  33: "Public Interest",
};

/* ─── Layout constants ───────────────────────────────────────────── */
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Helpers ────────────────────────────────────────────────────── */
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

const WP_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; TroyMooreLaw/1.0)",
  "Accept": "application/json",
};

/* ─── Data fetch ─────────────────────────────────────────────────── */
async function getPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      "https://troymmoore.com/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia&_fields=id,slug,title,excerpt,date,categories,_embedded,_links",
      { next: { revalidate: 3600 }, headers: WP_HEADERS }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <style>{`
        .hero-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.55) 0%,
            rgba(11,55,93,0.42) 40%,
            rgba(6,30,54,0.75) 100%
          );
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr; }
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .blog-card:hover {
          box-shadow: 0 12px 40px rgba(11,55,93,0.12);
          transform: translateY(-3px);
          border-color: var(--gold);
        }

        .blog-card-img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          background: var(--light-gray);
        }

        .blog-card-img-placeholder {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
        }

        .blog-card-body {
          padding: clamp(1.25rem, 2vw, 1.75rem);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .blog-card-title {
          color: var(--navy);
          font-size: clamp(0.95rem, 1.1vw, 1.2rem);
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 0.65rem;
          font-family: var(--font-heading);
          transition: color 0.25s ease;
        }
        .blog-card:hover .blog-card-title {
          color: var(--gold);
        }

        .blog-card-excerpt {
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

        .blog-card-link {
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
        .blog-card:hover .blog-card-link {
          gap: 0.65rem;
        }

        /* Featured post card */
        .blog-featured {
          display: flex;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          text-decoration: none;
          margin-bottom: clamp(2rem, 3vw, 3rem);
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .blog-featured:hover {
          box-shadow: 0 16px 48px rgba(11,55,93,0.14);
          transform: translateY(-3px);
          border-color: var(--gold);
        }
        .blog-featured-img {
          width: 52%;
          flex-shrink: 0;
          object-fit: cover;
          display: block;
          min-height: 340px;
        }
        .blog-featured-placeholder {
          width: 52%;
          flex-shrink: 0;
          background: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 340px;
          opacity: 0.85;
        }
        .blog-featured-body {
          padding: clamp(2rem, 3.5vw, 3.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blog-featured-title {
          color: var(--navy);
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 2vw, 2.2rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.25;
          margin-bottom: 1rem;
          transition: color 0.25s ease;
        }
        .blog-featured:hover .blog-featured-title { color: var(--gold); }
        .blog-featured:hover .blog-card-link { gap: 0.65rem; }
        @media (max-width: 700px) {
          .blog-featured { flex-direction: column; }
          .blog-featured-img, .blog-featured-placeholder { width: 100%; min-height: 200px; }
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundImage: "url(/assets/hero-blog.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-img-overlay" />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              paddingLeft: "10vw",
              paddingRight: "10vw",
              paddingTop: "calc(72px + clamp(4rem, 7vw, 8rem))",
              paddingBottom: "clamp(4rem, 6vw, 6rem)",
            }}
          >
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
              Law Blog
            </h1>
            <div style={{ width: 48, height: 2, backgroundColor: "var(--gold)", opacity: 0.8 }} />
          </div>
        </section>

        {/* ── POSTS GRID ───────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <div style={WRAP}>
            {posts.length === 0 ? (
              <p style={{ color: "#6a7a8a" }}>No posts found.</p>
            ) : (() => {
              const [featured, ...rest] = posts;
              const featuredImg = featured._embedded?.["wp:featuredmedia"]?.[0];
              const featuredCategory = CATEGORIES[featured.categories?.[0]] ?? null;
              const featuredExcerpt = stripHtml(featured.excerpt.rendered);

              return (
                <>
                  {/* Featured first post */}
                  <a href={`/blog/${featured.slug}`} className="blog-featured">
                    {featuredImg ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={featuredImg.source_url} alt={featuredImg.alt_text || featured.title.rendered} className="blog-featured-img" loading="eager" />
                    ) : (
                      <div className="blog-featured-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                    <div className="blog-featured-body">
                      <div className="blog-card-meta" style={{ marginBottom: "0.75rem" }}>
                        <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.52rem, 0.6vw, 0.66rem)", background: "rgba(195,160,91,0.1)", border: "1px solid rgba(195,160,91,0.25)", padding: "0.25em 0.75em", borderRadius: "2px" }}>
                          Featured
                        </span>
                        {featuredCategory && (
                          <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.52rem, 0.6vw, 0.66rem)", marginLeft: "0.5rem" }}>
                            {featuredCategory}
                          </span>
                        )}
                        <span style={{ color: "#aab8c4", fontSize: "0.75rem", marginLeft: "auto" }}>
                          {formatDate(featured.date)}
                        </span>
                      </div>
                      <p className="blog-featured-title">{featured.title.rendered}</p>
                      <p style={{ color: "#6a7a8a", fontSize: "clamp(0.85rem, 0.95vw, 1rem)", lineHeight: 1.75, marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {featuredExcerpt}
                      </p>
                      <span className="blog-card-link">
                        Read Article
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </a>

                  {/* Remaining posts */}
                  {rest.length > 0 && (
                    <div className="blog-grid">
                      {rest.map((post) => {
                        const img = post._embedded?.["wp:featuredmedia"]?.[0];
                        const category = CATEGORIES[post.categories?.[0]] ?? null;
                        const excerpt = stripHtml(post.excerpt.rendered);
                        return (
                          <a key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                            {img ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={img.source_url} alt={img.alt_text || post.title.rendered} className="blog-card-img" loading="lazy" />
                            ) : (
                              <div className="blog-card-img-placeholder">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                                </svg>
                              </div>
                            )}
                            <div className="blog-card-body">
                              <div className="blog-card-meta">
                                {category && <span className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.55rem, 0.62vw, 0.68rem)" }}>{category}</span>}
                                <span style={{ color: "#aab8c4", fontSize: "0.75rem", marginLeft: category ? "auto" : 0 }}>{formatDate(post.date)}</span>
                              </div>
                              <p className="blog-card-title">{post.title.rendered}</p>
                              <p className="blog-card-excerpt">{excerpt}</p>
                              <span className="blog-card-link">
                                Read Article
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
