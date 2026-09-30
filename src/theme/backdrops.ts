export type BackdropPreset = {
  base: string;
  glow: string;
  wall: string;
  floor: string;
  scrim: string;
  /** Tint laid over the blur on glass surfaces. Tuned per preset so white text stays readable. */
  glass: string;
};

export const backdrops = {
  mist: { base: '#8C97AE', glow: '#B4BDD0', wall: '#76819A', floor: '#66718A', scrim: 'rgba(16,20,34,0.18)', glass: 'rgba(30,38,60,0.24)' },
  sage: { base: '#97A08C', glow: '#B8BFA8', wall: '#7F8A76', floor: '#6E7866', scrim: 'rgba(18,24,16,0.20)', glass: 'rgba(34,42,32,0.26)' },
  marble: { base: '#D9D6D0', glow: '#EDE3CF', wall: '#C3BFB8', floor: '#B2ADA5', scrim: 'rgba(20,20,24,0.20)', glass: 'rgba(40,40,48,0.40)' },
  sandstone: { base: '#D8CCBA', glow: '#E6D2B0', wall: '#BBA892', floor: '#A7937E', scrim: 'rgba(30,22,16,0.18)', glass: 'rgba(58,46,38,0.34)' },
  slate: { base: '#98A1AC', glow: '#B9C2CB', wall: '#7F8995', floor: '#6C7682', scrim: 'rgba(14,18,26,0.22)', glass: 'rgba(40,46,56,0.22)' },
  night: { base: '#1E2840', glow: '#5E5A58', wall: '#161F35', floor: '#1C2640', scrim: 'rgba(6,10,20,0.10)', glass: 'rgba(255,255,255,0.08)' },
} as const satisfies Record<string, BackdropPreset>;

export type BackdropName = keyof typeof backdrops;

export const defaultBackdrop: BackdropName = 'mist';
