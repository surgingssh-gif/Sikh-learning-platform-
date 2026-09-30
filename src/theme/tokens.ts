/**
 * Design tokens. The single source of truth for colour, shape, space and motion.
 * Values come from the approved mockups in design/mockups/ (see CLAUDE.md).
 */

export const color = {
  kesri: '#E98A15',
  kesriLight: '#FFD39A',
  kesriGlow: '#F3A847',
  kesriInk: '#A2560A',
  navy: '#13213C',

  onGlass: '#FFFFFF',
  onGlassMuted: 'rgba(255,255,255,0.75)',
  onGlassFaint: 'rgba(255,255,255,0.22)',
  glassEdge: 'rgba(255,255,255,0.26)',
  glassHighlight: 'rgba(255,255,255,0.35)',
  tileFill: 'rgba(255,255,255,0.10)',
  tileEdge: 'rgba(255,255,255,0.18)',
  bevelFill: 'rgba(255,255,255,0.12)',
  bevelEdge: 'rgba(255,255,255,0.55)',
  smoke: 'rgba(28,34,50,0.78)',
  smokeEdge: 'rgba(255,255,255,0.16)',

  correct: '#7FD1A8',
  correctBg: 'rgba(46,160,110,0.38)',
  correctInk: '#0E2A1E',
  correctSheet: 'rgba(30,90,64,0.55)',
  incorrect: '#F29A8E',
  incorrectBg: 'rgba(190,60,50,0.38)',
  incorrectInk: '#3A0E0A',
  incorrectSheet: 'rgba(110,34,30,0.55)',
} as const;

export type PaperPalette = {
  paper: string;
  ink: string;
  muted: string;
  rule: string;
  accentInk: string;
  quoteBg: string;
  calloutBg: string;
  termBg: string;
};

export const paper: Record<'light' | 'dark', PaperPalette> = {
  light: {
    paper: '#FBF8F2',
    ink: '#13213C',
    muted: '#5A6072',
    rule: '#E6DDCC',
    accentInk: '#A2560A',
    quoteBg: '#F7E6CC',
    calloutBg: '#F2EEE6',
    termBg: '#FBE8CC',
  },
  dark: {
    paper: '#141B2B',
    ink: '#EDE6D8',
    muted: '#A7AEBF',
    rule: '#2A3854',
    accentInk: '#F3A847',
    quoteBg: '#1C2640',
    calloutBg: '#18223A',
    termBg: '#3A2A12',
  },
};

export const radius = {
  pill: 999,
  panel: 30,
  tile: 20,
  inner: 18,
  image: 20,
} as const;

/** 4-pt spacing scale. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 12,
} as const;

export const minTouch = 44;

export const motion = {
  pressScale: 0.97,
  correctScale: 1.03,
  spring: { damping: 15, stiffness: 220, mass: 0.8 },
  durationFast: 180,
  durationBase: 240,
  enterRise: 8,
} as const;

/** Shadows as boxShadow strings (supported on iOS, Android and web in RN 0.76+). */
export const shadow = {
  glass: '0px 16px 36px rgba(8,12,24,0.16), inset 0px 1px 0px rgba(255,255,255,0.35)',
  tile: 'inset 0px 1px 0px rgba(255,255,255,0.22)',
  bevel:
    'inset 0px 2px 6px rgba(255,255,255,0.28), inset 0px -4px 10px rgba(0,0,0,0.18), 0px 8px 18px rgba(0,0,0,0.22)',
  kesri:
    'inset 0px 1px 0px rgba(255,255,255,0.55), inset 0px -3px 8px rgba(120,50,0,0.25), 0px 10px 24px rgba(233,138,21,0.35)',
  smoke: '0px 18px 36px rgba(8,12,24,0.30), inset 0px 1px 0px rgba(255,255,255,0.18)',
  paper: '0px 30px 60px rgba(8,12,24,0.35)',
} as const;
