import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Container, Page, PlacesMap, Rule, SectionHead, Txt } from '@/components';
import { lessonsUsingPlace, places } from '@/content';
import { space, useBreakpoint, useColors } from '@/theme';

export default function MapPage() {
  const { isDesktop } = useBreakpoint();
  const c = useColors();
  const [selected, setSelected] = useState(places[0].id);
  const place = places.find((p) => p.id === selected) ?? places[0];
  const related = lessonsUsingPlace(place.id);

  return (
    <Page title="Map" description="An interactive map of the places in Sikh history, from Nankana Sahib to Anandpur Sahib.">
      <Container style={{ paddingTop: space.xxl, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          Map
        </Txt>
        <Txt variant="dek" tone="ink2" style={{ maxWidth: 680 }}>
          The places where the story happened. Tap a place to read about it, or filter by period to see how the centre of Sikh life moved.
        </Txt>

        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: space.xl, marginTop: space.md }}>
          <View style={isDesktop ? { flex: 2 } : undefined}>
            <PlacesMap places={places} selected={selected} onSelect={setSelected} />
          </View>

          <View style={isDesktop ? { flex: 1 } : undefined} accessibilityLiveRegion="polite">
            <Rule kind="strong" />
            <View style={{ gap: space.sm, paddingTop: space.lg }}>
              <Txt variant="kicker" tone="accent">
                {place.today}
              </Txt>
              <Txt variant="headlineL">{place.name}</Txt>
              <Txt variant="gurmukhi" tone="ink2" style={{ fontSize: 22, lineHeight: 32 }}>
                {place.gurmukhi}
              </Txt>
              {place.formerly ? (
                <Txt variant="byline" tone="muted">
                  Formerly {place.formerly}
                </Txt>
              ) : null}
              <Txt variant="body" style={{ marginTop: space.sm }}>
                {place.summary}
              </Txt>
              {related.length ? (
                <View style={{ marginTop: space.md, gap: space.sm }}>
                  <Txt variant="kicker" tone="muted">
                    Read about it
                  </Txt>
                  {related.map((l) => (
                    <Link key={l.slug} href={{ pathname: '/lessons/[slug]', params: { slug: l.slug } }}>
                      <Txt variant="headlineS" style={{ textDecorationLine: 'underline' }}>
                        {l.title}
                      </Txt>
                    </Link>
                  ))}
                </View>
              ) : (
                <Txt variant="caption" tone="muted" style={{ marginTop: space.md }}>
                  Lessons about this place are being written.
                </Txt>
              )}
            </View>
          </View>
        </View>

        <View style={{ marginTop: space.xxl }}>
          <SectionHead title="All places" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: space.xl }}>
            {places.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => setSelected(p.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: p.id === selected }}
                style={{ width: isDesktop ? '30%' : '100%', flexGrow: 1, paddingVertical: space.md, borderBottomWidth: 1, borderBottomColor: c.rule }}
              >
                <Txt variant="headlineS" tone={p.id === selected ? 'accent' : 'ink'}>
                  {p.name}
                </Txt>
                <Txt variant="byline" tone="muted">
                  {p.today}
                </Txt>
              </Pressable>
            ))}
          </View>
        </View>
      </Container>
    </Page>
  );
}
