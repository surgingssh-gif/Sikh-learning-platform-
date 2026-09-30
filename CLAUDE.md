# Sikh History Learning App

A mobile-first app (iOS, Android, web) that teaches Sikh history to teens (13–18), from 1469 to today. It should look and feel like a premium, museum-quality product, not a generic course app.

Read this file fully before any task. When a rule here conflicts with a request, flag it; don't silently break it.

## Stack

- **Expo** (managed workflow) + **TypeScript** (strict) + **Expo Router** (file-based routes in `app/`)
- **React Native Reanimated** for motion, **expo-haptics** for feedback, **expo-blur** for glass
- **react-native-svg** for icons, progress rings and illustrations
- **Zod** validates all content at build time
- Fonts via `@expo-google-fonts/*` (see Typography)
- Later phases: **Supabase** (auth, Postgres progress, storage), **EAS Build** for store releases, unlisted YouTube embeds for video

Local progress is stored with AsyncStorage until Supabase lands. Keep persistence behind `src/lib/progress.ts` so the swap is one file.

## Folder structure

```
app/                     Expo Router routes (screens only, thin)
  (tabs)/                Home, Learn, Timeline, Map, Glossary
  lesson/[slug].tsx
  quiz/[slug].tsx
  gallery.tsx            Component gallery (dev reference screen)
src/
  theme/                 tokens.ts, backdrops.ts, typography.ts, useTheme.ts
  components/            Design-system components (one per file, named exports)
  features/              Screen-level pieces grouped by feature (home/, lesson/, quiz/)
  lib/                   progress.ts, content loader, utils
  content/generated/     Build output of content/ (never edit by hand)
content/
  units/<nn-unit-slug>/unit.json
  units/<nn-unit-slug>/lessons/<nn-lesson-slug>.md
  units/<nn-unit-slug>/lessons/<nn-lesson-slug>.quiz.json
  glossary/terms.json
  sources/sources.json
scripts/build-content.ts Validates content with Zod, writes src/content/generated/
design/mockups/          Approved design mockups (*.dc.html). The visual source of truth.
```

## Visual language: "frosted glass over the history"

The approved mockups live in `design/mockups/` (Home, Lesson, Quiz, Style). Match them. When in doubt, open the mockup source and copy the exact values.

Principles:
1. Every screen floats on a **blurred backdrop** (soft arches of a gurdwara colonnade). UI panels are **frosted glass** on top.
2. **Long reading goes on paper**, never on glass. Lesson bodies use the opaque paper card.
3. **Kesri marks the one thing to do next.** At most one kesri button per screen.
4. Calm, not loud. No gradient washes, no emoji, no neon, no drop shadows heavier than the tokens.
5. Every interactive element gets motion and (on native) a haptic.

### Colour tokens (`src/theme/tokens.ts`)

| Token | Value | Use |
|---|---|---|
| `kesri` | `#E98A15` | Primary action fill, progress, highlights |
| `kesriLight` | `#FFD39A` | Kesri text/labels on glass |
| `kesriGlow` | `#F3A847` | Progress arcs and bars on glass |
| `kesriInk` | `#A2560A` | Kesri text on paper |
| `navy` | `#13213C` | Text on kesri and on paper |
| `onGlass` | `#FFFFFF` | Primary text on glass |
| `onGlassMuted` | `rgba(255,255,255,0.75)` | Secondary text on glass |
| `paper` | `#FBF8F2` | Reading surface |
| `paperMuted` | `#5A6072` | Secondary text on paper |
| `paperRule` | `#E6DDCC` | Dividers on paper |
| `quoteBg` | `#F7E6CC` | Gurbani / quote blocks on paper |
| `calloutBg` | `#F2EEE6` | "How historians read this" blocks |
| `termBg` | `#FBE8CC` | Highlighted glossary term |
| `correct` / `correctBg` | `#7FD1A8` / `rgba(46,160,110,0.38)` | Right answer |
| `incorrect` / `incorrectBg` | `#F29A8E` / `rgba(190,60,50,0.38)` | Wrong answer |

Dark mode changes only the paper surface: `paper #141B2B`, text `#EDE6D8`, muted `#A7AEBF`, rule `#2A3854`, kesri ink `#F3A847`, quote `#1C2640`, callout `#18223A`, term `#3A2A12`. Glass screens look the same in both modes.

### Backdrops (`src/theme/backdrops.ts`)

The backdrop is an SVG of pointed arches, blurred ~50px, with a scrim on top. **Mist is the default.** Other presets are reserved for per-unit theming later.

| Preset | base | glow | wall | floor | scrim | glass tint |
|---|---|---|---|---|---|---|
| **mist** (default) | `#8C97AE` | `#B4BDD0` | `#76819A` | `#66718A` | `rgba(16,20,34,0.18)` | `rgba(30,38,60,0.24)` |
| sage | `#97A08C` | `#B8BFA8` | `#7F8A76` | `#6E7866` | `rgba(18,24,16,0.20)` | `rgba(34,42,32,0.26)` |
| marble | `#D9D6D0` | `#EDE3CF` | `#C3BFB8` | `#B2ADA5` | `rgba(20,20,24,0.20)` | `rgba(40,40,48,0.40)` |
| sandstone | `#D8CCBA` | `#E6D2B0` | `#BBA892` | `#A7937E` | `rgba(30,22,16,0.18)` | `rgba(58,46,38,0.34)` |
| slate | `#98A1AC` | `#B9C2CB` | `#7F8995` | `#6C7682` | `rgba(14,18,26,0.22)` | `rgba(40,46,56,0.22)` |
| night | `#1E2840` | `#5E5A58` | `#161F35` | `#1C2640` | `rgba(6,10,20,0.10)` | `rgba(255,255,255,0.08)` |

### Surfaces

- **Glass**: backdrop blur 30 (`expo-blur` intensity ~40, tint `dark`) + the preset's glass tint, 1px border `rgba(255,255,255,0.26)`, top inner highlight `rgba(255,255,255,0.35)`, shadow `0 16 36 rgba(8,12,24,0.16)`.
- **Smoke** (popovers over paper): `rgba(28,34,50,0.78)` + blur 24, border `rgba(255,255,255,0.16)`.
- **Bevel** (secondary and icon buttons): fill `rgba(255,255,255,0.12)`, 1.5px border `rgba(255,255,255,0.55)`, light top inner edge, dark bottom inner edge, soft shadow. Round or pill only.
- **Kesri button**: solid `kesri`, `navy` text (never white text on kesri; it fails contrast), glossy top highlight, kesri-tinted glow shadow. Pill only.
- **Paper**: opaque `paper`, radius 30, shadow `0 30 60 rgba(8,12,24,0.35)`.

**Android**: `expo-blur` on Android uses `experimentalBlurMethod="dimezisBlurView"`. If blur is unavailable or slow, fall back to the glass tint at double opacity. Web uses CSS `backdrop-filter`.

### Typography (`src/theme/typography.ts`)

| Role | Font | Size / line height |
|---|---|---|
| Display (lesson title) | Newsreader 500 | 40 / 42, tracking -0.015em |
| Heading | Newsreader 500 | 21–27 / 1.2 |
| Reading body | Newsreader 400 | 19 / 31 |
| UI text, buttons | Instrument Sans 500–700 | 15–17 |
| Labels, dates, kickers | JetBrains Mono 500, UPPERCASE, tracking 0.14em | 10–11 |
| Gurmukhi | Noto Serif Gurmukhi 600 | 22–26 / 1.4 |
| Transliteration | Newsreader italic | 16–18 |

Gurmukhi always appears with transliteration and English together, in that order.

### Shape, space and motion

- Radius: pill (999) for all controls; panels 28–32; tiles 18–22; images inside panels 20.
- Spacing on a 4-pt grid. Screen gutter 12–16. Panel padding 14–22. Gap between panels 12–16.
- Touch targets are at least 44×44.
- Motion: 200ms with a slight spring (`withSpring` damping ~15) for presses and answers. Correct answer: scale to 1.03 + success haptic. Wrong answer: small shake + error haptic. Glass panels fade and rise 8px on mount. Honour reduced-motion settings.
- Icons: 2px stroke, rounded caps, 20–24px, drawn with react-native-svg (one `Icon` component with named glyphs). No emoji, no icon fonts.
- Loading states use skeletons shaped like the content, never a blank screen or a lone spinner.

## Content schema

Lessons are Markdown with YAML frontmatter:

```yaml
---
id: u1-l02-talwandi-to-the-bein
unit: 1
order: 2
title: From Talwandi to the Bein
era: "1469 – c. 1500"
readMinutes: 8
status: draft            # draft | in-review | approved
reviewedBy: null         # name of the reviewer once approved
reviewedOn: null
sources: [grewal-1990, harbans-singh-1969]
---
```

Body extensions:
- Glossary term: `[[kirat-karni|kirat karni]]` (id from `content/glossary/terms.json`, then display text)
- Quote block: `:::quote gurmukhi="..." translit="..." english="..." attribution="..."` … `:::`
- Historians callout: `:::perspectives` … `:::`
- Figure: `:::figure src="..." caption="..."` … `:::`

Quizzes (`*.quiz.json`): `{ "lessonId", "questions": [{ "id", "prompt", "options": [{ "id", "label" }], "answer", "explanation" }] }`.

Glossary terms: `{ "id", "gurmukhi", "translit", "english", "audio"?: "path" }`.

`scripts/build-content.ts` must fail the build on any schema error, unknown glossary id, or unknown source id.

## Content integrity (non-negotiable)

- Claude-written lessons are **always `status: draft`** and show the "Draft · awaiting review" badge. Only a human reviewer changes status to `approved`.
- Every lesson cites sources and renders them at the end.
- Contested topics (janamsakhi accounts, the Anglo-Sikh wars, Partition, 1984) must present more than one scholarly view in a `:::perspectives` block.
- Treat Gurbani with respect: quote accurately, cite the Ang (page) of Sri Guru Granth Sahib Ji where it applies, and never paraphrase it as if it were a quotation.
- Never invent dates, names, quotes or citations. If unsure, leave a `[CHECK: ...]` marker for the reviewer.

## Curriculum

1. Guru Nanak Dev Ji and the early Gurus
2. The later Gurus, martyrdom, and the Khalsa (1699)
3. Banda Singh Bahadur and the Misl era
4. Maharaja Ranjit Singh and the Sikh Empire
5. The Anglo-Sikh wars and annexation
6. Singh Sabha and the Gurdwara reform movement
7. Partition (1947)
8. 1984 and its aftermath
9. The global Sikh diaspora

Launch with Units 1–2 done well. Signature features: interactive timeline (1469 to today), era-aware map of Punjab and the Sikh Empire, and a glossary with Gurmukhi, transliteration, English and audio.

## Build phases

1. Design system: tokens + core components on the `/gallery` screen, matched against the mockups.
2. Vertical slice: Home → Lesson → Quiz with one lesson, local progress.
3. Learning loop: mastery, dashboard, streaks.
4. Timeline and map.
5. Polish, TestFlight, EAS submit.

## Working rules

- Build with the design-system components. Screens should not hand-roll glass, buttons or type styles.
- No hardcoded colours or font names outside `src/theme/`.
- Small commits after each working step, with clear messages.
- Before calling a UI task done, run the web build and compare a screenshot to the matching mockup.
- Run `npm run typecheck` and `npm run lint` before committing.
