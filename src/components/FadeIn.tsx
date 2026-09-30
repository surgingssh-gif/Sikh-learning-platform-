import { useEffect, type ReactNode } from 'react';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { motion } from '@/theme';

/** Glass panels fade and rise into place on mount. Stagger with `index`. */
export function FadeIn({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const reduced = useReducedMotion();
  const progress = useSharedValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    progress.set(withDelay(index * 60, withTiming(1, { duration: motion.durationBase * 2, easing: Easing.out(Easing.cubic) })));
  }, [index, progress, reduced]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ translateY: (1 - progress.get()) * motion.enterRise }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
