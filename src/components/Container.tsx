import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

import { layout } from '@/theme';

/** Centres content at the site's max width with side gutters. `narrow` is article width. */
export function Container({ children, narrow = false, style }: { children: ReactNode; narrow?: boolean; style?: ViewStyle }) {
  return (
    <View style={[{ width: '100%', maxWidth: narrow ? layout.articleWidth + layout.gutter * 2 : layout.maxWidth, alignSelf: 'center', paddingHorizontal: layout.gutter }, style]}>
      {children}
    </View>
  );
}
