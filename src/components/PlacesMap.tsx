import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

import type { PeriodId, Place } from '@/content';
import { font, space, useColors } from '@/theme';

import { Txt } from './Txt';

/** Simple equirectangular projection for the central Punjab plains. */
const BOUNDS = { lonMin: 73.35, lonMax: 76.85, latMin: 30.65, latMax: 32.65 };
const COS = Math.cos((31.65 * Math.PI) / 180);
const W = 1000;
const K = W / ((BOUNDS.lonMax - BOUNDS.lonMin) * COS);
const H = Math.round((BOUNDS.latMax - BOUNDS.latMin) * K);
const px = (lon: number, lat: number) => [(lon - BOUNDS.lonMin) * COS * K, (BOUNDS.latMax - lat) * K] as const;
const path = (pts: [number, number][]) => pts.map(([lon, lat], i) => `${i ? 'L' : 'M'}${px(lon, lat).map((n) => n.toFixed(1)).join(' ')}`).join(' ');

/** Simplified river courses and border, as [lon, lat] points. Approximate, for orientation only. */
const RIVERS: { name: string; label: [number, number]; pts: [number, number][]; minor?: boolean }[] = [
  { name: 'Chenab', label: [73.62, 32.3], pts: [[74.75, 32.8], [74.47, 32.67], [74.12, 32.45], [73.8, 32.2], [73.35, 31.95]] },
  { name: 'Ravi', label: [75.32, 32.32], pts: [[75.95, 32.65], [75.65, 32.42], [75.35, 32.25], [75.03, 32.05], [74.8, 31.88], [74.55, 31.72], [74.3, 31.63], [74.05, 31.5], [73.8, 31.3], [73.35, 31.02]] },
  { name: 'Beas', label: [75.7, 31.98], pts: [[76.5, 32.1], [76.0, 31.95], [75.65, 31.9], [75.42, 31.65], [75.28, 31.5], [75.15, 31.37], [74.95, 31.17]] },
  { name: 'Bein', label: [75.5, 31.6], minor: true, pts: [[75.55, 31.7], [75.38, 31.42], [75.22, 31.23], [75.02, 31.16]] },
  { name: 'Sutlej', label: [75.95, 30.9], pts: [[76.85, 31.62], [76.55, 31.45], [76.52, 31.2], [76.52, 30.98], [76.2, 30.95], [75.8, 31.02], [75.35, 31.12], [74.95, 31.17], [74.62, 30.95], [74.3, 30.65]] },
];
const BORDER: [number, number][] = [[74.85, 32.65], [75.05, 32.35], [75.03, 32.06], [74.85, 31.92], [74.62, 31.72], [74.57, 31.6], [74.55, 31.35], [74.52, 31.1], [74.55, 30.99], [74.38, 30.65]];

/** Label placement per place, to keep close neighbours readable. */
const LABEL: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
  'khadur-sahib': { dx: -12, dy: -8, anchor: 'end' },
  'goindwal-sahib': { dx: 12, dy: 16, anchor: 'start' },
  'anandpur-sahib': { dx: -12, dy: -6, anchor: 'end' },
  'kiratpur-sahib': { dx: -8, dy: 26, anchor: 'end' },
  lahore: { dx: -12, dy: 5, anchor: 'end' },
  kartarpur: { dx: 12, dy: -6, anchor: 'start' },
};

export const PERIODS: { id: PeriodId | 'all'; label: string }[] = [
  { id: 'all', label: 'All places' },
  { id: 'guru-nanak', label: 'Guru Nanak Dev Ji · 1469–1539' },
  { id: 'early-gurus', label: 'Early Gurus · 1539–1606' },
  { id: 'khalsa', label: 'To the Khalsa · 1606–1708' },
];

export function PlacesMap({ places, selected, onSelect }: { places: Place[]; selected?: string; onSelect: (id: string) => void }) {
  const c = useColors();
  const [period, setPeriod] = useState<PeriodId | 'all'>('all');
  const active = (p: Place) => period === 'all' || p.periods.includes(period);

  return (
    <View style={{ gap: space.md }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }} accessibilityRole="radiogroup" accessibilityLabel="Filter places by period">
        {PERIODS.map((p) => {
          const on = p.id === period;
          return (
            <Pressable
              key={p.id}
              onPress={() => setPeriod(p.id)}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              style={{ minHeight: 36, paddingHorizontal: space.md, justifyContent: 'center', borderWidth: 1, borderColor: on ? c.ink : c.rule, backgroundColor: on ? c.ink : 'transparent', borderRadius: 999 }}
            >
              <Txt variant="byline" style={{ color: on ? c.onInk : c.ink2 }}>
                {p.label}
              </Txt>
            </Pressable>
          );
        })}
      </View>

      <View style={{ width: '100%', aspectRatio: W / H, borderWidth: 1, borderColor: c.rule }}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} accessibilityLabel="Map of central Punjab with places from the lessons">
          <Rect x={0} y={0} width={W} height={H} fill={c.surface} />
          {RIVERS.map((r) => (
            <G key={r.name}>
              <Path d={path(r.pts)} stroke={c.water} strokeWidth={r.minor ? 2 : 4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <SvgText x={px(...r.label)[0]} y={px(...r.label)[1]} fill={c.water} fontSize={r.minor ? 16 : 20} fontFamily={font.serifItalic}>
                {r.name}
              </SvgText>
            </G>
          ))}
          <Path d={path(BORDER)} stroke={c.muted} strokeWidth={2} strokeDasharray="10 8" fill="none" />
          <SvgText x={px(74.2, 30.75)[0]} y={px(74.2, 30.75)[1]} fill={c.muted} fontSize={14} fontFamily={font.sansSemibold} textAnchor="end">
            PAKISTAN
          </SvgText>
          <SvgText x={px(74.75, 30.75)[0]} y={px(74.75, 30.75)[1]} fill={c.muted} fontSize={14} fontFamily={font.sansSemibold}>
            INDIA
          </SvgText>
          {places.map((p) => {
            const [x, y] = px(p.lon, p.lat);
            const on = active(p);
            const sel = p.id === selected;
            const l = LABEL[p.id] ?? { dx: 12, dy: 6, anchor: 'start' as const };
            return (
              <G key={p.id} onPress={() => onSelect(p.id)} opacity={on ? 1 : 0.25}>
                <Circle cx={x} cy={y} r={22} fill="transparent" />
                <Circle cx={x} cy={y} r={sel ? 10 : 7} fill={sel ? c.accent : c.ink} stroke={c.surface} strokeWidth={3} />
                <SvgText x={x + l.dx} y={y + l.dy} fill={c.ink} fontSize={sel ? 22 : 19} fontFamily={sel ? font.sansBold : font.sansSemibold} textAnchor={l.anchor}>
                  {p.name}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
      <Txt variant="caption" tone="muted">
        Simplified map. Rivers, places and the dashed India–Pakistan border (drawn in 1947) are approximate. Rivers have shifted course over the centuries.
      </Txt>
    </View>
  );
}
