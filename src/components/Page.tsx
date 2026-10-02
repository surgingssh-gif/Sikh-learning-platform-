import Head from 'expo-router/head';
import { useState, type ReactNode } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { site, useColors } from '@/theme';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

/** Every route renders inside Page: head tags, header, content, footer, and an optional reading-progress bar. */
export function Page({
  title,
  description = site.description,
  masthead = false,
  readingProgress = false,
  children,
}: {
  title?: string;
  description?: string;
  masthead?: boolean;
  readingProgress?: boolean;
  children: ReactNode;
}) {
  const c = useColors();
  const [progress, setProgress] = useState(0);
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name}: ${site.tagline}`;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const max = contentSize.height - layoutMeasurement.height;
    setProgress(max > 0 ? Math.min(1, Math.max(0, contentOffset.y / max)) : 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
      </Head>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={readingProgress ? onScroll : undefined}
        scrollEventThrottle={32}
      >
        <SiteHeader variant={masthead ? 'masthead' : 'compact'} />
        {children}
        <SiteFooter />
      </ScrollView>
      {readingProgress ? (
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ position: 'absolute', top: 0, left: 0, height: 3, width: `${progress * 100}%`, backgroundColor: c.accent }}
        />
      ) : null}
    </View>
  );
}
