"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SidePanel, { type PanelItem } from "@/components/SidePanel";
import PageCTA from "@/components/PageCTA";
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
      treeHighlight: "probate-will",
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
      treeHighlight: "muniment",
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
      treeHighlight: "heirship",
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
      treeHighlight: "heirship-admin",
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
      treeHighlight: "sea",
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
      treeHighlight: "aoh",
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
                style={{ color: "var(--navy)", marginBottom: "clamp(0.2rem, 0.3vw, 0.4rem)" }}
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
                style={{ color: "var(--navy)", marginBottom: "clamp(0.2rem, 0.3vw, 0.4rem)" }}
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
function PrimaryBtn({ label, mobileLabel, href }: { label: string; mobileLabel?: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {mobileLabel ? (
        <>
          <span className="btn-label-full">{label}</span>
          <span className="btn-label-short">{mobileLabel}</span>
        </>
      ) : label}
      <CircleSVG />
    </a>
  );
}

function GhostBtn({ label, mobileLabel, href }: { label: string; mobileLabel?: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta-ghost" style={{ textDecoration: "none" }}>
      {mobileLabel ? <><span className="btn-label-full">{label}</span><span className="btn-label-short">{mobileLabel}</span></> : label}
      <CircleSVG />
    </a>
  );
}

function NavyBtn({ label, mobileLabel, href }: { label: string; mobileLabel?: string; href?: string }) {
  return (
    <a href={href ?? "#consult"} className="btn-cta" style={{ textDecoration: "none" }}>
      {mobileLabel ? <><span className="btn-label-full">{label}</span><span className="btn-label-short">{mobileLabel}</span></> : label}
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
          {submitting ? "Sending…" : "Review My Case"}
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

/* ─── Credibility bar icons ─────────────────────────────────── */
const CRED_ICONS = [
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.983 511.983"><g><path d="m433.072 0-348.3.01c-11.619 0-22.341 6.791-27.314 17.293-4.93 10.38-7.535 21.953-7.535 33.467v198.48c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-198.48c0-9.302 2.104-18.65 6.088-27.04 2.508-5.297 7.91-8.72 13.761-8.72h12.502v374.54h-12.502c-7.396 0-14.43 2.751-19.85 7.46v-112.76c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v156.05c0 11.525 2.606 23.099 7.532 33.46 4.977 10.51 15.699 17.3 27.318 17.3h40.013c.307 7.739 4.664 14.724 11.547 18.375 7.141 3.789 15.734 3.325 22.427-1.208l23.048-15.61 23.048 15.61c3.682 2.494 7.938 3.756 12.213 3.756 3.495 0 7.002-.844 10.214-2.548 6.883-3.651 11.24-10.637 11.547-18.375h53.303c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-53.273v-14.999h208.204v1.009c0 7.714-6.276 13.99-13.99 13.99h-105.94c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h105.94c15.985 0 28.99-13.005 28.99-28.99v-86.52-346.56c-.001-15.985-13.006-28.99-28.991-28.99zm-320.798 15.009 320.798-.009c7.714 0 13.99 6.276 13.99 13.99v346.56c0 7.714-6.276 13.99-13.99 13.99l-320.798.009zm-41.269 452.321c-3.98-8.372-6.083-17.719-6.083-27.03 0-9.302 2.104-18.65 6.087-27.037 2.51-5.293 7.912-8.713 13.763-8.713l348.3-.01c5.071 0 9.839-1.312 13.99-3.609v18.611l-346.238.01c-11.478 0-20.854 9.236-20.9 20.62v.311c.046 11.347 9.422 20.579 20.9 20.579h23.931v14.999h-39.984c-5.851-.001-11.253-3.424-13.766-8.731zm53.75-21.269h-23.931c-3.241 0-5.887-2.53-5.9-5.61v-.249c.013-3.115 2.659-5.65 5.9-5.65l23.931-.001zm95.497 50.123c-1.085.575-3.937 1.69-6.986-.376l-27.254-18.459c-2.54-1.72-5.872-1.72-8.412 0l-27.253 18.459c-3.052 2.067-5.902.951-6.986.376s-3.606-2.311-3.606-5.995v-55.639l84.104-.002v55.641c-.001 3.685-2.523 5.42-3.607 5.995zm18.606-50.123v-11.513l208.204-.006v11.519z"></path><path d="m264.37 269.571c-.025-.069-.053-.138-.081-.206-1.433-3.48-4.787-5.726-8.549-5.726-.003 0-.007 0-.011 0-3.767.004-7.121 2.26-8.546 5.746-.023.056-.045.112-.066.169l-28.902 75.886c-1.474 3.871.468 8.204 4.339 9.678 3.869 1.474 8.204-.469 9.678-4.339l5.358-14.069h36.085l5.302 14.048c1.133 3.003 3.987 4.854 7.018 4.854.88 0 1.775-.156 2.647-.485 3.875-1.462 5.831-5.79 4.368-9.665zm-21.066 52.138 12.412-32.589 12.299 32.589z"></path><path d="m201.191 340.544c-.014 0-.029 0-.043 0-6.826.038-14.183.064-19.41.065v-69.47c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v76.906c0 3.653 2.632 6.775 6.233 7.392.541.093 1.031.177 9.405.177 4.093 0 10.07-.02 18.856-.069 4.142-.023 7.481-3.4 7.458-7.542-.023-4.129-3.377-7.459-7.499-7.459z"></path><path d="m390.002 263.924c-4.063-.808-8.011 1.83-8.819 5.892l-10.558 53.043-16.613-53.929c-1.092-3.547-4.62-5.76-8.284-5.208-3.184.479-5.647 2.915-6.245 5.974l-16.456 53.166-10.52-53.179c-.804-4.063-4.748-6.705-8.812-5.902-4.063.804-6.706 4.75-5.902 8.813l14.997 75.814c.07.357.167.709.289 1.053 1.314 3.703 4.843 6.192 8.766 6.147 3.93-.026 7.42-2.543 8.685-6.263.022-.065.044-.131.064-.197l16.256-52.52 16.184 52.533c.031.101.064.2.1.3 1.308 3.684 4.8 6.148 8.704 6.148h.062c3.93-.026 7.42-2.543 8.685-6.263.105-.311.191-.629.255-.951l15.057-75.651c.805-4.063-1.832-8.011-5.895-8.82z"></path><path d="m397.42 147.121-28.828-47.892c.284.003.565.021.849.021 5.334 0 10.356-2.076 14.165-5.869 3.769-3.786 5.845-8.808 5.845-14.141 0-11.033-8.977-20.01-20.01-20.01-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5c2.763 0 5.01 2.248 5.01 5.01 0 1.339-.524 2.603-1.452 3.536-.955.951-2.219 1.474-3.558 1.474-7.41 0-14.636-1.439-21.479-4.279-6.848-2.838-12.977-6.934-18.223-12.18-5.333-5.322-11.54-9.465-18.438-12.311-2.97-1.23-6.025-2.195-9.131-2.903v-11.377c0-12.406-10.094-22.5-22.5-22.5s-22.5 10.094-22.5 22.5v12.628c-8.638 2.746-16.481 7.506-22.943 13.968-5.241 5.241-11.371 9.337-18.218 12.175-6.851 2.839-14.081 4.279-21.489 4.279-1.333 0-2.593-.524-3.524-1.451-.952-.956-1.476-2.22-1.476-3.559s.524-2.603 1.452-3.535c.956-.951 2.215-1.475 3.548-1.475 4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5c-5.327 0-10.346 2.076-14.155 5.869-3.769 3.786-5.845 8.808-5.845 14.141s2.076 10.355 5.869 14.165c3.783 3.767 8.797 5.841 14.12 5.844l-28.023 47.898c-2.369.865-4.484 2.362-6.108 4.397-2.669 3.344-3.655 7.657-2.706 11.832 2.126 9.348 7.032 17.701 14.185 24.155 2.536 2.289 5.842 3.549 9.307 3.549h43.615c3.466 0 6.771-1.261 9.307-3.549 7.154-6.454 12.059-14.807 14.186-24.156.949-4.175-.037-8.488-2.706-11.832-1.639-2.053-3.776-3.562-6.171-4.423l-29.795-49.501c4.134-.898 8.195-2.15 12.153-3.79 8.675-3.595 16.441-8.785 23.082-15.425 3.593-3.593 7.769-6.464 12.336-8.529v133.294h-11.963c-11.404 0-20.682 9.278-20.682 20.682s9.278 20.682 20.682 20.682h68.915c11.404 0 20.682-9.278 20.682-20.682s-9.277-20.682-20.682-20.682h-11.951v-67.239c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v67.239h-15v-143.493c0-.021 0-.042 0-.063v-18.413c0-4.135 3.364-7.5 7.5-7.5s7.5 3.365 7.5 7.5v17.701.036 41.992c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-32.81c1.145.363 2.282.76 3.4 1.224 5.076 2.094 9.643 5.144 13.566 9.06 6.641 6.64 14.406 11.83 23.079 15.424 3.707 1.538 7.507 2.731 11.372 3.617l-29.078 49.703c-2.369.865-4.484 2.362-6.108 4.397-2.669 3.344-3.655 7.657-2.706 11.833 2.127 9.347 7.032 17.7 14.187 24.156 2.537 2.288 5.842 3.548 9.307 3.548h43.614c3.465 0 6.771-1.26 9.308-3.549 7.152-6.454 12.058-14.807 14.185-24.156.949-4.175-.037-8.488-2.706-11.833-1.64-2.052-3.778-3.56-6.172-4.422zm-173.038 28.961h-42.818c-4.346-4.036-7.421-9.119-8.955-14.789h60.728c-1.534 5.669-4.609 10.752-8.955 14.789zm-40.016-29.789 18.249-31.193 18.775 31.193zm135.438 77.557c0 3.133-2.549 5.682-5.682 5.682h-68.915c-3.133 0-5.682-2.549-5.682-5.682s2.549-5.682 5.682-5.682h68.915c3.133 0 5.682 2.549 5.682 5.682zm59.61-77.557h-37.025l18.249-31.193zm2.992 29.789h-42.818c-4.346-4.037-7.421-9.12-8.954-14.789h60.727c-1.535 5.67-4.61 10.753-8.955 14.789z"></path></g></svg>`,
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="m57.707 18.707c.188-.187.293-.441.293-.707v-2h1c.553 0 1-.447 1-1v-5c0-.431-.275-.812-.684-.948l-27-9c-.205-.068-.428-.068-.633 0l-27 9c-.408.136-.683.517-.683.948v5c0 .553.447 1 1 1h1v2c0 .266.105.52.293.707l.707.707v11.172l-.707.707c-.188.187-.293.441-.293.707v2h-1c-.553 0-1 .447-1 1v6c0 .553.447 1 1 1h10v3.586l-7.707 7.707c-.188.187-.293.441-.293.707v2.142c-1.721.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.279-3.411-3-3.858v-1.728l7.707-7.707c.188-.187.293-.441.293-.707v-4h6v3.586l-3.707 3.707c-.188.187-.293.441-.293.707v6.142c-1.721.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.279-3.411-3-3.858v-5.728l3.707-3.707c.188-.187.293-.441.293-.707v-4h6v14.142c-1.721.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.279-3.411-3-3.858v-14.142h6v4c0 .266.105.52.293.707l3.707 3.707v5.728c-1.721.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.279-3.411-3-3.858v-6.142c0-.266-.105-.52-.293-.707l-3.707-3.707v-3.586h6v4c0 .266.105.52.293.707l7.707 7.707v1.728c-1.721.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.279-3.411-3-3.858v-2.142c0-.266-.105-.52-.293-.707l-7.707-7.707v-3.586h10c.553 0 1-.447 1-1v-6c0-.553-.447-1-1-1h-1v-2c0-.266-.105-.52-.293-.707l-.707-.707v-11.172zm-47.707 41.293c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm12 0c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm12 0c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm12 0c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm12 0c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm-52-49.279 26-8.667 26 8.667v3.279h-52zm42.293 7.986.707.707v11.172l-.707.707c-.188.187-.293.441-.293.707v2h-4v-2c0-.266-.105-.52-.293-.707l-.707-.707v-11.172l.707-.707c.188-.187.293-.441.293-.707v-2h4v2c0 .266.105.52.293.707zm-18.293 15.293v-2c0-.266-.105-.52-.293-.707l-.707-.707v-11.172l.707-.707c.188-.187.293-.441.293-.707v-2h4v2c0 .266.105.52.293.707l.707.707v11.172l-.707.707c-.188.187-.293.441-.293.707v2zm-14 0v-2c0-.266-.105-.52-.293-.707l-.707-.707v-11.172l.707-.707c.188-.187.293-.441.293-.707v-2h4v2c0 .266.105.52.293.707l.707.707v11.172l-.707.707c-.188.187-.293.441-.293.707v2zm6-1.586.707-.707c.188-.187.293-.441.293-.707v-12c0-.266-.105-.52-.293-.707l-.707-.707v-1.586h6v1.586l-.707.707c-.188.187-.293.441-.293.707v12c0 .266.105.52.293.707l.707.707v1.586h-6zm14 0 .707-.707c.188-.187.293-.441.293-.707v-12c0-.266-.105-.52-.293-.707l-.707-.707v-1.586h6v1.586l-.707.707c-.188.187-.293.441-.293.707v12c0 .266.105.52.293.707l.707.707v1.586h-6zm-28 0 .707-.707c.188-.187.293-.441.293-.707v-12c0-.266-.105-.52-.293-.707l-.707-.707v-1.586h6v1.586l-.707.707c-.188.187-.293.441-.293.707v12c0 .266.105.52.293.707l.707.707v1.586h-6zm50 7.586h-52v-4h52zm-8-6v-1.586l.707-.707c.188-.187.293-.441.293-.707v-12c0-.266-.105-.52-.293-.707l-.707-.707v-1.586h6v1.586l-.707.707c-.188.187-.293.441-.293.707v12c0 .266.105.52.293.707l.707.707v1.586z"></path><path d="m31.684 12.948c.102.034.21.052.316.052s.214-.018.316-.052c3.48-1.16 4.607-5.521 4.653-5.706.114-.454-.104-.927-.522-1.137l-4-2c-.281-.141-.613-.141-.895 0l-4 2c-.419.21-.637.683-.522 1.137.046.186 1.173 4.546 4.654 5.706zm.316-6.83 2.778 1.389c-.388 1.004-1.253 2.734-2.778 3.421-1.526-.687-2.391-2.418-2.778-3.421z"></path></svg>`,
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><g><path d="m155 121.058h72c5.523 0 10-4.477 10-10s-4.477-10-10-10h-72c-5.523 0-10 4.477-10 10s4.477 10 10 10z"></path><path d="m155 201.058h186c5.522 0 10-4.477 10-10s-4.478-10-10-10h-186c-5.523 0-10 4.477-10 10s4.477 10 10 10z"></path><path d="m155 161.058h186c5.522 0 10-4.477 10-10s-4.478-10-10-10h-186c-5.523 0-10 4.477-10 10s4.477 10 10 10z"></path><path d="m511.3 470.922-.151-242.878c-.007-11.536-5.044-22.549-13.675-30.093l-69.774-60.988v-45.905c0-22.056-17.944-40-40-40h-80.04l-39.003-46.432c-3.96-4.71-11.178-4.71-15.164-.174l-41.014 46.606h-88.179c-22.056 0-40 17.944-40 40v48.393l-68.568 54.786c-9.553 7.633-15.032 19.023-15.032 31.251v245.44c0 22.126 18.052 40 40 40h430.6c22.08 0 40-18.001 40-40.006zm-183.973-83.373 163.825-154.445c.031 253.653.431 237.724-.156 241.18zm-66.504-361.153 20.716 24.662h-42.419zm-156.523 64.662c0-11.028 8.972-20 20-20h263.4c11.028 0 20 8.972 20 20v119.6c0 11.028-8.972 20-20 20h-177.9c-1.977 0-3.909.586-5.553 1.684l-39.275 26.227 3.733-15.58c1.508-6.291-3.271-12.33-9.725-12.33h-34.68c-11.028 0-20-8.972-20-20zm-20 73.994v45.607c0 22.056 17.944 40 40 40h22.001l-6.726 28.07c-.959 4.001.631 8.182 4.007 10.535 3.414 2.378 7.886 2.371 11.27.112l57.979-38.716h174.869c22.056 0 40-17.944 40-40v-47.132l56.092 49.029-180.521 170.184c-.003.003-.007.006-.01.01l-47.276 44.569-47.307-44.529c-.019-.019-.038-.035-.057-.054l-182.074-171.381c1.505-1.503-1.125.796 57.753-46.304zm-63.295 309.231c-.584-3.438-.179 12.107-.304-240.964l163.891 154.266zm19.695 16.645c-2.235 0-4.377-.385-6.386-1.064l165.662-87.798 49.16 46.273c3.854 3.628 9.865 3.623 13.713-.005l49.107-46.296 165.728 87.826c-2.008.679-4.151 1.064-6.385 1.064z"></path></g></g><g></g></svg>`,
  `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><g><path d="m247.633 75.209h105.937c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-105.937c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5z"></path><path d="m247.633 108.05h105.937c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-105.937c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5z"></path><path d="m178.999 133.495c1.752 0 3.504-.451 5.067-1.353l9.994-5.771c16.925-9.771 27.439-27.982 27.439-47.526v-11.54c0-3.606-1.94-6.969-5.066-8.775l-32.37-18.689c-3.124-1.802-7.004-1.801-10.13.002l-32.37 18.689c-3.123 1.805-5.063 5.167-5.063 8.773v11.54c0 19.544 10.515 37.756 27.44 47.527l9.996 5.771c1.562.902 3.312 1.352 5.063 1.352zm27.501-54.649c0 14.202-7.641 27.436-19.939 34.536l-.061.035v-54.849l20 11.547zm-55 0v-8.73l20-11.547v54.849l-.06-.034c-12.299-7.103-19.94-20.336-19.94-34.538z"></path><path d="m460.731 355.382c4.143 0 7.5-3.357 7.5-7.5v-265.513c0-5.263-2.049-10.21-5.77-13.932l-62.666-62.665c-3.721-3.722-8.669-5.772-13.933-5.772h-269.568c-10.864 0-19.702 8.838-19.702 19.702v33.121h-33.121c-10.864 0-19.702 8.838-19.702 19.702v64.67c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-64.67c0-2.593 2.109-4.702 4.702-4.702h33.121v371.651c0 10.864 8.838 19.702 19.702 19.702h284.114v33.121c0 2.593-2.109 4.702-4.702 4.702h-332.235c-2.593 0-4.702-2.109-4.702-4.702v-320.102c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v320.103c0 10.864 8.838 19.702 19.702 19.702h332.235c10.864 0 19.702-8.838 19.702-19.702v-33.121h33.121c10.864 0 19.702-8.838 19.702-19.702v-56.593c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v56.593c0 2.593-2.109 4.702-4.702 4.702h-332.235c-2.593 0-4.702-2.109-4.702-4.702v-419.773c0-2.593 2.109-4.702 4.702-4.702h267.123v50.113c0 10.864 8.838 19.702 19.701 19.702h50.113v263.066c0 4.143 3.358 7.501 7.5 7.501zm-62.314-290.269v-39.505l44.208 44.207h-39.507c-2.592 0-4.701-2.109-4.701-4.702z"></path><path d="m282.062 364.096c48.09 0 87.214-39.124 87.214-87.214s-39.124-87.214-87.214-87.214-87.214 39.124-87.214 87.214 39.125 87.214 87.214 87.214zm0-15c-10.751 0-20.952-2.379-30.129-6.611l95.732-95.732c4.232 9.177 6.611 19.378 6.611 30.129 0 39.819-32.394 72.214-72.214 72.214zm57.669-115.624-101.078 101.078c-5.39-4.067-10.193-8.87-14.26-14.26l101.077-101.077c5.39 4.067 10.194 8.87 14.261 14.259zm-57.669-28.804c10.751 0 20.951 2.379 30.128 6.61l-95.732 95.732c-4.231-9.177-6.61-19.377-6.61-30.128.001-39.82 32.395-72.214 72.214-72.214z"></path><path d="m282.062 399.264c67.481 0 122.382-54.9 122.382-122.382s-54.9-122.382-122.382-122.382c-25.286 0-49.563 7.654-70.206 22.136-3.391 2.379-4.211 7.056-1.832 10.447 2.378 3.39 7.056 4.21 10.447 1.832 18.105-12.701 39.403-19.415 61.591-19.415 59.211 0 107.382 48.171 107.382 107.382s-48.171 107.382-107.382 107.382-107.382-48.171-107.382-107.382c0-23.852 7.661-46.438 22.154-65.32 2.522-3.285 1.903-7.993-1.383-10.516-3.284-2.523-7.994-1.902-10.516 1.383-16.522 21.524-25.256 47.271-25.256 74.453.002 67.481 54.902 122.382 122.383 122.382z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`,
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ProbatePage() {
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // After portal mounts, push panel offscreen
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
        gsap.set(contentRef.current, { clearProps: "all" });
        window.dispatchEvent(new Event("panel-closed"));
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
          .probate-hero-start { display: none; }
          .probate-cred-icon { width: 64px !important; height: 64px !important; }
          .probate-cta-row { flex-direction: column; align-items: flex-start !important; }
          .probate-cta-row a:last-child { margin-top: 0.5rem; }
          /* Tighter horizontal padding for hero copy on small screens */
          .probate-hero-grid {
            padding-left: 6vw;
            padding-right: 6vw;
          }
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
          .probate-hero-form { display: none; }
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

      {/* Navbar lives outside contentRef so GSAP slide doesn't affect position:fixed */}
      <Navbar />

      {/* ── Main content — slides left when panel opens ─────────── */}
      <div
        ref={contentRef}
        style={{ cursor: panelItem ? "pointer" : "auto" }}
        onClick={panelItem ? closePanel : undefined}
      >

        <main>
          {/* ── 1. HERO ──────────────────────────────────────────── */}
          <section
            style={{
              backgroundImage: "url(/assets/blue-bg2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              paddingTop: "calc(72px + clamp(5rem, 8vw, 9rem))",
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
                  <div className="probate-hero-start" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.2vw, 1rem)" }}>
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
                    { heading: "Probate Guidance For Every Situation", body: "Whether a will exists or not, the firm identifies the right legal path and moves the estate forward." },
                    { heading: "Texas Probate Court Experience", body: "Deep familiarity with Texas probate procedures, timelines, and court requirements in Harris County and surrounding areas." },
                    { heading: "Practical, Direct Communication", body: "Complex legal options explained clearly — no jargon, no unnecessary delay, no confusion about next steps." },
                    { heading: "Serving Houston and Surrounding Communities", body: "Houston, Spring, Tomball, Cypress, The Woodlands, and neighboring communities throughout the region." },
                  ].map((c, i) => (
                    <div key={c.heading} style={{ padding: "clamp(1.5rem, 2.5vw, 2.5rem)", border: "1px solid #ebebeb", borderRadius: "4px" }}>
                      <div className="probate-cred-icon" style={{ width: 32, height: 32, marginBottom: "1rem", color: "var(--gold)" }} dangerouslySetInnerHTML={{ __html: CRED_ICONS[i] }} />
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.2rem, 1.3vw, 1.4rem)", lineHeight: 1.3, color: "var(--navy)", marginBottom: "0.6em" }}>
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
                    <GhostBtn label="Explore Probate With a Will" mobileLabel="Learn More" href="#with-a-will" />
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
                    <NavyBtn label="Explore Probate Without a Will" mobileLabel="Learn More" href="#without-a-will" />
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
          <section id="with-a-will" style={{ backgroundColor: "#f9f9f9", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "clamp(1.5rem, 3vw, 3rem)" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
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
          <section id="without-a-will" style={{ backgroundColor: "#f9f9f9", ...PAD }}>
            <div style={WRAP}>
              <ScrollReveal>
                <div style={{ marginBottom: "clamp(1.5rem, 3vw, 3rem)" }}>
                  <p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
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
                  <PrimaryBtn label="Find Out Which Option May Apply" mobileLabel="Learn More" href="#consult" />
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
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.2rem, 1.3vw, 1.4rem)", color: "#ffffff", marginBottom: "0.5em", lineHeight: 1.3 }}>
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
                <div style={{ marginBottom: "clamp(1.5rem, 3vw, 3rem)" }}>
                  <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>Common Questions</p>
                  <h2 style={{ color: "var(--navy)", maxWidth: "640px" }}>
                    Frequently Asked Questions About Houston Probate
                  </h2>
                </div>
              </ScrollReveal>
              <FaqSection onOpen={openPanel} />
            </div>
          </section>

          {/* ── 10. FINAL CTA ────────────────────────────────────── */}
          <PageCTA
            id="consult"
            eyebrow="Next Steps"
            heading="Ready to Understand Your Probate Options?"
            description="If you need help understanding whether an estate should proceed through probate of a will, muniment of title, heirship, administration, a small estate affidavit, or another Texas probate option, Troy M. Moore, PLLC can help you evaluate the situation and determine the right next step."
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }} className="probate-cta-row">
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
              <GhostBtn label="Review Probate Process Summary" mobileLabel="Review Process" href="/practices/houston-cypress-texas-probate-attorney" />
            </div>
          </PageCTA>
        </main>

        <Footer />
      </div>

      {/* Close button and SidePanel are portaled to document.body to escape
          TransitionManager's pageRef (will-change: transform breaks position: fixed) */}
      {mounted && createPortal(
        <SidePanel ref={panelRef} item={panelItem} onClose={closePanel} />,
        document.body
      )}


    </>
  );
}
