import { Link } from 'expo-router';
import { Fragment, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import {
  Badge,
  Button,
  Container,
  GlossaryCard,
  LessonTeaser,
  Page,
  Photo,
  ProgressBar,
  Rule,
  SectionHead,
  Txt,
} from '@/components';
import { glossary, lessons, lessonsInUnit, termOfTheDay, timeline, units, type Term } from '@/content';
import { useProgress } from '@/lib/progress';
import { useHydrated } from '@/lib/useHydrated';
import { site, space, useBreakpoint, useColors } from '@/theme';

export default function Home() {
  const { isDesktop, isTablet } = useBreakpoint();
  const [lead, ...rest] = lessons;

  return (
    <Page masthead description={site.description}>
      <Container style={{ paddingTop: space.xl }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? space.xl : space.xxxl }}>
          {/* Main column */}
          <View style={{ flex: isDesktop ? 8 : undefined, gap: space.xl }}>
            <View style={{ flexDirection: isTablet ? 'row' : 'column-reverse', gap: space.xl }}>
              <View style={{ flex: isTablet ? 5 : undefined, gap: space.lg, justifyContent: 'center' }}>
                <LessonTeaser lesson={lead} size={isTablet ? 'XL' : 'L'} />
                <Button label="Read the first lesson" href={{ pathname: '/lessons/[slug]', params: { slug: lead.slug } }} />
              </View>
              <View style={{ flex: isTablet ? 7 : undefined, gap: space.sm }}>
                <Photo id={lead.image} />
              </View>
            </View>

            <Rule />

            <Columns>
              {[...rest.map((l) => <LessonTeaser key={l.slug} lesson={l} showImage />), <ComingNext key="next" />]}
            </Columns>

            <View style={{ marginTop: space.xxl }}>
              <SectionHead title="The curriculum" href="/units" linkLabel="All units" />
              <Curriculum />
            </View>
          </View>

          {isDesktop ? <Rule vertical /> : null}

          {/* Right rail */}
          <View style={{ flex: isDesktop ? 4 : undefined, gap: space.xxxl }}>
            <YourProgress />
            <WordOfTheDay />
            <View>
              <SectionHead title="On the timeline" href="/timeline" linkLabel="Full timeline" />
              <View style={{ gap: space.lg }}>
                {timeline.slice(0, 6).map((e) => (
                  <View key={e.year + e.title} style={{ flexDirection: 'row', gap: space.lg }}>
                    <Txt variant="uiBold" style={{ width: 64 }}>
                      {e.year}
                    </Txt>
                    <Txt variant="bodySmall" style={{ flex: 1 }}>
                      {e.title}
                    </Txt>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: space.huge }}>
          <SectionHead title={`How ${site.name} is made`} href="/about" linkLabel="Our review process" />
          <Columns>
            {PRINCIPLES.map((p) => (
              <View key={p.title} style={{ gap: space.sm }}>
                <Txt variant="headlineS">{p.title}</Txt>
                <Txt variant="bodySmall" tone="ink2">
                  {p.body}
                </Txt>
              </View>
            ))}
          </Columns>
        </View>
      </Container>
    </Page>
  );
}

const PRINCIPLES = [
  { title: 'Checked by people who know the history', body: 'Every lesson is reviewed by a historian or a knowledgeable sevadar. Until then it carries a Draft label.' },
  { title: 'Sources on every page', body: 'Each lesson ends with the books and articles it draws on, so you can read further and check our work.' },
  { title: 'More than one view', body: 'Where scholars disagree, we say so, and set out the main positions side by side.' },
];

/** Equal-width columns separated by vertical rules on tablet and up; stacked with hairlines on phones. */
function Columns({ children }: { children: ReactNode[] }) {
  const { isTablet } = useBreakpoint();
  return (
    <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: space.xl }}>
      {children.map((child, i) => (
        <Fragment key={i}>
          {i > 0 ? isTablet ? <Rule vertical /> : <Rule /> : null}
          <View style={isTablet ? { flex: 1 } : undefined}>{child}</View>
        </Fragment>
      ))}
    </View>
  );
}

function ComingNext() {
  const next = units.find((u) => u.status === 'soon');
  if (!next) return null;
  return (
    <View style={{ gap: space.sm }}>
      <Badge tone="neutral" label="Coming next" />
      <Txt variant="headlineM">{next.title}</Txt>
      <Txt variant="bodySmall" tone="ink2">
        {next.summary}
      </Txt>
      <Txt variant="byline" tone="muted">
        Unit {next.number} · {next.era}
      </Txt>
    </View>
  );
}

function Curriculum() {
  const { isTablet } = useBreakpoint();
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: space.xl }}>
      {units.map((u) => {
        const open = u.status === 'open';
        const row = (
          <View style={{ flexDirection: 'row', gap: space.lg, paddingVertical: space.md, borderBottomWidth: 1, borderBottomColor: c.rule }}>
            <Txt variant="headlineM" tone={open ? 'accent' : 'muted'} style={{ width: 28 }}>
              {u.number}
            </Txt>
            <View style={{ flex: 1, gap: 2 }}>
              <Txt variant="headlineS" tone={open ? 'ink' : 'ink2'}>
                {u.title}
              </Txt>
              <Txt variant="byline" tone="muted">
                {u.era} · {open ? `${lessonsInUnit(u.number).length} lessons` : 'In preparation'}
              </Txt>
            </View>
          </View>
        );
        return (
          <View key={u.slug} style={{ width: isTablet ? '48%' : '100%', flexGrow: 1 }}>
            <Link href={{ pathname: '/units/[slug]', params: { slug: u.slug } }} asChild>
              <Pressable accessibilityRole="link">{row}</Pressable>
            </Link>
          </View>
        );
      })}
    </View>
  );
}

function YourProgress() {
  const progress = useProgress();
  const unit1 = lessonsInUnit(1);
  const done = progress ? unit1.filter((l) => progress.lessons[l.slug]?.completedAt).length : 0;
  const next = progress ? unit1.find((l) => !progress.lessons[l.slug]?.completedAt) : unit1[0];
  const started = !!progress && Object.keys(progress.lessons).length > 0;
  return (
    <View>
      <SectionHead title={started ? 'Your progress' : 'Start here'} />
      <View style={{ gap: space.md }}>
        <Txt variant="bodySmall" tone="ink2">
          {started
            ? `${done} of ${unit1.length} lessons finished in Unit 1.`
            : 'Begin with Unit 1. Each lesson takes under ten minutes and ends with a short quiz.'}
        </Txt>
        {started ? <ProgressBar value={done / unit1.length} /> : null}
        {next ? (
          <Link href={{ pathname: '/lessons/[slug]', params: { slug: next.slug } }}>
            <Txt variant="headlineS" style={{ textDecorationLine: 'underline' }}>
              {started ? 'Continue: ' : ''}
              {next.title}
            </Txt>
          </Link>
        ) : (
          <Txt variant="headlineS">You have finished Unit 1. Unit 2 is on its way.</Txt>
        )}
      </View>
    </View>
  );
}

function WordOfTheDay() {
  const hydrated = useHydrated();
  const term: Term = hydrated ? termOfTheDay() : glossary[0];
  return (
    <View>
      <SectionHead title="Word of the day" href="/glossary" linkLabel="Glossary" />
      <GlossaryCard term={term} compact />
    </View>
  );
}
