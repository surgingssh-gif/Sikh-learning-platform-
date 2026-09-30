import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { color } from '@/theme';

const glyphs = {
  home: <Path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  learn: (
    <>
      <Path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <Path d="M4 19V5" />
    </>
  ),
  timeline: (
    <>
      <Path d="M3 12h18M12 7v10" />
      <Circle cx={7} cy={12} r={2} />
      <Circle cx={17} cy={12} r={2} />
    </>
  ),
  map: (
    <>
      <Path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <Path d="M9 3v15M15 6v15" />
    </>
  ),
  glossary: <Path d="M4 7V4h16v3M9 20h6M12 4v16" />,
  arrowRight: <Path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <Path d="M12 19V5M6 11l6-6 6 6" />,
  chevronLeft: <Path d="M15 6l-6 6 6 6" />,
  close: <Path d="M6 6l12 12M18 6 6 18" />,
  check: <Path d="M5 12.5l4.5 4.5L19 7.5" />,
  bookmark: <Path d="M6 3h12v18l-6-4-6 4z" />,
  speaker: (
    <>
      <Path d="M11 5 6 9H3v6h3l5 4z" />
      <Path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  flame: <Path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-6 1-9.5z" />,
  lock: (
    <>
      <Rect x={5} y={11} width={14} height={10} rx={2} />
      <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  target: (
    <>
      <Circle cx={12} cy={12} r={9} />
      <Path d="M8 12.5l3 3 5-6" />
    </>
  ),
  scales: <Path d="M12 3v18M5 7h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0z" />,
} as const;

export type IconName = keyof typeof glyphs;

export function Icon({
  name,
  size = 22,
  tint = color.onGlass,
  strokeWidth = 2,
}: {
  name: IconName;
  size?: number;
  tint?: string;
  strokeWidth?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={tint}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphs[name]}
    </Svg>
  );
}
