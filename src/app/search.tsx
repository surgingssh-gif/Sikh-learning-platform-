import { useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Container, LessonTeaser, Page, Rule, SectionHead, Txt } from '@/components';
import { glossary, lessons, places, timeline, type Block, type Inline } from '@/content';
import { font, radius, space, useColors } from '@/theme';

/** Lowercase and strip accents so "udasi" finds "udāsī". */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const inlineText = (runs: Inline[]) => runs.map((r) => r.text).join('');
const blockText = (b: Block) =>
  b.type === 'p' ? inlineText(b.content) : b.type === 'h2' ? b.text : b.type === 'quote' ? `${b.translit} ${b.english}` : b.type === 'perspectives' ? b.content.map(inlineText).join(' ') : '';

const LESSON_INDEX = lessons.map((l) => ({ lesson: l, text: norm([l.title, l.dek, ...l.keyPoints, ...l.blocks.map(blockText)].join(' ')) }));

export default function SearchPage() {
  const c = useColors();
  const [query, setQuery] = useState('');
  const q = norm(query.trim());

  const results = useMemo(() => {
    if (q.length < 2) return null;
    return {
      lessons: LESSON_INDEX.filter((x) => x.text.includes(q)).map((x) => x.lesson),
      terms: glossary.filter((t) => norm(`${t.translit} ${t.english} ${t.id}`).includes(q) || t.gurmukhi.includes(query.trim())),
      events: timeline.filter((e) => norm(`${e.year} ${e.title} ${e.detail}`).includes(q)),
      places: places.filter((p) => norm(`${p.name} ${p.formerly ?? ''} ${p.summary}`).includes(q)),
    };
  }, [q, query]);
  const total = results ? results.lessons.length + results.terms.length + results.events.length + results.places.length : 0;

  return (
    <Page title="Search" description="Search lessons, glossary terms, places and dates.">
      <Container narrow style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          Search
        </Txt>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Try “Kartarpur”, “langar” or “1699”"
          placeholderTextColor={c.muted}
          accessibilityLabel="Search lessons, glossary, places and timeline"
          autoFocus
          style={{ fontFamily: font.serif, fontSize: 22, color: c.ink, borderBottomWidth: 2, borderBottomColor: c.ruleStrong, paddingVertical: space.md, borderRadius: radius.sm }}
        />
        {results ? (
          <Txt variant="byline" tone="muted" accessibilityLiveRegion="polite">
            {total === 0 ? `Nothing found for “${query.trim()}”.` : `${total} result${total === 1 ? '' : 's'}`}
          </Txt>
        ) : (
          <Txt variant="byline" tone="muted">
            Searches lesson text, the glossary, places and the timeline.
          </Txt>
        )}

        {results?.lessons.length ? (
          <View style={{ marginTop: space.lg }}>
            <SectionHead title="Lessons" />
            <View style={{ gap: space.xl }}>
              {results.lessons.map((l) => (
                <LessonTeaser key={l.slug} lesson={l} size="S" />
              ))}
            </View>
          </View>
        ) : null}

        {results?.terms.length ? (
          <View style={{ marginTop: space.lg }}>
            <SectionHead title="Glossary" href="/glossary" linkLabel="Full glossary" />
            {results.terms.map((t, i) => (
              <View key={t.id}>
                {i > 0 ? <Rule /> : null}
                <View style={{ paddingVertical: space.md }}>
                  <Txt variant="gurmukhi" style={{ fontSize: 22, lineHeight: 32 }}>
                    {t.gurmukhi}
                  </Txt>
                  <Txt variant="translit" tone="accent">
                    {t.translit}
                  </Txt>
                  <Txt variant="bodySmall">{t.english}</Txt>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {results?.places.length ? (
          <View style={{ marginTop: space.lg }}>
            <SectionHead title="Places" href="/map" linkLabel="Open the map" />
            {results.places.map((p) => (
              <View key={p.id} style={{ paddingVertical: space.sm }}>
                <Txt variant="headlineS">{p.name}</Txt>
                <Txt variant="bodySmall" tone="ink2">
                  {p.summary}
                </Txt>
              </View>
            ))}
          </View>
        ) : null}

        {results?.events.length ? (
          <View style={{ marginTop: space.lg }}>
            <SectionHead title="Timeline" href="/timeline" linkLabel="Full timeline" />
            {results.events.map((e) => (
              <View key={e.year + e.title} style={{ flexDirection: 'row', gap: space.lg, paddingVertical: space.sm }}>
                <Txt variant="uiBold" style={{ width: 64 }}>
                  {e.year}
                </Txt>
                <View style={{ flex: 1 }}>
                  <Txt variant="headlineS">{e.title}</Txt>
                  <Txt variant="bodySmall" tone="ink2">
                    {e.detail}
                  </Txt>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {!results ? (
          <View style={{ marginTop: space.xl, gap: space.sm }}>
            <Txt variant="kicker" tone="muted">
              Popular
            </Txt>
            {['Kartarpur', 'langar', 'Bhai Mardana', '1699'].map((s) => (
              <Pressable key={s} onPress={() => setQuery(s)} accessibilityRole="button" style={{ minHeight: 36, justifyContent: 'center' }}>
                <Txt variant="headlineS" style={{ textDecorationLine: 'underline' }}>
                  {s}
                </Txt>
              </Pressable>
            ))}
          </View>
        ) : null}
      </Container>
    </Page>
  );
}
