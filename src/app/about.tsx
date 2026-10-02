import { View } from 'react-native';

import { Container, Page, SectionHead, Txt } from '@/components';
import { site, space } from '@/theme';

const SECTIONS = [
  {
    title: 'What this is',
    body: [
      `${site.name} is a free place to learn Sikh history, written for teenagers and readable by anyone. It moves in order through nine units, from Guru Nanak Dev Ji in 1469 to the Sikh diaspora today. Each lesson takes under ten minutes and ends with a short quiz.`,
    ],
  },
  {
    title: 'How lessons are reviewed',
    body: [
      'Sikh history includes sacred material and events that are still painful and politically sensitive. Every lesson is therefore reviewed by a historian or a knowledgeable sevadar before it is published as final.',
      'Until that review happens, a lesson is labelled Draft. Once reviewed, the label is replaced by the reviewer’s name and the date. Right now, every lesson on this site is a draft.',
    ],
  },
  {
    title: 'Sources',
    body: [
      'Every lesson lists the books and articles it draws on. We prefer published scholarship and say clearly when a story comes from tradition, such as the janamsakhis, rather than from contemporary records.',
    ],
  },
  {
    title: 'When scholars disagree',
    body: [
      'Some questions in Sikh history are debated. Where they are, lessons include a section called “How historians read this” that sets out the main views side by side, rather than picking one and hiding the rest.',
    ],
  },
  {
    title: 'Gurbani',
    body: [
      'Quotations from Sri Guru Granth Sahib Ji are given in Gurmukhi, with a transliteration and an English translation, and cite the Ang (page) they come from. Translations are labelled as one possible rendering.',
    ],
  },
];

export default function AboutPage() {
  return (
    <Page title="About" description={`How ${site.name} is written, sourced and reviewed.`}>
      <Container narrow style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          About {site.name}
        </Txt>
        <Txt variant="dek" tone="ink2">
          {site.tagline}. Written carefully, sourced openly, and checked by people who know the history.
        </Txt>
        <View style={{ marginTop: space.xl, gap: space.xxl }}>
          {SECTIONS.map((s) => (
            <View key={s.title}>
              <SectionHead title={s.title} />
              <View style={{ gap: space.md }}>
                {s.body.map((p, i) => (
                  <Txt key={i} variant="body">
                    {p}
                  </Txt>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Container>
    </Page>
  );
}
