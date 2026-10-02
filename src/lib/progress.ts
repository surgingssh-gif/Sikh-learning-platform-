import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * Local reading and quiz progress. The only file that knows how progress is stored,
 * so moving to Supabase later means changing this file alone.
 */

export type LessonProgress = { startedAt?: number; quizScore?: number; quizTotal?: number; completedAt?: number };
export type Progress = { lessons: Record<string, LessonProgress> };

const KEY = 'itihaas.progress.v1';
const empty: Progress = { lessons: {} };
let cache: Progress | null = null;
const listeners = new Set<(p: Progress) => void>();

async function load(): Promise<Progress> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Progress) : empty;
  } catch {
    cache = empty;
  }
  return cache;
}

async function save(next: Progress) {
  cache = next;
  listeners.forEach((l) => l(next));
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private browsing). Progress then lasts for this visit only.
  }
}

export async function markStarted(slug: string) {
  const p = await load();
  if (p.lessons[slug]?.startedAt) return;
  await save({ lessons: { ...p.lessons, [slug]: { ...p.lessons[slug], startedAt: Date.now() } } });
}

export async function recordQuiz(slug: string, score: number, total: number) {
  const p = await load();
  const prev = p.lessons[slug] ?? {};
  await save({
    lessons: { ...p.lessons, [slug]: { ...prev, quizScore: Math.max(score, prev.quizScore ?? 0), quizTotal: total, completedAt: prev.completedAt ?? Date.now() } },
  });
}

/** Returns null until loaded, so server-rendered HTML and the first client render match. */
export function useProgress(): Progress | null {
  const [progress, setProgress] = useState<Progress | null>(null);
  useEffect(() => {
    let alive = true;
    load().then((p) => alive && setProgress(p));
    listeners.add(setProgress);
    return () => {
      alive = false;
      listeners.delete(setProgress);
    };
  }, []);
  return progress;
}
