"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";
import ScrollReveal from "@/components/ScrollReveal";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import { gsap } from "@/lib/gsap";

/* ─── Layout constants — matching StayingInformed / home page ──── */
const PAD: React.CSSProperties = {
  paddingTop: "clamp(4rem, 6vw, 7rem)",
  paddingBottom: "clamp(4rem, 6vw, 7rem)",
};
const WRAP: React.CSSProperties = {
  paddingLeft: "10vw",
  paddingRight: "10vw",
};

/* ─── Panel data for "With a Will" rows ────────────────────────── */
const WILL_OPTIONS: (PanelItem & { description: string })[] = [
  {
    label: "WITH A WILL",
    title: "Probate of a Will in Texas",
    description:
      "The traditional probate process — an executor is appointed, granted Letters Testamentary, and authorized to administer the estate from start to finish.",
    href: "#probate-will",
    panel: {
      headline: "Probate of a Will in Texas — Executor Appointment & Administration",
      sections: [
        {
          heading: "The Traditional Probate Process",
          body: "When a valid Last Will and Testament is filed with the probate court, an executor is appointed to administer the estate. In most cases, the court grants independent administration — allowing the executor to gather assets, address estate obligations, distribute property to beneficiaries, and move the administration forward without court involvement at every step.\n\nThis is the standard path when a valid will exists and the estate has assets or obligations that require active management.",
        },
        {
          heading: "Letters Testamentary",
          body: "Once appointed, the executor receives Letters Testamentary — a document issued by the probate court that authorizes the executor to act on behalf of the estate. Letters Testamentary can be used to access financial accounts, address title issues, transfer or sell real property, and handle other estate matters that require evidence of authority.\n\nFor many families, this is the clearest and most complete path when a will exists and ongoing legal authority is needed to properly close the estate.",
        },
        {
          heading: "What This Process Involves",
          body: "Filing and completing the probate administration in Texas typically involves the following steps:",
          list: [
            "Filing an Application to Probate the Will in the appropriate county",
            "Court hearing to admit the will and appoint the executor",
            "Obtaining Letters Testamentary from the probate court clerk",
            "Publishing a Notice to Creditors in a local legal newspaper",
            "Notifying all beneficiaries by certified mail",
            "Filing a Certificate of Compliance with the court",
            "Filing an Inventory of the probate estate (or an Affidavit in Lieu of Inventory)",
            "Recording certified copies in each county where the deceased owned real property",
          ],
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether independent administration applies to your estate and what the process will involve for your specific situation.",
        },
      ],
    },
  },
  {
    label: "WITH A WILL",
    title: "Muniment of Title",
    description:
      "A Texas-specific streamlined procedure to establish title to estate assets without a full administration — available in qualifying circumstances.",
    href: "#muniment",
    panel: {
      headline: "Probate of a Will as a Muniment of Title in Texas",
      sections: [
        {
          heading: "What Is Muniment of Title?",
          body: "Muniment of title is a procedure unique to Texas law that allows a will to be admitted to probate without appointing an executor or opening a full administration. When approved by the court, the recorded will itself serves as evidence of the new owner's title to estate property — without the need for ongoing executor authority.",
        },
        {
          heading: "When It May Apply",
          body: "Muniment of title is generally available when there are no unpaid debts of the estate (other than debts secured by real property) and when an ongoing administration is not otherwise required. It can also become especially relevant when more than four years have passed since the date of death — a period after which standard probate administration may no longer be available under Texas law.\n\nIn those situations, muniment of title may offer a path forward that would otherwise be unavailable.",
        },
        {
          heading: "Understanding the Limitations",
          body: "Because muniment of title does not result in the appointment of an executor, it does not grant broad ongoing authority to act for the estate. It is a more limited procedure suited for specific circumstances — typically when the primary goal is establishing title to property rather than conducting a full estate administration.\n\nFor estates that require someone to collect assets, resolve creditor claims, or manage ongoing obligations, a full administration with executor appointment is likely the better path.",
          closing:
            "Contact Troy M. Moore, PLLC to evaluate whether muniment of title is the appropriate option for your estate or whether a full administration is required.",
        },
      ],
    },
  },
];

/* ─── Panel data for "Without a Will" rows ─────────────────────── */
const NO_WILL_OPTIONS: (PanelItem & { description: string })[] = [
  {
    label: "HEIRSHIP",
    title: "Heirship Proceeding — Judicial Determination of Heirship",
    description:
      "The formal court proceeding to establish who inherits when someone dies without a will — clarifying ownership rights and providing the legal basis for transferring title to property.",
    href: "#heirship",
    panel: {
      headline: "Judicial Determination of Heirship in Texas",
      sections: [
        {
          heading: "What Is a Determination of Heirship?",
          body: "A judicial determination of heirship is the formal court proceeding used to establish who inherits a decedent's property when no valid will exists. The court reviews family history and applies Texas intestacy law to identify the legal heirs and each heir's fractional ownership interest in the estate.\n\nThis proceeding produces an order that is filed in the real property records of each county where the decedent owned property — giving surviving family members a documented legal basis to assert their ownership rights.",
        },
        {
          heading: "When It Is Required",
          body: "A determination of heirship is typically required when real estate or other titled property needs to be transferred to heirs but no will exists to direct that transfer. Without this court order, title cannot be clearly established — which can prevent property from being sold, refinanced, or transferred.\n\nIt may also be required even when no ongoing administration is needed. In some cases the estate's only need is establishing who the heirs are and what they own, without the appointment of a personal representative.",
        },
        {
          heading: "The Role of an Attorney Ad Litem",
          body: "Texas law requires the appointment of an attorney ad litem in heirship proceedings. This attorney is appointed by the court to independently investigate the family history and represent the interests of unknown or missing heirs — a safeguard that protects the integrity of the proceeding and the interests of all potential claimants.\n\nThe attorney ad litem's role is separate from the attorney representing the petitioning family. Both serve different functions within the same proceeding.",
          closing:
            "Contact Troy M. Moore, PLLC to discuss whether a judicial determination of heirship applies to your situation and what steps would be involved.",
        },
      ],
    },
  },
  {
    label: "ADMINISTRATION",
    title: "Heirship With Administration — When Authority Is Also Needed",
    description:
      "When identifying the heirs is not enough — someone also needs legal authority to collect assets, manage property, and handle estate obligations. This procedure addresses both needs in a single proceeding.",
    href: "#heirship-admin",
    panel: {
      headline: "Heirship With Administration — Combining Identification and Authority",
      sections: [
        {
          heading: "When Both Are Required",
          body: "In some intestate estates, a determination of who inherits is only part of what is needed. The estate may also have assets that need to be collected, property that requires active management, or creditor obligations that require someone with the legal authority to act on behalf of the estate.\n\nA judicial determination of heirship with administration addresses both — the court identifies the heirs and, in the same proceeding, appoints an administrator who is granted the authority needed to handle the estate.",
        },
        {
          heading: "Letters of Administration",
          body: "Once appointed, the administrator receives Letters of Administration — a court-issued document authorizing the administrator to act on behalf of the estate. These letters function similarly to Letters Testamentary in a will-based probate, and can be used to access financial accounts, address real property title issues, resolve creditor claims, and manage other estate matters that require documented legal authority.",
        },
        {
          heading: "Independent vs. Dependent Administration",
          body: "Texas law generally favors independent administration, which allows the administrator to manage the estate without court approval at every step. Dependent administration — which requires court oversight for significant decisions — may apply in certain circumstances.\n\nThe appropriate type of administration depends on the estate's particular circumstances, whether the heirs agree, and whether the court approves independent authority.",
          closing:
            "Contact Troy M. Moore, PLLC to evaluate whether a heirship proceeding with administration is the right path and what level of court involvement your estate will require.",
        },
      ],
    },
  },
  {
    label: "AFFIDAVIT",
    title: "Small Estate Affidavit — A Limited Option for Qualifying Estates",
    description:
      "A Texas alternative to full probate that may be available for qualifying intestate estates — with strict eligibility requirements and important limitations families should understand before relying on it.",
    href: "#small-estate",
    panel: {
      headline: "Small Estate Affidavit in Texas — Eligibility, Limitations, and Risks",
      sections: [
        {
          heading: "What Is a Small Estate Affidavit?",
          body: "A small estate affidavit is a Texas procedure that allows heirs to collect certain assets of an intestate estate without opening a formal probate administration. When approved by the court, the affidavit can be used to collect personal property, financial accounts, and other assets that fall within the eligibility requirements.\n\nIt is one of the less formal options in Texas probate law — but it comes with specific limitations that many families underestimate when first considering the process.",
        },
        {
          heading: "Eligibility Requirements",
          body: "To qualify for a small estate affidavit in Texas, the estate must meet specific statutory requirements — including a cap on the total value of assets subject to the affidavit (excluding the homestead), and the absence of a pending application for appointment of a personal representative. All known heirs must sign the affidavit, and the process requires court approval before it can be used.",
        },
        {
          heading: "Important Limitations",
          body: "A small estate affidavit cannot typically be used to transfer real estate — with limited exceptions involving the homestead. For estates that include real property other than the homestead, a full determination of heirship or administration is generally required to establish clear title.\n\nAssuming a small estate affidavit will work — without first confirming eligibility and understanding its limitations — can create title problems and delays that are far more expensive to resolve after the fact.",
          closing:
            "Contact Troy M. Moore, PLLC to determine whether a small estate affidavit is appropriate for the estate or whether a different procedure is required.",
        },
      ],
    },
  },
  {
    label: "ALTERNATIVES",
    title: "Alternatives to Probate — When Full Probate May Not Be Required",
    description:
      "In limited situations, options outside of formal probate may be available — including affidavits of heirship and other non-probate mechanisms. The key is knowing when they apply and when they create more problems than they solve.",
    href: "#alternatives",
    panel: {
      headline: "Probate Alternatives in Texas — Understanding When They Apply",
      sections: [
        {
          heading: "When Alternatives May Be Available",
          body: "Not every estate requires a full probate administration. Depending on the nature of the assets, the family circumstances, and the goals of the heirs, there may be alternatives that allow property to pass without opening a formal court proceeding.\n\nOne example is an affidavit of heirship — a document used to establish title to real property based on family history and consistent acknowledgment of ownership. When properly prepared and recorded, an affidavit of heirship can establish chain of title for real estate without a court proceeding.",
        },
        {
          heading: "The Risk of Choosing the Wrong Option",
          body: "Alternatives to probate are not universally available and are not always the right choice. An affidavit of heirship, for example, does not provide the same level of legal protection as a judicial determination — and a title company or lender may decline to rely on it in certain transactions.\n\nChoosing a simpler path without a clear understanding of its limitations can result in title defects, disputes between heirs, and the need to undo prior work — often at greater cost than a proper proceeding would have required at the outset.",
        },
        {
          heading: "Getting the Right Answer First",
          body: "The most practical approach is an early legal review of the estate — before any documents are signed, any assets collected, or any assumptions made about which process applies. A clear-eyed evaluation of the options can save time, expense, and the risk of choosing a path that creates problems later.",
          closing:
            "Contact Troy M. Moore, PLLC for guidance on which option — probate or an available alternative — makes the most sense for your specific circumstances.",
        },
      ],
    },
  },
];

/* ─── FAQ panel data ────────────────────────────────────────────── */
const FAQ_ITEMS: (PanelItem & { description: string })[] = [
  {
    label: "TIMELINE",
    title: "How Long Does Probate Take in Houston, TX?",
    description:
      "Timeline expectations for the Texas probate process — what affects the schedule and what families can realistically expect from filing through final distribution.",
    href: "#faq-timeline",
    panel: {
      headline: "Probate Timeline in Houston — What to Expect",
      sections: [
        {
          heading: "Typical Timeline for a Straightforward Estate",
          body: "For estates with a valid will and independent administration in Harris County, the probate process typically takes 1 to 3 months from filing through the receipt of Letters Testamentary. The court hearing to admit the will and appoint the executor is generally scheduled 2 to 4 weeks after the application is filed.\n\nFollowing the hearing, the executor must complete several additional steps — publishing the creditor notice in a local legal newspaper, notifying beneficiaries by certified mail, and filing the inventory or affidavit in lieu of inventory. In practice, most straightforward estates can be substantially completed within 3 to 6 months from the date the application is filed.",
        },
        {
          heading: "Factors That Extend the Timeline",
          body: "Several circumstances commonly extend the probate timeline beyond the typical range:\n\nContested wills or disputes among heirs can result in litigation that delays administration by months or more. Estates with real property in multiple Texas counties require additional filings in each county's records. Difficulty locating heirs or beneficiaries extends the creditor and notice periods. Intestate estates — those without a will — generally take longer than will-based probate because of the additional heirship proceeding requirements.\n\nComplex assets, business interests, or unresolved creditor claims also add time and should be identified early.",
        },
        {
          heading: "Why Timing Matters",
          body: "Under Texas law, a will generally must be filed for probate within four years of the date of death. Waiting does not make the process easier and can foreclose certain options — including standard independent administration — that are available when the estate is handled promptly.\n\nStarting the process as early as practicable reduces the risk of missed deadlines, allows creditor claims to be addressed on a predictable timeline, and gives the family a clearer picture of what to expect.",
          closing: "Contact Troy M. Moore, PLLC for a realistic assessment of what your specific estate will require and how long the process is likely to take.",
        },
      ],
    },
  },
  {
    label: "COSTS",
    title: "How Much Does Probate Cost in Texas?",
    description:
      "Court filing fees, attorney fees, and other costs involved in Texas probate — and what factors affect the overall expense of administering an estate.",
    href: "#faq-costs",
    panel: {
      headline: "What Probate Costs in Texas — A Practical Overview",
      sections: [
        {
          heading: "Court Filing Fees",
          body: "Harris County Probate Courts charge filing fees for probate applications, which typically range from $700 to $1,600 depending on the size and type of the estate. Additional fees apply for certified copies of Letters Testamentary, which are required to act on behalf of the estate with banks, title companies, and other institutions. If the estate includes real property in other Texas counties, filing and recording fees in each county will add to the total.",
        },
        {
          heading: "Attorney Fees",
          body: "Where the estate's complexity allows, Troy M. Moore, PLLC structures fees on a flat-fee basis — giving families a clear understanding of the legal cost before the engagement begins. Straightforward probate matters typically start around $3,000 in total legal fees, though the actual amount depends on the type of proceeding, the number of heirs, the assets involved, and whether any complications arise.\n\nEstates with multiple heirs, land in more than one county, difficulty serving interested parties, or contested issues involve a broader scope of work and are priced accordingly. An early consultation clarifies which category the estate falls into.",
        },
        {
          heading: "Other Costs to Anticipate",
          body: "Beyond court and attorney fees, estates may incur several additional costs depending on their specific circumstances:\n\nNewspaper publication of the creditor notice is required and involves a modest publication fee. Real property appraisals are sometimes required to establish date-of-death value for estate purposes. Executor fees — while not always taken — may be compensation a named executor is entitled to under Texas law. Bond fees may apply in dependent administrations or when the court requires a bond as a condition of appointment.",
          closing: "Contact Troy M. Moore, PLLC to discuss the likely cost range for your specific estate before beginning the probate process.",
        },
      ],
    },
  },
  {
    label: "AVOIDANCE",
    title: "Can Probate Be Avoided in Texas?",
    description:
      "Non-probate transfers, trusts, beneficiary designations, and other planning tools that may allow assets to pass outside of court — and when they apply.",
    href: "#faq-avoidance",
    panel: {
      headline: "Avoiding Probate in Texas — Options and Limitations",
      sections: [
        {
          heading: "When Probate Can Be Avoided",
          body: "Not every estate requires a court proceeding. Several planning tools — when properly established during the owner's lifetime — can allow assets to pass directly to beneficiaries without going through probate:\n\nRevocable living trusts transfer assets outside of probate when properly funded. Named beneficiaries on life insurance policies, retirement accounts, and bank accounts receive those assets directly upon death. Transfer-on-Death deeds allow real property to pass to a named grantee without probate when the deed is recorded before death. Property held in joint tenancy with right of survivorship passes to the surviving owner outside of the estate.",
        },
        {
          heading: "Small Estate Affidavit — Limited Probate Alternative",
          body: "For intestate estates meeting specific statutory requirements — including a cap on total asset value excluding the homestead — a small estate affidavit may allow heirs to collect certain assets without a full court proceeding. This option has strict eligibility requirements and cannot generally be used to transfer real estate other than the homestead.\n\nIt is one of the less formal options in Texas law, but families should understand its limitations before assuming it will work for their situation.",
        },
        {
          heading: "When Probate Is Still Required",
          body: "Probate avoidance requires planning in advance. If the proper tools were not put in place before death, assets that do not have named beneficiaries, are not held in trust, and do not have survivorship rights will typically need to pass through some form of probate or heirship proceeding before title can be transferred.\n\nIn many estates, probate is the correct and most efficient path — not a problem to be avoided, but a legal process to be handled correctly.",
          closing: "Contact Troy M. Moore, PLLC to evaluate whether probate is required for the estate or whether a non-probate option is available.",
        },
      ],
    },
  },
  {
    label: "NO WILL",
    title: "What Happens When Someone Dies Without a Will in Texas?",
    description:
      "Texas intestate succession — how state law determines who inherits and what legal procedures are required to transfer property when no will exists.",
    href: "#faq-no-will",
    panel: {
      headline: "Dying Without a Will in Texas — Intestacy and Your Options",
      sections: [
        {
          heading: "How Texas Intestacy Law Works",
          body: "When a person dies without a valid will, Texas intestacy law — not the family's wishes — determines who inherits the estate. The Texas Estates Code sets out a priority order: a surviving spouse and children are first in line, followed by parents, then siblings and their descendants if the decedent left no spouse or children.\n\nFor married couples, the distribution depends in part on whether the property is community or separate property and whether there are children from prior relationships. These rules can produce results the family did not expect — which is one of the most common reasons families pursue estate planning.",
        },
        {
          heading: "What Is Required to Transfer Property",
          body: "Without a will, there is no executor and no clear document establishing who owns what. Before titled property — particularly real estate — can be transferred to heirs, the family typically must go through a judicial determination of heirship or related court proceeding.\n\nThis proceeding requires a court filing, the appointment of an attorney ad litem to represent unknown heirs, and a hearing in which the court reviews family history and applies intestacy law to identify the legal heirs and their fractional interests. The resulting order is recorded in the property records of each county where the decedent owned real estate.",
        },
        {
          heading: "Why Intestate Estates Are More Complex",
          body: "Intestate estates — those without a will — generally involve more procedural steps and more time than will-based probate. The heirship proceeding itself adds length, and the absence of a named executor means the court must also appoint an administrator if ongoing authority is needed.\n\nFamilies often underestimate the complexity of an intestate estate, particularly when real property is involved. Early legal guidance helps identify the appropriate procedure and avoid approaches that won't satisfy title requirements.",
          closing: "Contact Troy M. Moore, PLLC to discuss the appropriate next steps when someone passes away without a will.",
        },
      ],
    },
  },
  {
    label: "EXECUTOR",
    title: "What Are an Executor's Duties in Texas Probate?",
    description:
      "The legal responsibilities of a named executor after court appointment — from receiving Letters Testamentary through the final distribution of estate assets.",
    href: "#faq-executor",
    panel: {
      headline: "Executor Duties Under Texas Probate Law",
      sections: [
        {
          heading: "Appointment and Initial Authority",
          body: "An executor's formal authority begins at the probate court hearing, where the court admits the will and issues an order appointing the executor. Following the hearing, the executor receives Letters Testamentary — a document issued by the court clerk that authorizes the executor to act on behalf of the estate.\n\nLetters Testamentary are required to access financial accounts, correspond with financial institutions, address real property matters, and handle other estate business that requires evidence of legal authority. Certified copies of the Letters are typically needed for multiple purposes throughout the administration.",
        },
        {
          heading: "Creditors, Notice, and Inventory",
          body: "Following appointment, the executor must publish a Notice to Creditors in a local legal newspaper and notify all beneficiaries named in the will by certified mail. Within 90 days of appointment, the executor must also file either an inventory of the probate estate or an affidavit in lieu of inventory, as permitted.\n\nThese steps are legally required and have specific timeframes. Missing them can create complications, extend the administration, or result in personal liability for the executor.",
        },
        {
          heading: "Distribution and Closing the Estate",
          body: "Once creditor claims have been resolved and estate obligations addressed, the executor distributes the remaining assets to the beneficiaries as directed by the will. In an independent administration, the executor can generally complete this process without additional court involvement at each step.\n\nThe executor has fiduciary duties to the estate and its beneficiaries throughout the process. Acting outside of those duties — whether intentionally or through neglect — can expose the executor to personal liability. Working with an experienced probate attorney helps the executor stay on track and avoid avoidable missteps.",
          closing: "Contact Troy M. Moore, PLLC for guidance on executor duties and how to handle each stage of the Texas probate process correctly.",
        },
      ],
    },
  },
  {
    label: "OUT OF STATE",
    title: "How Does Probate Work for an Out-of-State Executor?",
    description:
      "What Texas law requires when the executor named in a will lives outside of Texas — and how the process works in practice for non-resident executors.",
    href: "#faq-out-of-state",
    panel: {
      headline: "Out-of-State Executors and Texas Probate",
      sections: [
        {
          heading: "Texas Probate Applies Regardless of Where the Executor Lives",
          body: "When a Texas resident passes away with a will naming an out-of-state executor, the probate proceeding still takes place in Texas — in the county where the decedent resided. The executor must file the probate application in the appropriate Texas probate court and attend the initial court hearing, which can often be managed through a local attorney without requiring repeated trips to Houston.\n\nThe Texas Estates Code requires non-resident executors to appoint a registered agent in Texas for service of process. This is a routine part of the proceeding and does not typically create significant complications.",
        },
        {
          heading: "Practical Considerations for Non-Resident Executors",
          body: "Managing an estate from out of state adds logistical complexity, particularly when the estate includes real property, financial accounts at Texas institutions, or assets that require in-person attention. An experienced probate attorney in Houston can handle the court filings, correspond with institutions, obtain and distribute certified copies of Letters Testamentary, and manage the process on the executor's behalf.\n\nIn most straightforward cases, an out-of-state executor does not need to appear in Texas more than once — if at all — when properly represented.",
        },
        {
          heading: "Complying With Texas Law",
          body: "Regardless of where the executor lives, the estate is subject to Texas probate law, Texas deadlines, and Texas court requirements. This includes the four-year filing deadline for wills, creditor notice requirements, and inventory filing obligations.\n\nOut-of-state executors sometimes assume that distance excuses delay — but Texas courts apply the same standards regardless. Engaging a local attorney early helps ensure the administration stays on track and complies with all applicable requirements.",
          closing: "Contact Troy M. Moore, PLLC to discuss how the firm can assist out-of-state executors with Texas probate administration.",
        },
      ],
    },
  },
  {
    label: "CONTESTED",
    title: "Can a Will Be Contested in Texas Probate?",
    description:
      "The legal grounds for contesting a will in Texas, who has standing to bring a challenge, and what happens when a will is disputed in probate court.",
    href: "#faq-contested",
    panel: {
      headline: "Contesting a Will in Texas — Grounds, Standing, and Process",
      sections: [
        {
          heading: "Grounds for Contesting a Will",
          body: "A will can be contested in Texas probate court on several recognized legal grounds:\n\nLack of testamentary capacity — the testator did not have the mental capacity required under Texas law at the time the will was signed. Undue influence — another person improperly influenced or controlled the testator's decisions about the will. Fraud or forgery — the will or the testator's signature was falsified or obtained through misrepresentation. Improper execution — the will was not signed or witnessed in compliance with Texas formalities.\n\nEach of these grounds requires evidence and legal argument. Not every family disagreement over inheritance rises to the level of a legally recognized contest.",
        },
        {
          heading: "Who Can Contest and the Two-Year Window",
          body: "Only interested parties — those who would benefit if the contested will were set aside — have legal standing to bring a will contest in Texas. This typically includes heirs who would inherit under a prior will or under intestacy law.\n\nTexas law generally requires that a will contest be filed within two years of the date the will was admitted to probate. This deadline is strictly enforced. Waiting — even to gather more information — can result in losing the right to contest entirely.",
        },
        {
          heading: "What a Will Contest Involves",
          body: "A will contest is a lawsuit filed in the probate court challenging the validity of the admitted will. It can result in the will being set aside in whole or in part, with the estate then passing under an earlier valid will or under Texas intestacy law.\n\nContested probate matters are significantly more complex and time-consuming than uncontested proceedings. Families considering a contest — or facing one — should seek legal guidance promptly.",
          closing: "Contact Troy M. Moore, PLLC to discuss whether grounds exist to contest a will or to respond to a challenge that has been filed.",
        },
      ],
    },
  },
  {
    label: "CONSULTATION",
    title: "What Do I Need to Bring to a Probate Consultation?",
    description:
      "The documents and information that help your probate attorney evaluate the estate quickly and recommend the right legal path — before time and expense increase.",
    href: "#faq-consultation",
    panel: {
      headline: "Preparing for a Probate Consultation",
      sections: [
        {
          heading: "Key Documents to Gather",
          body: "Bringing the right documents to a first consultation allows your attorney to assess the estate accurately and identify the appropriate probate procedure without delay. The most useful documents to gather include:",
          list: [
            "The original Last Will and Testament (if one exists) and any codicils",
            "Any trust agreements in which the deceased was a settlor or beneficiary",
            "The death certificate (a copy is sufficient for the consultation)",
            "Bank and financial account statements for accounts not held jointly",
            "Life insurance policy documents or letters from the insurance company",
            "Real estate deeds for property owned by the decedent",
            "Transfer on Death deed or beneficiary designation documents",
            "Business documents if the deceased owned an interest in a company",
            "Retirement account statements (IRA, 401(k), pension documents)",
          ],
          closing: "Not having all of these documents is not a reason to delay the consultation. A general picture of the estate's assets and family structure is often enough to identify the right next step.",
        },
        {
          heading: "Questions Worth Thinking Through in Advance",
          body: "In addition to documents, it helps to have a general sense of the estate's composition — whether it includes real property, how many heirs or beneficiaries are named, whether there are any known creditor obligations, and whether any family members are likely to dispute the estate. This context helps your attorney give more precise guidance on which procedure applies and what the process will realistically involve.",
          closing: "Contact Troy M. Moore, PLLC to schedule a probate consultation. The firm can evaluate your situation and provide a clear picture of the options and next steps.",
        },
      ],
    },
  },
];

/* ─── FAQ Section (StayingInformed-style rows) ───────────────────── */
function FaqSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
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
      {FAQ_ITEMS.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{ width: "100%", padding: "clamp(1.25rem, 3vw, 3rem) 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", opacity: 0 }}
            onClick={() => onOpen(item)}
          >
            <span className="eyebrow font-semibold" style={{ color: "var(--gold)", marginBottom: "0.5rem" }}>{item.label}</span>
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3 className="transition-colors duration-300 group-hover:text-[var(--gold)]" style={{ color: "var(--navy)", marginBottom: "0.3vw" }}>{item.title}</h3>
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

/* ─── Will Options Section (StayingInformed-style rows) ─────────── */
function WillOptionsSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".info-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
      const dividers = section.querySelectorAll(".divider-line");
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
    }, sectionRef);

    // Proximity scale — identical to StayingInformed
    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => {
      rowEls.forEach((row) =>
        gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
      );
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {WILL_OPTIONS.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{
              width: "100%",
              padding: "clamp(1.25rem, 3vw, 3rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0,
            }}
            onClick={() => onOpen(item)}
          >
            {/* Left label */}
            <span
              className="eyebrow font-semibold"
              style={{
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              {item.label}
            </span>
            {/* Title + Description */}
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3
                className="transition-colors duration-300 group-hover:text-[var(--gold)]"
                style={{ color: "var(--navy)", marginBottom: "0.3vw" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>
                {item.description}
              </p>
            </div>
            {/* Circle CTA — identical SVG to StayingInformed */}
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path
                  className="CircleIcon_circle__vewPw"
                  d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0"
                />
                <path
                  className="CircleIcon_circle-overlay__lg7sz"
                  d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5"
                />
                <path
                  className="CircleIcon_icon__n80xg"
                  d="M12.5 11L16 14.5L12.5 18"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── No-Will Options Section (StayingInformed-style rows) ──────── */
function NoWillOptionsSection({ onOpen }: { onOpen: (item: PanelItem) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".info-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
      const dividers = section.querySelectorAll(".divider-line");
      gsap.fromTo(
        dividers,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
    }, sectionRef);

    const rowEls = Array.from(section.querySelectorAll<HTMLElement>(".info-row"));
    const onMove = (e: MouseEvent) => {
      rowEls.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(e.clientY - centerY);
        const proximity = Math.max(0, 1 - dist / 220);
        const scale = 1 + Math.pow(proximity, 2) * 0.08;
        gsap.to(row, { scale, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    };
    const onLeave = () => {
      rowEls.forEach((row) =>
        gsap.to(row, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" })
      );
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
      {NO_WILL_OPTIONS.map((item, i) => (
        <div key={i}>
          <div className="divider-line" />
          <button
            className="info-row group flex flex-col md:flex-row md:items-center transition-[padding,color] duration-300 hover:pl-3"
            style={{
              width: "100%",
              padding: "clamp(1.25rem, 3vw, 3rem) 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0,
            }}
            onClick={() => onOpen(item)}
          >
            <span
              className="eyebrow font-semibold"
              style={{
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              {item.label}
            </span>
            <div className="min-w-0" style={{ flex: 9 }}>
              <h3
                className="transition-colors duration-300 group-hover:text-[var(--gold)]"
                style={{ color: "var(--navy)", marginBottom: "0.3vw" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed md:w-[90%]" style={{ color: "#8899a8" }}>
                {item.description}
              </p>
            </div>
            <span className="cta-circle hidden md:flex" style={{ marginLeft: "auto" }}>
              <svg width="58" height="58" viewBox="0 0 29 29" fill="none">
                <path
                  className="CircleIcon_circle__vewPw"
                  d="M0.75 14.5a13.75 13.75 0 1 0 27.5 0a13.75 13.75 0 1 0 -27.5 0"
                />
                <path
                  className="CircleIcon_circle-overlay__lg7sz"
                  d="M0.75,14.5A13.75,13.75 0 1 1 28.25,14.5A13.75,13.75 0 1 1 0.75,14.5"
                />
                <path
                  className="CircleIcon_icon__n80xg"
                  d="M12.5 11L16 14.5L12.5 18"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      ))}
      <div className="divider-line" />
    </div>
  );
}

/* ─── Shared animated circle SVG — matches FeaturedArticle ──────── */
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

/* ─── Small reusable button components ──────────────────────────── */
function PrimaryBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

function GhostBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta-ghost" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

function NavyBtn({ label, href }: { label: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {label}
      <CircleSVG />
    </a>
  );
}

/* ─── Hero form ─────────────────────────────────────────────────── */
const HELP_OPTIONS = [
  "Probate of a Will",
  "Muniment of Title",
  "Heirship Proceeding — No Will",
  "Estate Administration — No Will",
  "Affidavit of Heirship",
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
    // TODO: wire to form submission API
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
      className="probate-hero-form"
      style={{ background: "#fff", borderRadius: "8px", padding: "clamp(1.5rem, 2.2vw, 2.5rem)", boxShadow: "0 24px 60px rgba(0,0,0,0.28)", opacity: 0 }}
    >
      {/* Card header */}
      <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.3rem" }}>Free Case Review</p>
      <h3 style={{ color: "var(--navy)", marginBottom: "0.3rem", lineHeight: 1.25 }}>Tell Us About Your Situation</h3>
      <p style={{ color: "#7a8a9a", fontSize: "clamp(0.74rem, 0.78vw, 0.84rem)", marginBottom: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.55 }}>
        Confidential &middot; No Obligation &middot; Response within 24 hours
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 0.8vw, 0.9rem)" }}>
        <input
          required type="text" placeholder="Full Name *"
          className="hero-form-input"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required type="tel" placeholder="Phone Number *"
          className="hero-form-input"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          required type="email" placeholder="Email Address *"
          className="hero-form-input"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* I need help with */}
        <div>
          <p style={{ fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.58rem, 0.65vw, 0.7rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--navy)", opacity: 0.75, marginBottom: "0.5rem" }}>
            I need help with:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.38rem" }}>
            {HELP_OPTIONS.map((opt) => (
              <label key={opt} className="hero-form-checkbox-label">
                <input
                  type="checkbox"
                  className="hero-form-checkbox"
                  checked={helpWith.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                <span style={{ color: "var(--navy)", fontSize: "clamp(0.78rem, 0.82vw, 0.88rem)", lineHeight: 1.45 }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          className="hero-form-input"
          placeholder="Anything else we should know? (optional)"
          rows={3}
          style={{ resize: "none" }}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          type="submit"
          disabled={submitting}
          className="btn-cta"
          style={{ justifyContent: "space-between", width: "100%", marginTop: "0.2rem", opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Sending…" : "Request My Free Case Review"}
          {!submitting && <CircleSVG />}
        </button>

        <p style={{ color: "#a0adb8", fontSize: "clamp(0.6rem, 0.62vw, 0.66rem)", lineHeight: 1.65, textAlign: "center", margin: 0 }}>
          Confidential. No attorney-client relationship is created by submitting this form.
          By providing your phone number you consent to receive SMS updates from our office.
        </p>
      </form>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ProbatePage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { x: "100%" });
  }, []);

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
        /* ── Info-row eyebrow — reduced size, fixed column ── */
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

        /* ── Info-row (StayingInformed) styles — reused here ── */
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
        .info-row:hover .cta-circle svg .CircleIcon_circle-overlay__lg7sz {
          stroke-dashoffset: 0;
        }
        .info-row .cta-circle svg .CircleIcon_icon__n80xg {
          stroke: currentColor; fill: none;
          transition: stroke 0.6s ease;
        }

        /* ── Grid layouts ── */
        .probate-decision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1rem, 2vw, 2rem);
        }
        .probate-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 2rem);
        }
        .probate-cred-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        .probate-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 1.5vw, 1.5rem);
        }
        .probate-why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: start;
        }
        .probate-fees-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: center;
        }
        .probate-mobile-cta { display: none; }

        @media (max-width: 1023px) {
          .probate-decision-grid { grid-template-columns: 1fr; }
          .probate-trust-grid { grid-template-columns: 1fr 1fr; }
          .probate-cred-grid { grid-template-columns: 1fr 1fr; }
          .probate-options-grid { grid-template-columns: 1fr 1fr; }
          .probate-why-grid { grid-template-columns: 1fr; }
          .probate-fees-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .probate-trust-grid { grid-template-columns: 1fr; }
          .probate-cred-grid { grid-template-columns: 1fr; }
          .probate-options-grid { grid-template-columns: 1fr; }
          .probate-mobile-cta { display: flex; }
        }
        .probate-decision-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .probate-decision-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(11,55,93,0.14);
        }

        /* ── Hero two-column layout ── */
        .probate-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: start;
          padding-left: 10vw;
          padding-right: 10vw;
          padding-bottom: clamp(3rem, 4vw, 4.5rem);
        }
        @media (max-width: 960px) {
          .probate-hero-grid { grid-template-columns: 1fr; padding-right: 10vw; }
          .probate-hero-form { order: -1; }
        }

        /* ── Hero form card inputs ── */
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
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          cursor: pointer;
          user-select: none;
        }
        .hero-form-checkbox {
          -webkit-appearance: none;
          appearance: none;
          width: 1em;
          height: 1em;
          border: 1.5px solid #c8d0d8;
          border-radius: 3px;
          background: #fff;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 0.18em;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
        }
        .hero-form-checkbox:checked {
          background: var(--navy);
          border-color: var(--navy);
        }
        .hero-form-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 2px;
          top: -1px;
          width: 5px;
          height: 9px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
      `}</style>

      {/* ── Main content — slides left when panel opens ─────────── */}
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
              backgroundColor: "var(--navy)",
              paddingTop: "calc(72px + clamp(3rem, 5vw, 6rem))",
              paddingBottom: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.07)", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", top: "5%", right: "-5%", width: "42vw", height: "42vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.05)", pointerEvents: "none" }} />

            <div className="probate-hero-grid">
              {/* Left: copy */}
              <div>
                <ScrollReveal>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.75rem, 1.2vw, 1.2rem)" }}>
                    Houston Probate Attorney
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.08}>
                  <h1 style={{ color: "#ffffff", marginBottom: "clamp(1.2rem, 2vw, 2rem)" }}>
                    Clear Direction for Families Navigating Probate in Houston
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.16}>
                  <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: "clamp(0.9rem, 1.5vw, 1.5rem)", lineHeight: 1.85 }}>
                    When a family member passes away, the legal questions that follow can arrive all at once.
                    Troy&nbsp;M.&nbsp;Moore,&nbsp;PLLC helps families move through the Texas probate process
                    with clarity, efficiency, and steady legal guidance — whether there is a valid will or no
                    will at all.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "clamp(0.9rem, 1.5vw, 1.5rem)", lineHeight: 1.85 }}>
                    Probate timelines in Texas can range from a few months to well over a year depending on
                    the estate's complexity, the presence of a will, and whether disputes arise among heirs.
                    Having an experienced attorney from the start helps avoid costly delays, missed deadlines,
                    and procedural errors that can complicate an already difficult time.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.42)", marginBottom: "clamp(1.8rem, 3vw, 3rem)", lineHeight: 1.85 }}>
                    As a Houston probate attorney serving Harris County, Fort Bend County, Montgomery County,
                    and surrounding areas, Troy&nbsp;M.&nbsp;Moore has guided families through both simple and
                    contested estates since 1999. From filing the initial application to closing the estate,
                    the firm handles every stage of the Texas probate process — so families can focus on what
                    matters most.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.22}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.2vw, 1rem)" }}>
                    <GhostBtn label="Start Here" href="#start-here" />
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: form */}
              <HeroForm />
            </div>

            {/* Trust strip */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "clamp(1.5rem, 2.5vw, 2.5rem)", paddingBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
              <div style={WRAP}>
                <div className="probate-trust-grid">
                  {[
                    { label: "24+ Years of Experience", sub: "Houston-area probate representation" },
                    { label: "Will & No-Will Guidance", sub: "All probate paths under one roof" },
                    { label: "Harris County & Beyond", sub: "Spring, Tomball, Cypress, The Woodlands" },
                    { label: "Flat-Fee Where Appropriate", sub: "Straightforward pricing when possible" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ color: "var(--gold)", fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3em" }}>
                        {item.label}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "clamp(0.75rem, 0.75vw, 0.82rem)" }}>
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. CREDIBILITY BAR ───────────────────────────────── */}
          <section style={{ backgroundColor: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal stagger={0.1}>
                <div className="probate-cred-grid">
                  {[
                    { icon: "⚖", heading: "Probate Guidance For Every Situation", body: "Whether a will exists or not, the firm identifies the right legal path and moves the estate forward." },
                    { icon: "📋", heading: "Texas Probate Court Experience", body: "Deep familiarity with Texas probate procedures, timelines, and court requirements in Harris County and surrounding areas." },
                    { icon: "→", heading: "Practical, Direct Communication", body: "Complex legal options explained clearly — no jargon, no unnecessary delay, no confusion about next steps." },
                    { icon: "◎", heading: "Serving Houston and Surrounding Communities", body: "Houston, Spring, Tomball, Cypress, The Woodlands, and neighboring communities throughout the region." },
                  ].map((c) => (
                    <div key={c.heading} style={{ padding: "clamp(1.5rem, 2.5vw, 2.5rem)", border: "1px solid #ebebeb", borderRadius: "4px" }}>
                      <p style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", marginBottom: "0.75rem", color: "var(--gold)" }}>{c.icon}</p>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", lineHeight: 1.3, color: "var(--navy)", marginBottom: "0.6em" }}>
                        {c.heading}
                      </p>
                      <p style={{ color: "#5a6a7a", margin: 0 }}>{c.body}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", textAlign: "center" }}>
                  <a href="tel:2816090303" style={{ fontFamily: "var(--font-eyebrow)", fontSize: "clamp(0.65rem, 0.85vw, 0.82rem)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--navy)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: "2px" }}>
                    Talk With Our Office — (281) 609-0303
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 3. START HERE — DECISION SPLIT ──────────────────── */}
          <section id="start-here" style={{ backgroundColor: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Start Here</p>
                <h2 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)", maxWidth: "905px" }}>
                  Whether There Is a Will or Not, the Right Probate Path Starts with a Clear Legal Strategy
                </h2>
                <p style={{ color: "#5a6a7a", maxWidth: "800px", marginBottom: "clamp(2rem, 3.5vw, 3.5rem)" }}>
                  The first question in most probate matters is straightforward: did the decedent leave a
                  valid Last Will and Testament, or not? That answer often shapes the legal process, the
                  court filings required, and the authority needed to handle the estate.
                </p>
              </ScrollReveal>

              <ScrollReveal stagger={0.12}>
                <div className="probate-decision-grid">
                  <div className="probate-decision-card" style={{ background: "var(--navy)", padding: "clamp(2rem, 3.5vw, 3.5rem)", borderRadius: "4px" }}>
                    <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>There Is a Will</p>
                    <h3 style={{ color: "#ffffff", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                      Probate With a Valid Last Will and Testament
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                      When a valid will exists, the court can appoint an executor and grant Letters
                      Testamentary. In some cases, a Muniment of Title may provide a more streamlined path.
                      The right option depends on the estate and the authority needed to act.
                    </p>
                    <GhostBtn label="Explore Probate With a Will" href="#with-a-will" />
                  </div>
                  <div className="probate-decision-card" style={{ background: "#ffffff", padding: "clamp(2rem, 3.5vw, 3.5rem)", borderRadius: "4px", border: "1px solid #e8e8e8" }}>
                    <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>There Is No Will</p>
                    <h3 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                      Intestate Probate — When Someone Dies Without a Will
                    </h3>
                    <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                      When there is no will, Texas law provides several possible procedures — including a
                      judicial determination of heirship, administration, or a small estate affidavit. The
                      correct option depends on the family structure, the property involved, and whether the
                      estate needs a personal representative.
                    </p>
                    <NavyBtn label="Explore Probate Without a Will" href="#without-a-will" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", padding: "clamp(1.2rem, 2vw, 2rem) clamp(1.5rem, 2.5vw, 2.5rem)", background: "rgba(11,55,93,0.04)", borderLeft: "3px solid var(--gold)", borderRadius: "0 4px 4px 0" }}>
                  <p style={{ margin: 0, color: "var(--navy)" }}>
                    <strong>Not sure which path applies?</strong> The right legal process depends on the
                    will, the assets, the heirs, and the circumstances. An early consultation can identify
                    the correct option before time and expense increase unnecessarily.{" "}
                    <a href="#consult" style={{ color: "var(--navy)", textDecoration: "none", borderBottom: "1px solid var(--gold)" }}>
                      Get Help Determining the Right Probate Option →
                    </a>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 4. PROBATE WITH A WILL (StayingInformed-style) ───── */}
          <section id="with-a-will" style={{ backgroundColor: "#f9f9f9", paddingTop: "5vw", paddingBottom: "5vw" }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "3vw" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
                    If There Is a Will
                  </p>
                  <h2>Probate Paths With a Will</h2>
                </div>
              </ScrollReveal>

              {/* StayingInformed-style rows */}
              <WillOptionsSection onOpen={openPanel} />

              {/* CTA nudge */}
              <ScrollReveal delay={0.15}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "clamp(1.5rem, 2.5vw, 2.5rem)", background: "#ffffff", border: "1px solid #e8e8e8", borderRadius: "4px" }}>
                  <p style={{ color: "var(--navy)", margin: 0, maxWidth: "480px" }}>
                    <strong>Have a will but not sure which probate option applies?</strong> The distinction
                    between a full administration and a muniment of title can affect authority, title, and
                    cost. Get the right answer early.
                  </p>
                  <PrimaryBtn label="Request a Consultation" href="#consult" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 5. PROBATE WITHOUT A WILL ────────────────────────── */}
          <section id="without-a-will" style={{ backgroundColor: "#f9f9f9", paddingTop: "5vw", paddingBottom: "5vw" }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "3vw" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "0.5vw" }}>
                    If There Is No Will
                  </p>
                  <h2>Intestate Estates — Texas Probate Procedures When There Is No Will</h2>
                </div>
              </ScrollReveal>

              {/* StayingInformed-style rows */}
              <NoWillOptionsSection onOpen={openPanel} />

              {/* CTA nudge */}
              <ScrollReveal delay={0.15}>
                <div style={{ marginTop: "clamp(2rem, 3vw, 3rem)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "clamp(1.5rem, 2.5vw, 2.5rem)", background: "#ffffff", border: "1px solid #e8e8e8", borderRadius: "4px" }}>
                  <p style={{ color: "var(--navy)", margin: 0, maxWidth: "480px" }}>
                    <strong>No will — not sure which Texas probate process applies?</strong> The right
                    procedure depends on the heirs, the property, and what the estate requires.
                  </p>
                  <PrimaryBtn label="Find Out Which Option May Apply" href="#consult" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ── 6. KEY PROBATE OPTIONS IN TEXAS ─────────────────── */}
          <section style={{ backgroundColor: "var(--navy)", ...PAD, position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "50vw", height: "50vw", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.06)", pointerEvents: "none" }} />
            <div style={WRAP}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Texas Probate Process</p>
                <h2 style={{ color: "#ffffff", maxWidth: "640px", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }}>
                  Key Probate Options in Texas
                </h2>
                <p style={{ color: "rgba(255,255,255,0.68)", maxWidth: "600px", marginBottom: "clamp(2rem, 3vw, 3rem)" }}>
                  Not every estate should be handled the same way. One of the most valuable parts of working
                  with an experienced Houston probate attorney is understanding which process is likely to be
                  the most effective, practical, and cost-conscious for the estate at hand.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="probate-options-grid" style={{ marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
                  {[
                    { title: "Probate of a Will", body: "Traditional probate with executor appointment and administration authority. The standard path when a valid will exists and ongoing authority is needed." },
                    { title: "Muniment of Title", body: "A streamlined alternative to establish title without full administration. Available in specific circumstances when no unpaid debts exist." },
                    { title: "Heirship Proceeding", body: "A judicial determination of who inherits when no will exists. Clarifies ownership rights and establishes the legal basis for transferring property." },
                    { title: "Heirship With Administration", body: "Combines heirship determination with court appointment of an administrator — used when the estate also requires active management authority." },
                    { title: "Small Estate Affidavit", body: "A limited procedure for qualifying intestate estates under Texas thresholds. Not appropriate for every situation, with important eligibility restrictions." },
                    { title: "Alternatives to Probate", body: "Depending on the assets and circumstances, non-probate solutions may be available. A legal review helps determine whether simpler options are appropriate." },
                  ].map((opt) => (
                    <div key={opt.title} style={{ padding: "clamp(1.2rem, 2vw, 2rem)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ width: "2px", height: "clamp(1.5rem, 2vw, 2rem)", background: "var(--gold)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)" }} />
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", color: "#ffffff", marginBottom: "0.5em", lineHeight: 1.3 }}>
                        {opt.title}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.58)", margin: 0 }}>{opt.body}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "580px", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                  The right question is not just what can be filed. It is what legal process best
                  accomplishes the family&rsquo;s goals while protecting the estate and minimizing
                  avoidable complications.
                </p>
                <GhostBtn label="Speak With a Houston Probate Attorney" href="#consult" />
              </ScrollReveal>
            </div>
          </section>

          {/* ── 7. WHY TROY M. MOORE, PLLC ───────────────────────── */}
          <section style={{ backgroundColor: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <div className="probate-why-grid">
                <ScrollReveal>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Why Clients Choose Us</p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(1rem, 1.8vw, 1.8rem)", maxWidth: "520px" }}>
                    Clarity, Experience, and a Practical Path Forward
                  </h2>
                  <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)", maxWidth: "500px" }}>
                    Families searching for a probate attorney in Houston often need more than a filing
                    service. They need clear answers, practical direction, and confidence that the matter is
                    being handled correctly — especially during a difficult time.
                  </p>
                  <PrimaryBtn label="Schedule a Consultation" href="#consult" />
                </ScrollReveal>
                <ScrollReveal delay={0.12}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 1.8vw, 1.8rem)" }}>
                    {[
                      { label: "Clear guidance through the Texas probate process", body: "Every client receives a direct explanation of what their estate requires, what options are available, and what to expect at each step." },
                      { label: "Will-based and no-will probate under one roof", body: "From probate of a will in Texas to judicial determination of heirship, the firm handles the full range of Texas probate procedures." },
                      { label: "Efficient handling where possible", body: "Unnecessary delay costs families time and money. Straightforward matters are handled efficiently without manufacturing complexity." },
                      { label: "Service across Houston and surrounding areas", body: "Representing clients in Houston, Harris County, Spring, Tomball, Cypress, The Woodlands, and neighboring communities." },
                      { label: "Experienced, prepared, and direct", body: "With 24+ years of Texas probate experience and more than 1,700 complex cases handled, the approach is grounded in real-world outcomes." },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", gap: "clamp(1rem, 1.5vw, 1.5rem)", alignItems: "flex-start" }}>
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "clamp(1.4rem, 1.8vw, 1.8rem)", height: "clamp(1.4rem, 1.8vw, 1.8rem)", borderRadius: "50%", background: "rgba(195,160,91,0.15)", flexShrink: 0, marginTop: "0.2em" }}>
                          <span style={{ display: "block", width: "0.4em", height: "0.4em", borderRadius: "50%", background: "var(--gold)" }} />
                        </span>
                        <div>
                          <p style={{ color: "var(--navy)", fontWeight: 600, marginBottom: "0.2em", lineHeight: 1.4 }}>{item.label}</p>
                          <p style={{ color: "#5a6a7a", margin: 0 }}>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── 8. FEES / PRICING CLARITY ────────────────────────── */}
          <section style={{ backgroundColor: "var(--light-gray)", ...PAD }}>
            <div style={WRAP}>
              <div className="probate-fees-grid">
                <ScrollReveal>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Fees &amp; Pricing</p>
                  <h2 style={{ color: "var(--navy)", marginBottom: "clamp(0.8rem, 1.2vw, 1.2rem)", maxWidth: "480px" }}>
                    Straightforward Answers on What Probate Will Cost
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p style={{ color: "#5a6a7a", marginBottom: "1em" }}>
                    One of the most common questions families ask is what probate will cost. That is a
                    reasonable question, and it deserves a direct answer.
                  </p>
                  <p style={{ color: "#5a6a7a", marginBottom: "1em" }}>
                    Some probate matters can be handled through a straightforward flat-fee structure, while
                    others may involve variables that affect the overall scope of work. The nature of the
                    estate, the number of heirs or beneficiaries, land in multiple counties, and difficulty
                    serving interested parties can all affect complexity.
                  </p>
                  <p style={{ color: "#5a6a7a", marginBottom: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
                    An early consultation helps identify not only the proper probate path, but also whether
                    the matter is likely to remain simple or require additional work — giving families
                    informed expectations before time and expense increase unnecessarily.
                  </p>
                  <PrimaryBtn label="Ask About Probate Fees" href="#consult" />
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ── 9. FAQ ───────────────────────────────────────────── */}
          <section style={{ backgroundColor: "#ffffff", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "3vw" }}>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "0.5vw" }}>Common Questions</p>
                  <h2 style={{ color: "var(--navy)", maxWidth: "640px" }}>
                    Frequently Asked Questions About Houston Probate
                  </h2>
                </div>
              </ScrollReveal>
              <FaqSection onOpen={openPanel} />
            </div>
          </section>

          {/* ── 10. FINAL CTA ────────────────────────────────────── */}
          <section id="consult" style={{ backgroundColor: "var(--navy)", ...PAD, position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", maxWidth: "900px", maxHeight: "900px", borderRadius: "50%", border: "1px solid rgba(195,160,91,0.06)", pointerEvents: "none" }} />
            <div style={{ ...WRAP, position: "relative", zIndex: 1 }}>
              <ScrollReveal>
                <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.5rem, 0.8vw, 0.8rem)" }}>Next Steps</p>
                <h2 style={{ color: "#ffffff", maxWidth: "700px", margin: "0 auto clamp(1rem, 1.8vw, 1.8rem)" }}>
                  Ready to Understand Your Probate Options?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "580px", margin: "0 auto clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 1.85 }}>
                  If you need help understanding whether an estate should proceed through probate of a will,
                  muniment of title, heirship, administration, a small estate affidavit, or another Texas
                  probate option, Troy&nbsp;M.&nbsp;Moore,&nbsp;PLLC can help you evaluate the situation
                  and determine the right next step.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.2vw, 1rem)", justifyContent: "center" }}>
                  <a href="tel:2816090303" className="btn-cta" style={{ textDecoration: "none" }}>
                    Call (281) 609-0303
                    <span className="cta-circle" style={{ background: "rgba(255,255,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
                      </svg>
                    </span>
                  </a>
                  <GhostBtn label="Review Probate Process Summary" href="/texas-probate-process" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ marginTop: "clamp(3rem, 5vw, 5rem)", paddingTop: "clamp(2rem, 3vw, 3rem)", borderTop: "1px solid rgba(255,255,255,0.1)", maxWidth: "600px", margin: "clamp(3rem, 5vw, 5rem) auto 0" }}>
                  <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center", marginBottom: "1.2rem" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--gold)">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1rem, 1.4vw, 1.3rem)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    &ldquo;Troy and his team were great throughout our estate planning. Professional, patient,
                    and informative. If you have not already taken care of your future, I highly recommend
                    Troy Moore.&rdquo;
                  </p>
                  <p className="eyebrow" style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.6rem, 0.7vw, 0.72rem)", letterSpacing: "0.2em" }}>
                    — Tim Williams
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* ── Close button — fixed in the 15vw exposed strip ───────── */}
      {panelItem && (
        <div style={{ position: "fixed", top: "1.5rem", left: "7.5vw", transform: "translateX(-50%)", zIndex: 600, padding: 8, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
          <button
            onClick={closePanel}
            aria-label="Close panel"
            style={{ width: 54, height: 54, borderRadius: "50%", border: "none", background: "var(--navy)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", lineHeight: 1, cursor: "pointer", boxShadow: "0 4px 20px rgba(11,55,93,0.4)" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Side panel ───────────────────────────────────────────── */}
      <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />

      <FixedCTA show={!panelItem} />

      {/* ── Mobile sticky CTA bar ────────────────────────────────── */}
      <div
        className="probate-mobile-cta"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 400, background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1.25rem", gap: "0.75rem", alignItems: "center" }}
      >
        <a href="tel:2816090303" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", borderRadius: "9999px", background: "var(--gold)", color: "var(--navy)", fontFamily: "var(--font-eyebrow)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>
          Call Now
        </a>
        <a href="#start-here" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", borderRadius: "9999px", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", fontFamily: "var(--font-eyebrow)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none" }}>
          Start Here
        </a>
      </div>
    </>
  );
}
