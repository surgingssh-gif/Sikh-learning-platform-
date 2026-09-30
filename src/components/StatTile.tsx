import { color, radius, space } from '@/theme';

import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

export function StatTile({ icon, value, label, accent = false }: { icon: IconName; value: string; label: string; accent?: boolean }) {
  return (
    <Glass radius={radius.tile + 2} style={{ flex: 1, padding: 14, gap: space.sm + 2 }}>
      <Icon name={icon} size={20} tint={accent ? color.kesriGlow : color.onGlass} />
      <Txt variant="stat">{value}</Txt>
      <Txt variant="caption" tint={color.onGlassMuted} style={{ fontSize: 12 }}>
        {label}
      </Txt>
    </Glass>
  );
}
