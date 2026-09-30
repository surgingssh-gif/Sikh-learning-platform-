import { View } from 'react-native';

import { color, radius, space } from '@/theme';

import { Button } from './Button';
import { Glass } from './Glass';
import { Txt } from './Txt';

export type GlossaryTerm = { gurmukhi: string; translit: string; english: string };

/**
 * Gurmukhi, transliteration and English together, with a pronunciation button.
 * `glass` sits on the backdrop (word of the day); `smoke` pops over paper in lessons.
 */
export function GlossaryCard({
  term,
  kicker = 'Glossary',
  variant = 'glass',
  onPlay,
}: {
  term: GlossaryTerm;
  kicker?: string;
  variant?: 'glass' | 'smoke';
  onPlay?: () => void;
}) {
  return (
    <Glass
      variant={variant}
      radius={variant === 'smoke' ? 24 : radius.panel - 2}
      style={{ padding: space.lg + 2, flexDirection: 'row', alignItems: 'center', gap: space.md + 2 }}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <Txt variant="label" tint={color.onGlassMuted}>
          {kicker}
        </Txt>
        <Txt variant="gurmukhi" style={variant === 'smoke' ? { fontSize: 22, lineHeight: 31 } : undefined}>
          {term.gurmukhi}
        </Txt>
        <Txt variant="translit" tint={color.kesriLight}>
          {term.translit}
        </Txt>
        <Txt variant="ui" tint="rgba(255,255,255,0.82)" style={{ fontSize: 14, lineHeight: 20 }}>
          {term.english}
        </Txt>
      </View>
      <Button variant="bevel" icon="speaker" accessibilityLabel={`Play pronunciation of ${term.translit}`} onPress={onPlay} />
    </Glass>
  );
}
