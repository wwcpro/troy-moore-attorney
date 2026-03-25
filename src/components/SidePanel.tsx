"use client";

import { forwardRef } from "react";

export interface PanelSection {
  heading: string;
  body: string;
  list?: string[];
  closing?: string;
}

export interface PanelContent {
  headline: string;
  sections: PanelSection[];
}

export interface PanelItem {
  label: string;
  title: string;
  href: string;
  panel: PanelContent;
}

interface Props {
  item: PanelItem | null;
  onClose: () => void;
}

const SidePanel = forwardRef<HTMLDivElement, Props>(({ item, onClose }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "85vw",
        height: "100vh",
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        pointerEvents: item ? "all" : "none",
        background: `
          radial-gradient(ellipse 70% 45% at 100% 0%, rgba(11,55,93,0.55) 0%, transparent 65%),
          radial-gradient(ellipse 55% 40% at 0% 100%, rgba(195,160,91,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 50% 50%, rgba(11,55,93,0.12) 0%, transparent 70%),
          #0d1f30
        `,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top bar — outside scroll container so scrollbar doesn't shrink it */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem clamp(2rem, 4vw, 4rem)",
          background: "rgba(20,21,28,0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "0.12em" }}>
          {item?.label}
        </span>
      </div>

      {/* Scrollable content — flex: 1 fills remaining height */}
      {item && (
        <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem)" }}>
          {/* Headline */}
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 4.5rem)",
              lineHeight: 1.1,
              fontWeight: 300,
              marginBottom: "clamp(2.5rem, 4vw, 4rem)",
              maxWidth: "22ch",
            }}
          >
            {item.panel.headline}
          </h2>

          {/* Divider */}
          <div style={{ width: 48, height: 2, backgroundColor: "var(--gold)", marginBottom: "clamp(2.5rem, 4vw, 4rem)", opacity: 0.7 }} />

          {/* Sections */}
          {item.panel.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: "clamp(2rem, 3.5vw, 3.5rem)" }}>
              <h3
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(1rem, 1.2vw, 1.4rem)",
                  fontWeight: 500,
                  marginBottom: "1rem",
                  letterSpacing: "0.01em",
                }}
              >
                {section.heading}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.85,
                  fontSize: "clamp(0.85rem, 0.9vw, 1.05rem)",
                  whiteSpace: "pre-line",
                  marginBottom: section.list ? "1.25rem" : 0,
                }}
              >
                {section.body}
              </p>

              {section.list && (
                <ol
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 2,
                    fontSize: "clamp(0.82rem, 0.85vw, 1rem)",
                    paddingLeft: "1.25rem",
                    marginBottom: section.closing ? "1.25rem" : 0,
                  }}
                >
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ol>
              )}

              {section.closing && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.85,
                    fontSize: "clamp(0.85rem, 0.9vw, 1.05rem)",
                  }}
                >
                  {section.closing}
                </p>
              )}
            </div>
          ))}

          {/* CTA */}
          <div style={{ marginTop: "clamp(2.5rem, 4vw, 4rem)", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <a
              href="tel:2816090303"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "var(--gold)",
                fontSize: "clamp(0.9rem, 1vw, 1.15rem)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              Call (281) 609-0303
            </a>
          </div>
        </div>
        </div>
      )}
    </div>
  );
});

SidePanel.displayName = "SidePanel";
export default SidePanel;
