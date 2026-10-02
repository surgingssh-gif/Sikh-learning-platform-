import { Text, type TextProps } from 'react-native';

import { textStyle, useColors, type Palette, type TextVariant } from '@/theme';

/** All text goes through Txt so type stays on the scale. `tone` picks a palette colour. */
export function Txt({
  variant = 'body',
  tone = 'ink',
  style,
  ...rest
}: TextProps & { variant?: TextVariant; tone?: keyof Palette }) {
  const c = useColors();
  return <Text {...rest} style={[textStyle[variant], { color: c[tone] }, style]} />;
}
