import { Text, type TextProps } from 'react-native';

import { color, textStyle, type TextVariant } from '@/theme';

/** All text in the app goes through Txt so type styles stay on the scale. */
export function Txt({
  variant = 'ui',
  tint = color.onGlass,
  style,
  ...rest
}: TextProps & { variant?: TextVariant; tint?: string }) {
  return <Text {...rest} style={[textStyle[variant], { color: tint }, style]} />;
}
