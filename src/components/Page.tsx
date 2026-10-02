import Head from 'expo-router/head';
import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { site, useColors } from '@/theme';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

/** Every route renders inside Page: head tags, header, content, footer. */
export function Page({
  title,
  description = site.description,
  masthead = false,
  children,
}: {
  title?: string;
  description?: string;
  masthead?: boolean;
  children: ReactNode;
}) {
  const c = useColors();
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name}: ${site.tagline}`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
      </Head>
      <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ flexGrow: 1 }}>
        <SiteHeader variant={masthead ? 'masthead' : 'compact'} />
        {children}
        <SiteFooter />
      </ScrollView>
    </>
  );
}
