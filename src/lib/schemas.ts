export const SITE_URL = "https://troymoorelaw.com";
export const FIRM_NAME = "Law Office of Troy M. Moore, PLLC";
export const FIRM_PHONE = "+12816090303";
export const FIRM_EMAIL = "info@troymoorelaw.com";

const ADDRESSES = [
  {
    "@type": "PostalAddress",
    streetAddress: "20333 State Highway 249 Suite 140",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77070",
    addressCountry: "US",
  },
  {
    "@type": "PostalAddress",
    streetAddress: "408 E 7th Street Suite B",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77007",
    addressCountry: "US",
  },
];

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
];

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: FIRM_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/icon.svg`,
      width: 128,
      height: 140,
    },
    image: `${SITE_URL}/assets/about.webp`,
    telephone: FIRM_PHONE,
    email: FIRM_EMAIL,
    priceRange: "$$",
    openingHoursSpecification: OPENING_HOURS,
    address: ADDRESSES,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.9012,
      longitude: -95.5522,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Harris County, TX" },
      { "@type": "AdministrativeArea", name: "Fort Bend County, TX" },
      { "@type": "AdministrativeArea", name: "Montgomery County, TX" },
      { "@type": "AdministrativeArea", name: "Brazoria County, TX" },
      { "@type": "AdministrativeArea", name: "Galveston County, TX" },
      { "@type": "AdministrativeArea", name: "Chambers County, TX" },
      { "@type": "AdministrativeArea", name: "Waller County, TX" },
    ],
    knowsAbout: [
      "Texas Probate Law",
      "Estate Planning",
      "Will Contests",
      "Life Insurance Disputes",
      "Fiduciary Litigation",
      "Muniment of Title",
      "Heirship Proceedings",
      "Transfer on Death Deed",
      "Special Needs Trusts",
      "Small Estate Affidavit",
    ],
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/team-members/troy-moore#person`,
      name: "Troy M. Moore",
      jobTitle: "Attorney at Law",
      url: `${SITE_URL}/team-members/troy-moore`,
    },
    sameAs: [
      "https://www.facebook.com/troymmoorepllc/",
      "https://www.youtube.com/channel/UCeJvFWBkRiXtWwHaamQ-8Tg",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: FIRM_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160),
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.imageUrl ?? `${SITE_URL}/assets/about.webp`,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/team-members/troy-moore#person`,
      name: "Troy M. Moore",
      jobTitle: "Attorney at Law",
      url: `${SITE_URL}/team-members/troy-moore`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };
}

export function personSchema(member: {
  name: string;
  role: string;
  slug: string;
  bio: string;
  photo?: string;
  credentials?: string[];
}) {
  const isTroy = member.slug === "troy-moore";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/team-members/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: `${SITE_URL}/team-members/${member.slug}`,
    image: member.photo ? `${SITE_URL}${member.photo}` : undefined,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    ...(isTroy && {
      alumniOf: [
        { "@type": "CollegeOrUniversity", "name": "Texas A&M University", "sameAs": "https://www.tamu.edu" },
        { "@type": "CollegeOrUniversity", "name": "South Texas College of Law", "sameAs": "https://www.stcl.edu" },
      ],
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", "name": "Doctor of Jurisprudence, South Texas College of Law, 2001" },
        { "@type": "EducationalOccupationalCredential", "name": "Bachelor of Arts in Biology, Texas A&M University, 1998" },
        { "@type": "EducationalOccupationalCredential", "name": "Licensed by State Bar of Texas, active since 2001" },
        { "@type": "EducationalOccupationalCredential", "name": "Admitted to U.S. Federal Court, Southern District of Texas" },
        { "@type": "EducationalOccupationalCredential", "name": "Admitted to State Bar of New Mexico" },
      ],
      memberOf: [
        { "@type": "Organization", "name": "State Bar of Texas" },
        { "@type": "Organization", "name": "State Bar of New Mexico" },
        { "@type": "Organization", "name": "Houston Trial Lawyers Association" },
        { "@type": "Organization", "name": "Texas Trial Lawyers Association" },
        { "@type": "Organization", "name": "American Inns of Court – Texas Probate Section" },
        { "@type": "Organization", "name": "REPTL – Real Estate, Probate & Trust Law Section, State Bar of Texas" },
      ],
      knowsAbout: [
        "Texas Probate Law",
        "Estate Planning",
        "Will Contests",
        "Life Insurance Litigation",
        "Fiduciary Litigation",
        "Muniment of Title",
        "Heirship Proceedings",
        "Transfer on Death Deed",
        "Texas Estates Code",
        "Harris County Probate Court",
      ],
    }),
  };
}

export function localServiceSchema(location: { name: string; county: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `Probate Attorney — ${location.name}, TX`,
    url: `${SITE_URL}/practice-areas/${location.slug}`,
    telephone: FIRM_PHONE,
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.county,
      },
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function videoObjectSchema(video: {
  title: string;
  description: string;
  youtubeId: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    uploadDate: "2024-01-01",
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/team-members/troy-moore#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/videos/${video.slug}` },
  };
}
