import raw from './generated/content.json';
import type { Content, Lesson, Term, Unit } from './schema';

export type { Block, Inline, Lesson, Media, PeriodId, Place, Question, Source, Term, TimelineEvent, Unit } from './schema';

/** Built and validated by scripts/build-content.ts (npm run content). */
export const content = raw as Content;

export const units = content.units;
export const lessons = content.lessons;
export const glossary = [...content.glossary].sort((a, b) => a.translit.localeCompare(b.translit));
export const timeline = content.timeline;

export const getUnit = (slugOrNumber: string | number): Unit | undefined =>
  units.find((u) => u.slug === slugOrNumber || u.number === slugOrNumber);
export const getLesson = (slug: string): Lesson | undefined => lessons.find((l) => l.slug === slug);
export const lessonsInUnit = (unit: number) => lessons.filter((l) => l.unit === unit);
export const getTerm = (id: string): Term | undefined => content.glossary.find((t) => t.id === id);
export const getSource = (id: string) => content.sources.find((s) => s.id === id);

export function nextLesson(lesson: Lesson): Lesson | undefined {
  const i = lessons.findIndex((l) => l.slug === lesson.slug);
  return lessons[i + 1];
}

/** Same term every day for everyone, rotating daily. */
export function termOfTheDay(date = new Date()): Term {
  const day = Math.floor(date.getTime() / 86_400_000);
  return glossary[day % glossary.length];
}

export { images } from './generated/images';
export const getMedia = (id: string) => content.media.find((m) => m.id === id);
export const places = content.places;
export const lessonsUsingPlace = (placeId: string) =>
  (content.places.find((p) => p.id === placeId)?.lessons ?? []).map(getLesson).filter((l): l is Lesson => !!l);

export function previousLesson(lesson: Lesson): Lesson | undefined {
  const i = lessons.findIndex((l) => l.slug === lesson.slug);
  return i > 0 ? lessons[i - 1] : undefined;
}
