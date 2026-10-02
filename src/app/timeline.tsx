import { Link } from 'expo-router';
import { View } from 'react-native';

import { Badge, Container, Page, Txt } from '@/components';
import { getUnit, timeline } from '@/content';
import { space, useBreakpoint, useColors } from '@/theme';

export default function TimelinePage() {
  const c = useColors();
  const { isTablet } = useBreakpoint();
  return (
    <Page title="Timeline" description="Key dates in Sikh history, from 1469 to today.">
      <Container narrow style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          Timeline
        </Txt>
        <Txt variant="dek" tone="ink2">
          Key moments in Sikh history, from the birth of Guru Nanak Dev Ji to today.
        </Txt>
        <Badge label="Draft · dates awaiting review" />

        <View style={{ marginTop: space.xl, borderLeftWidth: 2, borderLeftColor: c.ruleStrong, marginLeft: isTablet ? 120 : 6 }}>
          {timeline.map((e, i) => {
            const unit = e.unit ? getUnit(e.unit) : undefined;
            return (
              <View key={i} style={{ paddingLeft: space.xl, paddingBottom: space.xxl }}>
                <View style={{ position: 'absolute', left: -7, top: 6, width: 12, height: 12, borderRadius: 6, backgroundColor: c.bg, borderWidth: 2, borderColor: unit?.status === 'open' ? c.accent : c.ruleStrong }} />
                {isTablet ? (
                  <Txt variant="headlineS" style={{ position: 'absolute', left: -132, width: 108, textAlign: 'right' }}>
                    {e.year}
                  </Txt>
                ) : (
                  <Txt variant="headlineS">{e.year}</Txt>
                )}
                <Txt variant="headlineS" style={{ fontSize: 20 }}>
                  {e.title}
                </Txt>
                <Txt variant="bodySmall" tone="ink2" style={{ marginTop: 2 }}>
                  {e.detail}
                </Txt>
                {unit ? (
                  <Link href={{ pathname: '/units/[slug]', params: { slug: unit.slug } }} style={{ marginTop: space.xs }}>
                    <Txt variant="byline" tone="muted" style={{ textDecorationLine: 'underline' }}>
                      Unit {unit.number}: {unit.title}
                    </Txt>
                  </Link>
                ) : null}
              </View>
            );
          })}
        </View>
      </Container>
    </Page>
  );
}
