import { Fragment, useState } from 'react';
import { View } from 'react-native';

import { getTerm, type Block, type Inline } from '@/content';
import { font, space, useColors } from '@/theme';

import { GlossaryCard } from './GlossaryCard';
import { Txt } from './Txt';

/** Renders a lesson's blocks. Glossary terms are tappable and open their definition below the paragraph. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <View style={{ gap: space.xl }}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <Paragraph key={i} content={b.content} />;
          case 'h2':
            return (
              <Txt key={i} variant="headlineM" accessibilityRole="header" style={{ marginTop: space.md }}>
                {b.text}
              </Txt>
            );
          case 'quote':
            return <QuoteBlock key={i} {...b} />;
          case 'perspectives':
            return <Perspectives key={i} paragraphs={b.content} />;
        }
      })}
    </View>
  );
}

function Paragraph({ content, variant = 'body' }: { content: Inline[]; variant?: 'body' | 'bodySmall' }) {
  const c = useColors();
  const [open, setOpen] = useState<string | null>(null);
  const term = open ? getTerm(open) : undefined;
  return (
    <View style={{ gap: space.md }}>
      <Txt variant={variant}>
        {content.map((r, i) => (
          <Fragment key={i}>
            {r.type === 'text' ? r.text : null}
            {r.type === 'em' ? <Txt variant={variant} style={{ fontFamily: font.serifItalic }}>{r.text}</Txt> : null}
            {r.type === 'term' ? (
              <Txt
                variant={variant}
                onPress={() => setOpen(open === r.id ? null : r.id)}
                accessibilityRole="button"
                accessibilityState={{ expanded: open === r.id }}
                accessibilityHint="Shows the glossary definition"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'dotted',
                  textDecorationColor: c.accent,
                  backgroundColor: open === r.id ? c.accentSoft : 'transparent',
                }}
              >
                {r.text}
              </Txt>
            ) : null}
          </Fragment>
        ))}
      </Txt>
      {term ? <GlossaryCard term={term} onClose={() => setOpen(null)} /> : null}
    </View>
  );
}

export function QuoteBlock({ gurmukhi, translit, english, attribution }: { gurmukhi: string; translit: string; english: string; attribution?: string }) {
  const c = useColors();
  return (
    <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.rule, paddingVertical: space.xl, gap: space.sm, alignItems: 'center' }}>
      <Txt variant="gurmukhi" style={{ textAlign: 'center' }}>
        {gurmukhi}
      </Txt>
      <Txt variant="translit" tone="accent" style={{ textAlign: 'center' }}>
        {translit}
      </Txt>
      <Txt variant="dek" style={{ textAlign: 'center', fontSize: 21, lineHeight: 30 }}>
        “{english}”
      </Txt>
      {attribution ? (
        <Txt variant="kicker" tone="muted" style={{ textAlign: 'center', marginTop: space.xs }}>
          {attribution}
        </Txt>
      ) : null}
    </View>
  );
}

function Perspectives({ paragraphs }: { paragraphs: Inline[][] }) {
  const c = useColors();
  return (
    <View style={{ backgroundColor: c.surface, borderTopWidth: 2, borderTopColor: c.ruleStrong, padding: space.xl, gap: space.md }}>
      <Txt variant="kicker">How historians read this</Txt>
      {paragraphs.map((p, i) => (
        <Paragraph key={i} content={p} variant="bodySmall" />
      ))}
    </View>
  );
}
