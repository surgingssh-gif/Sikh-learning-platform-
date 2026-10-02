import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Button, Container, LessonTeaser, Page, Rule, Txt } from '@/components';
import { getUnit, lessonsInUnit, units } from '@/content';
import { useProgress } from '@/lib/progress';
import { space } from '@/theme';

import NotFound from '../+not-found';

export function generateStaticParams() {
  return units.map((u) => ({ slug: u.slug }));
}

export default function UnitPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const unit = getUnit(slug);
  const progress = useProgress();
  if (!unit) return <NotFound />;
  const list = lessonsInUnit(unit.number);

  return (
    <Page title={unit.title} description={unit.summary}>
      <Container narrow style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="kicker" tone="accent">
          Unit {unit.number} · {unit.era}
        </Txt>
        <Txt variant="headlineXL" accessibilityRole="header">
          {unit.title}
        </Txt>
        <Txt variant="dek" tone="ink2">
          {unit.summary}
        </Txt>

        {list.length ? (
          <View style={{ marginTop: space.xl }}>
            {list.map((l) => (
              <View key={l.slug} style={{ gap: space.xl, paddingBottom: space.xl }}>
                <Rule kind={l.order === 1 ? 'strong' : 'hair'} />
                <LessonTeaser lesson={l} size="M" progress={progress?.lessons[l.slug]} />
              </View>
            ))}
            <Txt variant="caption" tone="muted">
              More lessons for this unit are being written.
            </Txt>
          </View>
        ) : (
          <View style={{ marginTop: space.xl, gap: space.lg }}>
            <Rule kind="strong" />
            <Txt variant="headlineM">This unit is being written.</Txt>
            <Txt variant="bodySmall" tone="ink2">
              Lessons will appear here once they have been drafted and checked. In the meantime, start from the beginning.
            </Txt>
            <Button label="Go to Unit 1" href="/units/guru-nanak-and-the-early-gurus" variant="outline" />
          </View>
        )}
      </Container>
    </Page>
  );
}
