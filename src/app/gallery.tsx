import { useState, type ReactNode } from 'react';
import { View } from 'react-native';

import {
  Badge,
  Button,
  FadeIn,
  Glass,
  GlossaryCard,
  Paper,
  PerspectivesCallout,
  ProgressBar,
  ProgressRing,
  QuizOption,
  QuoteBlock,
  Screen,
  SegmentedProgress,
  Skeleton,
  StatTile,
  TabBar,
  TAB_BAR_HEIGHT,
  Txt,
  UnitRow,
  type QuizOptionState,
  type TabItem,
} from '@/components';
import { haptic } from '@/lib/haptics';
import { backdrops, color, space, ThemeProvider, useTheme, type BackdropName } from '@/theme';

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'learn', label: 'Learn', icon: 'learn' },
  { key: 'timeline', label: 'Timeline', icon: 'timeline' },
  { key: 'map', label: 'Map', icon: 'map' },
  { key: 'glossary', label: 'Glossary', icon: 'glossary' },
];

const KIRAT = { gurmukhi: 'ਕਿਰਤ ਕਰਨੀ', translit: 'kirat karnī', english: 'Earning an honest living through your own work' };

/** Dev reference screen: every design-system component on the live backdrop. */
export default function GalleryScreen() {
  const [backdrop, setBackdrop] = useState<BackdropName>('mist');
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeProvider backdrop={backdrop} scheme={scheme}>
      <Gallery backdrop={backdrop} onBackdrop={setBackdrop} scheme={scheme} onScheme={setScheme} />
    </ThemeProvider>
  );
}

function Gallery({
  backdrop,
  onBackdrop,
  scheme,
  onScheme,
}: {
  backdrop: BackdropName;
  onBackdrop: (b: BackdropName) => void;
  scheme: 'light' | 'dark';
  onScheme: (s: 'light' | 'dark') => void;
}) {
  const [tab, setTab] = useState('home');
  return (
    <Screen
      bottomInset={TAB_BAR_HEIGHT + space.lg}
      contentStyle={{ gap: space.lg, maxWidth: 520, width: '100%', alignSelf: 'center' }}
      overlay={<TabBar tabs={TABS} active={tab} onChange={setTab} />}
    >
      <View style={{ paddingHorizontal: 4, gap: 4 }}>
        <Txt variant="label" tint={color.onGlassMuted}>
          Design system · v0.2
        </Txt>
        <Txt variant="title">Component gallery</Txt>
      </View>

      <Section title="Backdrop" index={0}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
          {(Object.keys(backdrops) as BackdropName[]).map((b) => (
            <Button key={b} label={b} size="sm" variant={b === backdrop ? 'kesri' : 'bevel'} onPress={() => onBackdrop(b)} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          <Button label="Light paper" size="sm" variant={scheme === 'light' ? 'kesri' : 'bevel'} onPress={() => onScheme('light')} />
          <Button label="Dark paper" size="sm" variant={scheme === 'dark' ? 'kesri' : 'bevel'} onPress={() => onScheme('dark')} />
        </View>
      </Section>

      <Section title="Buttons" index={1}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, flexWrap: 'wrap' }}>
          <Button variant="bevel" icon="arrowUp" size="lg" accessibilityLabel="Upload" />
          <Button variant="bevel" label="Secondary" size="lg" />
        </View>
        <Button label="Continue reading" icon="arrowRight" />
        <View style={{ flexDirection: 'row', gap: space.sm }}>
          <Button variant="bevel" icon="chevronLeft" size="sm" accessibilityLabel="Back" />
          <Button variant="bevel" icon="bookmark" size="sm" accessibilityLabel="Bookmark" />
          <Button variant="bevel" icon="close" size="sm" accessibilityLabel="Close" />
        </View>
      </Section>

      <Section title="Progress" index={2}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
          <ProgressRing progress={0.35} />
          <View style={{ flex: 1, gap: space.md }}>
            <ProgressBar progress={0.25} />
            <SegmentedProgress states={['correct', 'current', 'upcoming', 'upcoming', 'upcoming']} />
          </View>
        </View>
      </Section>

      <FadeIn index={3}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <StatTile icon="flame" value="6" label="day streak" accent />
          <StatTile icon="learn" value="3" label="lessons done" />
          <StatTile icon="target" value="88%" label="quiz mastery" />
        </View>
      </FadeIn>

      <Section title="Your path" index={4}>
        <UnitRow number={1} title="Guru Nanak Dev Ji and the early Gurus" status="active" progress={0.25} />
        <UnitRow number={2} title="The later Gurus and the Khalsa" status="open" detail="Not started · 14 lessons" />
        <UnitRow number={3} title="Banda Singh Bahadur and the Misls" status="locked" detail="Coming soon" />
      </Section>

      <FadeIn index={5}>
        <GlossaryCard term={KIRAT} kicker="Word of the day" />
      </FadeIn>

      <Section title="Quiz options · tap one" index={6}>
        <QuizDemo />
      </Section>

      <FadeIn index={7}>
        <LessonSample />
      </FadeIn>

      <Section title="Loading skeleton" index={8}>
        <Skeleton width="40%" height={10} />
        <Skeleton width="90%" height={22} radius={8} />
        <Skeleton width="70%" height={22} radius={8} />
        <Skeleton height={120} radius={20} />
      </Section>
    </Screen>
  );
}

function Section({ title, index, children }: { title: string; index: number; children: ReactNode }) {
  return (
    <FadeIn index={index}>
      <Glass style={{ padding: space.lg + 2, gap: space.md }}>
        <Txt variant="label" tint={color.onGlassMuted}>
          {title}
        </Txt>
        {children}
      </Glass>
    </FadeIn>
  );
}

const OPTIONS = [
  { id: 'a', label: 'Amritsar' },
  { id: 'b', label: 'Sultanpur Lodhi' },
  { id: 'c', label: 'Lahore' },
  { id: 'd', label: 'Kartarpur' },
];

function QuizDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  const answer = 'b';
  const stateFor = (id: string): QuizOptionState => {
    if (!picked) return 'idle';
    if (id === answer) return 'correct';
    if (id === picked) return 'incorrect';
    return 'dimmed';
  };
  return (
    <View style={{ gap: 10 }}>
      <Txt variant="heading" style={{ fontSize: 22, lineHeight: 28 }}>
        Where did Guru Nanak Dev Ji work as a storekeeper?
      </Txt>
      {OPTIONS.map((o) => (
        <QuizOption
          key={o.id}
          letter={o.id.toUpperCase()}
          label={o.label}
          state={stateFor(o.id)}
          onPress={() => {
            setPicked(o.id);
            if (o.id === answer) haptic.success();
            else haptic.error();
          }}
        />
      ))}
      {picked ? <Button variant="bevel" label="Reset" size="sm" onPress={() => setPicked(null)} style={{ alignSelf: 'flex-start' }} /> : null}
    </View>
  );
}

function LessonSample() {
  const { paper } = useTheme();
  const [showTerm, setShowTerm] = useState(true);
  return (
    <Paper>
      <View style={{ gap: space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, flexWrap: 'wrap' }}>
          <Txt variant="label" tint={paper.accentInk}>
            Guru Nanak Dev Ji
          </Txt>
          <Badge label="Draft · awaiting review" tint={paper.muted} dashed />
        </View>
        <Txt variant="display" tint={paper.ink}>
          From Talwandi to the Bein
        </Txt>
        <Txt variant="caption" tint={paper.muted} style={{ fontSize: 14 }}>
          8 min read · 1469 – c. 1500
        </Txt>
      </View>
      <Txt variant="reading" tint={paper.ink}>
        When he returned, he taught a path built on three practices: naam japna, remembering the Divine;{' '}
        <Txt
          variant="reading"
          tint={paper.ink}
          onPress={() => setShowTerm((s) => !s)}
          accessibilityRole="button"
          style={{ backgroundColor: paper.termBg, textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: paper.accentInk }}
        >
          kirat karni
        </Txt>
        , honest work; and vand chhakna, sharing with others.
      </Txt>
      {showTerm ? <GlossaryCard term={{ ...KIRAT, english: 'Earning an honest living through your own work. One of the three pillars of Sikh life.' }} variant="smoke" /> : null}
      <QuoteBlock
        gurmukhi="ਨਾ ਕੋ ਹਿੰਦੂ ਨਾ ਮੁਸਲਮਾਨ"
        translit="Nā ko Hindū, nā Musalmān"
        english="There is no Hindu, there is no Muslim."
        attribution="As recorded in the janamsakhis"
      />
      <PerspectivesCallout>
        Most of what we know about these years comes from the janamsakhis, written after the Guru&apos;s lifetime. Historians differ on how
        to read them.
      </PerspectivesCallout>
    </Paper>
  );
}
