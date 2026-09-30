import { View } from 'react-native';

import { color } from '@/theme';

export function ProgressBar({
  progress,
  height = 5,
  track = color.onGlassFaint,
  fill = color.kesriGlow,
}: {
  progress: number;
  height?: number;
  track?: string;
  fill?: string;
}) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View
      style={{ height, borderRadius: height / 2, backgroundColor: track, overflow: 'hidden' }}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
    >
      <View style={{ width: `${pct}%`, height, borderRadius: height / 2, backgroundColor: fill }} />
    </View>
  );
}

/** One segment per question: done-correct, done-wrong, current, upcoming. */
export function SegmentedProgress({ states }: { states: ('correct' | 'incorrect' | 'current' | 'upcoming')[] }) {
  const fillFor = {
    correct: color.correct,
    incorrect: color.incorrect,
    current: color.kesriGlow,
    upcoming: color.onGlassFaint,
  } as const;
  return (
    <View style={{ flexDirection: 'row', gap: 5, flex: 1 }}>
      {states.map((s, i) => (
        <View key={i} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: fillFor[s] }} />
      ))}
    </View>
  );
}
