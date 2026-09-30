import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, shadow, space, useTheme } from '@/theme';

import { Txt } from './Txt';
import { Icon } from './Icon';

/** Opaque reading surface. All long-form text lives on Paper, never on glass. */
export function Paper({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { paper } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: paper.paper,
          borderRadius: radius.panel,
          paddingHorizontal: space.xl + 2,
          paddingTop: space.xxl + 2,
          paddingBottom: space.xxxl - 2,
          gap: space.xl + 2,
          boxShadow: shadow.paper,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Gurmukhi quote with transliteration, English and attribution. */
export function QuoteBlock({
  gurmukhi,
  translit,
  english,
  attribution,
}: {
  gurmukhi: string;
  translit: string;
  english: string;
  attribution?: string;
}) {
  const { paper } = useTheme();
  return (
    <View style={{ marginHorizontal: -8, padding: space.xl + 2, borderRadius: 24, backgroundColor: paper.quoteBg, gap: space.sm, alignItems: 'center' }}>
      <Txt variant="gurmukhi" tint={paper.ink} style={{ textAlign: 'center' }}>
        {gurmukhi}
      </Txt>
      <Txt variant="translit" tint={paper.accentInk} style={{ textAlign: 'center', fontSize: 18 }}>
        {translit}
      </Txt>
      <Txt variant="reading" tint={paper.ink} style={{ textAlign: 'center', fontSize: 18, lineHeight: 25 }}>
        “{english}”
      </Txt>
      {attribution ? (
        <Txt variant="label" tint={paper.muted} style={{ marginTop: 6, textAlign: 'center' }}>
          {attribution}
        </Txt>
      ) : null}
    </View>
  );
}

/** "How historians read this": used wherever scholars disagree. */
export function PerspectivesCallout({ children, title = 'How historians read this' }: { children: ReactNode; title?: string }) {
  const { paper } = useTheme();
  return (
    <View style={{ borderRadius: 22, padding: space.lg + 2, gap: space.sm, backgroundColor: paper.calloutBg, borderWidth: 1, borderColor: paper.rule }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
        <Icon name="scales" size={18} tint={paper.ink} />
        <Txt variant="label" tint={paper.ink}>
          {title}
        </Txt>
      </View>
      <Txt variant="ui" tint={paper.ink} style={{ fontSize: 15, lineHeight: 23 }}>
        {children}
      </Txt>
    </View>
  );
}
