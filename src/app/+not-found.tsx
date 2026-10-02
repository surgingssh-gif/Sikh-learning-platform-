import { Button, Container, Page, Txt } from '@/components';
import { space } from '@/theme';

export default function NotFound() {
  return (
    <Page title="Page not found">
      <Container narrow style={{ paddingTop: space.huge, gap: space.lg }}>
        <Txt variant="headlineXL" accessibilityRole="header">
          This page doesn’t exist.
        </Txt>
        <Txt variant="dek" tone="ink2">
          The link may be out of date. The front page lists every lesson.
        </Txt>
        <Button label="Go to the front page" href="/" />
      </Container>
    </Page>
  );
}
