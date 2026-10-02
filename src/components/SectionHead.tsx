import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import { View } from 'react-native';

import { space } from '@/theme';

import { Rule } from './Rule';
import { Txt } from './Txt';

/** Section label over a strong rule, as on a newspaper front page. */
export function SectionHead({ title, href, linkLabel }: { title: string; href?: Href; linkLabel?: string }) {
  return (
    <View style={{ gap: space.sm, marginBottom: space.lg }}>
      <Rule kind="strong" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Txt variant="sectionHead">{title}</Txt>
        {href ? (
          <Link href={href}>
            <Txt variant="byline" tone="ink2" style={{ textDecorationLine: 'underline' }}>
              {linkLabel ?? 'See all'}
            </Txt>
          </Link>
        ) : null}
      </View>
    </View>
  );
}
