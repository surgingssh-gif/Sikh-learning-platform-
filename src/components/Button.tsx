import { View, type StyleProp, type ViewStyle } from 'react-native';

import { color, minTouch, radius, shadow, space } from '@/theme';

import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Variant = 'kesri' | 'bevel';

/**
 * Pill button. `kesri` is the one primary action on a screen; `bevel` is everything else.
 * Pass only `icon` (no label) for a round icon button; `accessibilityLabel` is then required.
 */
export function Button({
  label,
  icon,
  iconPosition = 'end',
  variant = 'kesri',
  size = 'md',
  onPress,
  disabled,
  accessibilityLabel,
  style,
}: {
  label?: string;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const height = size === 'sm' ? minTouch : size === 'lg' ? 64 : 54;
  const iconOnly = !label && !!icon;
  const ink = variant === 'kesri' ? color.navy : color.onGlass;
  const surface: ViewStyle =
    variant === 'kesri'
      ? { backgroundColor: color.kesri, boxShadow: shadow.kesri }
      : { backgroundColor: color.bevelFill, borderWidth: 1.5, borderColor: color.bevelEdge, boxShadow: shadow.bevel };

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      style={[
        {
          height,
          minWidth: height,
          borderRadius: radius.pill,
          paddingHorizontal: iconOnly ? 0 : size === 'lg' ? space.xxxl : space.xxl,
          flexDirection: iconPosition === 'start' ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: space.sm,
          opacity: disabled ? 0.5 : 1,
        },
        surface,
        style,
      ]}
    >
      {label ? (
        <Txt variant="button" tint={ink} style={size === 'lg' ? { fontSize: 18 } : undefined}>
          {label}
        </Txt>
      ) : null}
      {icon ? (
        <View>
          <Icon name={icon} tint={ink} size={iconOnly ? (size === 'lg' ? 24 : 20) : 18} strokeWidth={2.2} />
        </View>
      ) : null}
    </PressableScale>
  );
}
