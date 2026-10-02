import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import type { Lesson } from '@/content';
import type { LessonProgress } from '@/lib/progress';
import { space, useColors } from '@/theme';

import { Badge } from './Badge';
import { Illustration } from './Illustration';
import { Txt } from './Txt';

/** Headline + dek + byline, the way a front page lists a story. */
export function LessonTeaser({
  lesson,
  size = 'M',
  showImage = false,
  showDek = true,
  progress,
}: {
  lesson: Lesson;
  size?: 'XL' | 'L' | 'M' | 'S';
  showImage?: boolean;
  showDek?: boolean;
  progress?: LessonProgress;
}) {
  const c = useColors();
  const headline = size === 'XL' ? 'headlineXL' : size === 'L' ? 'headlineL' : size === 'M' ? 'headlineM' : 'headlineS';
  return (
    <Link href={{ pathname: '/lessons/[slug]', params: { slug: lesson.slug } }} asChild>
      <Pressable accessibilityRole="link" style={{ gap: space.sm }}>
        {({ hovered }) => (
          <>
            {showImage && lesson.figure ? (
              <View style={{ marginBottom: space.sm }}>
                <Illustration name={lesson.figure} label={lesson.figureCaption ?? lesson.title} />
              </View>
            ) : null}
            <Txt variant="kicker" tone="accent">
              Unit {lesson.unit} · Lesson {lesson.order}
            </Txt>
            <Txt variant={headline} style={{ textDecorationLine: hovered ? 'underline' : 'none', textDecorationColor: c.ink }}>
              {lesson.title}
            </Txt>
            {showDek ? (
              <Txt variant={size === 'XL' || size === 'L' ? 'dek' : 'bodySmall'} tone="ink2">
                {lesson.dek}
              </Txt>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, flexWrap: 'wrap', marginTop: 2 }}>
              <Txt variant="byline" tone="muted">
                {lesson.readMinutes} min read · {lesson.era}
              </Txt>
              {progress?.quizTotal ? (
                <Badge tone="done" label={`Quiz ${progress.quizScore}/${progress.quizTotal}`} />
              ) : lesson.status !== 'approved' ? (
                <Badge label="Draft" />
              ) : null}
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
}
