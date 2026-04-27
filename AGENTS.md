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
| **Homepage stats ("25+", "2,800+", "4,000+" etc.)** | `src/components/Hero.tsx` | `const STATS = [...]` at top of file — edit `value` numbers |
| Testimonials / client reviews | `src/data/testimonials.json` | Array of `{ body, author }` |
| Navigation links, phone number | `src/data/navigation.json` | |
| Practice area cards | `src/data/practices.json` | |
| Attorney bio, headline, credentials | `src/data/team.json` | Array indexed by attorney |
| FAQ questions and answers | `src/data/faq.json` | |
| Footer links, addresses | `src/data/footer.json` | |
| Service area cities | `src/data/geo-locations.json` | |
| Blog post teasers | `src/data/latest-posts.json` | |
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

### Hero.tsx STATS structure (src/components/Hero.tsx, top of file)
```typescript
const STATS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 2800, suffix: "+", label: "Complex Cases Handled" },
  { value: 4000, suffix: "+", label: "Clients Served" },
];
```
To change a stat number, edit the `value` field (integer). To change the label text, edit `label`.

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

## Rules for Making Changes

1. **Check the Content File Map above first** — it tells you exactly which file to edit.
2. **JSON files**: return valid JSON only. Preserve all fields, only change requested values.
3. **TSX/component files**: you may edit these when the content is hardcoded there (e.g. STATS in Hero.tsx). Make minimal, surgical edits — only change the specific value requested.
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
