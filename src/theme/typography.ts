import type { TextStyle } from 'react-native';

import { LibreFranklin_400Regular } from '@expo-google-fonts/libre-franklin/400Regular';
import { LibreFranklin_500Medium } from '@expo-google-fonts/libre-franklin/500Medium';
import { LibreFranklin_600SemiBold } from '@expo-google-fonts/libre-franklin/600SemiBold';
import { LibreFranklin_700Bold } from '@expo-google-fonts/libre-franklin/700Bold';
import { Newsreader_400Regular } from '@expo-google-fonts/newsreader/400Regular';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader/400Regular_Italic';
import { Newsreader_500Medium } from '@expo-google-fonts/newsreader/500Medium';
import { Newsreader_600SemiBold } from '@expo-google-fonts/newsreader/600SemiBold';
import { NotoSerifGurmukhi_400Regular } from '@expo-google-fonts/noto-serif-gurmukhi/400Regular';
import { NotoSerifGurmukhi_600SemiBold } from '@expo-google-fonts/noto-serif-gurmukhi/600SemiBold';

/** Passed to expo-font's useFonts in the root layout. */
export const fontAssets = {
  Newsreader_400Regular,
  Newsreader_400Regular_Italic,
  Newsreader_500Medium,
  Newsreader_600SemiBold,
  LibreFranklin_400Regular,
  LibreFranklin_500Medium,
  LibreFranklin_600SemiBold,
  LibreFranklin_700Bold,
  NotoSerifGurmukhi_400Regular,
  NotoSerifGurmukhi_600SemiBold,
};

export const font = {
  serif: 'Newsreader_400Regular',
  serifItalic: 'Newsreader_400Regular_Italic',
  serifMedium: 'Newsreader_500Medium',
  serifBold: 'Newsreader_600SemiBold',
  sans: 'LibreFranklin_400Regular',
  sansMedium: 'LibreFranklin_500Medium',
  sansSemibold: 'LibreFranklin_600SemiBold',
  sansBold: 'LibreFranklin_700Bold',
  gurmukhi: 'NotoSerifGurmukhi_400Regular',
  gurmukhiBold: 'NotoSerifGurmukhi_600SemiBold',
} as const;

export const textStyle = {
  wordmark: { fontFamily: font.serifBold, fontSize: 52, lineHeight: 58, letterSpacing: -1 },
  headlineXL: { fontFamily: font.serifMedium, fontSize: 44, lineHeight: 50, letterSpacing: -0.6 },
  headlineL: { fontFamily: font.serifMedium, fontSize: 34, lineHeight: 40, letterSpacing: -0.4 },
  headlineM: { fontFamily: font.serifMedium, fontSize: 23, lineHeight: 29 },
  headlineS: { fontFamily: font.serifMedium, fontSize: 19, lineHeight: 25 },
  dek: { fontFamily: font.serif, fontSize: 20, lineHeight: 29 },
  body: { fontFamily: font.serif, fontSize: 19, lineHeight: 31 },
  bodySmall: { fontFamily: font.serif, fontSize: 16, lineHeight: 24 },
  sectionHead: { fontFamily: font.sansBold, fontSize: 14, lineHeight: 18, letterSpacing: 0.4 },
  kicker: { fontFamily: font.sansSemibold, fontSize: 11, lineHeight: 15, letterSpacing: 1, textTransform: 'uppercase' },
  byline: { fontFamily: font.sansMedium, fontSize: 13, lineHeight: 18 },
  ui: { fontFamily: font.sansMedium, fontSize: 15, lineHeight: 20 },
  uiBold: { fontFamily: font.sansBold, fontSize: 15, lineHeight: 20 },
  nav: { fontFamily: font.sansSemibold, fontSize: 13, lineHeight: 18, letterSpacing: 0.3 },
  caption: { fontFamily: font.sans, fontSize: 13, lineHeight: 18 },
  gurmukhi: { fontFamily: font.gurmukhiBold, fontSize: 24, lineHeight: 36 },
  translit: { fontFamily: font.serifItalic, fontSize: 17, lineHeight: 24 },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textStyle;
