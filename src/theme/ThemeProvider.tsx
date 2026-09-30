import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { useColorScheme, type View } from 'react-native';

import { backdrops, defaultBackdrop, type BackdropName, type BackdropPreset } from './backdrops';
import { paper, type PaperPalette } from './tokens';

type Theme = {
  backdropName: BackdropName;
  backdrop: BackdropPreset;
  paper: PaperPalette;
  scheme: 'light' | 'dark';
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  backdrop = defaultBackdrop,
  scheme: forcedScheme,
  children,
}: {
  backdrop?: BackdropName;
  scheme?: 'light' | 'dark';
  children: ReactNode;
}) {
  const system = useColorScheme();
  const scheme = forcedScheme ?? (system === 'dark' ? 'dark' : 'light');
  const value = useMemo<Theme>(
    () => ({ backdropName: backdrop, backdrop: backdrops[backdrop], paper: paper[scheme], scheme }),
    [backdrop, scheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used inside <ThemeProvider>');
  return theme;
}

/**
 * Android's blur needs a reference to the view it blurs (the backdrop).
 * <Screen> provides it; <Glass> reads it.
 */
export const BlurTargetContext = createContext<RefObject<View | null> | null>(null);

export function useBlurTargetRef() {
  return useRef<View | null>(null);
}

export function useBlurTarget() {
  return useContext(BlurTargetContext);
}
