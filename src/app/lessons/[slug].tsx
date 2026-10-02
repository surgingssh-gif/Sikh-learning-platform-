import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { ArticleBody, Badge, Container, Illustration, LessonTeaser, Page, Rule, SectionHead, Txt, Quiz } from '@/components';
import { getSource, getUnit, lessons, getLesson, nextLesson } from '@/content';
import { markStarted } from '@/lib/progress';
import { space } from '@/theme';

import NotFound from '../+not-found';

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default function LessonPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const lesson = getLesson(slug);

  useEffect(() => {
    if (lesson) markStarted(lesson.slug);
  }, [lesson]);

  if (!lesson) return <NotFound />;
  const unit = getUnit(lesson.unit);
  const next = nextLesson(lesson);

  return (
    <Page title={lesson.title} description={lesson.dek}>
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

        {lesson.figure ? (
          <View style={{ gap: space.sm }}>
            <Illustration name={lesson.figure} label={lesson.figureCaption ?? lesson.title} />
            <Txt variant="caption" tone="muted">
              {lesson.figureCaption}
            </Txt>
          </View>
        ) : null}

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

        {next ? (
          <View style={{ marginTop: space.xxxl, gap: space.lg }}>
            <Rule kind="double" />
            <Txt variant="kicker" tone="muted">
              Next lesson
            </Txt>
            <LessonTeaser lesson={next} size="L" />
          </View>
        ) : null}
      </Container>
    </Page>
  );
}
