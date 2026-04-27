# WWC Agent Guide — Troy Moore Attorney

This file is read by the WWC AI agent before making any changes to this repo.
It describes the site structure, design system, and content patterns.
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

**Important**: Never change the font stack or color tokens. All copy should match the existing voice: professional, warm, Texas-rooted.

---

## Content Architecture

All website copy lives in **`src/data/*.json`** files. These are the only files you should edit for content/copy changes. Never edit `.tsx` component files for copy changes.

### Content Files

| File | Controls |
|------|---------|
| `src/data/hero.json` | Homepage hero: `eyebrow`, `headline`, `paragraph`, `bulletHeading`, `bullets[]` (label + description), `quote` |
| `src/data/navigation.json` | Nav links (leftLinks, rightLinks), phone number |
| `src/data/practices.json` | Practice area cards shown on homepage |
| `src/data/testimonials.json` | Client testimonial quotes |
| `src/data/team.json` | Attorney bios, photos, headlines, sections |
| `src/data/faq.json` | FAQ questions and answers |
| `src/data/footer.json` | Footer links, address, contact info |
| `src/data/geo-locations.json` | Service area cities/locations |
| `src/data/geo-practice-areas.json` | Practice areas by geography |
| `src/data/latest-posts.json` | Blog post teasers |
| `src/data/featured-article.json` | Featured article on homepage |
| `src/data/staying-informed.json` | "Staying Informed" section content |
| `src/data/videos.json` | Video section content |

### hero.json structure
```json
{
  "eyebrow": "TROY M. MOORE",
  "headline": "Top Probate, Estate Planning, & Trusts Attorney",
  "paragraph": "...",
  "bulletHeading": "Why Clients Choose Troy:",
  "bullets": [{ "label": "...", "description": "..." }],
  "quote": "...",
  "heroImage": "/assets/troy-hero.png",
  "signatureImage": "/assets/signature.png"
}
```

---

## Pages

| Route | File | Notes |
|-------|------|-------|
| `/` | `src/app/page.tsx` | Uses hero.json, practices.json, testimonials.json, featured-article.json |
| `/about` | `src/app/about/page.tsx` | Attorney background |
| `/probate` | `src/app/probate/page.tsx` | Probate practice area |
| `/estate-planning` | `src/app/estate-planning/page.tsx` | Estate planning area |
| `/practices` | `src/app/practices/page.tsx` | All practice areas |
| `/contact` | `src/app/contact/page.tsx` | Contact form |
| `/team-members` | `src/app/team-members/page.tsx` | Uses team.json |
| `/faq` | `src/app/faq/page.tsx` | Uses faq.json |
| `/blog` | `src/app/blog/page.tsx` | Blog listing |

---

## Rules for Making Changes

1. **Copy changes** → edit the appropriate `src/data/*.json` file. Return valid JSON only.
2. **Never break JSON structure** — only change string values, not keys or structure.
3. **Match voice**: professional, approachable, Texas-rooted, probate-focused.
4. **Preserve all other fields** in the JSON — only modify what was requested.
5. **Image paths** start with `/assets/` — never change these unless specifically asked.
6. **Phone numbers** format: `(281) 609-0303` style with tel: links like `tel:2816090303`.

---

## Change History

<!-- The WWC agent appends completed changes below this line. -->
<!-- FORMAT: ## YYYY-MM-DD | Ticket <id> | <summary> -->

## 2026-04-27 | Ticket 8d029bb4 | Updated homepage headline to add four exclamation marks at the end.
Changed: `src/data/hero.json`

## 2026-04-27 | Ticket 99d82b0e | Updated homepage headline to add four exclamation marks at the end.
Changed: `src/data/hero.json`
