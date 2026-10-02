/**
 * Design tokens for the editorial look: white page, black serif headlines,
 * hairline rules, saffron used sparingly. The only place colours live.
 */

export type Palette = {
  bg: string;
  surface: string;
  ink: string;
  ink2: string;
  muted: string;
  rule: string;
  ruleStrong: string;
  accent: string;
  accentSoft: string;
  quoteBg: string;
  correct: string;
  correctSoft: string;
  incorrect: string;
  incorrectSoft: string;
  onInk: string;
  water: string;
};

export const palettes: Record<'light' | 'dark', Palette> = {
  light: {
    bg: '#FFFFFF',
    surface: '#F7F6F3',
    ink: '#121212',
    ink2: '#363636',
    muted: '#666666',
    rule: '#E2E2E2',
    ruleStrong: '#121212',
    accent: '#A85A00',
    accentSoft: '#FBEBD6',
    quoteBg: '#FAF5EC',
    correct: '#1A7F4B',
    correctSoft: '#E6F4EC',
    incorrect: '#B42318',
    incorrectSoft: '#FCEBE9',
    onInk: '#FFFFFF',
    water: '#7FA6C6',
  },
  dark: {
    bg: '#121212',
    surface: '#1C1C1C',
    ink: '#EDEDED',
    ink2: '#D0D0D0',
    muted: '#A3A3A3',
    rule: '#2E2E2E',
    ruleStrong: '#EDEDED',
    accent: '#E9A24E',
    accentSoft: '#3A2A14',
    quoteBg: '#1E1A14',
    correct: '#4CC38A',
    correctSoft: '#14291E',
    incorrect: '#F07167',
    incorrectSoft: '#2E1614',
    onInk: '#121212',
    water: '#3E6A8E',
  },
};

/** 4-pt spacing scale. */
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48, huge: 64 } as const;

export const layout = {
  maxWidth: 1200,
  articleWidth: 680,
  gutter: 20,
  desktop: 960,
  tablet: 700,
} as const;

export const radius = { sm: 2, md: 4, pill: 999 } as const;

export const minTouch = 44;
