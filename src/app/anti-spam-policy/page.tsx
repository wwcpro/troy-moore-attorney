import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anti-Spam Policy | Law Office of Troy M. Moore, PLLC",
  description: "Anti-spam policy for the Law Office of Troy M. Moore, PLLC.",
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

export default function AntiSpamPolicyPage() {
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
          <h1 style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Anti-Spam Policy</h1>
          <p style={{ color: "#8899a8", marginBottom: "3rem", fontSize: "0.85rem" }}>
            Last updated: January 1, 2025
          </p>

          <Section title="1. Our Commitment">
            The Law Office of Troy M. Moore, PLLC (&ldquo;Firm,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to maintaining a spam-free environment for our clients and website visitors. We strictly comply with the CAN-SPAM Act of 2003, the Telephone Consumer Protection Act (TCPA), and all applicable federal and state anti-spam regulations.
          </Section>

          <Section title="2. Email Communications">
            We only send email communications to individuals who have:
            <ul>
              <li>Provided their email address voluntarily through our contact form or consultation request;</li>
              <li>Expressly opted in to receive information from our Firm; or</li>
              <li>An existing client or professional relationship with the Firm.</li>
            </ul>
            All marketing emails include a clear unsubscribe mechanism. You may opt out of email communications at any time by clicking the unsubscribe link in any email or by contacting us directly.
          </Section>

          <Section title="3. SMS / Text Message Communications">
            We only send text messages to individuals who have provided explicit written consent to receive SMS communications from the Firm. As stated in our Privacy Policy:
            <ul>
              <li>You may opt out at any time by replying <strong>STOP</strong> to any text message;</li>
              <li>For assistance, reply <strong>HELP</strong>;</li>
              <li>Message and data rates may apply.</li>
            </ul>
            We do not send unsolicited text messages and will never sell your mobile number to third parties.
          </Section>

          <Section title="4. No Third-Party Spam">
            We do not purchase email lists, rent contact databases, or engage in any form of bulk unsolicited messaging. We do not share your contact information with third parties for the purpose of sending you marketing communications.
          </Section>

          <Section title="5. Reporting Spam">
            If you believe you have received unsolicited communications from us in error, please contact us immediately so we can investigate and correct the issue:
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

          <Section title="6. Changes to This Policy">
            We reserve the right to update this Anti-Spam Policy at any time. The &ldquo;Last updated&rdquo; date above reflects the most recent revision. Your continued use of our services constitutes acceptance of the current policy.
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
