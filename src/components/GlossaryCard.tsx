import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { Term } from '@/content';
import { space, useColors } from '@/theme';

import { Txt } from './Txt';

/** Gurmukhi, transliteration and English together, in that order. */
export function GlossaryCard({ term, onClose, compact = false }: { term: Term; onClose?: () => void; compact?: boolean }) {
  const c = useColors();
  return (
    <View
      style={{
        borderLeftWidth: compact ? 0 : 3,
        borderLeftColor: c.accent,
        backgroundColor: compact ? 'transparent' : c.surface,
        paddingVertical: compact ? 0 : space.lg,
        paddingHorizontal: compact ? 0 : space.lg,
        flexDirection: 'row',
        gap: space.md,
      }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Txt variant="gurmukhi" style={{ fontSize: compact ? 28 : 22, lineHeight: compact ? 40 : 32 }}>
          {term.gurmukhi}
        </Txt>
        <Txt variant="translit" tone="accent">
          {term.translit}
        </Txt>
        <Txt variant="bodySmall" tone="ink2">
          {term.english}
        </Txt>
      </View>
      {onClose ? (
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close definition" style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginTop: -space.sm, marginRight: -space.sm }}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c.muted} strokeWidth={2} strokeLinecap="round">
            <Path d="M6 6l12 12M18 6 6 18" />
          </Svg>
        </Pressable>
      ) : null}
    </View>
  );
}
