import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { color } from '@/theme';

import { Txt } from './Txt';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Circular progress (0–1) that animates from empty on mount. */
export function ProgressRing({
  progress,
  size = 54,
  stroke = 5,
  track = color.onGlassFaint,
  fill = color.kesriGlow,
  labelTint = color.onGlass,
  showLabel = true,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  track?: string;
  fill?: string;
  labelTint?: string;
  showLabel?: boolean;
}) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const value = useSharedValue(0);

  useEffect(() => {
    value.set(withTiming(Math.max(0, Math.min(1, progress)), { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [progress, value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - value.get()),
  }));

  const pct = Math.round(progress * 100);
  return (
    <View
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      accessibilityRole="progressbar"
      accessibilityLabel={`${pct}% complete`}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
    >
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={fill}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
        />
      </Svg>
      {showLabel ? (
        <Txt variant="uiStrong" tint={labelTint} style={{ fontSize: size < 50 ? 11 : 12 }}>
          {pct}%
        </Txt>
      ) : null}
    </View>
  );
}
