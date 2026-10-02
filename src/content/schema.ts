import { z } from 'zod';

/** Shared content schema: used by scripts/build-content.ts and by the app's types. */

export const inlineSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), text: z.string() }),
  z.object({ type: z.literal('em'), text: z.string() }),
  z.object({ type: z.literal('term'), id: z.string(), text: z.string() }),
]);

export const blockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('p'), content: z.array(inlineSchema) }),
  z.object({ type: z.literal('h2'), text: z.string() }),
  z.object({
    type: z.literal('quote'),
    gurmukhi: z.string(),
    translit: z.string(),
    english: z.string(),
    attribution: z.string().optional(),
  }),
  z.object({ type: z.literal('perspectives'), content: z.array(z.array(inlineSchema)) }),
  z.object({ type: z.literal('figure'), id: z.string() }),
]);

export const questionSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
  answer: z.string(),
  explanation: z.string(),
});

export const quizSchema = z.object({ lessonId: z.string(), questions: z.array(questionSchema).min(1) });

export const frontmatterSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  unit: z.number().int(),
  order: z.number().int(),
  title: z.string(),
  dek: z.string(),
  era: z.string(),
  readMinutes: z.number().int(),
  status: z.enum(['draft', 'in-review', 'approved']),
  reviewedBy: z.string().nullable(),
  reviewedOn: z.string().nullable(),
  image: z.string(),
  keyPoints: z.array(z.string()).min(2).max(4),
  sources: z.array(z.string()).min(1),
});

export const lessonSchema = frontmatterSchema.extend({
  blocks: z.array(blockSchema),
  quiz: quizSchema.shape.questions,
});

export const unitSchema = z.object({
  number: z.number().int(),
  slug: z.string(),
  title: z.string(),
  era: z.string(),
  summary: z.string(),
  status: z.enum(['open', 'soon']),
});

export const termSchema = z.object({
  id: z.string(),
  gurmukhi: z.string(),
  translit: z.string(),
  english: z.string(),
  audio: z.string().optional(),
});

export const sourceSchema = z.object({ id: z.string(), citation: z.string() });

export const eventSchema = z.object({
  year: z.string(),
  title: z.string(),
  detail: z.string(),
  unit: z.number().int().optional(),
});

export const mediaSchema = z.object({
  id: z.string(),
  file: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  alt: z.string(),
  caption: z.string(),
  credit: z.string(),
  license: z.string(),
  licenseUrl: z.string().url().optional(),
  source: z.string().url(),
});

export const periodIds = ['guru-nanak', 'early-gurus', 'khalsa'] as const;

export const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  gurmukhi: z.string(),
  formerly: z.string().optional(),
  lat: z.number().min(30).max(33),
  lon: z.number().min(73).max(77),
  today: z.string(),
  periods: z.array(z.enum(periodIds)).min(1),
  lessons: z.array(z.string()),
  summary: z.string(),
});

export const contentSchema = z.object({
  units: z.array(unitSchema),
  lessons: z.array(lessonSchema),
  glossary: z.array(termSchema),
  sources: z.array(sourceSchema),
  timeline: z.array(eventSchema),
  media: z.array(mediaSchema),
  places: z.array(placeSchema),
});

export type Inline = z.infer<typeof inlineSchema>;
export type Block = z.infer<typeof blockSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Unit = z.infer<typeof unitSchema>;
export type Term = z.infer<typeof termSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type TimelineEvent = z.infer<typeof eventSchema>;
export type Content = z.infer<typeof contentSchema>;
export type Media = z.infer<typeof mediaSchema>;
export type Place = z.infer<typeof placeSchema>;
export type PeriodId = (typeof periodIds)[number];
