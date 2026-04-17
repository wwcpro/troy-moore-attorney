import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Copyright Notice | Law Office of Troy M. Moore, PLLC",
  description: "Copyright notice and intellectual property policy for the Law Office of Troy M. Moore, PLLC.",
};

const LEGAL_STYLE: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
  paddingRight: "clamp(1.5rem, 5vw, 5rem)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ color: "#5a6a7a", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function CopyrightNoticePage() {
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
            Legal
          </p>
          <h1 style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Copyright Notice</h1>
          <p style={{ color: "#8899a8", marginBottom: "3rem", fontSize: "0.85rem" }}>
            Last updated: January 1, 2025
          </p>

          <Section title="1. Ownership of Content">
            All content on this website — including but not limited to text, articles, graphics, logos, icons, images, audio clips, and software — is the property of the Law Office of Troy M. Moore, PLLC (&ldquo;Firm&rdquo;) or its content suppliers and is protected by United States and international copyright laws.
          </Section>

          <Section title="2. Copyright Notice">
            &copy; {new Date().getFullYear()} Law Office of Troy M. Moore, PLLC. All rights reserved. Unauthorized reproduction, distribution, or transmission of any content from this website is strictly prohibited without prior written permission from the Firm.
          </Section>

          <Section title="3. Permitted Use">
            You may view, print, and download materials from this website for personal, non-commercial use only, provided that you retain all copyright and proprietary notices contained in the materials. Any other use of the content on this website, including reproduction, modification, distribution, transmission, republication, or display without the prior written consent of the Firm is strictly prohibited.
          </Section>

          <Section title="4. Trademarks">
            The Law Office of Troy M. Moore, PLLC name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of the Firm. You may not use such marks without the prior written permission of the Firm.
          </Section>

          <Section title="5. Third-Party Content">
            This website may contain links to third-party websites or include content from third parties. Such content is owned by the respective third parties and is protected by applicable copyright laws. The Firm does not claim ownership of any third-party content.
          </Section>

          <Section title="6. Reporting Infringement">
            If you believe that material on this website infringes your copyright, please contact us at:
            <br /><br />
            <strong>Law Office of Troy M. Moore, PLLC</strong><br />
            Email:{" "}
            <a href="mailto:info@troymoorelaw.com" style={{ color: "var(--gold)" }}>
              info@troymoorelaw.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:2816090303" style={{ color: "var(--gold)" }}>
              (281) 609-0303
            </a>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
