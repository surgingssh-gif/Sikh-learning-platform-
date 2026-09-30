import { StyleSheet, View } from 'react-native';
import Svg, { Circle, FeGaussianBlur, Filter, G, Path, Rect } from 'react-native-svg';

import { useTheme } from '@/theme';

/**
 * Blurred gurdwara-colonnade scene that every screen floats on.
 * Drawn once in a 390×844 box and scaled to cover.
 */
export function Backdrop() {
  const { backdrop: b } = useTheme();
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: b.base }]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <Filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <FeGaussianBlur stdDeviation={34} />
        </Filter>
        <Rect width={390} height={844} fill={b.base} />
        <G filter="url(#soft)">
          <Circle cx={250} cy={330} r={150} fill={b.glow} />
          <Path
            d="M-40 -40 H430 V640 H370 V300 Q370 200 305 150 Q240 200 240 300 V640 H200 V300 Q200 200 135 150 Q70 200 70 300 V640 H30 V300 Q30 230 -40 190 Z"
            fill={b.wall}
          />
          <Rect x={-40} y={620} width={470} height={264} fill={b.floor} />
          <Rect x={-40} y={610} width={470} height={18} fill={b.glow} opacity={0.3} />
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: b.scrim }]} />
    </View>
  );
}
