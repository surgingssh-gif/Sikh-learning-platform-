import { View } from 'react-native';

import { useColors } from '@/theme';

export function ProgressBar({ value, height = 3 }: { value: number; height?: number }) {
  const c = useColors();
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={{ height, backgroundColor: c.rule }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}>
      <View style={{ width: `${pct}%`, height, backgroundColor: c.accent }} />
    </View>
  );
}
