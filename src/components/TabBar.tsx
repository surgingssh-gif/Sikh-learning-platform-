import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color, radius, space } from '@/theme';

import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

export type TabItem = { key: string; label: string; icon: IconName };

export const TAB_BAR_HEIGHT = 66;

/** Floating glass pill tab bar. */
export function TabBar({ tabs, active, onChange }: { tabs: TabItem[]; active: string; onChange?: (key: string) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ position: 'absolute', left: space.lg, right: space.lg, bottom: Math.max(insets.bottom, space.lg) + 4 }}>
      <Glass radius={radius.pill} style={{ height: TAB_BAR_HEIGHT, padding: 7, flexDirection: 'row', gap: 2 }}>
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <PressableScale
              key={t.key}
              onPress={() => onChange?.(t.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
              style={[
                { flex: 1, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', gap: 2, height: TAB_BAR_HEIGHT - 14 },
                on && { backgroundColor: 'rgba(255,255,255,0.22)', boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.4)' },
              ]}
            >
              <Icon name={t.icon} size={20} tint={on ? color.onGlass : 'rgba(255,255,255,0.8)'} />
              <Txt variant="caption" tint={on ? color.onGlass : 'rgba(255,255,255,0.8)'} style={{ fontSize: 10, lineHeight: 13 }}>
                {t.label}
              </Txt>
            </PressableScale>
          );
        })}
      </Glass>
    </View>
  );
}
