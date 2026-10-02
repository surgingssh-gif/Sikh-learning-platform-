import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Badge, Container, Page, Rule, Txt } from '@/components';
import { lessonsInUnit, units } from '@/content';
import { space, useBreakpoint } from '@/theme';

export default function UnitsPage() {
  const { isTablet } = useBreakpoint();
  return (
    <Page title="All units" description="Nine units of Sikh history, from Guru Nanak Dev Ji to the global Sikh diaspora.">
      <Container style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          All units
        </Txt>
        <Txt variant="dek" tone="ink2" style={{ maxWidth: 680 }}>
          Nine units, in order, from the birth of Guru Nanak Dev Ji in 1469 to Sikh communities around the world today.
        </Txt>
        <View style={{ marginTop: space.lg }}>
          {units.map((u) => (
            <Link key={u.slug} href={{ pathname: '/units/[slug]', params: { slug: u.slug } }} asChild>
              <Pressable accessibilityRole="link">
                {({ hovered }) => (
                  <View>
                    <Rule kind={u.number === 1 ? 'strong' : 'hair'} />
                    <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: isTablet ? space.xl : space.sm, paddingVertical: space.xl }}>
                      <View style={{ width: isTablet ? 160 : undefined, gap: space.xs }}>
                        <Txt variant="kicker" tone={u.status === 'open' ? 'accent' : 'muted'}>
                          Unit {u.number}
                        </Txt>
                        <Txt variant="byline" tone="muted">
                          {u.era}
                        </Txt>
                      </View>
                      <View style={{ flex: isTablet ? 1 : undefined, gap: space.sm }}>
                        <Txt variant="headlineL" style={{ textDecorationLine: hovered ? 'underline' : 'none' }}>
                          {u.title}
                        </Txt>
                        <Txt variant="bodySmall" tone="ink2">
                          {u.summary}
                        </Txt>
                        {u.status === 'open' ? (
                          <Badge tone="neutral" label={`${lessonsInUnit(u.number).length} lessons available`} />
                        ) : (
                          <Badge tone="neutral" label="In preparation" />
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </Pressable>
            </Link>
          ))}
        </View>
      </Container>
    </Page>
  );
}
