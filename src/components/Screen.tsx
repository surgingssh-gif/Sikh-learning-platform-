import { BlurTargetView } from 'expo-blur';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BlurTargetContext, space, useBlurTargetRef } from '@/theme';

import { Backdrop } from './Backdrop';

/**
 * Root of every screen: the blurred backdrop plus safe-area padding.
 * Glass surfaces inside blur the backdrop (Android needs the target ref).
 */
export function Screen({
  children,
  scroll = true,
  contentStyle,
  bottomInset = 0,
  overlay,
}: {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
  /** Extra space at the bottom, e.g. for a floating tab bar. */
  bottomInset?: number;
  /** Absolutely positioned content drawn above the scroll view (tab bar, sheets). */
  overlay?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const target = useBlurTargetRef();
  const padding: ViewStyle = {
    paddingTop: insets.top + space.lg,
    paddingBottom: insets.bottom + space.xxl + bottomInset,
    paddingHorizontal: space.gutter,
    gap: space.md,
  };
  return (
    <BlurTargetContext.Provider value={target}>
      <View style={styles.root}>
        <BlurTargetView ref={target} style={StyleSheet.absoluteFill}>
          <Backdrop />
        </BlurTargetView>
        {scroll ? (
          <ScrollView contentContainerStyle={[padding, contentStyle]} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.root, padding, contentStyle]}>{children}</View>
        )}
        {overlay}
      </View>
    </BlurTargetContext.Provider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
