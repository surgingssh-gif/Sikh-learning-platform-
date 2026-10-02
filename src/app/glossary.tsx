import { View } from 'react-native';

import { Container, Page, Rule, Txt } from '@/components';
import { glossary } from '@/content';
import { space, useBreakpoint } from '@/theme';

export default function GlossaryPage() {
  const { isTablet } = useBreakpoint();
  return (
    <Page title="Glossary" description="Sikh and Punjabi terms in Gurmukhi, transliteration and English.">
      <Container narrow style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          Glossary
        </Txt>
        <Txt variant="dek" tone="ink2">
          Every term appears in Gurmukhi, then in transliteration, then in English. Tap a dotted word in any lesson to see its entry.
        </Txt>
        <View style={{ marginTop: space.xl }}>
          {glossary.map((t, i) => (
            <View key={t.id} nativeID={t.id}>
              <Rule kind={i === 0 ? 'strong' : 'hair'} />
              <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: isTablet ? space.xl : space.xs, paddingVertical: space.lg }}>
                <View style={{ width: isTablet ? 220 : undefined }}>
                  <Txt variant="gurmukhi">{t.gurmukhi}</Txt>
                  <Txt variant="translit" tone="accent">
                    {t.translit}
                  </Txt>
                </View>
                <Txt variant="bodySmall" style={{ flex: isTablet ? 1 : undefined, paddingTop: isTablet ? 6 : 0 }}>
                  {t.english}
                </Txt>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </Page>
  );
}
