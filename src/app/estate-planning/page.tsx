"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import PageCTA from "@/components/PageCTA";
import { gsap } from "@/lib/gsap";

/* ─── Layout constants — matching probate page ──────────────────── */
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Service panel data ─────────────────────────────────────────── */
const SERVICES: (PanelItem & { description: string })[] = [
  {
    label: "WILLS",
    title: "Last Will & Testament",
    description:
      "A foundational estate planning document that directs how your assets will be distributed, names an executor, and — if you have minor children — designates a guardian.",
    href: "#will",
    panel: {
      headline: "Last Will & Testament — Directing Your Estate on Your Terms",
      sections: [
        {
          heading: "What a Will Does",
          body: "A Last Will and Testament is the cornerstone of most estate plans. It tells the probate court exactly how you want your assets distributed after death, who you trust to carry out your wishes (your executor), and — critically for parents of minor children — who you want to raise your children if you and your spouse are no longer alive.\n\nWithout a valid will, Texas intestacy law determines who receives your property and who raises your children. That outcome may not reflect your wishes.",
        },
        {
          heading: "Independent Administration",
          body: "Texas allows most wills to authorize 'independent administration,' which permits your executor to administer the estate with minimal court involvement. This reduces time, cost, and complexity for your family — and it only works if the will specifically authorizes it.\n\nA professionally drafted will ensures this provision is in place.",
        },
        {
          heading: "What the Process Involves",
          body: "Drafting a Last Will and Testament with Troy M. Moore, PLLC typically involves the following:",
          list: [
            "A consultation to understand your family structure, assets, and goals",
            "Identification of beneficiaries and contingent beneficiaries",
            "Selection of an executor (and successor executor)",
            "Guardian designations for minor children, if applicable",
            "Specific bequest provisions for real property, accounts, or personal property",
            "Execution formalities — signed in the presence of two witnesses and a notary",
          ],
          closing:
            "Contact Troy M. Moore, PLLC to discuss drafting or updating your Last Will and Testament.",
        },
      ],
    },
  },
  {
    label: "TRUSTS",
    title: "Revocable Living Trust",
    description:
      "A flexible estate planning structure that holds your assets during your lifetime and transfers them to your beneficiaries at death — without probate.",
    href: "#trust",
    panel: {
      headline: "Revocable Living Trust — Avoiding Probate, Preserving Control",
      sections: [
        {
          heading: "How a Revocable Living Trust Works",
          body: "A revocable living trust is a legal entity you create during your lifetime to hold title to your assets. You serve as the trustee while you are alive and competent — maintaining full control to buy, sell, and manage trust property exactly as you would otherwise. When you pass away, a successor trustee you designate steps in and distributes the trust assets directly to your beneficiaries, without going through the Texas probate process.",
        },
        {
          heading: "The Probate Avoidance Advantage",
          body: "Assets held in a properly funded revocable living trust are not subject to probate. This means your family can receive their inheritance faster, with less expense, and without the public court record that probate creates. For clients who own real property in multiple states, a trust can be particularly valuable — it avoids ancillary probate proceedings in each state where property is held.",
        },
        {
          heading: "Funding the Trust",
          body: "A trust that is not properly funded offers little benefit. Funding means actually transferring ownership of your assets into the trust — re-titling real property, updating beneficiary designations, and retitling financial accounts. Troy M. Moore, PLLC assists clients with the funding process to ensure the trust accomplishes what it was designed to do.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether a revocable living trust is the right structure for your estate plan.",
        },
      ],
    },
  },
  {
    label: "HEALTHCARE",
    title: "Medical Power of Attorney",
    description:
      "A legal document designating a trusted person to make healthcare decisions on your behalf if you are unable to make or communicate them yourself.",
    href: "#mpoa",
    panel: {
      headline: "Medical Power of Attorney — Protecting Your Healthcare Decisions",
      sections: [
        {
          heading: "What a Medical Power of Attorney Does",
          body: "A Medical Power of Attorney (MPOA) designates an agent — someone you trust — to make healthcare decisions on your behalf if you become incapacitated and cannot communicate your own wishes. Your agent can consent to or refuse medical treatment, authorize surgeries, select physicians, and make decisions about your care in accordance with your known values and preferences.\n\nWithout an MPOA in place, medical providers may be required to defer to family members in a particular legal order — which may not reflect who you would actually choose.",
        },
        {
          heading: "Scope of Authority",
          body: "The Medical Power of Attorney takes effect only when your attending physician certifies that you lack the capacity to make your own healthcare decisions. Your agent's authority is limited to healthcare decisions — it does not extend to financial matters. The agent is required to make decisions consistent with your known wishes and best interest.",
        },
        {
          heading: "Why It Belongs in Every Plan",
          body: "A Medical Power of Attorney is not just for older adults. Accidents and sudden illness can affect anyone at any age. Without this document in place, your loved ones may face legal barriers to receiving information about your condition or making critical medical decisions on your behalf.",
          closing:
            "Contact Troy M. Moore, PLLC to include a Medical Power of Attorney in your estate plan.",
        },
      ],
    },
  },
  {
    label: "FINANCES",
    title: "Statutory Durable Power of Attorney",
    description:
      "Authorizes a trusted person to manage your financial and legal affairs — paying bills, managing accounts, handling real estate — if you become incapacitated.",
    href: "#sdpoa",
    panel: {
      headline: "Statutory Durable Power of Attorney — Financial Authority When It Matters",
      sections: [
        {
          heading: "What It Authorizes",
          body: "A Statutory Durable Power of Attorney (SDPOA) designates an agent to manage your financial and legal affairs if you become unable to act for yourself. This includes managing bank accounts, paying bills, filing tax returns, handling real estate transactions, managing investments, and conducting other financial matters on your behalf.\n\nThe word 'durable' means the document remains effective even if you later become incapacitated — unlike a general power of attorney, which would terminate upon your incapacity.",
        },
        {
          heading: "Why This Document Is Critical",
          body: "Without a Statutory Durable Power of Attorney, your family may be forced to seek a court-ordered guardianship or conservatorship to manage your affairs if you become incapacitated. That process is expensive, time-consuming, and subjects your personal affairs to public court oversight.\n\nA properly executed SDPOA allows a trusted person to step in immediately — without court intervention.",
        },
        {
          heading: "Texas Statutory Form and Customization",
          body: "Texas law provides a statutory form for durable powers of attorney, which financial institutions and third parties are required to honor. The document can be customized to grant broad or limited authority depending on your preferences.",
          closing:
            "Contact Troy M. Moore, PLLC to include a Statutory Durable Power of Attorney in your estate plan.",
        },
      ],
    },
  },
  {
    label: "DIRECTIVES",
    title: "Living Will / Directive to Physicians",
    description:
      "Instructs physicians on your wishes regarding life-sustaining treatment in terminal or irreversible conditions — relieving your family of having to make those decisions.",
    href: "#directive",
    panel: {
      headline: "Directive to Physicians — Your Voice in End-of-Life Care",
      sections: [
        {
          heading: "What a Directive to Physicians Does",
          body: "A Directive to Physicians (commonly called a 'living will') is a written statement of your wishes regarding life-sustaining treatment in the event you have a terminal condition or irreversible condition and are no longer able to communicate your own decisions. It guides your physicians and healthcare providers — and relieves your family members of the emotional burden of making those decisions without knowing your wishes.",
        },
        {
          heading: "Texas Law and the DPOA",
          body: "In Texas, a Directive to Physicians works alongside — not instead of — a Medical Power of Attorney. The directive gives direct guidance to your physicians, while the Medical Power of Attorney grants your agent ongoing decision-making authority. Together, they provide a complete picture of your healthcare preferences and ensure someone you trust has legal authority to act on your behalf.",
        },
        {
          heading: "What the Document Covers",
          body: "A Texas Directive to Physicians can address whether you want life-sustaining procedures withheld or withdrawn if you are in a terminal condition; whether you want artificial nutrition and hydration continued; and any other instructions relevant to your care in those circumstances.",
          closing:
            "Contact Troy M. Moore, PLLC to include a Directive to Physicians in your complete estate plan.",
        },
      ],
    },
  },
  {
    label: "SELF-DIRECTED IRAs",
    title: "Self-Directed IRA Planning",
    description:
      "Estate planning strategies for retirement accounts that hold alternative assets — including real estate, private equity, and other non-traditional investments.",
    href: "#sdira",
    panel: {
      headline: "Self-Directed IRAs — Estate Planning for Non-Traditional Retirement Assets",
      sections: [
        {
          heading: "What Makes Self-Directed IRAs Different",
          body: "A self-directed IRA allows the account holder to invest in a broader range of assets than a traditional IRA — including real estate, private equity, promissory notes, and other alternative investments. These accounts require careful estate planning because the assets are held in a retirement account structure and governed by specific IRS rules.\n\nBeneficiary designations, required minimum distributions, and post-death distribution rules for inherited IRAs are all areas that require attention.",
        },
        {
          heading: "Beneficiary Designations and the SECURE Act",
          body: "For most non-spouse beneficiaries, the SECURE Act now requires that inherited IRA assets be fully distributed within 10 years of the original owner's death. This has significant implications for how retirement assets are integrated into an estate plan — particularly when those assets include illiquid real estate or private investments that may be difficult to distribute on a compressed timeline.",
        },
        {
          heading: "Planning Considerations",
          body: "Estate planning for self-directed IRAs involves reviewing beneficiary designations, coordinating with custodians, and ensuring that the overall estate plan accounts for the unique characteristics of these accounts. Troy M. Moore, PLLC can assist with the legal planning dimension of these assets within the broader context of your estate plan.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss estate planning strategies for self-directed IRAs and retirement accounts.",
        },
      ],
    },
  },
  {
    label: "SPECIAL NEEDS",
    title: "Special Needs Trust",
    description:
      "A trust designed to benefit a person with disabilities without disqualifying them from means-tested government benefit programs such as Medicaid and SSI.",
    href: "#special-needs",
    panel: {
      headline: "Special Needs Trust — Providing for a Loved One Without Losing Benefits",
      sections: [
        {
          heading: "The Core Problem a Special Needs Trust Solves",
          body: "If you leave assets outright to a loved one with a disability who receives Medicaid, SSI, or other means-tested government benefits, those assets may disqualify them from the programs they depend on. A Special Needs Trust is a specific legal structure designed to hold assets for the benefit of a person with disabilities while preserving their eligibility for those critical benefit programs.",
        },
        {
          heading: "How It Works",
          body: "Assets held in a properly drafted Special Needs Trust are not counted as the beneficiary's own resources for purposes of means-tested benefit programs. The trust can be used to supplement — not replace — government benefits by covering expenses that Medicaid and SSI do not, such as personal care items, transportation, education, technology, entertainment, and other quality-of-life expenditures.",
        },
        {
          heading: "Planning Considerations",
          body: "Special Needs Trusts can be structured in several ways depending on the source of the funds — whether they originate from the disabled person's own assets (a first-party or 'self-settled' trust) or from a parent, grandparent, or other third party (a third-party Special Needs Trust). Each type has different rules regarding Medicaid payback provisions.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss a Special Needs Trust for a family member with a disability.",
        },
      ],
    },
  },
  {
    label: "TRANSFER ON DEATH",
    title: "Transfer on Death Deed",
    description:
      "A deed that transfers real property directly to a named beneficiary at death — without probate — while allowing you to retain full ownership and control during your lifetime.",
    href: "#todd",
    panel: {
      headline: "Transfer on Death Deed — Passing Real Property Without Probate",
      sections: [
        {
          heading: "How a Transfer on Death Deed Works",
          body: "A Transfer on Death Deed (TODD) is a deed that names one or more beneficiaries to receive your real property when you die. The deed is recorded during your lifetime but has no legal effect until your death — you retain full ownership and control of the property, including the right to sell it, mortgage it, or revoke the deed entirely.\n\nAt your death, the property transfers directly to the named beneficiary by operation of law, without the need for probate.",
        },
        {
          heading: "Requirements and Limitations",
          body: "Under Texas law, a Transfer on Death Deed must be signed, notarized, and recorded in the deed records of the county where the property is located before the owner's death. The deed can be revoked at any time during the owner's lifetime by recording a revocation.\n\nTODDs are available for real property in Texas but do not apply to other types of assets. For a more comprehensive nonprobate plan, a TODD is often used in conjunction with beneficiary designations on financial accounts and life insurance.",
        },
        {
          heading: "When a TODD Makes Sense",
          body: "A Transfer on Death Deed can be an efficient, lower-cost alternative to a revocable living trust for clients whose primary nonprobate goal is to avoid probate on a single piece of Texas real estate. For clients with more complex assets or multi-state property, a revocable living trust is often the more complete solution.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether a Transfer on Death Deed is right for your situation.",
        },
      ],
    },
  },
];

/* ─── Shared animated circle SVG ────────────────────────────────── */
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

function GhostBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "tel:2816090303"} className="btn-cta-ghost" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

function NavyBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "tel:2816090303"} className="btn-cta" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

/* ─── FAQ data ──────────────────────────────────────────────────── */
const EP_FAQS = [
  {
    label: "GETTING STARTED",
    question: "Estate planning? Probate? Powers of attorney? How am I going to make sense of everything I need to know?",
    answer: "Estate planning can feel overwhelming, but it doesn't have to be. When you work with Troy M. Moore, he will walk you through every tool available and explain — in plain English — how each one applies to your situation. That includes how to protect retirement accounts and brokerage assets, how to plan for business succession if you own a closely held business, how to handle real property and Texas deed requirements, how to select the right executor or trustee, and how to structure your plan so your family avoids disputes during the probate process. Troy has decades of experience guiding Houston families through these decisions, and he provides the personal attention you need to feel confident about every choice you make.",
  },
  {
    label: "WHY AVOID PROBATE",
    question: "Why is it important to avoid probate as part of the estate planning process?",
    answer: "Texas probate law is complex. Administering a probate estate — whether dependent or independent administration — requires court filings, statutory waiting periods, and ongoing legal involvement that can stretch the process out for months. The costs are real: attorney fees, court filing fees, and executor compensation can add up to several thousand dollars. Probate is also a public process, which means your assets, debts, and beneficiaries become part of the public court record. Beyond cost and privacy, the complexity of probate creates fertile ground for estate litigation — disputes among beneficiaries that can delay distribution and damage family relationships. All of these are strong reasons to use estate planning tools that allow your family to transfer assets outside of probate entirely.",
  },
  {
    label: "HARRIS COUNTY",
    question: "How can I make sure I provide clear guidance to my family in Harris County?",
    answer: "Clear guidance for your family starts with a properly drafted, up-to-date estate plan executed by an attorney who knows Texas law. Whether you live in Harris County, Montgomery County, Fort Bend County, or anywhere else in the greater Houston area, the key is working with a lawyer who has spent years focused specifically on Texas estate planning and probate. Troy M. Moore has done exactly that — he understands how Harris County probate court operates, what local judges look for, and how to structure a plan that leaves no room for ambiguity when your family needs it most. A well-crafted plan tells your loved ones exactly what to do and who is in charge, so they are not left guessing during an already difficult time.",
  },
  {
    label: "WHY TROY MOORE",
    question: "Why should I choose The Law Office of Troy M. Moore, PLLC to prepare my estate plan in Houston, TX?",
    answer: "Troy M. Moore has devoted his entire legal career to helping Texas individuals and families with estate planning and probate matters. A graduate of the South Texas College of Law and a long-time member of the Texas Bar Association, he has been practicing in Houston for over 25 years — accumulating the kind of practical knowledge that only comes from handling thousands of real cases, not just textbook scenarios. Every client at Troy M. Moore, PLLC works directly with the attorney — not a paralegal or a junior associate. Plans are drafted to your specific situation, reviewed for internal consistency, and explained thoroughly before you sign anything. Troy charges flat fees so you always know the cost upfront, with no hourly billing surprises.",
  },
  {
    label: "PROBATE REPRESENTATION",
    question: "Can you represent me if I need a probate attorney in the Houston area?",
    answer: "Yes. The Law Office of Troy M. Moore, PLLC focuses exclusively on estate planning, estate administration, and probate law in the Houston area. Troy represents surviving spouses, adult children, executors, administrators, guardians of minor children, and other interested parties in all probate-related matters — from straightforward independent administrations to contested will disputes and heirship proceedings. If you need help navigating the Texas probate process — whether your loved one left a will or died without one — contact our office to schedule an initial consultation and discuss your options.",
  },
];

function EPFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".ep-faq-row"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {EP_FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="ep-faq-row" style={{ opacity: 0 }}>
            <div style={{ height: 1, background: "rgba(11,55,93,0.1)", transformOrigin: "left center" }} />
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "clamp(1.25rem, 2vw, 2rem) 0", display: "flex", alignItems: "flex-start", gap: "1.5rem" }}
            >
              <span className="eyebrow" style={{ color: "var(--gold)", flexShrink: 0, paddingTop: "0.15rem", minWidth: "10ch" }}>{item.label}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: "var(--navy)", fontWeight: 500, fontSize: "clamp(0.95rem, 1.1vw, 1.25rem)", margin: 0, lineHeight: 1.4 }}>
                  {item.question}
                </h3>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.4s ease, opacity 0.35s ease",
                    marginTop: isOpen ? "clamp(0.75rem, 1vw, 1rem)" : 0,
                  }}
                >
                  <p style={{ color: "#6a7a8a", lineHeight: 1.85, fontSize: "clamp(0.85rem, 0.9vw, 1rem)", margin: 0 }}>
                    {item.answer}
                  </p>
                </div>
              </div>
              <span style={{ flexShrink: 0, color: "var(--navy)", fontSize: "1.5rem", lineHeight: 1, paddingTop: "0.1rem", transition: "transform 0.3s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
          </div>
        );
      })}
      <div style={{ height: 1, background: "rgba(11,55,93,0.1)" }} />
    </div>
  );
}

/* ─── Hero form ─────────────────────────────────────────────────── */
const EP_HELP_OPTIONS = [
  "Last Will & Testament",
  "Revocable Living Trust",
  "Powers of Attorney",
  "Living Will / Directive",
  "Special Needs Trust",
  "Transfer on Death Deed",
  "Not Sure — I Need Guidance",
];

function HeroForm() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [helpWith, setHelpWith] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
        style={{ background: "#fff", borderRadius: "8px", padding: "clamp(1.8rem, 2.5vw, 2.8rem)", boxShadow: "0 24px 60px rgba(0,0,0,0.28)", textAlign: "center" }}
      >
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.45rem" }}>Request Received</p>
        <h3 style={{ color: "var(--navy)", marginBottom: "0.6rem" }}>We&rsquo;ll be in touch soon</h3>
        <p style={{ color: "#6a7a8a", margin: 0 }}>
          Thank you for reaching out. Our office typically responds within one business day.
          You can also reach us directly at{" "}
          <a href="tel:2816090303" style={{ color: "var(--navy)", borderBottom: "1px solid var(--gold)" }}>(281) 609-0303</a>.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="ep-hero-form"
      style={{ background: "#fff", borderRadius: "8px", padding: "clamp(1.5rem, 2.2vw, 2.5rem)", boxShadow: "0 24px 60px rgba(0,0,0,0.28)", opacity: 0 }}
    >
      <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.3rem" }}>Initial Consultation</p>
      <h3 style={{ color: "var(--navy)", marginBottom: "0.3rem", lineHeight: 1.25 }}>Tell Us About Your Goals</h3>
      <p style={{ color: "#7a8a9a", fontSize: "clamp(0.74rem, 0.78vw, 0.84rem)", marginBottom: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.55 }}>
        Confidential &middot; No Obligation &middot; Response within 24 hours
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 0.8vw, 0.9rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.5rem, 0.7vw, 0.8rem)" }}>
          <input
            className="hero-form-input"
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            className="hero-form-input"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </div>
        <input
          className="hero-form-input"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />

        <div>
          <p style={{ color: "#7a8a9a", fontSize: "clamp(0.72rem, 0.75vw, 0.82rem)", marginBottom: "0.5rem" }}>
            I need help with (select all that apply):
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {EP_HELP_OPTIONS.map((opt) => (
              <label key={opt} className="hero-form-checkbox-label">
                <input
                  type="checkbox"
                  className="hero-form-checkbox"
                  checked={helpWith.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                <span style={{ color: "#4a5a6a", fontSize: "clamp(0.72rem, 0.75vw, 0.82rem)", lineHeight: 1.4 }}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          className="hero-form-input"
          placeholder="Anything else you'd like us to know (optional)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          style={{ resize: "none" }}
        />

        <button
          type="submit"
          disabled={submitting}
          className="btn-cta"
          style={{ justifyContent: "space-between", opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Sending…" : "Get a Consultation"}
          {!submitting && <CircleSVG />}
        </button>
      </form>
    </div>
  );
}

/* ─── Services section (StayingInformed-style rows) ─────────────── */
function ServicesSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".info-row"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 72%", once: true } }
      );
      gsap.fromTo(
        section.querySelectorAll(".divider-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 72%", once: true } }
      );
    }, sectionRef);

    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const dist = Math.abs(e.clientY - (rect.top + rect.height / 2));
        const scale = 1 + Math.pow(Math.max(0, 1 - dist / 220), 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => rowEls.forEach((row) => gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }));
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => { ctx.revert(); section.removeEventListener("mousemove", onMove); section.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {SERVICES.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{ width: "100%", padding: "clamp(1.25rem, 3vw, 3rem) 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", opacity: 0 }}
            onClick={() => onOpen(item)}
          >
            <span className="eyebrow font-semibold" style={{ color: "var(--gold)", marginBottom: "0.5rem" }}>{item.label}</span>
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3 className="transition-colors duration-300 group-hover:text-[var(--gold)]" style={{ color: "var(--navy)", marginBottom: "clamp(0.2rem, 0.3vw, 0.4rem)" }}>{item.title}</h3>
              <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>{item.description}</p>
            </div>
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path className="CircleIcon_circle__vewPw" d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0" />
                <path className="CircleIcon_circle-overlay__lg7sz" d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5" />
                <path className="CircleIcon_icon__n80xg" d="M12.5 11L16 14.5L12.5 18" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
const STATS = [
  { end: 25, suffix: "+", label: "Years of Texas Law Practice" },
  { end: 1000, suffix: "+", label: "Estate Plans Drafted" },
  { end: 100, suffix: "%", label: "Client-Focused Process" },
  { text: "Fixed", label: "Flat-Fee Pricing" },
];

function StatsStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!stripRef.current) return;
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        if (!stat.end || !numRefs.current[i]) return;
        const el = numRefs.current[i]!;
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: stat.end,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: stripRef.current!, start: "top 85%", once: true },
            onUpdate() {
              el.textContent = `${Math.round(obj.val).toLocaleString()}${stat.suffix ?? ""}`;
            },
            onComplete() {
              el.textContent = `${stat.end.toLocaleString()}${stat.suffix ?? ""}`;
            },
          }
        );
      });
    }, stripRef);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "#061e36", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ ...WRAP, paddingTop: "clamp(2rem, 3vw, 3.5rem)", paddingBottom: "clamp(2rem, 3vw, 3.5rem)" }}>
        <div ref={stripRef} className="ep-trust-grid">
          {STATS.map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "clamp(1rem, 1.5vw, 1.5rem) 0" }}>
              <p
                ref={(el) => { numRefs.current[i] = el; }}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", color: "#ffffff", fontSize: "clamp(3.2rem, 7vw, 8rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}
              >
                {item.text ?? `0${item.suffix ?? ""}`}
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.7rem, 1vw, 1rem)", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.5 }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EstatePlanningPage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, [mounted]);

  const openPanel = useCallback((item: PanelItem) => {
    setPanelItem(item);
    document.body.style.overflow = "hidden";
    gsap.timeline()
      .to(contentRef.current, { x: 18, duration: 0.13, ease: "power2.out" })
      .to(contentRef.current, { x: "-85vw", duration: 0.85, ease: "expo.inOut" });
    gsap.to(panelRef.current, { x: 0, duration: 0.85, ease: "expo.inOut", delay: 0.06 });
  }, []);

  const closePanel = useCallback(() => {
    gsap.to(panelRef.current, { x: "100%", duration: 0.55, ease: "power4.in" });
    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.72,
      ease: "expo.out",
      delay: 0.08,
      onComplete: () => {
        setPanelItem(null);
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <>
      <style>{`
        /* ── Info-row eyebrow ── */
        .info-row .eyebrow {
          font-size: 0.7vw;
          flex: 0 0 14vw;
          min-width: 0;
        }
        @media (max-width: 1000px) {
          .info-row .eyebrow {
            font-size: clamp(0.5rem, 1.8vw, 0.62rem);
            flex: 0 0 auto;
          }
        }

        /* ── Info-row circle styles ── */
        .info-row .cta-circle {
          width: 4.4em; height: 4.4em; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          color: rgba(11,55,93,0.35);
          transition: color 0.6s ease;
        }
        .info-row:hover .cta-circle { color: var(--gold); }
        .info-row .cta-circle svg .CircleIcon_circle__vewPw {
          stroke: rgba(11,55,93,0.2); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 0;
          transition: stroke-dashoffset 1s ease, stroke 0.6s ease;
        }
        .info-row .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke: var(--gold); stroke-width: 1.5; fill: none;
          stroke-dasharray: 100; stroke-dashoffset: 100;
          transition: stroke-dashoffset 1s ease;
        }
        .info-row:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz { stroke-dashoffset: 0; }
        .info-row .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none; transition: stroke 0.6s ease;
        }

        /* ── Grid layouts ── */
        .ep-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: start;
          padding-left: 10vw;
          padding-right: 10vw;
          padding-bottom: clamp(3rem, 4vw, 4.5rem);
        }
        .ep-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 2rem);
        }
        .ep-package-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 2vw, 2rem);
        }
        .ep-questionnaire-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        .ep-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: center;
        }

        @media (max-width: 1023px) {
          .ep-trust-grid { grid-template-columns: 1fr 1fr; }
          .ep-package-grid { grid-template-columns: 1fr 1fr; }
          .ep-questionnaire-grid { grid-template-columns: 1fr; }
          .ep-why-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 960px) {
          .ep-hero-grid { grid-template-columns: 1fr; padding-right: 10vw; }
          .ep-hero-form { display: none; }
        }
        @media (max-width: 640px) {
          .ep-trust-grid { grid-template-columns: 1fr 1fr; }
          .ep-package-grid { grid-template-columns: 1fr; }

          .ep-hero-grid { padding-left: 6vw; padding-right: 6vw; }
        }

        /* ── Hero form inputs ── */
        .hero-form-input {
          width: 100%;
          padding: 0.72em 1em;
          border: 1.5px solid #e0e4e8;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: clamp(0.82rem, 0.85vw, 0.92rem);
          color: var(--navy);
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .hero-form-input:focus {
          border-color: var(--navy);
          box-shadow: 0 0 0 3px rgba(11,55,93,0.07);
        }
        .hero-form-input::placeholder { color: #9aabb8; }
        .hero-form-checkbox-label {
          display: flex; align-items: flex-start; gap: 0.55rem;
          cursor: pointer; user-select: none;
        }
        .hero-form-checkbox {
          -webkit-appearance: none; appearance: none;
          width: 1em; height: 1em;
          border: 1.5px solid #c8d0d8; border-radius: 3px;
          background: #fff; cursor: pointer; flex-shrink: 0;
          margin-top: 0.18em;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
        }
        .hero-form-checkbox:checked { background: var(--navy); border-color: var(--navy); }
        .hero-form-checkbox:checked::after {
          content: ''; position: absolute; left: 2px; top: -1px;
          width: 5px; height: 9px;
          border: 2px solid #fff; border-top: none; border-left: none;
          transform: rotate(45deg);
        }

        /* ── Package component card ── */
        .ep-package-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ep-package-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }

        /* ── Questionnaire link card ── */
        .ep-q-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .ep-q-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(11,55,93,0.12);
          border-color: var(--gold) !important;
        }
        .ep-q-card:hover h3 { color: var(--gold); }

        /* ── SidePanel width — explicit override to guarantee 85vw ── */
        .side-panel { width: 85vw; }
        @media (max-width: 640px) {
          .side-panel { width: 100vw; }
        }
      `}</style>

      <div
        ref={contentRef}
        style={{ cursor: panelItem ? "pointer" : "auto" }}
        onClick={panelItem ? closePanel : undefined}
      >
        <Navbar />

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────── */}
          <section
            style={{
              backgroundImage: "url(/assets/blue-bg2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              paddingTop: "calc(72px + clamp(5rem, 8vw, 9rem))",
            }}
          >
            <div className="ep-hero-grid">
              {/* Copy */}
              <div style={{ paddingTop: "clamp(1rem, 2vw, 2.5rem)" }}>
                <p
                  className="eyebrow"
                  style={{
                    color: "var(--gold)",
                    marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)",
                    fontSize: "clamp(0.6rem, 0.7vw, 0.8rem)",
                  }}
                >
                  Houston Estate Planning Attorney
                </p>
                <h1
                  style={{
                    color: "#ffffff",
                    marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
                    maxWidth: "52ch",
                  }}
                >
                  Plan for Your Family&rsquo;s Future Before It Becomes a Crisis
                </h1>
                <p
                  style={{
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.75,
                    marginBottom: "1rem",
                    maxWidth: "52ch",
                  }}
                >
                  A complete estate plan protects your family, preserves your assets, and ensures your
                  wishes are carried out — without court intervention or family conflict. Troy M. Moore,
                  PLLC provides Houston-area clients with wills, trusts, powers of attorney, and advanced
                  planning strategies tailored to their specific situation.
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.75,
                    marginBottom: "1rem",
                    maxWidth: "52ch",
                  }}
                >
                  Under Texas law, dying without a valid will means the state decides who inherits your
                  property — and those rules rarely match what most families would actually choose. A
                  properly drafted estate plan puts those decisions back in your hands, clearly and legally,
                  while reducing the time and cost your family faces after you are gone.
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.75,
                    marginBottom: "clamp(1.5rem, 2vw, 2.5rem)",
                    maxWidth: "52ch",
                  }}
                >
                  Whether you need a straightforward will and powers of attorney or a full revocable living
                  trust designed to avoid probate entirely, the firm offers flat-fee estate planning
                  packages built for Houston-area individuals and families at every stage of life.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <GhostBtn label="Get Started" href="tel:2816090303" />
                </div>
              </div>

              {/* Form */}
              <HeroForm />
            </div>
          </section>

          {/* ── 2. TRUST STRIP ───────────────────────────────────── */}
          <StatsStrip />

          {/* ── 3. QUESTIONNAIRE CTA ─────────────────────────────── */}
          <section style={{ background: "#fff", ...PAD }}>
            <div style={WRAP}>
              <div style={{ maxWidth: "54ch", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                  Start Here
                </p>
                <h2 style={{ color: "var(--navy)", marginBottom: "1rem" }}>
                  Not sure where to begin? Take our brief questionnaire.
                </h2>
                <p style={{ color: "#6a7a8a", lineHeight: 1.75 }}>
                  Answer a few questions about your family and assets and we&rsquo;ll help identify the right documents for your situation — before your consultation.
                </p>
              </div>

              <div className="ep-questionnaire-grid">
                {[
                  {
                    tag: "MARRIED / COUPLE",
                    headline: "Married or in a Long-Term Partnership",
                    body: "For couples planning together — including provisions for spouses, children, and blended family situations.",
                    href: "tel:2816090303",
                  },
                  {
                    tag: "SINGLE / INDIVIDUAL",
                    headline: "Single, Divorced, or Planning Individually",
                    body: "For individuals identifying the right documents, beneficiaries, and agents to protect their assets and healthcare decisions.",
                    href: "tel:2816090303",
                  },
                ].map((card, i) => (
                  <a
                    key={i}
                    href={card.href}
                    className="ep-q-card"
                    style={{
                      display: "block",
                      padding: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 8,
                      textDecoration: "none",
                    }}
                  >
                    <p className="eyebrow" style={{ color: "var(--gold)", fontSize: "clamp(0.52rem, 0.6vw, 0.68rem)", marginBottom: "0.75rem" }}>
                      {card.tag}
                    </p>
                    <h3 style={{ color: "var(--navy)", marginBottom: "0.75rem", transition: "color 0.3s ease" }}>
                      {card.headline}
                    </h3>
                    <p style={{ color: "#6a7a8a", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                      {card.body}
                    </p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--navy)", fontWeight: 500, fontSize: "clamp(0.8rem, 0.85vw, 0.95rem)" }}>
                      Get Started
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path d="M6.5 4L10 8L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── 4. WHY CHOOSE US / FIRM INTRO ────────────────────── */}
          <section style={{ background: "var(--light-gray)", ...PAD }}>
            <div style={{ ...WRAP }}>
              <div className="ep-why-grid">
                <div>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                    Why Troy M. Moore, PLLC
                  </p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
                    Experienced. Personal. Complete.
                  </h2>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                    Estate planning done well is not a one-size-fits-all product. It requires understanding your family structure, your assets, and your goals — and translating those into legally sound documents that accomplish what you intend.
                  </p>
                  <p style={{ color: "#6a7a8a", lineHeight: 1.8 }}>
                    Troy M. Moore, PLLC is a Houston-based firm focused exclusively on Texas estate planning and probate. Every plan is prepared by an experienced attorney — not passed off to paralegals — and designed to hold up when it matters most.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 1.5vw, 1.5rem)" }}>
                  {[
                    {
                      title: "Attorney-Drafted Documents",
                      body: "Every document is drafted and reviewed by an experienced Texas estate planning attorney — not generated by software or delegated to non-attorneys.",
                    },
                    {
                      title: "Flat-Fee, Transparent Pricing",
                      body: "You know the cost before we start. No hourly billing surprises, no hidden fees, no ambiguity about what is and isn't included.",
                    },
                    {
                      title: "Complete Plans, Not Piecemeal Documents",
                      body: "A will alone is rarely enough. We evaluate your full picture and ensure every element of your plan works together — now and when it needs to.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "clamp(1rem, 1.5vw, 1.5rem)",
                        background: "#fff",
                        borderRadius: 6,
                        borderLeft: "3px solid var(--gold)",
                      }}
                    >
                      <h3 style={{ color: "var(--navy)", fontSize: "clamp(0.9rem, 1vw, 1.1rem)", fontWeight: 500, marginBottom: "0.5rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "#6a7a8a", lineHeight: 1.7, fontSize: "clamp(0.8rem, 0.85vw, 0.95rem)" }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. PROBATE AVOIDANCE PACKAGE™ ────────────────────── */}
          <section style={{ background: "var(--navy)", ...PAD }}>
            <div style={WRAP}>
              <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)", maxWidth: "54ch", margin: "0 auto clamp(2.5rem, 4vw, 4rem)" }}>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                  Featured
                </p>
                <h2 style={{ color: "#ffffff", marginBottom: "1rem" }}>
                  The Probate Avoidance Package™
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
                  A complete, coordinated estate plan designed to transfer your assets to your family without probate — saving time, cost, and public court proceedings.
                </p>
              </div>

              {/* Cost comparison bar */}
              <div
                style={{
                  background: "rgba(195,160,91,0.08)",
                  border: "1px solid rgba(195,160,91,0.25)",
                  borderRadius: 8,
                  padding: "clamp(1.25rem, 2vw, 2rem)",
                  marginBottom: "clamp(2rem, 3vw, 3rem)",
                  display: "flex",
                  gap: "clamp(1.5rem, 3vw, 4rem)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.7rem, 0.75vw, 0.85rem)", marginBottom: "0.3rem" }}>
                    Average Texas Probate Cost
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "clamp(1.2rem, 1.8vw, 2rem)", textDecoration: "line-through" }}>
                    $4,550+
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.68rem, 0.72vw, 0.8rem)" }}>
                    After death — plus delays for your family
                  </p>
                </div>
                <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <p style={{ color: "var(--gold)", fontSize: "clamp(0.7rem, 0.75vw, 0.85rem)", marginBottom: "0.3rem" }}>
                    Probate Avoidance Package™
                  </p>
                  <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "clamp(1.2rem, 1.8vw, 2rem)" }}>
                    From $2,950
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(0.68rem, 0.72vw, 0.8rem)" }}>
                    Complete plan — paid once, protects permanently
                  </p>
                </div>
                <a href="tel:2816090303" className="btn-cta-ghost" style={{ textDecoration: "none", flexShrink: 0 }}>
                  Learn More <CircleSVG />
                </a>
              </div>

              {/* 4-component grid */}
              <div className="ep-package-grid">
                {[
                  {
                    label: "01",
                    title: "Revocable Living Trust",
                    body: "The foundation of your nonprobate plan. Assets titled in the trust pass directly to your beneficiaries — no court, no delay.",
                  },
                  {
                    label: "02",
                    title: "Pour-Over Will",
                    body: "A companion will that catches any assets outside the trust at death and directs them into the trust — ensuring nothing falls through the cracks.",
                  },
                  {
                    label: "03",
                    title: "Powers of Attorney",
                    body: "Both a Statutory Durable POA (finances) and a Medical POA (healthcare) — so someone you trust can act for you if you become incapacitated.",
                  },
                  {
                    label: "04",
                    title: "Directive to Physicians",
                    body: "Your written instructions for end-of-life healthcare decisions — relieving your family of having to guess your wishes in a critical moment.",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="ep-package-card"
                    style={{
                      padding: "clamp(1.25rem, 2vw, 2rem)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                    }}
                  >
                    <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "clamp(0.75rem, 0.85vw, 1rem)", marginBottom: "0.75rem", opacity: 0.7 }}>
                      {card.label}
                    </p>
                    <h3 style={{ color: "#ffffff", fontSize: "clamp(0.9rem, 1.1vw, 1.25rem)", fontWeight: 500, marginBottom: "0.6rem" }}>
                      {card.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "clamp(0.78rem, 0.82vw, 0.92rem)" }}>
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 6. SERVICES LIST ─────────────────────────────────── */}
          <section style={{ background: "#fff", ...PAD }}>
            <div style={WRAP}>
              <div style={{ maxWidth: "54ch", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                  Estate Planning Services
                </p>
                <h2 style={{ color: "var(--navy)" }}>
                  Every document your plan may need
                </h2>
              </div>
              <ServicesSection onOpen={openPanel} />
            </div>
          </section>

          {/* ── 7. FAQ ───────────────────────────────────────────── */}
          <section style={{ background: "#f9f9f9", ...PAD }}>
            <div style={WRAP}>
              <div style={{ marginBottom: "clamp(2rem, 3vw, 3.5rem)" }}>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
                  Common Questions
                </p>
                <h2 style={{ color: "var(--navy)" }}>
                  Estate Planning — Frequently Asked Questions
                </h2>
              </div>
              <EPFaqSection />
            </div>
          </section>

          {/* ── 8. FINAL CTA ─────────────────────────────────────── */}
          <PageCTA
            eyebrow="Ready to Get Started"
            heading={<>Protect your family.<br />Start today.</>}
            description="Estate planning is one of the most important things you can do for your family — and it takes less time and cost than most people expect. Contact Troy M. Moore, PLLC to schedule a consultation."
          >
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
          </PageCTA>
        </main>

        <Footer />
      </div>

      {/* ── Portal: close button + SidePanel ─────────────────────── */}
      {mounted && createPortal(
        <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />,
        document.body
      )}

    </>
  );
}
