# Itihaas — Sikh history website

A website (and later iOS/Android app) that teaches Sikh history to teens and adults, from 1469 to today. It should read like a serious, well-edited publication: clean newspaper-style layout, real lessons, sources on every page. Live at https://surgingssh-gif.github.io/Sikh-learning-platform-/ (deployed from `main`).

Read this file fully before any task. When a rule here conflicts with a request, flag it; don't silently break it.

## Stack

- **Expo SDK 57** + **TypeScript** (strict) + **Expo Router** (file-based routes in `src/app/`), exported as a **static website** (`web.output: "static"`). Also read `AGENTS.md`: Expo APIs change every SDK, so check the versioned docs rather than memory.
- **react-native-svg** for illustrations and icons. **Zod** validates all content at build time.
- Fonts via `@expo-google-fonts/*`: Newsreader, Libre Franklin, Noto Serif Gurmukhi.
- Progress is stored with AsyncStorage (localStorage on web) behind `src/lib/progress.ts`. Moving to Supabase later means changing that file only.
- Hosting: GitHub Pages via `.github/workflows/deploy-web.yml` on every push to `main`. `experiments.baseUrl` in `app.json` is `/Sikh-learning-platform-`; keep links router-based (`<Link href="/...">`) so the base path is applied.

## Commands

- `npm run content` — validate `content/` and write `src/content/generated/content.json` (commit the result)
- `npx expo start --web` — local dev server
- `npm run typecheck`, `npm run lint` — run both before every commit
- `npx expo export --platform web` — production build into `dist/`

## Folder structure

```
src/
  app/                   Routes: index (front page), units/index, units/[slug], lessons/[slug],
                         timeline, glossary, about, +not-found, +html (static HTML shell)
  components/            Editorial components (one per file, re-exported from index.ts)
  content/               schema.ts (Zod), index.ts (typed helpers), generated/content.json
  lib/                   progress.ts, useHydrated.ts
  theme/                 tokens.ts, typography.ts, ThemeProvider.tsx, site.ts (name + tagline)
content/
  units/units.json
  units/<nn-unit-slug>/lessons/<nn-lesson-slug>.md
  units/<nn-unit-slug>/lessons/<nn-lesson-slug>.quiz.json
  glossary/terms.json
  sources/sources.json
  timeline/events.json
scripts/build-content.ts Validates content with Zod, writes src/content/generated/content.json
```

## Visual language: clean newspaper

Think of a quality newspaper's website: white page, black serif headlines, hairline rules, generous whitespace, almost no colour. The site's name and look are its own — never copy another publication's logo, wordmark or branding.

Principles:
1. **Typography does the work.** Hierarchy comes from type size and weight, not boxes, shadows or colour.
2. **Rules, not cards.** Separate sections with hairline grey rules, strong black rules above section heads, and a double rule under the masthead. No rounded cards, no drop shadows, no gradients, no emoji.
3. **Saffron is rare.** The accent (`#A85A00`) is for kickers, the Draft badge, progress and glossary underlines only.
4. **Reading first.** Article text is set at 19/31 in a single column no wider than 680px.
5. **Responsive.** Phone below 700px (one column), tablet 700–959, desktop 960+ (front page gets a main column plus a right rail). Use `useBreakpoint()`; it returns the phone layout until hydration so static HTML matches.

### Colour tokens (`src/theme/tokens.ts`)

| Token | Value | Use |
|---|---|---|
| `bg` | `#FFFFFF` | Page |
| `surface` | `#F7F6F3` | Callouts ("How historians read this", glossary card) |
| `ink` | `#121212` | Headlines, body, solid buttons |
| `ink2` | `#363636` | Deks, secondary text |
| `muted` | `#666666` | Bylines, captions |
| `rule` / `ruleStrong` | `#E2E2E2` / `#121212` | Hairline and strong rules |
| `accent` | `#A85A00` | Kickers, Draft badge, progress, term underline |
| `correct` / `incorrect` | `#1A7F4B` / `#B42318` | Quiz feedback (with soft fills) |

A dark palette exists in `tokens.ts` but is not switched on yet; the site is light only.

### Typography (`src/theme/typography.ts`)

| Role | Font | Size / line height |
|---|---|---|
| Wordmark | Newsreader 600 | 30 (compact) – 64 (masthead) |
| Headlines | Newsreader 500 | XL 44/50, L 34/40, M 23/29, S 19/25 |
| Dek | Newsreader 400 | 20/29 |
| Body | Newsreader 400 | 19/31 (small 16/24) |
| Kicker | Libre Franklin 600, UPPERCASE, tracking 1 | 11/15 |
| Section head | Libre Franklin 700 | 14/18 |
| UI, bylines, captions | Libre Franklin 400–700 | 13–15 |
| Gurmukhi | Noto Serif Gurmukhi 600 | 22–28 |
| Transliteration | Newsreader italic, accent colour | 17/24 |

Gurmukhi always appears with transliteration and English together, in that order.

### Components (`src/components/`)

`Page` (head tags + header + footer + scroll), `SiteHeader` (masthead | compact), `SiteFooter`, `Container` (max 1200, or narrow 680), `Rule` (hair | strong | double | vertical), `SectionHead`, `Txt`, `Button` (solid | outline, `href` or `onPress`), `Badge`, `LessonTeaser` (XL/L/M/S), `ArticleBody` (renders lesson blocks, tappable glossary terms, `QuoteBlock`, perspectives box), `GlossaryCard`, `Quiz`, `ProgressBar`, `Illustration` (placeholder SVG scenes: bein, road, fields).

Gotchas:
- Inside `<Link asChild>`, give the child a flat style object: style functions are dropped and arrays break on web.
- Don't put `flex: 1` on children of a vertical stack (it collapses them on phones); apply it only when the parent is a row.
- Values that differ per visit (today's date, word of the day, saved progress) must wait for `useHydrated()` / `useProgress()` so static HTML and the first client render match.

## Content schema

Lessons are Markdown with YAML frontmatter:

```yaml
---
id: u1-l01-from-talwandi-to-the-bein
slug: from-talwandi-to-the-bein
unit: 1
order: 1
title: From Talwandi to the Bein
dek: One-sentence summary shown under the headline.
era: "1469 – c. 1500"
readMinutes: 7
status: draft            # draft | in-review | approved
reviewedBy: null         # reviewer's name once approved
reviewedOn: null
figure: bein             # optional: bein | road | fields
figureCaption: ...
sources: [grewal-1990, harbans-singh-1969]
---
```

Body: paragraphs, `## Subheads`, `*italic*`, and:
- Glossary term: `[[kirat-karni|kirat karni]]` (id from `content/glossary/terms.json`, then display text)
- Quote: `:::quote gurmukhi="..." translit="..." english="..." attribution="..."` then a line `:::`
- Historians' views: `:::perspectives` … `:::`

Quizzes (`*.quiz.json`): `{ "lessonId", "questions": [{ "id", "prompt", "options": [{ "id", "label" }], "answer", "explanation" }] }`.

`scripts/build-content.ts` fails on any schema error, unknown glossary or source id, quiz answer that isn't an option, or approved lesson without a reviewer. CI runs it before deploying.

## Content integrity (non-negotiable)

- Claude-written lessons are **always `status: draft`** and show the Draft badge. Only a human reviewer changes status to `approved`.
- Every lesson cites sources and renders them at the end.
- Present traditional accounts (janamsakhis) as tradition, not as documented fact.
- Contested topics (janamsakhi accounts, the Anglo-Sikh wars, Partition, 1984) must present more than one scholarly view in a `:::perspectives` block.
- Treat Gurbani with respect: quote accurately, cite the Ang of Sri Guru Granth Sahib Ji, and label translations as one possible rendering.
- Never invent dates, names, quotes or citations. If unsure, leave it out or flag it for the reviewer.

## Curriculum

1. Guru Nanak Dev Ji and the early Gurus (3 draft lessons live)
2. The later Gurus, martyrdom, and the Khalsa (1699)
3. Banda Singh Bahadur and the Misl era
4. Maharaja Ranjit Singh and the Sikh Empire
5. The Anglo-Sikh wars and annexation
6. Singh Sabha and the Gurdwara reform movement
7. Partition (1947)
8. 1984 and its aftermath
9. The global Sikh diaspora

Launch with Units 1–2 done well. Signature features: timeline (live, basic), era-aware map of Punjab (planned), glossary with Gurmukhi, transliteration, English (live; audio planned).

## Working rules

- Build pages from the components above. No hardcoded colours or font names outside `src/theme/`.
- Small commits after each working step, with clear messages.
- Before calling a UI task done, export the site and check phone (390px) and desktop (1280px) screenshots for overlap, clipping and console errors.
- Run `npm run content`, `npm run typecheck` and `npm run lint` before committing.
