import { View } from 'react-native';

import { radius, textStyle } from '@/theme';

import { Txt } from './Txt';

/** Small outlined pill, e.g. "Draft · awaiting review". Dashed = provisional. */
export function Badge({ label, tint, dashed = false }: { label: string; tint: string; dashed?: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderStyle: dashed ? 'dashed' : 'solid',
        borderColor: tint,
        alignSelf: 'flex-start',
      }}
    >
      <Txt tint={tint} style={[textStyle.caption, { fontSize: 11, lineHeight: 15 }]}>
        {label}
      </Txt>
    </View>
  );
}
