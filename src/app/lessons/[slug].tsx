import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { ArticleBody, Badge, Container, LessonTeaser, Page, Photo, Rule, SectionHead, Txt, Quiz } from '@/components';
import { getLesson, getSource, getUnit, lessons, nextLesson, previousLesson } from '@/content';
import { markStarted } from '@/lib/progress';
import { space, useBreakpoint, useColors } from '@/theme';

import NotFound from '../+not-found';

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default function LessonPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const lesson = getLesson(slug);
  const c = useColors();
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    if (lesson) markStarted(lesson.slug);
  }, [lesson]);

  if (!lesson) return <NotFound />;
  const unit = getUnit(lesson.unit);
  const next = nextLesson(lesson);
  const prev = previousLesson(lesson);

  return (
    <Page title={lesson.title} description={lesson.dek} readingProgress>
      <Container narrow style={{ paddingTop: space.xxl, gap: space.xl }}>
        <View style={{ gap: space.md }}>
          {unit ? (
            <Link href={{ pathname: '/units/[slug]', params: { slug: unit.slug } }}>
              <Txt variant="kicker" tone="accent">
                Unit {unit.number} · {unit.title}
              </Txt>
            </Link>
          ) : null}
          <Txt variant="headlineXL" accessibilityRole="header">
            {lesson.title}
          </Txt>
          <Txt variant="dek" tone="ink2">
            {lesson.dek}
          </Txt>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.lg, marginTop: space.xs }}>
            <Txt variant="byline" tone="muted">
              {lesson.readMinutes} min read · {lesson.era}
            </Txt>
            {lesson.status === 'approved' ? (
              <Badge tone="done" label={`Reviewed by ${lesson.reviewedBy}`} />
            ) : (
              <Badge label="Draft · awaiting review" />
            )}
          </View>
        </View>

        <Photo id={lesson.image} />

        <View style={{ borderTopWidth: 2, borderTopColor: c.ruleStrong, borderBottomWidth: 1, borderBottomColor: c.rule, paddingVertical: space.lg, gap: space.sm }}>
          <Txt variant="kicker">In short</Txt>
          {lesson.keyPoints.map((point, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: space.md }}>
              <Txt variant="bodySmall" tone="accent" style={{ width: 12 }}>
                •
              </Txt>
              <Txt variant="bodySmall" style={{ flex: 1 }}>
                {point}
              </Txt>
            </View>
          ))}
        </View>

        <ArticleBody blocks={lesson.blocks} />

        <View style={{ marginTop: space.xl }}>
          <SectionHead title="Sources" />
          <View style={{ gap: space.sm }}>
            {lesson.sources.map((id, i) => (
              <Txt key={id} variant="bodySmall" tone="ink2">
                {i + 1}. {getSource(id)?.citation}
              </Txt>
            ))}
          </View>
        </View>

        <View style={{ marginTop: space.xxl }}>
          <SectionHead title="Check your understanding" />
          <Quiz slug={lesson.slug} questions={lesson.quiz} />
        </View>

        <View style={{ marginTop: space.xxxl, gap: space.lg }}>
          <Rule kind="double" />
          <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: space.xl }}>
            {prev ? (
              <View style={isTablet ? { flex: 1 } : undefined}>
                <Txt variant="kicker" tone="muted" style={{ marginBottom: space.sm }}>
                  Previous lesson
                </Txt>
                <LessonTeaser lesson={prev} size="S" showDek={false} />
              </View>
            ) : null}
            {next ? (
              <View style={isTablet ? { flex: 1 } : undefined}>
                <Txt variant="kicker" tone="muted" style={{ marginBottom: space.sm }}>
                  Next lesson
                </Txt>
                <LessonTeaser lesson={next} size="S" showDek={false} />
              </View>
            ) : (
              <View style={isTablet ? { flex: 1 } : undefined}>
                <Txt variant="kicker" tone="muted" style={{ marginBottom: space.sm }}>
                  Up next
                </Txt>
                <Txt variant="headlineS">You have reached the end of the lessons so far. Unit 2 is being written.</Txt>
              </View>
            )}
          </View>
        </View>
      </Container>
    </Page>
  );
}
