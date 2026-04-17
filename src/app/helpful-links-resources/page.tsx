import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Helpful Links & Resources | Law Office of Troy M. Moore, PLLC",
  description:
    "Useful resources and links for Texas probate, estate planning, and personal injury matters — curated by the Law Office of Troy M. Moore, PLLC.",
};

const LEGAL_STYLE: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
  paddingRight: "clamp(1.5rem, 5vw, 5rem)",
};

const LINK_GROUPS = [
  {
    heading: "Texas Probate Resources",
    links: [
      { label: "Texas Estates Code (Vernon's)", href: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.htm" },
      { label: "Harris County Probate Courts", href: "https://www.harriscountytx.gov/Government/Courts/Probate-Courts" },
      { label: "Texas Judiciary Online", href: "https://www.txcourts.gov/" },
      { label: "Harris County District Clerk", href: "https://www.hcdistrictclerk.com/" },
    ],
  },
  {
    heading: "Estate Planning & Government",
    links: [
      { label: "IRS — Estate & Gift Tax", href: "https://www.irs.gov/businesses/small-businesses-self-employed/estate-and-gift-taxes" },
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Texas Health & Human Services (Medicaid)", href: "https://www.hhs.texas.gov/services/financial/medicaid" },
      { label: "Texas Secretary of State — Business Filings", href: "https://www.sos.state.tx.us/" },
    ],
  },
  {
    heading: "Legal Self-Help & Bar Resources",
    links: [
      { label: "State Bar of Texas — Find a Lawyer", href: "https://www.texasbar.com/AM/Template.cfm?Section=Find_A_Lawyer" },
      { label: "Texas Law Help (Legal Aid)", href: "https://texaslawhelp.org/" },
      { label: "Houston Volunteer Lawyers", href: "https://www.hvlp.org/" },
      { label: "Texas Access to Justice Commission", href: "https://www.txatj.org/" },
    ],
  },
  {
    heading: "Personal Injury Resources",
    links: [
      { label: "Texas Department of Transportation — Crash Records", href: "https://www.txdot.gov/data-maps/crash-reports-records.html" },
      { label: "Texas Department of Insurance", href: "https://www.tdi.texas.gov/" },
      { label: "National Highway Traffic Safety Administration", href: "https://www.nhtsa.gov/" },
    ],
  },
];

export default function HelpfulLinksPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "calc(72px + 4vw)",
          paddingBottom: "6vw",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <div style={LEGAL_STYLE}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>
            Resources
          </p>
          <h1 style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>
            Helpful Links &amp; Resources
          </h1>
          <p style={{ color: "#8899a8", marginBottom: "3rem", lineHeight: 1.7 }}>
            The following resources may be helpful for clients and families navigating probate, estate planning, and personal injury matters in Texas. Links to third-party websites are provided for convenience only and do not constitute an endorsement.
          </p>

          {LINK_GROUPS.map((group) => (
            <div key={group.heading} style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "var(--navy)", marginBottom: "1rem" }}>{group.heading}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--gold)",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontSize: "clamp(0.88rem, 0.95vw, 1rem)",
                        lineHeight: 1.65,
                      }}
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            style={{
              marginTop: "3rem",
              padding: "clamp(1.25rem, 2vw, 2rem)",
              background: "var(--light-gray)",
              borderLeft: "3px solid var(--gold)",
              borderRadius: 4,
              color: "#5a6a7a",
              lineHeight: 1.8,
              fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
            }}
          >
            <strong style={{ color: "var(--navy)" }}>Disclaimer:</strong> The resources linked on this page are provided for informational purposes only. The Law Office of Troy M. Moore, PLLC does not control or endorse the content of any third-party websites. This page does not constitute legal advice.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
