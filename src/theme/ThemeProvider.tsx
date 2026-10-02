import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';

import { layout, palettes, type Palette } from './tokens';

const ThemeContext = createContext<Palette>(palettes.light);

/** Light only for now. The dark palette exists in tokens.ts; switching it on is a later task. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={palettes.light}>{children}</ThemeContext.Provider>;
}

export function useColors(): Palette {
  return useContext(ThemeContext);
}

/** Breakpoints: phone below 700, tablet 700–959, desktop 960 and up. */
export function useBreakpoint() {
  const { width: measured } = useWindowDimensions();
  // The static HTML is rendered without a window, so the first client render uses the
  // phone layout too; the real width applies right after hydration. This keeps them in sync.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const width = hydrated ? measured : 0;
  return { width, isDesktop: width >= layout.desktop, isTablet: width >= layout.tablet };
}

const noopSubscribe = () => () => {};
