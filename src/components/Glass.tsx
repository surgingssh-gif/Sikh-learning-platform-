import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { color, radius as radii, shadow, useBlurTarget, useTheme } from '@/theme';

type Variant = 'glass' | 'smoke' | 'tile';

/**
 * Frosted surface. `glass` for panels over the backdrop, `smoke` for popovers
 * over paper, `tile` for rows nested inside a glass panel (no extra blur).
 */
export function Glass({
  variant = 'glass',
  radius = radii.panel,
  style,
  children,
}: {
  variant?: Variant;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const { backdrop } = useTheme();
  const target = useBlurTarget();

  if (variant === 'tile') {
    return (
      <View
        style={[
          { borderRadius: radius, backgroundColor: color.tileFill, borderWidth: 1, borderColor: color.tileEdge, boxShadow: shadow.tile },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  const tint = variant === 'smoke' ? color.smoke : backdrop.glass;
  const edge = variant === 'smoke' ? color.smokeEdge : color.glassEdge;
  const blur = variant === 'smoke' ? 24 : 30;

  return (
    <View style={[{ borderRadius: radius, boxShadow: variant === 'smoke' ? shadow.smoke : shadow.glass }, style]}>
      <View style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden' }]} pointerEvents="none">
        {Platform.OS === 'web' ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              // RN-web passes these through to CSS.
              { backdropFilter: `blur(${blur}px) saturate(150%)`, WebkitBackdropFilter: `blur(${blur}px) saturate(150%)` } as ViewStyle,
            ]}
          />
        ) : (
          <BlurView
            intensity={variant === 'smoke' ? 40 : 50}
            tint="default"
            blurMethod="dimezisBlurViewSdk31Plus"
            blurTarget={target ?? undefined}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: tint }]} />
      </View>
      <View
        style={[StyleSheet.absoluteFill, { borderRadius: radius, borderWidth: 1, borderColor: edge }]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}
