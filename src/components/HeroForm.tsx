"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface HeroFormProps {
  helpOptions?: string[];
}

const DEFAULT_OPTIONS = [
  "Estate Planning",
  "Probate of a Will",
  "Muniment of Title",
  "Life Insurance Dispute",
  "Heirship Proceeding — No Will",
  "Not Sure — I Need Guidance",
];

function CircleSVG() {
  return (
    <span className="cta-circle">
      <svg viewBox="0 0 29 29" fill="none" style={{ width: "1.625em", height: "1.625em" }}>
        <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
        <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
        <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" stroke="currentColor" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function HeroForm({ helpOptions = DEFAULT_OPTIONS }: HeroFormProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [helpWith, setHelpWith] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 56, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const toggle = (opt: string) =>
    setHelpWith((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 1200);
  };

  if (submitted) {
    return (
      <div
        ref={cardRef}
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "clamp(1.8rem, 2.5vw, 2.8rem)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.45rem" }}>
          Request Received
        </p>
        <h3 style={{ color: "var(--navy)", marginBottom: "0.6rem" }}>We&rsquo;ll be in touch soon</h3>
        <p style={{ color: "#6a7a8a", margin: 0 }}>
          Thank you for reaching out. Our office typically responds within one business day. You can also
          reach us directly at{" "}
          <a href="tel:2816090303" style={{ color: "var(--navy)", borderBottom: "1px solid var(--gold)" }}>
            (281) 609-0303
          </a>.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="hero-form-card"
      style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "clamp(1.5rem, 2.2vw, 2.5rem)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
        opacity: 0,
      }}
    >
      <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.3rem" }}>
        Free Case Review
      </p>
      <h3 style={{ color: "var(--navy)", marginBottom: "0.3rem", lineHeight: 1.25 }}>
        Tell Us About Your Situation
      </h3>
      <p
        style={{
          color: "#7a8a9a",
          fontSize: "clamp(0.74rem, 0.78vw, 0.84rem)",
          marginBottom: "clamp(1rem, 1.4vw, 1.4rem)",
          lineHeight: 1.55,
        }}
      >
        Confidential &middot; No Obligation &middot; Response within 24 hours
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 0.8vw, 0.9rem)" }}
      >
        <input
          required
          type="text"
          placeholder="Full Name *"
          className="hero-form-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="tel"
          placeholder="Phone Number *"
          className="hero-form-input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email Address *"
          className="hero-form-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div>
          <p
            style={{
              fontFamily: "var(--font-eyebrow)",
              fontSize: "clamp(0.58rem, 0.65vw, 0.7rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--navy)",
              opacity: 0.75,
              marginBottom: "0.5rem",
            }}
          >
            I need help with:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.38rem" }}>
            {helpOptions.map((opt) => (
              <label key={opt} className="hero-form-checkbox-label">
                <input
                  type="checkbox"
                  className="hero-form-checkbox"
                  checked={helpWith.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                <span style={{ color: "var(--navy)", fontSize: "clamp(0.78rem, 0.82vw, 0.88rem)", lineHeight: 1.45 }}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          className="hero-form-input"
          placeholder="Anything else we should know? (optional)"
          rows={3}
          style={{ resize: "none" }}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            required
            style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy)", width: 15, height: 15 }}
          />
          <span style={{ color: "#6a7a8a", fontSize: "clamp(0.6rem, 0.62vw, 0.68rem)", lineHeight: 1.55 }}>
            By checking this box, I consent to receive text messages from the Law Office of Troy M. Moore regarding my inquiry. Message frequency may vary. Message and data rates may apply.{" "}
            <strong style={{ color: "rgba(11,55,93,0.7)" }}>Reply STOP to opt out.</strong>{" "}
            This consent is not required to obtain legal services.
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting || !smsConsent}
          className="btn-cta"
          style={{
            justifyContent: "space-between",
            width: "100%",
            marginTop: "0.2rem",
            opacity: (submitting || !smsConsent) ? 0.5 : 1,
            cursor: (submitting || !smsConsent) ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Sending…" : "Review My Case"}
          {!submitting && <CircleSVG />}
        </button>

        <p style={{ color: "#a0adb8", fontSize: "clamp(0.6rem, 0.62vw, 0.66rem)", lineHeight: 1.65, textAlign: "center", margin: 0 }}>
          Confidential. No attorney-client relationship is created by submitting this form.
        </p>
      </form>
    </div>
  );
}
