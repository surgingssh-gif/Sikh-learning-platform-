import { View } from 'react-native';

import { color, radius, shadow, space } from '@/theme';

import { Glass } from './Glass';
import { Icon } from './Icon';
import { PressableScale } from './PressableScale';
import { ProgressBar } from './ProgressBar';
import { Txt } from './Txt';

export function UnitRow({
  number,
  title,
  status,
  progress = 0,
  detail,
  onPress,
}: {
  number: number;
  title: string;
  status: 'active' | 'open' | 'locked';
  progress?: number;
  detail?: string;
  onPress?: () => void;
}) {
  const marker =
    status === 'locked' ? (
      <View style={[markerBase, { borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.5)' }]}>
        <Icon name="lock" size={16} />
      </View>
    ) : (
      <View
        style={[
          markerBase,
          status === 'active'
            ? { backgroundColor: color.kesri, boxShadow: 'inset 0px 1px 0px rgba(255,255,255,0.55)' }
            : { backgroundColor: color.bevelFill, borderWidth: 1.5, borderColor: color.bevelEdge, boxShadow: shadow.bevel },
        ]}
      >
        <Txt variant="subheading" tint={status === 'active' ? color.navy : color.onGlass} style={{ fontSize: 19, lineHeight: 24 }}>
          {number}
        </Txt>
      </View>
    );

  return (
    <PressableScale
      onPress={onPress}
      disabled={status === 'locked'}
      accessibilityRole="button"
      accessibilityLabel={`Unit ${number}: ${title}${status === 'locked' ? ', coming soon' : ''}`}
      style={{ opacity: status === 'locked' ? 0.75 : 1 }}
    >
      <Glass variant="tile" radius={radius.inner} style={{ padding: space.md, flexDirection: 'row', alignItems: 'center', gap: space.md }}>
        {marker}
        <View style={{ flex: 1, gap: 6 }}>
          <Txt variant="uiStrong">{title}</Txt>
          {status === 'active' ? <ProgressBar progress={progress} /> : null}
          {detail ? (
            <Txt variant="caption" tint={status === 'locked' ? 'rgba(255,255,255,0.8)' : color.onGlassMuted}>
              {detail}
            </Txt>
          ) : null}
        </View>
      </Glass>
    </PressableScale>
  );
}

const markerBase = { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' } as const;
