import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { palettes } from '@/theme/tokens';

/** Root HTML for the static web build. Sets the page ground before the app loads. */
export default function Root({ children }: PropsWithChildren) {
  const css = `
    :root { color-scheme: light; }
    body { background: ${palettes.light.bg}; color: ${palettes.light.ink}; }
  `;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
