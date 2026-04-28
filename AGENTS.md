# WWC Agent Guide — Troy Moore Attorney

This file is read by the WWC AI agent before making any changes to this repo.
**Always read this file fully before interpreting a change request.**

---

## Site Overview

- **Client**: Troy M. Moore, Attorney at Law
- **Live domain**: https://troymoorelaw.com
- **Staging preview**: https://troy-moore-attorney-git-staging-wwcpro.vercel.app
- **Stack**: Next.js (App Router), Tailwind CSS v4, TypeScript
- **Hosting**: Vercel (project: `troy-moore-attorney`, org: `wwcpro`)
- **GitHub repo**: `wwcpro/troy-moore-attorney`

---

## Design System

### Colors (defined in `src/app/globals.css`)
| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0b375d` | Primary brand color, body text, headings |
| `--gold` | `#C3A05B` | Accent, CTAs, highlights |
| `--white` | `#FFFFFF` | Backgrounds |
| `--light-gray` | `#F5F5F5` | Section backgrounds |

### Typography
| Variable | Font | Usage |
|----------|------|-------|
| `--font-heading` | `kepler-std` (serif, light italic) | H1, H2 |
| `--font-eyebrow` | `avenir-lt-pro` (sans) | Eyebrow labels |
| `--font-body` | `poppins` (sans) | Body text |

---

## Content Architecture

Most copy lives in `src/data/*.json`. Some content is **hardcoded in component files** — check the table below for the exact location before looking elsewhere.

### Content File Map

| What the client might ask about | File to edit | Notes |
|--------------------------------|-------------|-------|
| Homepage headline, paragraph, bullets, quote | `src/data/hero.json` | See structure below |
| **Homepage stats ("25+", "2,800+", "4,000+" etc.)** | `src/components/Hero.tsx` | `const STATS = [...]` at lines 11–14 — edit `value` integers. **Stats are NOT in hero.json.** |
| **"Trusted" heading on homepage** | `src/components/LatestCarousel.tsx` | Hardcoded `<h2>Trusted</h2>` at ~line 68. The subtitle "To Help You" is in the `<p className="eyebrow">` tag immediately below it. Edit these JSX strings directly. |
| **"To Help You" subtitle under "Trusted"** | `src/components/LatestCarousel.tsx` | `<p className="eyebrow">To Help You</p>` at ~line 70 |
| Testimonials / client reviews | `src/data/testimonials.json` | Array of `{ body, author }` |
| Navigation links, phone number | `src/data/navigation.json` | |
| Practice area cards | `src/data/practices.json` | |
| Attorney bio, headline, credentials | `src/data/team.json` | Array indexed by attorney |
| FAQ questions and answers | `src/data/faq.json` | |
| Footer links, addresses | `src/data/footer.json` | |
| Service area cities | `src/data/geo-locations.json` | |
| Blog post teasers on homepage | `src/data/latest-posts.json` | These feed the LatestCarousel slide content |
| Featured article on homepage | `src/data/featured-article.json` | |
| "Core Practice / Areas" section | `src/data/staying-informed.json` | |
| Videos | `src/data/videos.json` | |

### hero.json structure
```json
{
  "eyebrow": "TROY M. MOORE",
  "headline": "...",
  "paragraph": "...",
  "bulletHeading": "Why Clients Choose Troy:",
  "bullets": [{ "label": "...", "description": "..." }],
  "quote": "..."
}
```

### Hero.tsx STATS structure (src/components/Hero.tsx, lines 11–14)
```typescript
const STATS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 2800, suffix: "+", label: "Complex Cases Handled" },
  { value: 4000, suffix: "+", label: "Clients Served" },
];
```
To change a stat number, edit the `value` field (integer only). To change the label text, edit `label`.

### LatestCarousel.tsx hardcoded heading (src/components/LatestCarousel.tsx, ~line 68)
```tsx
<h2>Trusted</h2>
<p className="eyebrow" style={{ color: "var(--navy)", opacity: 0.5, marginTop: "0.5vw" }}>
  To Help You
</p>
```
Edit the string between the tags. Do not change any JSX attributes or surrounding structure.

---

## Pages

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/probate` | `src/app/probate/page.tsx` |
| `/estate-planning` | `src/app/estate-planning/page.tsx` |
| `/practices` | `src/app/practices/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/team-members` | `src/app/team-members/page.tsx` |
| `/faq` | `src/app/faq/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |

---

## Common Request Playbooks

These are the most frequent request types and exactly what to do for each:

| Request | Action |
|---------|--------|
| "Update the homepage headline" | Edit `src/data/hero.json` → `headline` field |
| "Update the hero paragraph / body copy" | Edit `src/data/hero.json` → `paragraph` field |
| "Add / change a bullet point in the hero" | Edit `src/data/hero.json` → `bullets` array, `label` or `description` |
| "Change the stat [N]+ to [M]+" | Read `src/components/Hero.tsx`, find `const STATS`, edit the matching `value` integer |
| "Update the 'Trusted' heading" | Read `src/components/LatestCarousel.tsx`, find `<h2>Trusted</h2>`, edit the string |
| "Update the text under 'Trusted'" | Read `src/components/LatestCarousel.tsx`, find `<p className="eyebrow">To Help You</p>`, edit the string |
| "Add a testimonial" | Edit `src/data/testimonials.json` → append `{ "body": "...", "author": "..." }` to the array |
| "Update a testimonial" | Edit `src/data/testimonials.json` → find matching `author`, change `body` |
| "Add a FAQ" | Edit `src/data/faq.json` → append `{ "question": "...", "answer": "..." }` to the array |
| "Update a FAQ answer" | Edit `src/data/faq.json` → find matching `question`, change `answer` |
| "Update the hero CTA / button" | Edit `src/data/navigation.json` → find the CTA button entry |
| "Update blog post teaser / card" | Edit `src/data/latest-posts.json` → find matching entry |
| "Update phone number" | Edit `src/data/navigation.json` and `src/data/footer.json` |
| "Add a blog post" | Edit `src/data/latest-posts.json` → append new entry |

---

## Out of Scope — Always Escalate

Do not attempt these. Use `escalate` with a clear reason:

- Adding a new page or new page section (e.g., "add a Services section")
- Adding a new navigation menu item that links to a new page
- Redesigning any section's layout or visual structure
- Changing fonts, colors, or spacing (design system changes)
- Uploading or replacing images
- Any change that requires creating a new component file
- Requests that reference content that genuinely does not exist on the site (use `clarify` first to confirm the client isn't confused about which site/section they mean)
- Multi-step workflows (e.g., form logic, integrations, contact routing)

---

## Rules for Making Changes

1. **Check the Content File Map above first** — it tells you exactly which file to edit.
2. **JSON files**: return valid JSON only. Preserve all fields, only change requested values.
3. **TSX/component files**: you may edit these when the content is hardcoded there (e.g. STATS in Hero.tsx, "Trusted" heading in LatestCarousel.tsx). Make minimal, surgical edits — only change the specific string requested.
4. **Match voice**: professional, approachable, Texas-rooted, probate-focused.
5. **Image paths** start with `/assets/` — never change unless specifically asked.
6. **Phone numbers** format: `(281) 609-0303` style.
7. **If content doesn't exist** on the site, use `clarify` to ask — don't invent it or escalate immediately.

---

## Change History

<!-- The WWC agent appends completed changes below this line. -->

## 2026-04-27 | Ticket 8d029bb4 | Updated homepage headline to add four exclamation marks at the end.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 99d82b0e | Updated homepage headline to add four exclamation marks at the end.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 4ce3c01a | Added four exclamation marks to the end of the homepage headline.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 60061aa4 | Added five question marks to the end of the homepage headline.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket e2cf8e2d | Appended ", Hi Caden!" to the homepage headline.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 4939dd49 | Updated Bill Darnell's testimonial phrasing.
Changed: `src/data/testimonials.json`

## 2026-04-27 | Ticket ee326d70 | Changed homepage headline to "Gary Made a Change !!!!!!"
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 671349a0 | Added new Estate Planning FAQ entry about estate planning timeline (id 24) and renumbered subsequent entries.
Changed: `src/data/faq.json`
