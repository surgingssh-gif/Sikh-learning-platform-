import { Link, usePathname } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { useHydrated } from '@/lib/useHydrated';
import { site, space, useBreakpoint, useColors } from '@/theme';

import { Button } from './Button';
import { Container } from './Container';
import { Rule } from './Rule';
import { Txt } from './Txt';

const NAV = [
  { href: '/units', label: 'Units' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About' },
] as const;

function NavLinks({ center }: { center?: boolean }) {
  const pathname = usePathname();
  const c = useColors();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: center ? 'center' : 'flex-end', gap: space.xl }}>
      {NAV.map((n) => {
        const active = pathname === n.href || pathname.startsWith(n.href + '/');
        return (
          <Link key={n.href} href={n.href} asChild>
            <Pressable accessibilityRole="link" style={{ paddingVertical: space.md }}>
              {({ hovered }) => (
                <Txt
                  variant="nav"
                  tone={active ? 'ink' : 'ink2'}
                  style={{ textDecorationLine: hovered || active ? 'underline' : 'none', textDecorationColor: active ? c.accent : c.ink2 }}
                >
                  {n.label}
                </Txt>
              )}
            </Pressable>
          </Link>
        );
      })}
    </ScrollView>
  );
}

/** Today's date, rendered after mount so static HTML is never stale. */
function DateLine() {
  const hydrated = useHydrated();
  const date = hydrated ? new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  return (
    <Txt variant="byline" tone="ink2">
      {date || ' '}
    </Txt>
  );
}

function Wordmark({ size }: { size: number }) {
  return (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel={`${site.name} home`}>
        <Txt variant="wordmark" style={{ fontSize: size, lineHeight: size * 1.1, textAlign: 'center' }}>
          {site.name}
        </Txt>
      </Pressable>
    </Link>
  );
}

/** Big centred masthead for the front page; compact bar for inner pages. */
export function SiteHeader({ variant = 'compact' }: { variant?: 'masthead' | 'compact' }) {
  const { isDesktop, isTablet } = useBreakpoint();

  if (variant === 'masthead') {
    return (
      <Container style={{ paddingTop: isTablet ? space.xl : space.lg }}>
        {isDesktop ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 2 }}>
              <DateLine />
              <Txt variant="caption" tone="muted">
                {site.tagline}
              </Txt>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Wordmark size={64} />
              <Txt variant="gurmukhi" tone="muted" style={{ fontSize: 15, lineHeight: 22 }}>
                {site.nameGurmukhi}
              </Txt>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Button label="Start reading" variant="outline" href="/lessons/from-talwandi-to-the-bein" style={{ alignSelf: 'flex-end' }} />
            </View>
          </View>
        ) : (
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Wordmark size={isTablet ? 54 : 42} />
            <Txt variant="caption" tone="muted" style={{ textAlign: 'center' }}>
              {site.nameGurmukhi} · {site.tagline}
            </Txt>
          </View>
        )}
        <Rule style={{ marginTop: space.lg }} />
        <NavLinks center />
        <Rule kind="double" />
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: space.md }}>
      <View style={{ flexDirection: isTablet ? 'row' : 'column', alignItems: 'center', gap: isTablet ? space.xl : 0 }}>
        <Wordmark size={30} />
        <View style={{ flex: isTablet ? 1 : undefined, alignSelf: 'stretch' }}>
          <NavLinks center={!isTablet} />
        </View>
      </View>
      <Rule kind="strong" style={{ marginTop: isTablet ? space.sm : 0 }} />
    </Container>
  );
}
