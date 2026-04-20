import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import geoLocations from "@/data/geo-locations.json";
import type { GeoLocation } from "@/lib/geoContent";

export const metadata: Metadata = {
  title: "Service Areas | Law Office of Troy M. Moore, PLLC",
  description:
    "The Law Office of Troy M. Moore, PLLC serves clients throughout the Houston metro area — probate attorney and estate planning services in Harris, Fort Bend, Montgomery, Brazoria, Galveston, Chambers, and Waller counties.",
  alternates: { canonical: "https://troymoorelaw.com/service-areas" },
};

const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

function groupByRegion(locations: GeoLocation[]): Map<string, GeoLocation[]> {
  const map = new Map<string, GeoLocation[]>();
  for (const loc of locations) {
    const group = map.get(loc.region) ?? [];
    group.push(loc);
    map.set(loc.region, group);
  }
  return map;
}

export default function ServiceAreasPage() {
  const grouped = groupByRegion(geoLocations as GeoLocation[]);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            backgroundColor: "var(--navy)",
            paddingTop: "calc(72px + clamp(3.5rem, 5vw, 6rem))",
            paddingBottom: "clamp(3.5rem, 5vw, 6rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.07)", pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", top: "5%", right: "-5%", width: "42vw", height: "42vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.05)", pointerEvents: "none" }} />
          <div style={WRAP}>
            <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.75rem, 1.2vw, 1.2rem)", fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)" }}>
              Houston &amp; Surrounding Areas
            </p>
            <h1 style={{ color: "#ffffff", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)", maxWidth: "20ch" }}>
              Service Areas
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: "52ch", fontSize: "clamp(0.92rem, 1vw, 1.1rem)", margin: 0 }}>
              We serve families throughout the greater Houston metro area — from the Inner Loop to outlying counties. Find your community below to learn more about local probate and estate planning services.
            </p>
          </div>
        </section>

        {/* County summary strip */}
        <section style={{ background: "var(--gold)", paddingTop: "clamp(1rem, 1.5vw, 1.5rem)", paddingBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
          <div style={{ ...WRAP, display: "flex", flexWrap: "wrap", gap: "clamp(0.5rem, 1.5vw, 1.5rem)", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.58rem, 0.65vw, 0.72rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--navy)", opacity: 0.7, flexShrink: 0 }}>
              Counties served:
            </span>
            {["Harris", "Fort Bend", "Montgomery", "Brazoria", "Galveston", "Chambers", "Waller"].map((county) => (
              <span
                key={county}
                style={{
                  fontFamily: "var(--font-eyebrow)",
                  fontSize: "clamp(0.62rem, 0.7vw, 0.78rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--navy)",
                  background: "rgba(11,55,93,0.1)",
                  padding: "0.3em 0.85em",
                  borderRadius: "2px",
                }}
              >
                {county} County
              </span>
            ))}
          </div>
        </section>

        {/* Grouped location grid */}
        <section
          style={{
            background: "#ffffff",
            paddingTop: "clamp(4rem, 6vw, 7rem)",
            paddingBottom: "clamp(4rem, 6vw, 7rem)",
          }}
        >
          <style>{`
            .sa-region-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 0.5rem;
            }
            .sa-location-link {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 0.5rem;
              padding: 0.75rem 1rem;
              border: 1px solid #e5e7eb;
              border-radius: 4px;
              text-decoration: none;
              background: #fff;
              transition: border-color 0.2s ease, background 0.2s ease;
            }
            .sa-location-link:hover {
              border-color: var(--gold);
              background: #fffdf7;
            }
            .sa-location-link:hover .sa-arrow { color: var(--gold); }
            .sa-arrow {
              color: #c8d0d8;
              font-size: 0.75rem;
              flex-shrink: 0;
              transition: color 0.2s ease;
            }
          `}</style>

          <div style={{ ...WRAP, display: "flex", flexDirection: "column", gap: "clamp(3rem, 5vw, 5rem)" }}>
            {Array.from(grouped.entries()).map(([region, locations]) => (
              <div key={region}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "clamp(1.25rem, 2vw, 1.75rem)",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid var(--gold)",
                  }}
                >
                  <h2
                    style={{
                      color: "var(--navy)",
                      fontSize: "clamp(1rem, 1.25vw, 1.4rem)",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {region}
                  </h2>
                  <span
                    style={{
                      fontFamily: "var(--font-eyebrow)",
                      fontSize: "clamp(0.58rem, 0.62vw, 0.68rem)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#a0adb8",
                    }}
                  >
                    {locations.length} {locations.length === 1 ? "location" : "locations"}
                  </span>
                </div>

                <div className="sa-region-grid">
                  {locations.map((loc) => (
                    <a
                      key={loc.slug}
                      href={`/practice-areas/${loc.slug}`}
                      className="sa-location-link"
                    >
                      <span
                        style={{
                          color: "var(--navy)",
                          fontSize: "clamp(0.8rem, 0.85vw, 0.92rem)",
                          lineHeight: 1.35,
                          fontWeight: 400,
                        }}
                      >
                        {loc.name}
                      </span>
                      <span className="sa-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <PageCTA
          eyebrow="Law Office of Troy M. Moore, PLLC"
          heading="Don't see your area?"
          description="We serve clients throughout Texas. Contact us to discuss your matter — wherever you are located."
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
              href="/contact"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.72rem, 0.8vw, 0.88rem)",
                textDecoration: "none",
                fontFamily: "var(--font-eyebrow)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              Send a Message →
            </a>
          </div>
        </PageCTA>
      </main>
      <Footer />
    </>
  );
}
