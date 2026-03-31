import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Law Office of Troy M. Moore",
  description: "Terms and Conditions for the Law Office of Troy M. Moore, Probate & Estate Planning Attorney.",
};

export default function TermsAndConditions() {
  const updated = "March 24, 2025";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "calc(72px + 4vw)", paddingBottom: "6vw", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>Legal</p>
          <h1 style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Terms &amp; Conditions</h1>
          <p style={{ color: "#8899a8", marginBottom: "3rem", fontSize: "0.85rem" }}>Last updated: {updated}</p>

          <Section title="1. Acceptance of Terms">
            By accessing or using the website of the Law Office of Troy M. Moore ("Firm," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
          </Section>

          <Section title="2. No Attorney-Client Relationship">
            The information provided on this website is for general informational purposes only and does not constitute legal advice. Use of this website, submission of a contact form, or communication with the Firm through any digital channel does not establish an attorney-client relationship. An attorney-client relationship is formed only upon execution of a written engagement agreement signed by both you and an attorney at this Firm.
          </Section>

          <Section title="3. Not Legal Advice">
            Nothing on this website should be construed as legal advice for any specific situation. Laws vary by jurisdiction and change frequently. You should consult a licensed attorney for advice regarding your specific legal matter. The Firm expressly disclaims all liability for reliance on information contained on this website.
          </Section>

          <Section title="4. Use of Website">
            You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You may not:
            <ul>
              <li>Use the website to transmit any unsolicited commercial communications;</li>
              <li>Attempt to gain unauthorized access to any part of our systems;</li>
              <li>Reproduce, distribute, or create derivative works from our content without express written permission.</li>
            </ul>
          </Section>

          <Section title="5. Text Messaging Terms">
            By providing your mobile phone number and consenting to receive SMS messages through our contact form, you agree to receive informational and follow-up text messages from the Law Office of Troy M. Moore. Message frequency may vary depending on the nature of your inquiry. Message and data rates may apply. To stop receiving messages, reply <strong>STOP</strong> to any message. For help, reply <strong>HELP</strong> or contact us directly at <a href="tel:2816090303" style={{ color: "var(--gold)" }}>(281) 609-0303</a>. Your consent to receive SMS messages is not a condition of receiving legal services.
          </Section>

          <Section title="6. Intellectual Property">
            All content on this website — including text, graphics, logos, images, and software — is the exclusive property of the Law Office of Troy M. Moore or its content suppliers and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.
          </Section>

          <Section title="7. Third-Party Links">
            Our website may contain links to third-party websites for informational purposes. The Firm has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
          </Section>

          <Section title="8. Advertising and Disclaimer">
            This website may constitute attorney advertising under applicable rules of professional conduct. Prior results described on this website do not guarantee a similar outcome in your matter. Case results depend upon a variety of factors unique to each case and client.
          </Section>

          <Section title="9. Limitation of Liability">
            To the fullest extent permitted by law, the Law Office of Troy M. Moore shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or any information contained herein.
          </Section>

          <Section title="10. Governing Law">
            These Terms and Conditions are governed by the laws of the State of Texas, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Harris County, Texas.
          </Section>

          <Section title="11. Modifications">
            We reserve the right to modify these Terms and Conditions at any time. Changes take effect immediately upon posting. Your continued use of the website after any changes constitutes your acceptance of the revised terms.
          </Section>

          <Section title="12. Contact">
            For questions about these Terms and Conditions, please contact us:
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
