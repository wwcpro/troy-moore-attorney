export interface GeoLocation {
  slug: string;
  name: string;
  region: string;
  county: string;
}

export function generateGeoTitle(location: GeoLocation): string {
  return `Probate Attorney in ${location.name}, TX`;
}

export function generateGeoDescription(location: GeoLocation): string {
  return `The Law Office of Troy M. Moore, PLLC provides probate, estate planning, and will contest services in ${location.name}, ${location.county}. Over 25 years of Texas probate experience.`;
}

export function generateGeoContent(location: GeoLocation): string {
  return `<p>If you are facing a probate matter or need estate planning guidance in ${location.name}, the Law Office of Troy M. Moore, PLLC is here to help. We are a Texas-based firm with over 25 years of experience serving families throughout ${location.region} — including ${location.name} and the surrounding communities of ${location.county}.</p>

<h2>Probate Services in ${location.name}</h2>
<p>Probate is the court-supervised process of settling a deceased person's estate in Texas. Whether your loved one left a will or passed without one, our attorneys guide you through every step of the process. We handle:</p>
<ul>
  <li><strong>Probate of a Last Will and Testament</strong> — formal court administration with or without an independent executor</li>
  <li><strong>Muniment of Title</strong> — a faster, lower-cost alternative when the estate has no unpaid debts other than a mortgage</li>
  <li><strong>Determination of Heirship</strong> — used when there is no valid will to establish legal heirs</li>
  <li><strong>Independent and Dependent Administration</strong> — we advise executors and administrators on their legal duties</li>
  <li><strong>Small Estate Affidavits</strong> — for qualifying estates below the statutory threshold</li>
</ul>

<h2>Estate Planning for ${location.name} Families</h2>
<p>A well-crafted estate plan protects your assets, minimizes delays, and ensures your wishes are honored. We help ${location.name} residents create plans that include:</p>
<ul>
  <li>Last Will and Testament</li>
  <li>Revocable Living Trusts</li>
  <li>Durable Power of Attorney</li>
  <li>Medical Power of Attorney and Advance Directives (Living Will)</li>
  <li>Texas Transfer on Death Deeds — transfer real property outside of probate</li>
</ul>

<h2>Will Contests and Fiduciary Litigation</h2>
<p>If you believe a will was executed under undue influence, lack of testamentary capacity, or fraud, our firm can represent you in a will contest in ${location.county}. We also represent beneficiaries, executors, and trustees in fiduciary litigation where a breach of duty has occurred.</p>

<h2>Life Insurance Disputes</h2>
<p>Insurance companies sometimes deny or delay legitimate beneficiary claims. Our attorneys pursue contested life insurance claims on behalf of families in ${location.name} and throughout Southeast Texas — often on a contingency basis.</p>

<h2>Serving ${location.name} and ${location.region}</h2>
<p>Our office serves clients throughout the greater Houston area, including ${location.name}, and all surrounding communities in ${location.county}. When you work with us, you work directly with an attorney — not a paralegal or case manager — from your first consultation through the resolution of your matter.</p>
<blockquote>Probate and estate matters are often emotionally difficult. Our goal is to handle the legal complexities so you can focus on what matters most to your family.</blockquote>`;
}
