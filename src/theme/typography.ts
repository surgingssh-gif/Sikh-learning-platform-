import type { TextStyle } from 'react-native';

import { InstrumentSans_500Medium } from '@expo-google-fonts/instrument-sans/500Medium';
import { InstrumentSans_600SemiBold } from '@expo-google-fonts/instrument-sans/600SemiBold';
import { InstrumentSans_700Bold } from '@expo-google-fonts/instrument-sans/700Bold';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';
import { Newsreader_400Regular } from '@expo-google-fonts/newsreader/400Regular';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader/400Regular_Italic';
import { Newsreader_500Medium } from '@expo-google-fonts/newsreader/500Medium';
import { Newsreader_600SemiBold } from '@expo-google-fonts/newsreader/600SemiBold';
import { NotoSerifGurmukhi_600SemiBold } from '@expo-google-fonts/noto-serif-gurmukhi/600SemiBold';

/** Passed to expo-font's useFonts in the root layout. */
export const fontAssets = {
  Newsreader_400Regular,
  Newsreader_400Regular_Italic,
  Newsreader_500Medium,
  Newsreader_600SemiBold,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
  JetBrainsMono_500Medium,
  NotoSerifGurmukhi_600SemiBold,
};

export const font = {
  serif: 'Newsreader_400Regular',
  serifItalic: 'Newsreader_400Regular_Italic',
  serifMedium: 'Newsreader_500Medium',
  serifSemibold: 'Newsreader_600SemiBold',
  sansMedium: 'InstrumentSans_500Medium',
  sansSemibold: 'InstrumentSans_600SemiBold',
  sansBold: 'InstrumentSans_700Bold',
  mono: 'JetBrainsMono_500Medium',
  gurmukhi: 'NotoSerifGurmukhi_600SemiBold',
} as const;

export const textStyle = {
  display: { fontFamily: font.serifMedium, fontSize: 40, lineHeight: 42, letterSpacing: -0.6 },
  title: { fontFamily: font.serifMedium, fontSize: 32, lineHeight: 36 },
  heading: { fontFamily: font.serifMedium, fontSize: 25, lineHeight: 30 },
  subheading: { fontFamily: font.serifMedium, fontSize: 21, lineHeight: 26 },
  reading: { fontFamily: font.serif, fontSize: 19, lineHeight: 31 },
  ui: { fontFamily: font.sansMedium, fontSize: 15, lineHeight: 20 },
  uiStrong: { fontFamily: font.sansSemibold, fontSize: 15, lineHeight: 20 },
  button: { fontFamily: font.sansBold, fontSize: 16, lineHeight: 20 },
  caption: { fontFamily: font.sansMedium, fontSize: 13, lineHeight: 18 },
  stat: { fontFamily: font.sansSemibold, fontSize: 24, lineHeight: 28 },
  label: { fontFamily: font.mono, fontSize: 10, lineHeight: 14, letterSpacing: 1.4, textTransform: 'uppercase' },
  gurmukhi: { fontFamily: font.gurmukhi, fontSize: 26, lineHeight: 36 },
  translit: { fontFamily: font.serifItalic, fontSize: 17, lineHeight: 22 },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textStyle;
