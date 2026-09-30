import { useEffect } from 'react';
import { type DimensionValue } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

/** Soft pulsing placeholder shaped like the content it stands in for. */
export function Skeleton({ width = '100%', height = 14, radius = 7 }: { width?: DimensionValue; height?: number; radius?: number }) {
  const reduced = useReducedMotion();
  const o = useSharedValue(0.35);
  useEffect(() => {
    if (!reduced) o.set(withRepeat(withTiming(0.7, { duration: 850 }), -1, true));
  }, [o, reduced]);
  const style = useAnimatedStyle(() => ({ opacity: o.get() }));
  return <Animated.View style={[{ width, height, borderRadius: radius, backgroundColor: 'rgba(255,255,255,0.28)' }, style]} />;
}
