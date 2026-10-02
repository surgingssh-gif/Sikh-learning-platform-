import { useState } from 'react';
import { Pressable, View } from 'react-native';

import type { Question } from '@/content';
import { recordQuiz } from '@/lib/progress';
import { radius, space, useColors } from '@/theme';

import { Button } from './Button';
import { Txt } from './Txt';

/** All questions on one page. Each answer is checked as soon as it is picked; the score is saved at the end. */
export function Quiz({ slug, questions }: { slug: string; questions: Question[] }) {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [round, setRound] = useState(0);
  const answered = Object.keys(picked).length;
  const score = questions.filter((q) => picked[q.id] === q.answer).length;
  const done = answered === questions.length;

  const pick = (q: Question, optionId: string) => {
    if (picked[q.id]) return;
    const next = { ...picked, [q.id]: optionId };
    setPicked(next);
    if (Object.keys(next).length === questions.length) {
      recordQuiz(slug, questions.filter((x) => next[x.id] === x.answer).length, questions.length);
    }
  };

  return (
    <View style={{ gap: space.xxl }} key={round}>
      {questions.map((q, i) => (
        <QuestionBlock key={q.id} index={i} question={q} picked={picked[q.id]} onPick={(o) => pick(q, o)} />
      ))}
      {done ? (
        <View style={{ gap: space.md, alignItems: 'flex-start' }} accessibilityLiveRegion="polite">
          <Txt variant="headlineM">
            You got {score} of {questions.length}.
          </Txt>
          <Txt variant="bodySmall" tone="ink2">
            {score === questions.length ? 'Every answer right. Your score is saved on this device.' : 'Your best score is saved on this device. Reread the lesson and try again whenever you like.'}
          </Txt>
          <Button
            label="Try again"
            variant="outline"
            onPress={() => {
              setPicked({});
              setRound((r) => r + 1);
            }}
          />
        </View>
      ) : (
        <Txt variant="caption" tone="muted">
          {answered} of {questions.length} answered
        </Txt>
      )}
    </View>
  );
}

function QuestionBlock({ index, question, picked, onPick }: { index: number; question: Question; picked?: string; onPick: (id: string) => void }) {
  const c = useColors();
  const answered = !!picked;
  const right = picked === question.answer;
  return (
    <View style={{ gap: space.md }}>
      <Txt variant="kicker" tone="muted">
        Question {index + 1}
      </Txt>
      <Txt variant="headlineS" style={{ fontSize: 21, lineHeight: 28 }}>
        {question.prompt}
      </Txt>
      <View style={{ gap: space.sm }} accessibilityRole="radiogroup">
        {question.options.map((o, i) => {
          const isAnswer = o.id === question.answer;
          const isPicked = o.id === picked;
          const state = !answered ? 'idle' : isAnswer ? 'correct' : isPicked ? 'incorrect' : 'dim';
          const border = state === 'correct' ? c.correct : state === 'incorrect' ? c.incorrect : c.rule;
          const bg = state === 'correct' ? c.correctSoft : state === 'incorrect' ? c.incorrectSoft : 'transparent';
          return (
            <Pressable
              key={o.id}
              disabled={answered}
              onPress={() => onPick(o.id)}
              accessibilityRole="radio"
              accessibilityState={{ checked: isPicked, disabled: answered }}
              accessibilityLabel={`${String.fromCharCode(65 + i)}. ${o.label}${state === 'correct' ? ', correct answer' : state === 'incorrect' ? ', incorrect' : ''}`}
              style={({ hovered }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: space.md,
                minHeight: 52,
                paddingHorizontal: space.lg,
                paddingVertical: space.sm,
                borderWidth: state === 'correct' || state === 'incorrect' ? 2 : 1,
                borderColor: !answered && hovered ? c.ink : border,
                backgroundColor: bg,
                borderRadius: radius.md,
                opacity: state === 'dim' ? 0.55 : 1,
              })}
            >
              <Txt variant="uiBold" tone={state === 'correct' ? 'correct' : state === 'incorrect' ? 'incorrect' : 'muted'} style={{ width: 18 }}>
                {state === 'correct' ? '✓' : state === 'incorrect' ? '✕' : String.fromCharCode(65 + i)}
              </Txt>
              <Txt variant="ui" style={{ flex: 1, fontSize: 16, lineHeight: 22 }}>
                {o.label}
              </Txt>
            </Pressable>
          );
        })}
      </View>
      {answered ? (
        <Txt variant="bodySmall" tone="ink2" accessibilityLiveRegion="polite">
          <Txt variant="uiBold" tone={right ? 'correct' : 'incorrect'}>
            {right ? 'Correct. ' : 'Not quite. '}
          </Txt>
          {question.explanation}
        </Txt>
      ) : null}
    </View>
  );
}
