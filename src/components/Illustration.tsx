import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IllustrationName = 'bein' | 'road' | 'fields';

/**
 * Placeholder editorial illustrations in a muted palette, drawn at 3:2.
 * To be replaced by commissioned artwork.
 */
export function Illustration({ name, label }: { name: IllustrationName; label: string }) {
  return (
    <View style={{ width: '100%', aspectRatio: 3 / 2 }} accessible accessibilityRole="image" accessibilityLabel={label}>
      <Svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        {name === 'bein' ? <Bein /> : name === 'road' ? <Road /> : <Fields />}
      </Svg>
    </View>
  );
}

function Bein() {
  return (
    <>
      <Rect width={600} height={400} fill="#EFE6D6" />
      <Circle cx={420} cy={170} r={56} fill="#D98A2B" />
      <Path d="M0 210 C120 190 240 205 360 196 C460 189 540 200 600 194 L600 400 L0 400 Z" fill="#D6C7A6" />
      <Path d="M0 245 C140 232 280 248 420 238 C500 232 560 240 600 236 L600 400 L0 400 Z" fill="#B9A57C" />
      <Path d="M0 290 C150 274 330 304 600 282 L600 352 C360 378 160 336 0 362 Z" fill="#2B3A55" />
      <Path d="M60 310 C160 302 260 322 380 312" stroke="#E7B871" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M220 336 C300 330 400 342 500 326" stroke="#E7B871" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.7} />
      <Path d="M80 212 L80 160 M80 168 C60 154 62 132 80 124 C98 132 100 154 80 168" stroke="#1E2A3E" strokeWidth={4} fill="#1E2A3E" />
      <Path d="M128 206 L128 172 M128 178 C114 168 116 152 128 146 C140 152 142 168 128 178" stroke="#1E2A3E" strokeWidth={3} fill="#1E2A3E" />
      <Rect x={210} y={176} width={44} height={26} fill="#1E2A3E" />
      <Rect x={258} y={184} width={30} height={18} fill="#1E2A3E" />
      <Path d="M206 176 L232 158 L258 176 Z" fill="#1E2A3E" />
    </>
  );
}

function Road() {
  return (
    <>
      <Rect width={600} height={400} fill="#EDE7DC" />
      <Circle cx={150} cy={120} r={40} fill="#D98A2B" />
      <Path d="M0 210 L120 130 L230 200 L340 110 L470 190 L600 120 L600 400 L0 400 Z" fill="#C9BDA6" />
      <Path d="M0 260 C140 230 260 250 380 236 C480 226 560 238 600 232 L600 400 L0 400 Z" fill="#A99572" />
      <Path d="M300 400 C300 340 330 300 380 268 C410 250 440 244 470 240" stroke="#EFE6D6" strokeWidth={26} fill="none" />
      <Path d="M300 400 C300 340 330 300 380 268 C410 250 440 244 470 240" stroke="#D8CBB0" strokeWidth={2} fill="none" strokeDasharray="8 10" />
      <Circle cx={392} cy={238} r={7} fill="#1E2A3E" />
      <Path d="M384 246 L400 246 L404 276 L380 276 Z" fill="#1E2A3E" />
      <Circle cx={414} cy={236} r={6} fill="#2B3A55" />
      <Path d="M407 243 L421 243 L424 270 L404 270 Z" fill="#2B3A55" />
      <Path d="M424 250 L440 236" stroke="#2B3A55" strokeWidth={3} strokeLinecap="round" />
    </>
  );
}

function Fields() {
  const rows = Array.from({ length: 7 }, (_, i) => i);
  return (
    <>
      <Rect width={600} height={400} fill="#EEE8DA" />
      <Circle cx={480} cy={110} r={44} fill="#D98A2B" />
      <Path d="M0 190 C160 176 320 186 600 172 L600 400 L0 400 Z" fill="#C3B58F" />
      {rows.map((i) => (
        <Path key={i} d={`M${-40 + i * 10} ${400} L${260 + i * 22} 196`} stroke="#9C8B5E" strokeWidth={6} opacity={0.55} />
      ))}
      <Path d="M0 300 C200 290 400 310 600 296 L600 330 C400 344 200 322 0 334 Z" fill="#2B3A55" opacity={0.85} />
      <Rect x={380} y={150} width={70} height={34} fill="#1E2A3E" />
      <Path d="M372 150 L415 122 L458 150 Z" fill="#1E2A3E" />
      <Rect x={404} y={164} width={14} height={20} fill="#EEE8DA" />
    </>
  );
}
