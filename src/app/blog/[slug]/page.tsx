import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQPreview from "@/components/FAQPreview";
import PageCTA from "@/components/PageCTA";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";

export const revalidate = 3600;

const WP_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; TroyMooreLaw/1.0)",
  "Accept": "application/json",
};

/* ─── Types ──────────────────────────────────────────────────────── */
interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
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

/* ─── Data fetchers ──────────────────────────────────────────────── */
async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `https://troymmoore.com/wp-json/wp/v2/posts?slug=${slug}&_embed=wp:featuredmedia&_fields=id,slug,title,content,excerpt,date,categories,_embedded,_links`,
      { next: { revalidate: 3600 }, headers: WP_HEADERS }
    );
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: number, excludeId: number): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `https://troymmoore.com/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${excludeId}&per_page=4&_embed=wp:featuredmedia&_fields=id,slug,title,excerpt,date,categories,_embedded,_links`,
      { next: { revalidate: 3600 }, headers: WP_HEADERS }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const category = CATEGORIES[post.categories?.[0]];
  return {
    title: `${post.title.rendered} | Law Office of Troy M. Moore, PLLC`,
    description: stripHtml(post.excerpt.rendered),
    alternates: { canonical: `https://troymoorelaw.com/blog/${slug}` },
    openGraph: {
      title: post.title.rendered,
      description: stripHtml(post.excerpt.rendered).slice(0, 160),
      url: `https://troymoorelaw.com/blog/${slug}`,
      type: "article",
      ...(category && { tags: [category] }),
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const img = post._embedded?.["wp:featuredmedia"]?.[0];
  const primaryCategoryId = post.categories?.[0];
  const category = CATEGORIES[primaryCategoryId] ?? null;

  const related = primaryCategoryId
    ? await getRelatedPosts(primaryCategoryId, post.id)
    : [];

  return (
    <>
      <JsonLd data={articleSchema({
        title: post.title.rendered,
        date: post.date,
        excerpt: post.excerpt.rendered,
        slug: post.slug,
        imageUrl: img?.source_url,
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        ...(category ? [{ name: category, url: `/blog?category=${primaryCategoryId}` }] : []),
        { name: post.title.rendered, url: `/blog/${post.slug}` },
      ])} />
      <style>{`
        .blog-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.65) 0%,
            rgba(11,55,93,0.50) 40%,
            rgba(6,30,54,0.80) 100%
          );
        }

        .blog-prose {
          color: #4a5a6a;
          line-height: 1.85;
          font-size: clamp(0.95rem, 1.05vw, 1.1rem);
        }
        .blog-prose p { margin-bottom: 1.5rem; }
        .blog-prose h2 {
          color: var(--navy);
          font-size: clamp(1.2rem, 1.6vw, 1.75rem);
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .blog-prose h3 {
          color: var(--navy);
          font-size: clamp(1rem, 1.2vw, 1.3rem);
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .blog-prose ul,
        .blog-prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-prose li { margin-bottom: 0.5rem; }
        .blog-prose a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-prose a:hover { color: var(--navy); }
        .blog-prose strong { color: var(--navy); font-weight: 600; }
        .blog-prose blockquote {
          border-left: 3px solid var(--gold);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6a7a8a;
        }
        .blog-prose .wp-block-heading { margin-top: 2.5rem; }
        .blog-prose .wp-block-list { padding-left: 1.5rem; }

        /* ── Sidebar ── */
        .blog-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: clamp(2.5rem, 4vw, 5rem);
          align-items: start;
        }
        @media (max-width: 900px) {
          .blog-layout { grid-template-columns: 1fr; }
        }

        .related-card {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
          text-decoration: none;
          padding: 0.875rem 0;
          border-bottom: 1px solid #e5e7eb;
          transition: opacity 0.2s ease;
        }
        .related-card:last-child { border-bottom: none; }
        .related-card:hover { opacity: 0.75; }

        .related-thumb {
          width: 72px;
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
          display: block;
        }
        .related-thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.35;
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        {img ? (
          <section
            style={{
              position: "relative",
              minHeight: "55vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundImage: `url(${img.source_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="blog-hero-overlay" />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                ...WRAP,
                paddingTop: "calc(72px + clamp(4rem, 8vw, 9rem))",
                paddingBottom: "clamp(3rem, 5vw, 5rem)",
              }}
            >
              <HeroContent post={post} category={category} />
            </div>
          </section>
        ) : (
          <section
            style={{
              background: "var(--hero-gradient)",
              paddingTop: "calc(72px + clamp(4rem, 7vw, 8rem))",
              paddingBottom: "clamp(3rem, 5vw, 5rem)",
            }}
          >
            <div style={WRAP}>
              <HeroContent post={post} category={category} />
            </div>
          </section>
        )}

        {/* ── CONTENT + SIDEBAR ────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(3.5rem, 5vw, 6rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 6rem)",
          }}
        >
          <div style={WRAP}>
            <div className="blog-layout">
              {/* ── Main prose ── */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {/* ── Sidebar ── */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Related Articles */}
                {related.length > 0 && (
                  <div
                    style={{
                      background: "var(--light-gray)",
                      borderRadius: 8,
                      padding: "clamp(1.25rem, 2vw, 1.75rem)",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <p
                      className="eyebrow"
                      style={{
                        color: "var(--gold)",
                        fontSize: "clamp(0.58rem, 0.66vw, 0.72rem)",
                        marginBottom: "1rem",
                      }}
                    >
                      {category ? `More on ${category}` : "Related Articles"}
                    </p>
                    <div>
                      {related.map((r) => {
                        const rImg = r._embedded?.["wp:featuredmedia"]?.[0];
                        return (
                          <a key={r.id} href={`/blog/${r.slug}`} className="related-card">
                            <div className="related-thumb">
                              {rImg ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={rImg.source_url} alt={rImg.alt_text || r.title.rendered} />
                              ) : (
                                <div className="related-thumb-placeholder">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              <p
                                style={{
                                  color: "var(--navy)",
                                  fontFamily: "var(--font-heading)",
                                  fontSize: "clamp(0.78rem, 0.88vw, 0.94rem)",
                                  fontWeight: 600,
                                  lineHeight: 1.35,
                                  marginBottom: "0.3rem",
                                }}
                              >
                                {r.title.rendered}
                              </p>
                              <p
                                style={{
                                  color: "#9aabb8",
                                  fontSize: "0.7rem",
                                  fontFamily: "var(--font-eyebrow)",
                                }}
                              >
                                {formatDate(r.date)}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                    <a
                      href="/blog"
                      style={{
                        display: "inline-block",
                        marginTop: "1.25rem",
                        color: "var(--gold)",
                        fontFamily: "var(--font-eyebrow)",
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        textDecoration: "none",
                      }}
                    >
                      All Articles →
                    </a>
                  </div>
                )}

                {/* Consultation CTA */}
                <div
                  style={{
                    background: "var(--navy)",
                    borderRadius: 8,
                    padding: "clamp(1.25rem, 2vw, 1.75rem)",
                  }}
                >
                  <p
                    className="eyebrow"
                    style={{
                      color: "var(--gold)",
                      fontSize: "clamp(0.58rem, 0.66vw, 0.72rem)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Ready to Get Started?
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(0.82rem, 0.92vw, 0.98rem)",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    Contact the Law Office of Troy M. Moore for a consultation — serving Houston, Cypress, The Woodlands, and all of Texas.
                  </p>
                  <a
                    href="tel:2816090303"
                    className="btn-cta"
                    style={{ textDecoration: "none", display: "inline-flex", fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)" }}
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

              </aside>
            </div>
          </div>
        </section>

        {/* ── FAQ PREVIEW ──────────────────────────────────────── */}
        <section
          style={{
            background: "var(--light-gray)",
            paddingTop: "clamp(3.5rem, 5vw, 5rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 5rem)",
          }}
        >
          <div style={WRAP}>
            <p
              className="eyebrow"
              style={{
                color: "var(--gold)",
                fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                marginBottom: "0.6rem",
              }}
            >
              Common Questions
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "clamp(1.5rem, 2vw, 2rem)",
              }}
            >
              <h2
                style={{
                  color: "var(--navy)",
                  fontSize: "clamp(1.2rem, 1.8vw, 2rem)",
                  margin: 0,
                }}
              >
                Frequently Asked Questions
              </h2>
              <a
                href="/faq"
                style={{
                  color: "var(--gold)",
                  fontFamily: "var(--font-eyebrow)",
                  fontSize: "clamp(0.62rem, 0.72vw, 0.78rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                View All FAQs →
              </a>
            </div>
            <FAQPreview category="Probate" />
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <PageCTA
          eyebrow="Law Office of Troy M. Moore, PLLC"
          heading="Ready to discuss your case?"
          description="Contact us today for a consultation. The firm serves Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
              Call (281) 609-0303
              <span className="cta-circle">
                <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
                  <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                  <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                  <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </span>
            </a>
            <a
              href="/blog"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)",
                textDecoration: "none",
                fontFamily: "var(--font-eyebrow)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              ← All Articles
            </a>
          </div>
        </PageCTA>
      </main>

      <Footer />
    </>
  );
}

/* ─── Hero content (shared between image/plain hero) ─────────────── */
function HeroContent({
  post,
  category,
}: {
  post: WPPost;
  category: string | null;
}) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>
        {category && (
          <p
            className="eyebrow"
            style={{
              color: "var(--gold)",
              fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
              margin: 0,
            }}
          >
            {category}
          </p>
        )}
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.78rem",
            fontFamily: "var(--font-eyebrow)",
          }}
        >
          {formatDate(post.date)}
        </span>
      </div>
      <h1
        style={{
          color: "#ffffff",
          marginBottom: "clamp(0.75rem, 1.2vw, 1rem)",
          maxWidth: "24ch",
        }}
      >
        {post.title.rendered}
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "clamp(0.75rem, 0.82vw, 0.9rem)",
          fontFamily: "var(--font-eyebrow)",
          letterSpacing: "0.06em",
          margin: 0,
        }}
      >
        By Troy M. Moore, Attorney at Law
      </p>
    </>
  );
}
