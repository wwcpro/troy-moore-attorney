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

/* ─── Category map ───────────────────────────────────────────────── */
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
async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://troymmoore.com/wp-json/wp/v2/posts?per_page=100&_fields=slug",
      { next: { revalidate: 3600 }, headers: WP_HEADERS }
    );
    if (!res.ok) return [];
    const posts: { slug: string }[] = await res.json();
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

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

/* ─── Static params ──────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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
  return {
    title: `${post.title.rendered} | Law Office of Troy M. Moore, PLLC`,
    description: stripHtml(post.excerpt.rendered),
    alternates: { canonical: `https://troymoorelaw.com/blog/${slug}` },
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
  const category = CATEGORIES[post.categories?.[0]] ?? null;

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
        { name: post.title.rendered, url: `/blog/${post.slug}` },
      ])} />
      <style>{`
        /* ── Hero overlay ── */
        .blog-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,30,54,0.65) 0%,
            rgba(11,55,93,0.50) 40%,
            rgba(6,30,54,0.80) 100%
          );
        }

        /* ── Prose content ── */
        .blog-prose {
          color: #4a5a6a;
          line-height: 1.85;
          font-size: clamp(0.95rem, 1.05vw, 1.1rem);
          max-width: 72ch;
        }
        .blog-prose p {
          margin-bottom: 1.5rem;
        }
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
        .blog-prose li {
          margin-bottom: 0.5rem;
        }
        .blog-prose a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-prose a:hover {
          color: var(--navy);
        }
        .blog-prose strong {
          color: var(--navy);
          font-weight: 600;
        }
        .blog-prose blockquote {
          border-left: 3px solid var(--gold);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6a7a8a;
        }
        /* Strip WP block classes' default spacing */
        .blog-prose .wp-block-heading { margin-top: 2.5rem; }
        .blog-prose .wp-block-list { padding-left: 1.5rem; }
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

        {/* ── CONTENT ──────────────────────────────────────────── */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(3.5rem, 5vw, 6rem)",
            paddingBottom: "clamp(3.5rem, 5vw, 6rem)",
          }}
        >
          <div style={WRAP}>
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
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
