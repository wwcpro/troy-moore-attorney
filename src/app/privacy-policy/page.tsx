import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Law Office of Troy M. Moore",
  description: "Privacy Policy for the Law Office of Troy M. Moore, Probate & Estate Planning Attorney.",
};

export default function PrivacyPolicy() {
  const updated = "March 24, 2025";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(72px + 4vw)", paddingBottom: "6vw", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>Legal</p>
          <h1 style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Privacy Policy</h1>
          <p style={{ color: "#8899a8", marginBottom: "3rem", fontSize: "0.85rem" }}>Last updated: {updated}</p>

          <Section title="1. Introduction">
            The Law Office of Troy M. Moore ("Firm," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or contact us through any of our digital channels.
          </Section>

          <Section title="2. Information We Collect">
            We may collect the following categories of personal information:
            <ul>
              <li><strong>Contact information</strong> — name, email address, phone number, and mailing address.</li>
              <li><strong>Inquiry details</strong> — the nature of your legal matter and any information you voluntarily provide through our contact form.</li>
              <li><strong>Communication preferences</strong> — including your consent to receive SMS text messages.</li>
              <li><strong>Technical data</strong> — IP address, browser type, device identifiers, pages visited, and referring URLs, collected automatically when you use our website.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            We use the information we collect to:
            <ul>
              <li>Respond to your inquiries and provide legal consultation;</li>
              <li>Send you text messages and emails you have consented to receive;</li>
              <li>Improve and personalize your experience on our website;</li>
              <li>Comply with legal and regulatory obligations;</li>
              <li>Prevent fraud and maintain the security of our systems.</li>
            </ul>
            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </Section>

          <Section title="4. Text Messaging (SMS)">
            If you provide your mobile phone number and check the SMS consent box on our contact form, you agree to receive text messages from the Law Office of Troy M. Moore. Message frequency may vary. Message and data rates may apply. You may opt out at any time by replying <strong>STOP</strong> to any text message you receive from us. For help, reply <strong>HELP</strong>. Opting out of SMS communications does not affect your ability to receive legal services from our Firm.
          </Section>

          <Section title="5. Call Tracking">
            Our website uses CallRail, a call tracking and analytics service. CallRail may record or analyze phone calls made to our tracking numbers for quality assurance and business analytics purposes. Call recordings are subject to CallRail's own privacy policy. By calling a tracking number on this website, you consent to this recording where permitted by law.
          </Section>

          <Section title="6. Cookies and Tracking Technologies">
            We use cookies and similar tracking technologies to analyze website traffic and improve user experience. You may disable cookies through your browser settings, though some features of our website may not function properly as a result.
          </Section>

          <Section title="7. Disclosure of Information">
            We may disclose your personal information to:
            <ul>
              <li>Service providers who assist us in operating our website and conducting our business (e.g., CallRail, email platforms);</li>
              <li>Law enforcement or government agencies when required by law or to protect our legal rights;</li>
              <li>Successor entities in the event of a merger, acquisition, or sale of assets.</li>
            </ul>
            All third-party service providers are contractually obligated to maintain the confidentiality of your information.
          </Section>

          <Section title="8. Attorney-Client Privilege">
            Submitting a contact form or sending an email to our Firm does not create an attorney-client relationship. Confidential or time-sensitive information should not be sent through our website contact form. An attorney-client relationship is established only through a signed engagement agreement.
          </Section>

          <Section title="9. Data Security">
            We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.
          </Section>

          <Section title="10. Children's Privacy">
            Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.
          </Section>

          <Section title="11. Your Rights">
            Depending on your state of residence, you may have the right to access, correct, or delete personal information we hold about you. To exercise any of these rights, please contact us using the information below.
          </Section>

          <Section title="12. Changes to This Policy">
            We reserve the right to update this Privacy Policy at any time. The "Last updated" date at the top of this page reflects the most recent revision. Your continued use of our website following any changes constitutes your acceptance of the updated policy.
          </Section>

          <Section title="13. Contact Us">
            If you have any questions about this Privacy Policy, please contact us at:
            <br /><br />
            <strong>Law Office of Troy M. Moore</strong><br />
            Email: <a href="mailto:troy@troymoorelaw.com" style={{ color: "var(--gold)" }}>troy@troymoorelaw.com</a><br />
            Phone: <a href="tel:2816090303" style={{ color: "var(--gold)" }}>(281) 609-0303</a>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>{title}</h3>
      <div style={{ color: "#5a6a7a", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}
