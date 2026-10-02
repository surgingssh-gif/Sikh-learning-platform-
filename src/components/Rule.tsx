import { View, type ViewStyle } from 'react-native';

import { useColors } from '@/theme';

/** Newspaper rules: hairline grey, strong black, or the double rule under the masthead. */
export function Rule({ kind = 'hair', vertical = false, style }: { kind?: 'hair' | 'strong' | 'double'; vertical?: boolean; style?: ViewStyle }) {
  const c = useColors();
  if (kind === 'double') {
    return (
      <View style={[{ gap: 2 }, style]}>
        <View style={{ height: 1, backgroundColor: c.ruleStrong }} />
        <View style={{ height: 1, backgroundColor: c.ruleStrong }} />
      </View>
    );
  }
  const color = kind === 'strong' ? c.ruleStrong : c.rule;
  const size = kind === 'strong' ? 2 : 1;
  return <View style={[vertical ? { width: 1, alignSelf: 'stretch', backgroundColor: color } : { height: size, backgroundColor: color }, style]} />;
}
