import { View } from 'react-native';

import { useColors } from '@/theme';

import { Txt } from './Txt';

/** Small status label. `draft` marks content still waiting for a reviewer. */
export function Badge({ label, tone = 'draft' }: { label: string; tone?: 'draft' | 'done' | 'neutral' }) {
  const c = useColors();
  const color = tone === 'draft' ? c.accent : tone === 'done' ? c.correct : c.muted;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color }} />
      <Txt variant="kicker" style={{ color, letterSpacing: 0.8 }}>
        {label}
      </Txt>
    </View>
  );
}
