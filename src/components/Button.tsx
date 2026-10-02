import { Link, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { minTouch, radius, space, useColors } from '@/theme';

import { Txt } from './Txt';

type Props = { label: string; variant?: 'solid' | 'outline'; style?: ViewStyle } & ({ href: Href; onPress?: never } | { onPress: () => void; href?: never });

/** Rectangular button. Solid ink for the main action, outline for the rest. Renders a real link when given `href`. */
export function Button({ label, variant = 'solid', href, onPress, style }: Props) {
  const c = useColors();
  const [hovered, setHovered] = useState(false);
  const solid = variant === 'solid';
  // A flat, static style object: Link's asChild drops style functions and mishandles arrays.
  const body = (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole={href ? 'link' : 'button'}
      style={StyleSheet.flatten([
        {
          minHeight: minTouch,
          paddingHorizontal: space.xl,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: c.ink,
          backgroundColor: solid ? c.ink : hovered ? c.surface : 'transparent',
          opacity: solid && hovered ? 0.85 : 1,
          alignSelf: 'flex-start',
        },
        style,
      ])}
    >
      <Txt variant="uiBold" style={{ color: solid ? c.onInk : c.ink, fontSize: 14 }}>
        {label}
      </Txt>
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {body}
    </Link>
  ) : (
    body
  );
}
