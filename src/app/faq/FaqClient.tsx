"use client";

import { useState } from "react";
import faqData from "@/data/faq.json";

const CATEGORIES = ["Probate", "Estate Planning", "Other Practices"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Probate: "Navigating the probate process in Texas",
  "Estate Planning": "Wills, trusts, and protecting your legacy",
  "Other Practices": "Personal injury and related legal matters",
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("Probate");
  const [openId, setOpenId] = useState<number | null>(null);

  const questions = faqData.filter((f) => f.category === activeCategory);

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <style>{`
        /* ── Category tab bar ── */
        .faq-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          margin-bottom: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .faq-tabs::-webkit-scrollbar { display: none; }

        .faq-tab {
          padding: clamp(0.75rem, 1.2vw, 1rem) clamp(1.25rem, 2.5vw, 2rem);
          font-family: var(--font-eyebrow);
          font-size: clamp(0.6rem, 0.75vw, 0.78rem);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.45);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.25s ease, border-color 0.25s ease;
          margin-bottom: -1px;
        }
        .faq-tab:hover { color: rgba(255,255,255,0.75); }
        .faq-tab.active {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }

        /* ── Content layout ── */
        .faq-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(3rem, 5vw, 6rem);
          align-items: start;
        }
        @media (max-width: 900px) {
          .faq-layout { grid-template-columns: 1fr; }
          .faq-sidebar { display: none; }
        }

        /* ── Sidebar ── */
        .faq-sidebar {
          position: sticky;
          top: 100px;
        }
        .faq-sidebar-cat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .faq-sidebar-btn {
          text-align: left;
          background: none;
          border: none;
          padding: 0.85rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
          position: relative;
        }
        .faq-sidebar-btn::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 0;
          background: var(--gold);
          transition: height 0.3s ease;
          border-radius: 1px;
        }
        .faq-sidebar-btn.active::before { height: 60%; }
        .faq-sidebar-btn:hover { background: rgba(195,160,91,0.06); }
        .faq-sidebar-num {
          display: block;
          font-family: var(--font-eyebrow);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: var(--gold);
          opacity: 0.6;
          margin-bottom: 0.25rem;
        }
        .faq-sidebar-label {
          display: block;
          font-family: var(--font-heading);
          font-size: clamp(1rem, 1.1vw, 1.2rem);
          font-weight: 300;
          font-style: italic;
          color: var(--navy);
          line-height: 1.2;
          transition: color 0.2s ease;
        }
        .faq-sidebar-btn.active .faq-sidebar-label { color: var(--navy); }
        .faq-sidebar-desc {
          display: block;
          font-size: clamp(0.75rem, 0.82vw, 0.85rem);
          color: #8a9aaa;
          line-height: 1.4;
          margin-top: 0.2rem;
        }

        .faq-sidebar-count {
          display: inline-block;
          margin-top: 0.4rem;
          font-family: var(--font-eyebrow);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--gold);
          background: rgba(195,160,91,0.1);
          padding: 0.2em 0.55em;
          border-radius: 9999px;
        }

        /* ── Q&A items ── */
        .faq-list { display: flex; flex-direction: column; }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-item:first-child { border-top: 1px solid #e5e7eb; }

        .faq-q-row {
          display: flex;
          align-items: baseline;
          gap: clamp(1rem, 2vw, 1.75rem);
          padding: clamp(1.25rem, 2vw, 1.75rem) 0;
          cursor: pointer;
          user-select: none;
        }
        .faq-q-row:hover .faq-q-text { color: var(--gold); }

        .faq-num {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 2.5vw, 2.75rem);
          font-weight: 300;
          font-style: italic;
          color: var(--gold);
          opacity: 0.35;
          min-width: 1.8ch;
          line-height: 1;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }
        .faq-item.open .faq-num { opacity: 0.8; }

        .faq-q-text {
          font-family: var(--font-heading);
          font-size: clamp(1rem, 1.2vw, 1.35rem);
          font-weight: 300;
          font-style: italic;
          color: var(--navy);
          line-height: 1.3;
          flex: 1;
          transition: color 0.2s ease;
        }
        .faq-item.open .faq-q-text { color: var(--navy); }

        .faq-chevron {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: var(--gold);
          opacity: 0.5;
          transition: transform 0.3s ease, opacity 0.2s ease;
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* ── Answer panel ── */
        .faq-answer-wrap {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-item.open .faq-answer-wrap {
          max-height: 800px;
        }

        .faq-answer {
          padding: 0 0 clamp(1.5rem, 2vw, 2rem) calc(1.8ch + clamp(1rem, 2vw, 1.75rem));
          border-left: 2px solid var(--gold);
          margin-left: calc(1.8ch + clamp(1rem, 2vw, 1.75rem) - 2px);
          padding-left: clamp(1rem, 1.5vw, 1.5rem);
        }

        .faq-answer p {
          color: #4a5a6a;
          font-size: clamp(0.88rem, 0.95vw, 1rem);
          line-height: 1.85;
          margin-bottom: 0.85rem;
        }
        .faq-answer p:last-child { margin-bottom: 0; }

        .faq-answer ul {
          margin: 0.5rem 0 0.85rem 1.1rem;
          padding: 0;
        }
        .faq-answer li {
          color: #4a5a6a;
          font-size: clamp(0.88rem, 0.95vw, 1rem);
          line-height: 1.75;
          margin-bottom: 0.35rem;
          list-style: none;
          position: relative;
          padding-left: 1rem;
        }
        .faq-answer li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.7;
        }
        .faq-answer a {
          color: var(--gold);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .faq-answer a:hover { color: var(--navy); }
        .faq-answer strong { color: var(--navy); font-weight: 600; }
        .faq-answer em { font-style: italic; }

        /* ── Category count badge ── */
        .faq-category-header {
          margin-bottom: clamp(2rem, 3vw, 3rem);
        }

        /* ── CTA strip ── */
        .faq-cta {
          background: var(--navy);
          border-radius: 8px;
          padding: clamp(2rem, 3vw, 3rem);
          margin-top: clamp(3rem, 5vw, 5rem);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--hero-gradient)",
          paddingTop: "calc(72px + clamp(3rem, 5vw, 5rem))",
          paddingBottom: 0,
        }}
      >
        <div style={WRAP}>
          <p
            className="eyebrow"
            style={{
              color: "var(--gold)",
              fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
              marginBottom: "clamp(0.4rem, 0.6vw, 0.6rem)",
            }}
          >
            Law Office of Troy M. Moore, PLLC
          </p>
          <h1
            style={{
              color: "#ffffff",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              maxWidth: "22ch",
            }}
          >
            Frequently Asked Questions
          </h1>
          <div
            style={{
              width: 48,
              height: 2,
              background: "var(--gold)",
              opacity: 0.8,
              marginBottom: "clamp(2rem, 3vw, 3rem)",
            }}
          />

          {/* Tab bar */}
          <div className="faq-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`faq-tab${activeCategory === cat ? " active" : ""}`}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          paddingTop: "clamp(3.5rem, 5vw, 6rem)",
          paddingBottom: "clamp(4rem, 6vw, 7rem)",
        }}
      >
        <div style={WRAP}>
          <div className="faq-layout">

            {/* Left sidebar — hidden on mobile */}
            <aside className="faq-sidebar">
              <div className="faq-sidebar-cat">
                {CATEGORIES.map((cat, i) => {
                  const count = faqData.filter((f) => f.category === cat).length;
                  return (
                    <button
                      key={cat}
                      className={`faq-sidebar-btn${activeCategory === cat ? " active" : ""}`}
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenId(null);
                      }}
                    >
                      <span className="faq-sidebar-num">0{i + 1}</span>
                      <span className="faq-sidebar-label">{cat}</span>
                      <span className="faq-sidebar-desc">
                        {CATEGORY_DESCRIPTIONS[cat]}
                      </span>
                      <span className="faq-sidebar-count">{count} questions</span>
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: "2.5rem",
                  padding: "1.5rem",
                  background: "var(--light-gray)",
                  borderRadius: 6,
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <p
                  className="eyebrow"
                  style={{
                    color: "var(--gold)",
                    fontSize: "0.62rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Have More Questions?
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.82rem, 0.9vw, 0.92rem)",
                    color: "#6a7a8a",
                    lineHeight: 1.65,
                    marginBottom: "1rem",
                  }}
                >
                  Speak directly with Attorney Troy M. Moore about your specific situation.
                </p>
                <a
                  href="tel:2816090303"
                  className="btn-cta"
                  style={{ textDecoration: "none", fontSize: "clamp(0.78rem, 0.85vw, 0.9rem)" }}
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

            {/* Right — Q&A list */}
            <div>
              <div className="faq-category-header">
                <p
                  className="eyebrow"
                  style={{
                    color: "var(--gold)",
                    fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {activeCategory}
                </p>
                <p
                  style={{
                    color: "#8a9aaa",
                    fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                  }}
                >
                  {CATEGORY_DESCRIPTIONS[activeCategory]}
                </p>
              </div>

              <div className="faq-list" role="list">
                {questions.map((item, idx) => {
                  const isOpen = openId === item.id;
                  const displayNum = String(idx + 1).padStart(2, "0");
                  return (
                    <div
                      key={item.id}
                      className={`faq-item${isOpen ? " open" : ""}`}
                      role="listitem"
                    >
                      <div
                        className="faq-q-row"
                        onClick={() => toggle(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggle(item.id);
                          }
                        }}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-num">{displayNum}</span>
                        <span className="faq-q-text">{item.question}</span>
                        <svg
                          className="faq-chevron"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="faq-answer-wrap" aria-hidden={!isOpen}>
                        <div
                          className="faq-answer"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Inline CTA card */}
              <div className="faq-cta">
                <div>
                  <p
                    className="eyebrow"
                    style={{
                      color: "var(--gold)",
                      fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Ready to take the next step?
                  </p>
                  <h2
                    style={{
                      color: "#ffffff",
                      fontSize: "clamp(1.25rem, 1.8vw, 2rem)",
                      maxWidth: "30ch",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Let's discuss your situation.
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                      lineHeight: 1.7,
                      maxWidth: "44ch",
                    }}
                  >
                    Attorney Troy M. Moore serves Houston, Cypress, Tomball, The Woodlands, Spring, and all of Texas.
                  </p>
                </div>
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
                    href="/contact"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "clamp(0.72rem, 0.8vw, 0.85rem)",
                      textDecoration: "none",
                      fontFamily: "var(--font-eyebrow)",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                    }}
                  >
                    Send a Message →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
