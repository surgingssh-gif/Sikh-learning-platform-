import { Link } from 'expo-router';
import { View } from 'react-native';

import { site, space, useBreakpoint } from '@/theme';

import { Container } from './Container';
import { Rule } from './Rule';
import { Txt } from './Txt';

const LINKS = [
  { href: '/units', label: 'All units' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About and review process' },
] as const;

export function SiteFooter() {
  const { isTablet } = useBreakpoint();
  return (
    <Container style={{ marginTop: space.huge, paddingBottom: space.xxxl }}>
      <Rule kind="strong" />
      <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: space.xl, paddingTop: space.xl }}>
        <View style={{ flex: isTablet ? 2 : undefined, gap: space.sm }}>
          <Txt variant="headlineM">{site.name}</Txt>
          <Txt variant="bodySmall" tone="ink2" style={{ maxWidth: 520 }}>
            {site.description}
          </Txt>
          <Txt variant="caption" tone="muted" style={{ maxWidth: 520, marginTop: space.sm }}>
            Lessons marked Draft have not yet been checked by a reviewer. Read them as work in progress.
          </Txt>
        </View>
        <View style={{ flex: isTablet ? 1 : undefined, gap: space.sm }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              <Txt variant="ui" tone="ink2">
                {l.label}
              </Txt>
            </Link>
          ))}
        </View>
      </View>
    </Container>
  );
}
