import TestimonialCarousel from "./TestimonialCarousel";

interface PageCTAProps {
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const ROW: React.CSSProperties = {
  paddingTop: "clamp(1rem, 1.5vw, 1.75rem)",
  paddingBottom: "clamp(1rem, 1.5vw, 1.75rem)",
  borderTop: "1px solid rgba(255,255,255,0.14)",
};

export default function PageCTA({ eyebrow, heading, description, children }: PageCTAProps) {
  return (
    <section
      style={{
        backgroundImage: "url(/assets/blue-bg2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "clamp(3rem, 4.5vw, 5rem)",
        paddingBottom: "clamp(3rem, 4.5vw, 5rem)",
      }}
    >
      <style>{`
        .page-cta-columns {
          display: flex;
          gap: clamp(2.5rem, 5vw, 6rem);
          align-items: stretch;
          paddingLeft: 10vw;
          paddingRight: 10vw;
        }
        .page-cta-left { flex: 0 0 55%; }
        .page-cta-right { flex: 1; min-height: 320px; }
        @media (max-width: 900px) {
          .page-cta-columns { flex-direction: column; }
          .page-cta-left { flex: none; }
          .page-cta-right { min-height: 280px; }
        }
      `}</style>

      <div style={{ paddingLeft: "10vw", paddingRight: "10vw" }}>
        <div className="page-cta-columns">

          {/* Left: content */}
          <div className="page-cta-left">
            {/* Eyebrow — no top border */}
            <div style={{ paddingBottom: "clamp(1rem, 1.5vw, 1.75rem)" }}>
              <p
                className="eyebrow"
                style={{ color: "var(--gold)", fontSize: "clamp(0.6rem, 0.75vw, 0.82rem)", margin: 0, opacity: 0.85 }}
              >
                {eyebrow}
              </p>
            </div>

            {/* Heading */}
            <div style={ROW}>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 2.8vw, 3.25rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {heading}
              </h2>
            </div>

            {/* Description */}
            <div style={ROW}>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(0.88rem, 1vw, 1.05rem)",
                  lineHeight: 1.85,
                  margin: 0,
                  maxWidth: "50ch",
                }}
              >
                {description}
              </p>
            </div>

            {/* CTA slot */}
            <div style={ROW}>
              {children}
            </div>
          </div>

          {/* Right: testimonial carousel */}
          <div className="page-cta-right">
            <TestimonialCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}
