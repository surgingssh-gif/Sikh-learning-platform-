import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { color, motion, radius, space } from '@/theme';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

export type QuizOptionState = 'idle' | 'correct' | 'incorrect' | 'dimmed';

const look: Record<QuizOptionState, { bg: string; border: string; badgeBg: string; badgeInk: string }> = {
  idle: { bg: 'rgba(255,255,255,0.10)', border: 'rgba(255,255,255,0.45)', badgeBg: 'rgba(255,255,255,0.16)', badgeInk: color.onGlass },
  correct: { bg: color.correctBg, border: color.correct, badgeBg: color.correct, badgeInk: color.correctInk },
  incorrect: { bg: color.incorrectBg, border: color.incorrect, badgeBg: color.incorrect, badgeInk: color.incorrectInk },
  dimmed: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.22)', badgeBg: 'rgba(255,255,255,0.10)', badgeInk: color.onGlassMuted },
};

/** Bevelled pill answer. Pops on correct, shakes on incorrect. */
export function QuizOption({
  letter,
  label,
  state = 'idle',
  onPress,
}: {
  letter: string;
  label: string;
  state?: QuizOptionState;
  onPress?: () => void;
}) {
  const reduced = useReducedMotion();
  const scale = useSharedValue(1);
  const shift = useSharedValue(0);

  useEffect(() => {
    if (reduced) return;
    if (state === 'correct') {
      scale.set(withSequence(withSpring(motion.correctScale + 0.03, motion.spring), withSpring(motion.correctScale, motion.spring)));
    } else if (state === 'incorrect') {
      shift.set(withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 70 }),
        withTiming(-5, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      ));
    } else {
      scale.set(withSpring(1, motion.spring));
    }
  }, [state, reduced, scale, shift]);

  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }, { translateX: shift.get() }] }));
  const l = look[state];
  const answered = state !== 'idle';

  return (
    <Animated.View style={animated}>
      <PressableScale
        onPress={onPress}
        disabled={answered}
        hapticOnPress={false}
        accessibilityRole="button"
        accessibilityLabel={`${letter}. ${label}`}
        accessibilityState={{ disabled: answered, selected: state === 'correct' || state === 'incorrect' }}
        style={{
          minHeight: 60,
          flexDirection: 'row',
          alignItems: 'center',
          gap: space.md + 2,
          paddingVertical: space.sm,
          paddingLeft: space.sm,
          paddingRight: space.lg + 2,
          borderRadius: radius.pill,
          borderWidth: 1.5,
          borderColor: l.border,
          backgroundColor: l.bg,
          boxShadow: 'inset 0px 2px 6px rgba(255,255,255,0.22), inset 0px -4px 10px rgba(0,0,0,0.14), 0px 6px 14px rgba(0,0,0,0.16)',
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: l.badgeBg,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.4)',
          }}
        >
          <Txt variant="label" tint={l.badgeInk} style={{ fontSize: 14, letterSpacing: 0 }}>
            {letter}
          </Txt>
        </View>
        <Txt variant="ui" style={{ fontSize: 17, lineHeight: 22, flex: 1 }} tint={state === 'dimmed' ? color.onGlassMuted : color.onGlass}>
          {label}
        </Txt>
      </PressableScale>
    </Animated.View>
  );
}
