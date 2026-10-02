import { Image } from 'expo-image';
import { Link, type Href } from 'expo-router';
import { View } from 'react-native';

import { getMedia, images } from '@/content';
import { space, useColors } from '@/theme';

import { Txt } from './Txt';

/**
 * A credited photograph or painting from content/media/media.json.
 * `figure` shows the whole image with caption and credit; portrait images are capped in height.
 * `crop` fills a fixed 3:2 frame (for teasers) and shows no caption.
 */
export function Photo({ id, variant = 'figure', caption = true }: { id: string; variant?: 'figure' | 'crop'; caption?: boolean }) {
  const c = useColors();
  const m = getMedia(id);
  const source = images[id];
  if (!m || !source) return null;

  if (variant === 'crop') {
    return (
      <View style={{ width: '100%', aspectRatio: 3 / 2, backgroundColor: c.surface, overflow: 'hidden' }}>
        <Image source={source} alt={m.alt} accessibilityLabel={m.alt} contentFit="cover" contentPosition="center" style={{ width: '100%', height: '100%' }} transition={200} />
      </View>
    );
  }

  const ratio = m.width / m.height;
  const portrait = ratio < 1;
  return (
    <View style={{ gap: space.sm }}>
      <View style={{ width: '100%', backgroundColor: portrait ? c.surface : 'transparent', alignItems: 'center', paddingVertical: portrait ? space.lg : 0 }}>
        <Image
          source={source}
          alt={m.alt}
          accessibilityLabel={m.alt}
          contentFit="contain"
          style={portrait ? { height: 520, maxHeight: 520, width: '100%', maxWidth: 520 * ratio } : { width: '100%', aspectRatio: ratio }}
          transition={200}
        />
      </View>
      {caption ? (
        <Txt variant="caption" tone="ink2">
          {m.caption}{' '}
          <Txt variant="caption" tone="muted">
            {m.credit} ·{' '}
          </Txt>
          {m.licenseUrl ? (
            <Link href={m.licenseUrl as Href} target="_blank">
              <Txt variant="caption" tone="muted" style={{ textDecorationLine: 'underline' }}>
                {m.license}
              </Txt>
            </Link>
          ) : (
            <Txt variant="caption" tone="muted">
              {m.license}
            </Txt>
          )}
          <Txt variant="caption" tone="muted">
            {' · '}
          </Txt>
          <Link href={m.source as Href} target="_blank">
            <Txt variant="caption" tone="muted" style={{ textDecorationLine: 'underline' }}>
              Source
            </Txt>
          </Link>
        </Txt>
      ) : null}
    </View>
  );
}
